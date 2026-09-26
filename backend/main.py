from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import sys
import os

# Add src to path for absolute imports
sys.path.append(os.path.join(os.path.dirname(__file__), '..', 'src'))

from inference.generator import OutlineGenerator

app = FastAPI(title="Novel Outline Generator API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

generator = None

@app.on_event("startup")
async def startup_event():
    global generator
    # Initialize with Ollama parameters
    generator = OutlineGenerator(ollama_url="http://192.168.0.102:11434/api/generate", model_name="gemma4:e4b")

class GenerateRequest(BaseModel):
    premise: str
    genre: str = "Fantasy"
    tone: str = "Dark"
    target_chapters: int = 12

@app.post("/api/generate")
async def generate_outline(request: GenerateRequest):
    if not generator:
        raise HTTPException(status_code=500, detail="Generator not initialized")
    
    try:
        # Call the distributed outline generator
        chapters = generator.generate_distributed_outline(
            premise=request.premise,
            genre=request.genre,
            tone=request.tone,
            target_chapters=request.target_chapters
        )
        return {"status": "success", "outline": chapters}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/health")
async def health_check():
    return {"status": "healthy"}
