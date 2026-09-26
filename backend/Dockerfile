FROM python:3.10-slim

WORKDIR /app

COPY backend/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Also need to install transformers, torch etc. for inference if running locally
# For this basic Dockerfile, we will install the root requirements to ensure inference works
COPY requirements.txt /root_reqs.txt
RUN pip install --no-cache-dir -r /root_reqs.txt || true

COPY src/ /app/src/
COPY backend/ /app/backend/

# Expose port
EXPOSE 8000

# Run FastAPI app
CMD ["uvicorn", "backend.main:app", "--host", "0.0.0.0", "--port", "8000"]
