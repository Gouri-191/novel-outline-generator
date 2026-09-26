"""
Dataset Loader module for Hugging Face and local JSONL datasets.
"""
import os
import json
from typing import Dict, List, Optional
try:
    from datasets import Dataset, load_dataset
except ImportError:
    Dataset = None

class OutlineDatasetLoader:
    def __init__(self, data_path: Optional[str] = None):
        self.data_path = data_path

    def load_local_jsonl(self, filepath: str) -> List[Dict]:
        """Loads dataset from a local JSONL file."""
        data = []
        if not os.path.exists(filepath):
            raise FileNotFoundError(f"File not found: {filepath}")
            
        with open(filepath, "r", encoding="utf-8") as f:
            for line in f:
                if line.strip():
                    data.append(json.loads(line))
        return data

    def load_hf_dataset(self, dataset_name: str = "writing_prompts", split: str = "train"):
        """Loads public Hugging Face dataset."""
        if Dataset is None:
            raise ImportError("huggingface datasets library is required.")
        return load_dataset(dataset_name, split=split)

    def prepare_train_test_split(self, data: List[Dict], train_ratio: float = 0.8, val_ratio: float = 0.1):
        """Splits list of items into train/val/test splits."""
        n = len(data)
        train_end = int(n * train_ratio)
        val_end = int(n * (train_ratio + val_ratio))
        
        return {
            "train": data[:train_end],
            "validation": data[train_end:val_end],
            "test": data[val_end:]
        }
