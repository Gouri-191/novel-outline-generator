## Novel Outline Generator — Full Documentation (Frontend + Backend + ML + Everything)

This is the master document. Everything you asked for across our conversation is here in one place: logic, hardware, libraries, dataset strategy, RL implementation, backend, frontend, deployment, timeline, and checklists. Bookmark this.

---

# PART 1 — PROJECT OVERVIEW

## 1.1 What You're Building

A **Generative AI writing assistant** that takes a short story premise (genre, tone, characters, conflict) and outputs a **chapter-by-chapter novel outline** with titles and summaries.

**Input Example:**

> "A disgraced knight must escort a cursed princess across a dying kingdom."

**Output Example:**

```json
{
  "title": "The Ashen Oath",
  "logline": "A broken knight and a cursed heir race against a dying world.",
  "chapters": [
    {"number": 1, "title": "The Fall", "summary": "Sir Aldric is stripped of his title..."},
    {"number": 2, "title": "The Cage", "summary": "He meets Princess Lyra, bound by a curse..."}
  ]
}
```

## 1.2 Core Logic (Two-Stage Architecture)

**Stage 1 — Supervised Fine-Tuning (SFT):**
Fine-tune a base LLM on `(premise → outline)` pairs so it learns the format, structure, and style of a good outline.

**Stage 2 — Reinforcement Learning (RLHF, Advanced):**
Align the model's outputs with human preferences using a reward model + PPO. This is what makes a project go from "good" to "exceptional."

**The RLHF Loop:**

- **Policy (Writer):** The fine-tuned LLM that generates outlines.
- **Reward Model (Judge):** A separate model trained to score outline quality (coherence, creativity, premise adherence).
- **PPO Algorithm:** Updates the Writer based on the Judge's scores, while a Reference Model prevents the Writer from drifting too far.

---

# PART 2 — HARDWARE & ENVIRONMENT

## 2.1 Recommended Setup

| **ComponentSpecNotes** |                       |                                       |
| ---------------------- | --------------------- | ------------------------------------- |
| **GPU**                | NVIDIA T4 (16GB VRAM) | Google Colab free tier                |
| **CPU**                | 8+ cores              | For data preprocessing                |
| **RAM**                | 16 GB                 | Minimum for datasets + model overhead |
| **Storage**            | \~20 GB               | Datasets + checkpoints                |

## 2.2 Minimum Viable Setup

| **ComponentSpec** |                                |
| ----------------- | ------------------------------ |
| **GPU**           | RTX 4060 (8GB VRAM) with QLoRA |
| **CPU**           | 4 cores                        |
| **RAM**           | 8–12 GB                        |

## 2.3 The Cheat Code: QLoRA

You don't need a supercomputer. Use **QLoRA (4-bit quantization)**:

- Quantizes a 1.5B model down to \~1 GB VRAM.
- Free Colab T4 handles everything comfortably.
- SFT training time: \~2–3 hours.

## 2.4 Model Choice

- **Recommended:** `Qwen/Qwen2.5-1.5B-Instruct` (sweet spot — lightweight, strong performance).
- **Alternative:** `Qwen/Qwen2.5-3B-Instruct` (if you have more VRAM headroom).
- **Avoid:** 7B+ models unless you have 24GB+ VRAM.

---

# PART 3 — FULL TECH STACK

## 3.1 AI / ML Libraries

```txt
transformers        # Hugging Face — models & tokenizers
torch               # PyTorch — deep learning backend
datasets            # Hugging Face — dataset loading
peft                # LoRA / QLoRA fine-tuning
trl                 # SFTTrainer, RewardTrainer, PPOTrainer
accelerate          # Multi-device training
bitsandbytes        # 4-bit quantization
evaluate            # Metrics
rouge-score         # ROUGE evaluation
```

## 3.2 Data Handling

```txt
pandas
numpy
matplotlib
seaborn
```

## 3.3 Backend

```txt
fastapi
uvicorn
pydantic
python-multipart
```

## 3.4 Frontend

```txt
react
vite
axios
react-markdown
tailwindcss
postcss
autoprefixer
```

## 3.5 Experiment Tracking & Deployment

```txt
wandb           # OR tensorboard
gradio          # Fast-path UI
streamlit       # Fast-path UI
docker
```

---

# PART 4 — DATASET / "DATABASE" STRATEGY

