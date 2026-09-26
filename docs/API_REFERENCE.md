# NovelCraft API Reference

NovelCraft provides an OpenAPI-compliant REST API powered by FastAPI.

Interactive Swagger UI is available at `http://localhost:8000/docs` when running the backend.

---

## Base URL
```text
http://localhost:8000
```

---

## Endpoints

### 1. Health & Inference State
```http
GET /health
```
Checks the backend health, active model, quantization specs, and Ollama connection parameters.

**Response `200 OK`**:
```json
{
  "status": "ok",
  "inference_engine": "ready",
  "provider": "Ollama Remote Infrastructure",
  "target_host": "http://192.168.0.102:11434",
  "target_model": "gemma4:e4b",
  "method": "Distributed Chained Generation",
  "fastapi_version": "v0.111.0"
}
```

---

### 2. Story Presets
```http
GET /api/presets
```
Returns curated premise presets (`Dying Kingdom`, `Cyberpunk Heist`, `Cozy Mystery`, `Space Opera`).

---

### 3. Generate Novel Outline
```http
POST /api/generate
```
Synthesizes a full chapter-by-chapter outline with dramatic acts, POV tracking, and conflicts.

#### Request Body (`application/json`)
```json
{
  "premise": "A disgraced knight must escort a cursed princess across a dying kingdom.",
  "genre": "Fantasy (Dark/High)",
  "tone": "Epic & Mythic",
  "num_chapters": 10,
  "characters": "Sir Aldric (disgraced knight), Princess Lyra (cursed heir)",
  "temperature": 0.85,
  "top_p": 0.9,
  "repetition_penalty": 1.1,
  "ollama_host": "http://192.168.0.102:11434",
  "ollama_model": "gemma4:e4b"
}
```

#### Response `200 OK`
```json
{
  "title": "The Ashen Oath",
  "logline": "A broken knight and a cursed heir race against a dying world, hunted by the crown they once served.",
  "genre": "Fantasy (Dark/High)",
  "tone": "Epic & Mythic",
  "target_words": 85000,
  "est_reading_hours": 6.2,
  "chapters": [
    {
      "number": 1,
      "title": "The Fall",
      "act": "Act I: Departure",
      "summary": "Sir Aldric is stripped of his title, heraldry, and silver cloak in the royal courtyard...",
      "pov": "Sir Aldric",
      "setting": "Sunken Courtyard",
      "conflict": "Honor vs Obligation"
    }
  ],
  "dramaturgy_note": "Character Trajectory: Aldric shifts from blind duty to individualized moral guardianship.",
  "arc_verification": "Pass",
  "raw_text": "..."
}
```

---

## Python Integration Example

```python
import requests

payload = {
    "premise": "An archivist discovers an impossible door beneath the Vatican library.",
    "genre": "Mystery (Occult)",
    "tone": "Suspenseful & Philosophical",
    "num_chapters": 12,
    "ollama_host": "http://192.168.0.102:11434",
    "ollama_model": "gemma4:e4b"
}

response = requests.post("http://localhost:8000/api/generate", json=payload)
outline = response.json()

print(f"Title: {outline['title']}")
for ch in outline["chapters"]:
    print(f"Chapter {ch['number']}: {ch['title']} ({ch['act']})")
    print(f"{ch['summary']}\n")
```

---

## cURL Request Example

```bash
curl -X POST "http://localhost:8000/api/generate" \
  -H "Content-Type: application/json" \
  -d '{
    "premise": "A rogue AI therapist begins diagnosing humans with manufactured existential crises.",
    "genre": "Sci-Fi (Cyberpunk)",
    "tone": "Satirical & Dark",
    "num_chapters": 8
  }'
```
