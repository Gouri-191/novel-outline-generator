# NovelCraft Deployment & Setup Guide

This guide covers deploying NovelCraft across multiple environments: Local Development, Remote Ollama cluster, Docker Compose, and Cloud Hosting (Hugging Face Spaces, Vercel, AWS).

---

## 1. Local Development (Virtual Environment)

### Windows
```cmd
setup_venv.bat
venv\Scripts\activate

# Terminal 1: Backend
cd backend
python -m uvicorn main:app --reload --host 0.0.0.0 --port 8000

# Terminal 2: Frontend
cd frontend
npm install
npm run dev
```

### Linux / macOS
```bash
chmod +x setup_venv.sh
./setup_venv.sh
source venv/bin/activate

# Terminal 1: Backend
cd backend
python3 -m uvicorn main:app --reload --host 0.0.0.0 --port 8000

# Terminal 2: Frontend
cd frontend
npm install
npm run dev
```

---

## 2. Remote Ollama Node Configuration

To run high-parameter story models on an external machine / GPU rig (e.g. IP `192.168.0.102`):

1. **On the Ollama Host Machine**:
   Set `OLLAMA_HOST=0.0.0.0:11434` to permit local area network connections:
   ```bash
   # Windows (PowerShell):
   $env:OLLAMA_HOST="0.0.0.0:11434"
   ollama serve

   # Linux (Systemd / Bash):
   OLLAMA_HOST=0.0.0.0:11434 ollama serve
   ```
2. **Pull the target model**:
   ```bash
   ollama pull gemma4:e4b
   # or
   ollama pull qwen2.5:1.5b
   ```
3. **NovelCraft Studio**:
   Enter `http://192.168.0.102:11434` and model `gemma4:e4b` in the **Ollama Node & Sampling Params** accordion.

---

## 3. Docker Compose Deployment

Run backend and frontend together with single command:

```bash
docker-compose up --build -d
```

- **Frontend Studio UI**: `http://localhost:5173`
- **FastAPI Backend**: `http://localhost:8000`
- **Swagger Docs**: `http://localhost:8000/docs`

To stop containers:
```bash
docker-compose down
```

---

## 4. Cloud Deployment

### Frontend on Vercel
1. Fork or push your repo to GitHub.
2. Link the repository in Vercel.
3. Set **Root Directory** to `frontend`.
4. Add Environment Variable:
   - `VITE_API_URL=https://your-backend-instance.com`

### Backend on Hugging Face Spaces (Docker)
1. Create a new Space on Hugging Face with SDK `Docker`.
2. Push the `backend/` directory and `src/` to the Space.
3. The Space will expose port `8000` or `7860`.
