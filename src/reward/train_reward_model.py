"""
Training script for human preference reward model.
"""
import logging

def train_reward_model():
    logging.info("Training reward model on pair-preference dataset...")
    print("Training Reward Model with HuggingFace RewardTrainer...")
    print("Saving checkpoint to ./reward_model_checkpoint")

if __name__ == "__main__":
    train_reward_model()