You don't need a traditional SQL database. Your "database" is a **JSONL file** or a Hugging Face `Dataset` object.

## 4.1 Data Sources

| **SourceWhat You GetHow to Use**  |                             |                                                            |
| --------------------------------- | --------------------------- | ---------------------------------------------------------- |
| **Hugging Face `WritingPrompts`** | \~300k stories with prompts | Extract (prompt → summary) pairs                           |
| **Project Gutenberg**             | Full classic novels         | Script extracts chapters, LLM generates synthetic outlines |
| **Wikipedia Plot Summaries**      | Movie/book plots            | Scrape + pair with generated premise                       |
| **Reddit r/WritingPrompts**       | Raw prompts + stories       | Clean and pair                                             |

## 4.2 Data Format (The Target Schema)

```json
{
  "instruction": "Generate a chapter-by-chapter outline for a story with the following premise:",
  "input": "A disgraced knight must escort a cursed princess across a dying kingdom.",
  "output": "Title: The Ashen Oath\n\nChapter 1: The Fall\nSir Aldric is stripped of his title...\n\nChapter 2: The Cage\n..."
}
```

## 4.3 Data Pipeline

```text
Raw Data (HF / Gutenberg)
        │
        ▼
Cleaning (regex, HTML strip, whitespace)
        │
        ▼
Pairing (premise ↔ outline)
        │
        ▼
Tokenization + Formatting (instruction template)
        │
        ▼
Train / Val / Test Split (80/10/10)
        │
        ▼
JSONL files in data/processed/
```

---

# PART 5 — REINFORCEMENT LEARNING IMPLEMENTATION

## 5.1 The Three-Step RLHF Pipeline

1. **SFT** → get a working outline generator.
2. **Reward Model** → train a judge to score outlines.
3. **PPO** → use the judge to improve the writer.

## 5.2 PPO Code Skeleton (with `trl`)

```python
from trl import PPOTrainer, PPOConfig, AutoModelForCausalLMWithValueHead
from transformers import AutoTokenizer

# 1. Load the SFT model (writer) + reference model
model = AutoModelForCausalLMWithValueHead.from_pretrained("path/to/sft_model")
model_ref = AutoModelForCausalLMWithValueHead.from_pretrained("path/to/sft_model")
tokenizer = AutoTokenizer.from_pretrained("path/to/tokenizer")

# 2. Load reward model (judge)
reward_model = ...  # Your trained RewardTrainer output

# 3. PPO config
ppo_config = PPOConfig(
    batch_size=8,
    learning_rate=1e-6,
    kl_coef=0.05,   # stability control
)
ppo_trainer = PPOTrainer(ppo_config, model, model_ref, tokenizer)

# 4. RL loop
for story_idea in dataset:
    query = tokenizer.encode(story_idea, return_tensors="pt")
    response = ppo_trainer.generate(query, max_new_tokens=512)
    outline = tokenizer.decode(response[0])

    reward_score = reward_model(query, response)

    stats = ppo_trainer.step([query[0]], [response[0]], [reward_score])
```

## 5.3 Reality Check

- **For your core project:** do **SFT only**. It's rock solid.
- **If you want the wow factor:** add RLHF as an *advanced extension* and mention it in your report. Even showing you understand the pipeline gets you bonus marks.
- **Compute cost:** PPO is 3–4× the SFT training time. Budget accordingly.

---

# PART 6 — PROJECT STRUCTURE (FULL LAYOUT)

```text
novel-outline-generator/
│
├── README.md
├── requirements.txt
├── .gitignore
├── docker-compose.yml
│
├── data/
│   ├── raw/
│   ├── processed/
│   └── synthetic/
│
├── notebooks/
│   ├── 01_eda.ipynb
│   ├── 02_data_prep.ipynb
│   └── 03_training.ipynb
│
├── src/
│   ├── data/
│   │   ├── dataset_loader.py
│   │   └── preprocessor.py
│   ├── models/
│   │   ├── sft_trainer.py
│   │   └── rl_trainer.py
│   ├── reward/
│   │   └── reward_model.py
│   └── inference/
│       └── generator.py
│
├── configs/
│   ├── sft_config.yaml
│   └── ppo_config.yaml
│
├── backend/
│   ├── main.py
│   ├── model_loader.py
│   ├── schemas.py
│   ├── requirements.txt
│   └── Dockerfile
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   ├── index.css
│   │   ├── components/
│   │   │   ├── PremiseForm.jsx
│   │   │   ├── OutlineDisplay.jsx
│   │   │   ├── Loader.jsx
│   │   │   └── Header.jsx
│   │   ├── services/
│   │   │   └── api.js
│   │   └── utils/
│   │       └── exportMarkdown.js
│   ├── package.json
│   ├── vite.config.js
│   └── tailwind.config.js
│
└── scripts/
    ├── download_data.sh
    └── generate_synthetic_data.py
```

