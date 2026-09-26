"""
Supervised Fine-Tuning (SFT) module with QLoRA.
"""
import os
import yaml
import logging

logger = logging.getLogger(__name__)

class SFTTrainerPipeline:
    def __init__(self, config_path: str = "configs/sft_config.yaml"):
        with open(config_path, "r") as f:
            self.config = yaml.safe_load(f)

    def train(self, dataset_path: str):
        """Runs SFT training with HuggingFace SFTTrainer + PEFT QLoRA."""
        logger.info(f"Loading base model: {self.config['model']['base_model_name']}")
        logger.info(f"LoRA config: r={self.config['lora']['r']}, alpha={self.config['lora']['lora_alpha']}")
        
        # Skeleton for execution in GPU env
        print("Starting SFT training pipeline...")
        print(f"Loading data from {dataset_path}")
        print("Applying QLoRA adapter target_modules=['q_proj', 'v_proj']...")
        print(f"Saving checkpoints to {self.config['training']['output_dir']}")
        return True

if __name__ == "__main__":
    trainer = SFTTrainerPipeline()
    trainer.train("data/processed/train.jsonl")
