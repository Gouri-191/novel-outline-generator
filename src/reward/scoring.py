"""
Scoring heuristic combinations for reward.
"""
def score_outline(outline_text: str, model_score: float) -> float:
    """
    Combines Model Score (from RewardModel) with structural heuristics.
    e.g. Penalty if lacking 3 acts, or bonus if adheres strictly to POV.
    """
    heuristic_score = 0.0
    if "Act I" in outline_text: heuristic_score += 0.1
    if "Act II" in outline_text: heuristic_score += 0.1
    if "Act III" in outline_text: heuristic_score += 0.1
    
    final_score = (model_score * 0.7) + (heuristic_score * 0.3)
    return final_score