---

# PART 7 — BACKEND (FastAPI)

## 7.1 Architecture Diagram

```text
┌──────────────────────────────┐
│      React Frontend          │
│  (Premise form → Outline)    │
└──────────────┬───────────────┘
               │ POST /api/generate
               ▼
┌──────────────────────────────┐
│      FastAPI Backend         │
│  - Validate (Pydantic)       │
│  - Load model (cached)       │
│  - Run inference             │
│  - Return structured JSON    │
└──────────────┬───────────────┘
               ▼
┌──────────────────────────────┐
│   Qwen2.5 + LoRA Adapter     │
│   (Loaded once at startup)   │
└──────────────────────────────┘
```

## 7.2 Install

```bash
pip install fastapi uvicorn pydantic transformers peft torch accelerate bitsandbytes
```

## 7.3 `backend/schemas.py`

```python
from pydantic import BaseModel, Field

class OutlineRequest(BaseModel):
    premise: str = Field(..., min_length=10, max_length=1000)
    genre: str = Field(default="Fantasy")
    num_chapters: int = Field(default=10, ge=3, le=30)
    tone: str = Field(default="Epic")
    characters: str = Field(default="", max_length=500)

class Chapter(BaseModel):
    number: int
    title: str
    summary: str

class OutlineResponse(BaseModel):
    title: str
    logline: str
    chapters: list[Chapter]
    raw_text: str
```

## 7.4 `backend/model_loader.py`

```python
import torch
from transformers import AutoModelForCausalLM, AutoTokenizer, BitsAndBytesConfig
from peft import PeftModel

class OutlineGenerator:
    def __init__(self, base_model="Qwen/Qwen2.5-1.5B-Instruct", adapter_path="./lora_adapter"):
        self.device = "cuda" if torch.cuda.is_available() else "cpu"

        bnb_config = BitsAndBytesConfig(
            load_in_4bit=True,
            bnb_4bit_quant_type="nf4",
            bnb_4bit_compute_dtype=torch.float16,
        )

        self.tokenizer = AutoTokenizer.from_pretrained(base_model)
        base = AutoModelForCausalLM.from_pretrained(
            base_model,
            quantization_config=bnb_config,
            device_map="auto",
        )
        self.model = PeftModel.from_pretrained(base, adapter_path)
        self.model.eval()

    def generate(self, prompt: str, max_tokens: int = 1024) -> str:
        inputs = self.tokenizer(prompt, return_tensors="pt").to(self.device)
        with torch.no_grad():
            outputs = self.model.generate(
                **inputs,
                max_new_tokens=max_tokens,
                temperature=0.8,
                top_p=0.9,
                do_sample=True,
                repetition_penalty=1.1,
            )
        return self.tokenizer.decode(outputs[0], skip_special_tokens=True)

# Singleton
generator = None

def get_generator():
    global generator
    if generator is None:
        generator = OutlineGenerator()
    return generator
```

## 7.5 `backend/main.py`

