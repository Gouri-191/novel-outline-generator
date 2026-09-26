"""
Data retrieval script for Novel Outline Generator.
Downloads public prompt & storytelling datasets (e.g., WritingPrompts / synthetic samples)
and saves them to data/raw/
"""
import os
import json
import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

RAW_DATA_DIR = os.path.join(os.path.dirname(__file__), "..", "data", "raw")

SAMPLE_PROMPTS = [
    {
        "prompt": "A disgraced knight must escort a cursed princess across a dying kingdom.",
        "genre": "Fantasy",
        "tone": "Dark",
        "chapters": [
            {"number": 1, "title": "The Fall", "summary": "Sir Aldric is stripped of his title in the royal courtyard after refusing a tyrannical order."},
            {"number": 2, "title": "The Cage Beneath", "summary": "Aldric discovers Princess Lyra locked away in binding wards of dark crystal."},
            {"number": 3, "title": "Blood & Briars", "summary": "Lyra's curse manifests as obsidian briars while escaping inquisitor hounds."},
            {"number": 4, "title": "The Silent Watch", "summary": "Trapped in a border redoubt, Aldric learns the curse was transferred to save the realm."},
            {"number": 5, "title": "The Glass Wasteland", "summary": "Crossing salt plains under an eclipsed sun, facing phantom regrets."}
        ]
    },
    {
        "prompt": "In a neon-drenched metropolis, a rogue hacker discovers a memory chip containing a dead CEO's consciousness.",
        "genre": "Sci-Fi",
        "tone": "Cyberpunk",
        "chapters": [
            {"number": 1, "title": "Neon Ghost", "summary": "Kael extracts an encrypted neural drive from a black market drop."},
            {"number": 2, "title": "Digital Resurrection", "summary": "Booting the chip reveals the living persona of billionaire Marcus Vance."},
            {"number": 3, "title": "Corpo Net-Purge", "summary": "Vance's corporate successors launch lethal hunter-killer drones."}
        ]
    }
]

def main():
    os.makedirs(RAW_DATA_DIR, exist_ok=True)
    target_path = os.path.join(RAW_DATA_DIR, "raw_prompts.json")
    
    logger.info(f"Saving initial raw prompt dataset to {target_path}...")
    with open(target_path, "w", encoding="utf-8") as f:
        json.dump(SAMPLE_PROMPTS, f, indent=2)
    
    logger.info("Raw data download/saving complete!")

if __name__ == "__main__":
    main()
