"""
Inference utilities (parsing, formatting).
"""
import re
from typing import Dict, Any

def parse_generated_outline(text: str) -> Dict[str, Any]:
    """
    Parses the raw generated text into structured format (Chapters, Acts, etc.).
    """
    # Dummy parser
    return {
        "raw_text": text,
        "chapters": [{"title": "Chapter 1", "summary": "The Beginning"}]
    }