```python
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from schemas import OutlineRequest, OutlineResponse
from model_loader import get_generator
import re
import json

app = FastAPI(title="Novel Outline Generator API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "https://your-frontend.vercel.app"],
    allow_methods=["*"],
    allow_headers=["*"],
)

PROMPT_TEMPLATE = """You are a master storyteller. Generate a detailed chapter-by-chapter outline.

Genre: {genre}
Tone: {tone}
Number of Chapters: {num_chapters}
Main Characters: {characters}

Premise: {premise}

Output ONLY valid JSON in this format:
{{
  "title": "...",
  "logline": "...",
  "chapters": [
    {{"number": 1, "title": "...", "summary": "..."}}
  ]
}}
"""

def parse_outline(raw: str, num_chapters: int) -> dict:
    match = re.search(r'\{.*\}', raw, re.DOTALL)
    if match:
        try:
            return json.loads(match.group())
        except json.JSONDecodeError:
            pass
    return {
        "title": "Untitled",
        "logline": "",
        "chapters": [{"number": i+1, "title": f"Chapter {i+1}", "summary": raw}
                     for i in range(num_chapters)]
    }

@app.get("/health")
def health():
    return {"status": "ok"}

@app.post("/api/generate", response_model=OutlineResponse)
async def generate_outline(req: OutlineRequest):
    try:
        gen = get_generator()
        prompt = PROMPT_TEMPLATE.format(**req.dict())
        raw = gen.generate(prompt)
        parsed = parse_outline(raw, req.num_chapters)
        return OutlineResponse(raw_text=raw, **parsed)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
```

## 7.6 Run Backend

```bash
cd backend
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

---

# PART 8 — FRONTEND (React + Vite + Tailwind)

## 8.1 Setup

```bash
npm create vite@latest frontend -- --template react
cd frontend
npm install
npm install axios react-markdown tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

## 8.2 `tailwind.config.js`

```js
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: { extend: {} },
  plugins: [],
}
```

## 8.3 `src/index.css`

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

body {
  @apply bg-slate-950 text-slate-100 font-sans;
}
```

## 8.4 `.env` in frontend

```text
VITE_API_URL=http://localhost:8000
```

## 8.5 `src/services/api.js`

```js
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

export const generateOutline = async (payload) => {
  const { data } = await axios.post(`${API_URL}/api/generate`, payload, {
    timeout: 120000,
  });
  return data;
};
```

## 8.6 `src/components/PremiseForm.jsx`

```jsx
import { useState } from 'react';

export default function PremiseForm({ onSubmit, loading }) {
  const [form, setForm] = useState({
    premise: '',
    genre: 'Fantasy',
    tone: 'Epic',
    num_chapters: 10,
    characters: '',
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ ...form, num_chapters: parseInt(form.num_chapters) });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label className="block text-sm font-medium mb-2">Story Premise</label>
        <textarea
          name="premise"
          value={form.premise}
          onChange={handleChange}
          rows={4}
          required
          placeholder="A disgraced knight must escort a cursed princess..."
          className="w-full p-3 rounded-lg bg-slate-800 border border-slate-700 focus:border-indigo-500 focus:outline-none"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2">Genre</label>
          <select name="genre" value={form.genre} onChange={handleChange}
            className="w-full p-3 rounded-lg bg-slate-800 border border-slate-700">
            <option>Fantasy</option><option>Sci-Fi</option>
            <option>Mystery</option><option>Romance</option>
            <option>Thriller</option><option>Horror</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Tone</label>
          <select name="tone" value={form.tone} onChange={handleChange}
            className="w-full p-3 rounded-lg bg-slate-800 border border-slate-700">
            <option>Epic</option><option>Dark</option>
            <option>Humorous</option><option>Melancholic</option>
            <option>Hopeful</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">
          Chapters: {form.num_chapters}
        </label>
        <input type="range" name="num_chapters" min="3" max="30"
          value={form.num_chapters} onChange={handleChange} className="w-full" />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Main Characters (optional)</label>
        <input type="text" name="characters" value={form.characters}
          onChange={handleChange}
          placeholder="Aria the knight, Prince Kael"
          className="w-full p-3 rounded-lg bg-slate-800 border border-slate-700 focus:border-indigo-500 focus:outline-none" />
      </div>

      <button type="submit" disabled={loading}
        className="w-full py-3 rounded-lg bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-700 font-semibold transition">
        {loading ? 'Generating Outline...' : '✨ Generate Outline'}
      </button>
    </form>
  );
}
```

## 8.7 `src/components/OutlineDisplay.jsx`

```jsx
import ReactMarkdown from 'react-markdown';

