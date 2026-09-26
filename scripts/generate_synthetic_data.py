"""
Synthetic outline generation script.
Generates instruction-output formatted JSONL pairs for model training.
"""
import os
import json

PROCESSED_DIR = os.path.join(os.path.dirname(__file__), "..", "data", "processed")

TEMPLATES = [
    {
        "genre": "Fantasy",
        "tone": "Epic & Mythic",
        "premise": "A disgraced knight must escort a cursed princess across a dying kingdom.",
        "characters": "Sir Aldric (disgraced knight), Princess Lyra (cursed heir)",
        "output": json.dumps({
            "title": "The Ashen Oath",
            "logline": "A broken knight and a cursed heir race against a dying world, hunted by the crown they once served.",
            "chapters": [
                {"number": 1, "title": "The Fall", "summary": "Sir Aldric is stripped of his title, heraldry, and silver cloak in the royal courtyard after refusing the High Regent's tyrannical order."},
                {"number": 2, "title": "The Cage Beneath", "summary": "Consigned to the flooded Iron Vaults, Aldric discovers Princess Lyra locked away in binding wards of dark crystal."},
                {"number": 3, "title": "Blood & Briars", "summary": "Escaping the burning citadel into the Ashen Fen, as inquisitor hounds track their scent, Lyra's curse manifests."},
                {"number": 4, "title": "The Silent Watch", "summary": "Trapped during a violent squall inside an abandoned border redoubt, Aldric treats Lyra's festering thorn wounds."},
                {"number": 5, "title": "The Glass Wasteland", "summary": "Crossing the desiccated salt plains under an eclipsed sun where mirror mirages force both to confront their past regrets."}
            ]
        })
    }
]

def generate():
    os.makedirs(PROCESSED_DIR, exist_ok=True)
    out_file = os.path.join(PROCESSED_DIR, "train.jsonl")
    
    with open(out_file, "w", encoding="utf-8") as f:
        for t in TEMPLATES:
            item = {
                "instruction": f"Generate a chapter-by-chapter outline for a story with genre '{t['genre']}', tone '{t['tone']}', characters '{t['characters']}'. Premise: {t['premise']}",
                "input": t["premise"],
                "output": t["output"]
            }
            f.write(json.dumps(item) + "\n")
            
    print(f"Generated synthetic training pairs to {out_file}")

if __name__ == "__main__":
    generate()
