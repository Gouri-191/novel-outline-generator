"""
Text Cleaning and Instruction Formatting Module.
"""
import re
from typing import Dict

class TextPreprocessor:
    @staticmethod
    def clean_text(text: str) -> str:
        """Strips HTML tags, normalizes whitespace, cleans artifacts."""
        if not text:
            return ""
        # Strip HTML tags
        text = re.sub(r'<[^>]+>', '', text)
        # Normalize whitespace
        text = re.sub(r'\s+', ' ', text).strip()
        return text

    @staticmethod
    def format_prompt(premise: str, genre: str = "Fantasy", tone: str = "Epic", num_chapters: int = 10, characters: str = "") -> str:
        """Formats story parameters into standardized LLM instruction prompt."""
        return (
            f"You are a master storyteller and dramaturge. Generate a detailed chapter-by-chapter outline.\n\n"
            f"Genre: {genre}\n"
            f"Tone: {tone}\n"
            f"Number of Chapters: {num_chapters}\n"
            f"Main Characters: {characters if characters else 'Unspecified'}\n\n"
            f"Premise: {premise}\n\n"
            f"Output ONLY valid JSON in this schema:\n"
            f'{{\n  "title": "...",\n  "logline": "...",\n  "chapters": [\n    {{"number": 1, "title": "...", "summary": "..."}}\n  ]\n}}\n'
        )
