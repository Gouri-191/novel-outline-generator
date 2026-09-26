import React, { useState } from 'react';
import { Sparkles, ChevronDown, ChevronUp, Sliders, Pin, Network } from 'lucide-react';

export default function PremiseForm({ presets, onSubmit, loading }) {
  const [form, setForm] = useState({
    premise: 'A disgraced knight must escort a cursed princess across a dying kingdom.',
    genre: 'Fantasy (Dark/High)',
    tone: 'Epic & Mythic',
    num_chapters: 10,
    characters: 'Sir Aldric (disgraced knight), Princess Lyra (cursed heir)',
    temperature: 0.85,
    top_p: 0.9,
    repetition_penalty: 1.1,
    ollama_host: 'http://192.168.0.102:11434',
    ollama_model: 'gemma4:e4b',
  });

  const [showLoraParams, setShowLoraParams] = useState(false);

  const handleSelectPreset = (preset) => {
    setForm({
      ...form,
      premise: preset.premise,
      genre: preset.genre,
      tone: preset.tone,
      characters: preset.characters,
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      ...form,
      num_chapters: parseInt(form.num_chapters, 10),
      temperature: parseFloat(form.temperature),
      top_p: parseFloat(form.top_p),
      repetition_penalty: parseFloat(form.repetition_penalty),
    });
  };

  return (
    <div className="space-y-4">
      {/* Inspiration Tags Row */}
      <div className="flex items-center gap-2 flex-wrap text-xs font-mono">
        <span className="font-bold text-black dark:text-white flex items-center gap-1 font-sketch text-lg">
          <Pin className="w-4 h-4" /> INSPIRATION:
        </span>
        {presets.map((p) => (
          <button
            key={p.id}
            type="button"
            onClick={() => handleSelectPreset(p)}
            className="sketch-box-sm bg-white dark:bg-zinc-800 hover:bg-amber-100 dark:hover:bg-zinc-700 px-3 py-1 text-black dark:text-white font-handwriting text-base font-bold transition flex items-center gap-1"
          >
            <span>{p.label === 'Dying Kingdom' ? '⚔️' : p.label === 'Cyberpunk Heist' ? '💾' : p.label === 'Cozy Mystery' ? '☕' : '🚀'}</span>
            {p.label}
          </button>
        ))}
      </div>

      {/* Main Form Container */}
      <div className="sketch-box-lg bg-white dark:bg-[#141622] p-6 relative">
        {/* Yellow Tape Badge */}
        <div className="absolute -top-4 left-6 sketch-tape font-sketch text-lg">
          PINNED PREMISE NOTE
        </div>

        <form onSubmit={handleSubmit} className="space-y-5 pt-2">
          {/* Header row */}
          <div className="flex items-center justify-between">
            <h3 className="font-bold font-sketch text-2xl text-black dark:text-white flex items-center gap-2">
              <span>✍️</span> Story Premise
            </h3>
            <span className="text-xs font-mono font-bold text-zinc-700 dark:text-zinc-300">Draft 2.0 (Ollama)</span>
          </div>

          {/* Premise Textarea */}
          <div className="sketch-box p-3 bg-zinc-50 dark:bg-zinc-900/80">
            <textarea
              name="premise"
              value={form.premise}
              onChange={handleChange}
              rows={4}
              required
              placeholder="Describe your story idea here..."
              className="w-full bg-transparent focus:outline-none text-black dark:text-white text-lg font-handwriting resize-none leading-relaxed font-bold"
            />
            <div className="flex justify-between items-center text-xs font-mono font-bold border-t border-zinc-300 dark:border-zinc-700 pt-2 mt-1 text-zinc-800 dark:text-zinc-200">
              <span>Unique storyboard seed generated on submission</span>
              <span className="text-blue-700 dark:text-blue-400 font-bold">{form.premise.length} characters</span>
            </div>
          </div>

          {/* Dropdowns row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono text-xs">
            <div>
              <label className="block font-bold font-sketch text-lg text-black dark:text-white uppercase mb-1.5">Genre</label>
              <select
                name="genre"
                value={form.genre}
                onChange={handleChange}
                className="w-full sketch-box-sm p-2.5 bg-white dark:bg-zinc-800 text-black dark:text-white font-handwriting text-base font-bold focus:outline-none cursor-pointer"
              >
                <option value="Fantasy (Dark/High)">Fantasy (Dark/High)</option>
                <option value="Sci-Fi (Cyberpunk)">Sci-Fi (Cyberpunk)</option>
                <option value="Sci-Fi (Space Opera)">Sci-Fi (Space Opera)</option>
                <option value="Mystery (Cozy)">Mystery (Cozy)</option>
                <option value="Thriller (Psychological)">Thriller (Psychological)</option>
                <option value="Romance (Historical)">Romance (Historical)</option>
              </select>
            </div>

            <div>
              <label className="block font-bold font-sketch text-lg text-black dark:text-white uppercase mb-1.5">Tone</label>
              <select
                name="tone"
                value={form.tone}
                onChange={handleChange}
                className="w-full sketch-box-sm p-2.5 bg-white dark:bg-zinc-800 text-black dark:text-white font-handwriting text-base font-bold focus:outline-none cursor-pointer"
              >
                <option value="Epic & Mythic">Epic & Mythic</option>
                <option value="Gritty & Tense">Gritty & Tense</option>
                <option value="Whimsical & Clever">Whimsical & Clever</option>
                <option value="Melancholic & Dark">Melancholic & Dark</option>
                <option value="Heroic & Grand">Heroic & Grand</option>
              </select>
            </div>
          </div>

          {/* Target Chapters Slider */}
          <div className="sketch-box p-4 bg-zinc-50 dark:bg-zinc-900/80 space-y-2">
            <div className="flex justify-between items-center font-mono text-xs">
              <label className="font-bold font-sketch text-lg text-black dark:text-white uppercase">Target Chapters:</label>
              <span className="sketch-box-sm bg-black dark:bg-white text-white dark:text-black font-mono font-bold px-3 py-1 text-sm">
                {form.num_chapters} Chapters
              </span>
            </div>

            <input
              type="range"
              name="num_chapters"
              min="3"
              max="24"
              step="1"
              value={form.num_chapters}
              onChange={handleChange}
              className="w-full accent-blue-600 cursor-pointer"
            />

            <div className="flex justify-between text-xs font-mono font-bold text-zinc-800 dark:text-zinc-200">
              <span>3 (Novella)</span>
              <span>10 (Standard)</span>
              <span>24 (Epic Saga)</span>
            </div>
          </div>

          {/* Characters Input */}
          <div>
            <label className="block font-sketch font-bold text-lg text-black dark:text-white uppercase mb-1.5">
              Protagonists & Antagonists
            </label>
            <input
              type="text"
              name="characters"
              value={form.characters}
              onChange={handleChange}
              placeholder="e.g. Sir Aldric (disgraced knight), Princess Lyra"
              className="w-full sketch-box-sm p-2.5 text-base text-black dark:text-white bg-white dark:bg-zinc-800 focus:outline-none font-handwriting font-bold"
            />
            <p className="text-xs font-mono font-bold text-zinc-700 dark:text-zinc-300 mt-1">
              Seeded into sequential continuity chains for descriptive expansion.
            </p>
          </div>

          {/* Ollama Infrastructure Accordion */}
          <div className="border-2 border-black dark:border-white rounded-lg overflow-hidden">
            <button
              type="button"
              onClick={() => setShowLoraParams(!showLoraParams)}
              className="w-full p-2.5 bg-zinc-100 dark:bg-zinc-800 flex items-center justify-between text-xs font-mono font-bold text-black dark:text-white hover:bg-zinc-200 dark:hover:bg-zinc-700 transition"
            >
              <span className="flex items-center gap-1.5 font-sketch text-lg">
                <Network className="w-4 h-4 text-blue-600 dark:text-blue-400" /> OLLAMA NODE & SAMPLING PARAMS
              </span>
              {showLoraParams ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>

            {showLoraParams && (
              <div className="p-3 bg-zinc-50 dark:bg-zinc-900 space-y-3 font-mono text-xs border-t-2 border-black dark:border-white">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-black dark:text-white">Ollama Host</label>
                    <input
                      type="text"
                      name="ollama_host"
                      value={form.ollama_host}
                      onChange={handleChange}
                      className="w-full sketch-box-sm p-1.5 text-xs bg-white dark:bg-zinc-800 text-black dark:text-white font-bold"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-black dark:text-white">Ollama Model</label>
                    <input
                      type="text"
                      name="ollama_model"
                      value={form.ollama_model}
                      onChange={handleChange}
                      className="w-full sketch-box-sm p-1.5 text-xs bg-white dark:bg-zinc-800 text-black dark:text-white font-bold"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-1 border-t border-zinc-300 dark:border-zinc-700">
                  <div>
                    <label className="block text-xs font-bold text-black dark:text-white">Temp: {form.temperature}</label>
                    <input
                      type="range"
                      name="temperature"
                      min="0.1"
                      max="1.5"
                      step="0.05"
                      value={form.temperature}
                      onChange={handleChange}
                      className="w-full accent-blue-600"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-black dark:text-white">Top P: {form.top_p}</label>
                    <input
                      type="range"
                      name="top_p"
                      min="0.1"
                      max="1.0"
                      step="0.05"
                      value={form.top_p}
                      onChange={handleChange}
                      className="w-full accent-blue-600"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Big CTA Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full sketch-box-lg bg-blue-600 hover:bg-blue-700 text-white font-sketch font-bold text-2xl py-3.5 px-4 flex items-center justify-center gap-2 shadow-[5px_5px_0px_0px_#000000] dark:shadow-[5px_5px_0px_0px_#38bdf8] hover:translate-x-[-1px] hover:translate-y-[-1px] transition active:translate-x-[2px] active:translate-y-[2px]"
          >
            {loading ? (
              <>
                <span className="w-5 h-5 border-3 border-white border-t-transparent rounded-full animate-spin"></span>
                RUNNING DISTRIBUTED OLLAMA CHAIN...
              </>
            ) : (
              <>
                <Sparkles className="w-6 h-6 text-yellow-300" />
                WEAVE UNIQUE STORYBOARD
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
