from pydantic import BaseModel, Field
from typing import List, Optional

class OutlineRequest(BaseModel):
    premise: str = Field(..., min_length=10, max_length=1000, example="A disgraced knight must escort a cursed princess across a dying kingdom.")
    genre: str = Field(default="Fantasy (Dark/High)")
    tone: str = Field(default="Epic & Mythic")
    num_chapters: int = Field(default=10, ge=3, le=30)
    characters: Optional[str] = Field(default="Sir Aldric (disgraced knight), Princess Lyra (cursed heir)")
    temperature: Optional[float] = Field(default=0.8, ge=0.1, le=1.5)
    top_p: Optional[float] = Field(default=0.9, ge=0.1, le=1.0)
    repetition_penalty: Optional[float] = Field(default=1.1, ge=1.0, le=2.0)
    ollama_host: Optional[str] = Field(default="http://192.168.0.102:11434")
    ollama_model: Optional[str] = Field(default="gemma4:e4b")

class Chapter(BaseModel):
    number: int
    title: str
    act: Optional[str] = "Act I: Departure"
    summary: str
    pov: Optional[str] = "Sir Aldric"
    setting: Optional[str] = "Sunken Courtyard"
    conflict: Optional[str] = "Honor vs Obligation"

class ModelSpec(BaseModel):
    architecture: str = "Ollama (gemma4:e4b)"
    ollama_host: str = "http://192.168.0.102:11434"
    ollama_model: str = "gemma4:e4b"
    method: str = "Distributed Chained Generation (2-Phase Blueprint + Sequential Expansion)"
    stage: str = "OLLAMA INFRA"
    kl_coef: float = 0.05

class OutlineResponse(BaseModel):
    title: str
    logline: str
    genre: str
    tone: str
    target_words: int
    est_reading_hours: float
    chapters: List[Chapter]
    raw_text: str
    dramaturgy_note: Optional[str] = None
    arc_verification: Optional[str] = "Pass"
    model_spec: Optional[ModelSpec] = Field(default_factory=ModelSpec)
