import { useState } from 'react';

function Sidebar({ theme, setChapters, loading, setLoading }) {
  const [premise, setPremise] = useState('A renegade space pirate discovers a sentient starship...');
  const [genre, setGenre] = useState('Sci-Fi');
  const [tone, setTone] = useState('Gritty');
  const [chaptersInput, setChaptersInput] = useState(12);

  const handleGenerate = async () => {
    if (loading) return;
    setLoading(true);
    setChapters([]);
    try {
      const response = await fetch('http://localhost:8000/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          premise,
          genre,
          tone,
          target_chapters: Number(chaptersInput)
        })
      });
      const data = await response.json();
      if (data.status === 'success') {
        setChapters(data.outline);
      } else {
        alert('Failed to generate outline: ' + data.detail);
      }
    } catch (error) {
      alert('Error connecting to backend: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="sidebar">
      <h2 className="section-title">PINNED PREMISE NOTE</h2>
      
      <div className="input-group">
        <label>Story Premise:</label>
        <textarea 
          className="sketch-textarea" 
          value={premise}
          onChange={(e) => setPremise(e.target.value)}
        />
      </div>

      <div className="input-group">
        <label>Genre:</label>
        <select className="sketch-select" value={genre} onChange={(e) => setGenre(e.target.value)}>
          <option>Sci-Fi</option>
          <option>Fantasy</option>
          <option>Mystery</option>
          <option>Romance</option>
          <option>Thriller</option>
          <option>Horror</option>
          <option>Cyberpunk</option>
          <option>Steampunk</option>
          <option>Historical Fiction</option>
          <option>Dystopian</option>
          <option>LitRPG</option>
        </select>
      </div>

      <div className="input-group">
        <label>Tone:</label>
        <select className="sketch-select" value={tone} onChange={(e) => setTone(e.target.value)}>
          <option>Gritty</option>
          <option>Whimsical</option>
          <option>Dark</option>
          <option>Humorous</option>
          <option>Melancholic</option>
          <option>Action-packed</option>
          <option>Suspenseful</option>
          <option>Satirical</option>
          <option>Philosophical</option>
          <option>Hopeful</option>
        </select>
      </div>

      <div className="input-group">
        <label>Target Chapters: {chaptersInput}</label>
        <input 
          type="range" 
          min="5" max="30" 
          value={chaptersInput}
          onChange={(e) => setChaptersInput(e.target.value)}
        />
      </div>

      <button className="generate-btn" onClick={handleGenerate} disabled={loading} style={{ opacity: loading ? 0.7 : 1 }}>
        {loading ? 'GENERATING...' : 'GENERATE OUTLINE'}
      </button>

      <div className="sticky-note">
        <h4>LoRA Dramaturgy Note</h4>
        <p>Ensure Act II has sufficient rising action. Don't forget the midpoint twist!</p>
      </div>
    </div>
  );
}

export default Sidebar;