export default function OutlineDisplay({ outline }) {
  if (!outline) return null;

  const exportMarkdown = () => {
    const md = `# ${outline.title}\n\n**Logline:** ${outline.logline}\n\n` +
      outline.chapters.map(c =>
        `## Chapter ${c.number}: ${c.title}\n\n${c.summary}\n`).join('\n');
    const blob = new Blob([md], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${outline.title || 'outline'}.md`;
    a.click();
  };

  return (
    <div className="mt-8 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-indigo-400">{outline.title}</h2>
          <p className="text-slate-400 italic mt-1">{outline.logline}</p>
        </div>
        <button onClick={exportMarkdown}
          className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-sm">
          ⬇ Export .md
        </button>
      </div>

      <div className="space-y-4">
        {outline.chapters.map((ch) => (
          <div key={ch.number}
            className="p-5 rounded-xl bg-slate-900 border border-slate-800 hover:border-indigo-700 transition">
            <h3 className="text-lg font-semibold text-indigo-300">
              Chapter {ch.number}: {ch.title}
            </h3>
            <p className="text-slate-300 mt-2 leading-relaxed">{ch.summary}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
```

## 8.8 `src/components/Loader.jsx`

```jsx
export default function Loader() {
  return (
    <div className="flex flex-col items-center py-12">
      <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />
      <p className="mt-4 text-slate-400">Weaving your story...</p>
    </div>
  );
}
```

## 8.9 `src/App.jsx`

```jsx
import { useState } from 'react';
import PremiseForm from './components/PremiseForm';
import OutlineDisplay from './components/OutlineDisplay';
import Loader from './components/Loader';
import { generateOutline } from './services/api';

export default function App() {
  const [outline, setOutline] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleGenerate = async (payload) => {
    setLoading(true);
    setError(null);
    setOutline(null);
    try {
      const data = await generateOutline(payload);
      setOutline(data);
    } catch (err) {
      setError('Something went wrong. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 to-indigo-950">
      <header className="border-b border-slate-800">
        <div className="max-w-4xl mx-auto px-6 py-6">
          <h1 className="text-2xl font-bold text-indigo-400">
            📖 Novel Outline Generator
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            Powered by Qwen2.5 + LoRA fine-tuning
          </p>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-10">
        <PremiseForm onSubmit={handleGenerate} loading={loading} />
        {loading && <Loader />}
        {error && <p className="mt-6 text-red-400 text-center">{error}</p>}
        {outline && <OutlineDisplay outline={outline} />}
      </main>
    </div>
  );
}
```

## 8.10 Run Frontend

```bash
cd frontend
npm run dev
```

Visit `http://localhost:5173`.

---

# PART 9 — FAST-PATH UI (Streamlit Alternative)

If React feels like too much, use this single file:

```python
# app.py
import streamlit as st
import requests

st.set_page_config(page_title="Novel Outline Generator", page_icon="📖", layout="wide")
st.title("📖 Novel Outline Generator")
st.caption("Fine-tuned Qwen2.5 + LoRA")

with st.sidebar:
    st.header("Story Settings")
    genre = st.selectbox("Genre", ["Fantasy", "Sci-Fi", "Mystery", "Romance", "Thriller"])
    tone = st.selectbox("Tone", ["Epic", "Dark", "Humorous", "Melancholic"])
    num_chapters = st.slider("Chapters", 3, 30, 10)
    characters = st.text_input("Main Characters")

premise = st.text_area("Story Premise", height=150,
    placeholder="A disgraced knight must escort a cursed princess...")

if st.button("✨ Generate Outline", type="primary"):
    if len(premise) < 10:
        st.warning("Premise too short.")
    else:
        with st.spinner("Weaving your story..."):
            res = requests.post("http://localhost:8000/api/generate", json={
                "premise": premise, "genre": genre, "tone": tone,
                "num_chapters": num_chapters, "characters": characters,
            }, timeout=120)
            if res.ok:
                data = res.json()
                st.subheader(data["title"])
                st.write(f"*{data['logline']}*")
                for ch in data["chapters"]:
                    with st.expander(f"Chapter {ch['number']}: {ch['title']}"):
                        st.write(ch["summary"])
                st.download_button("⬇ Download Markdown", data["raw_text"], "outline.md")
            else:
                st.error("Generation failed.")
```

Run: `streamlit run app.py`

---

# PART 10 — IMPLEMENTATION PHASES

## Phase 1: Data Collection & Cleaning

1. Download `WritingPrompts` via `datasets.load_dataset("writing_prompts")`.
2. Strip HTML, normalize whitespace, remove artifacts.
3. Pair `(prompt → story summary)`.
4. Format into instruction JSONL.
5. Split 80/10/10.

## Phase 2: Supervised Fine-Tuning

1. Load `Qwen2.5-1.5B-Instruct` with 4-bit quant.
2. Attach LoRA adapter (`r=16, alpha=32, target_modules=["q_proj","v_proj"]`).
3. Train with `trl.SFTTrainer` for 2–3 epochs.
4. Save LoRA adapter to `./lora_adapter`.

## Phase 3: (Optional) RLHF

1. Build a reward model from preference data (or LLM-as-judge).
2. Load SFT model as policy + frozen reference.
3. Run `trl.PPOTrainer` loop with KL penalty.
4. Save aligned adapter.

## Phase 4: Evaluation

- **ROUGE** for text overlap.
- **LLM-as-a-judge** for coherence, creativity, premise adherence.
- Compare base vs SFT vs RLHF in a table.

## Phase 5: Backend + Frontend

- Build FastAPI server, wire LoRA adapter.
- Build React UI or Streamlit fallback.
- Test end-to-end locally.

## Phase 6: Deployment

- Upload LoRA adapter to HF Hub.
- Deploy backend to HF Spaces (Docker).
- Deploy frontend to Vercel/Netlify.
- Update CORS with live URLs.

---

# PART 11 — DOCKER (Run Everything Locally)

## `backend/Dockerfile`

```dockerfile
FROM python:3.11-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY . .
EXPOSE 7860
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "7860"]
```

## `docker-compose.yml`

```yaml
version: "3.9"
services:
  backend:
    build: ./backend
    ports:
      - "8000:7860"
    volumes:
      - ./lora_adapter:/app/lora_adapter
    deploy:
      resources:
        reservations:
          devices:
            - driver: nvidia
              count: 1
              capabilities: [gpu]

  frontend:
    build: ./frontend
    ports:
      - "5173:5173"
    environment:
      - VITE_API_URL=http://backend:7860
    depends_on:
      - backend
```

Run: `docker-compose up --build`

---

# PART 12 — DEPLOYMENT OPTIONS

| **ComponentFree HostNotes** |                    |                           |
| --------------------------- | ------------------ | ------------------------- |
| Frontend                    | Vercel / Netlify   | Push GitHub → auto-deploy |
| Backend                     | HF Spaces (Docker) | Free CPU; GPU is paid     |
| Model                       | HF Hub             | Upload LoRA adapter       |
| All-in-one                  | HF Spaces + Gradio | Easiest                   |

---

# PART 13 — CORS (THE #1 BUG YOU'LL HIT)

If your frontend can't talk to your backend, it's **CORS**. In `main.py`:

```python
allow_origins=["http://localhost:5173", "https://your-app.vercel.app"]
```

Use `["*"]` during dev, lock it down in production.

---

# PART 14 — TIMELINE (6–8 WEEKS)

| **WeekTask** |                                         |
| ------------ | --------------------------------------- |
| 1            | Research, project setup, hardware check |
| 2            | Data collection, cleaning, EDA          |
| 3–4          | SFT training with LoRA                  |
| 5            | (Optional) Reward model + PPO           |
| 6            | Evaluation, ablation studies            |
| 7            | Backend + frontend integration          |
| 8            | Deployment, report, demo video          |

---

# PART 15 — MASTER CHECKLIST

**Setup**

- □ 

  Google Colab account
- □ 

  Hugging Face account
- □ 

  GitHub repo created
- □ 

  Vercel account (for frontend)

**ML**

- □ 

  Dataset downloaded
- □ 

  Data cleaned + formatted as JSONL
- □ 

  Train/val/test split
- □ 

  SFT training complete
- □ 

  LoRA adapter saved
- □ 

  (Optional) RLHF complete
- □ 

  Evaluation metrics computed

**Backend**

- □ 

  FastAPI server runs locally
- □ 

  `/health` returns `{"status":"ok"}`
- □ 

  `/api/generate` returns valid JSON
- □ 

  Dockerfile works

**Frontend**

- □ 

  React app runs locally
- □ 

  Form submits successfully
- □ 

  Outline renders properly
- □ 

  Export to Markdown works

**Deployment**

- □ 

  LoRA adapter on HF Hub
- □ 

  Backend on HF Spaces
- □ 

  Frontend on Vercel
- □ 

  CORS updated with live URLs
- □ 

  README with screenshots + demo GIF
