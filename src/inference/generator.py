"""
Outline Generator Inference script using Ollama.
"""
import logging
import json
import requests
from typing import Dict, Any, List

logger = logging.getLogger(__name__)

class OutlineGenerator:
    def __init__(self, ollama_url: str = "http://192.168.0.102:11434/api/generate", model_name: str = "gemma4:e4b"):
        self.ollama_url = ollama_url
        self.model_name = model_name
        logger.info(f"Initialized OutlineGenerator connecting to {self.ollama_url} with model {self.model_name}")

    def _call_ollama(self, prompt: str, system: str = "") -> str:
        payload = {
            "model": self.model_name,
            "prompt": prompt,
            "system": system,
            "stream": False
        }
        try:
            response = requests.post(self.ollama_url, json=payload, timeout=120)
            response.raise_for_status()
            return response.json().get("response", "")
        except Exception as e:
            logger.error(f"Error calling Ollama: {e}")
            return ""

    def generate_distributed_outline(self, premise: str, genre: str, tone: str, target_chapters: int) -> List[Dict[str, str]]:
        """
        Generates the outline using a distributed method:
        1. Generate overall plot structure.
        2. Generate chapter-by-chapter iteratively to maintain continuity.
        """
        logger.info(f"Generating overarching plot for {genre} novel...")
        
        system_prompt = f"You are an expert structural editor and novelist. Genre: {genre}. Tone: {tone}."
        
        # 1. Generate overarching plot
        plot_prompt = f"Based on this premise: '{premise}', generate a brief overarching plot summary including Act I (Setup), Act II (Rising Action/Midpoint), and Act III (Climax/Resolution)."
        overarching_plot = self._call_ollama(plot_prompt, system_prompt)
        
        logger.info("Overarching plot generated. Starting distributed chapter generation...")
        
        chapters = []
        prev_summary = "This is the very beginning of the story."
        
        for i in range(1, target_chapters + 1):
            logger.info(f"Generating Chapter {i}...")
            
            # Determine Act roughly based on chapter position
            act = "Act I"
            if i > target_chapters * 0.25:
                act = "Act II"
            if i > target_chapters * 0.75:
                act = "Act III"
                
            chapter_prompt = f"""
            Overarching Plot: {overarching_plot}
            
            Previous Chapter Summary: {prev_summary}
            
            Write a detailed summary for Chapter {i}. It should fit within {act}.
            Return the output STRICTLY as a JSON object with no markdown formatting, using this schema:
            {{
                "title": "Chapter {i}: [Creative Title]",
                "act": "{act}",
                "summary": "[Descriptive summary of the chapter's events, character interactions, and plot progression]"
            }}
            """
            
            response_text = self._call_ollama(chapter_prompt, system_prompt)
            
            # Try to parse the JSON
            try:
                # Basic cleanup in case model adds markdown blocks
                clean_text = response_text.replace("```json", "").replace("```", "").strip()
                chapter_data = json.loads(clean_text)
                chapters.append(chapter_data)
                prev_summary = chapter_data.get("summary", "")
            except json.JSONDecodeError:
                logger.error(f"Failed to parse JSON for Chapter {i}. Raw response: {response_text}")
                # Fallback format
                chapter_data = {
                    "title": f"Chapter {i}",
                    "act": act,
                    "summary": response_text.strip()
                }
                chapters.append(chapter_data)
                prev_summary = response_text.strip()
                
        return chapters

if __name__ == "__main__":
    gen = OutlineGenerator()
    out = gen.generate_distributed_outline("A space marine gets lost.", "Sci-Fi", "Gritty", 3)
    print(json.dumps(out, indent=2))
