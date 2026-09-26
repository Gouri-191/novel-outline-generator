import React from 'react';
import { Network, Layers, Activity, Database, CheckCircle2 } from 'lucide-react';

export default function ModelInspector() {
  return (
    <div className="sketch-box-lg bg-white p-6 space-y-6">
      <div className="border-b-2 border-zinc-900 pb-3 flex items-center justify-between">
        <div>
          <h2 className="font-extrabold text-2xl text-zinc-900 font-sans flex items-center gap-2">
            <Network className="w-6 h-6 text-blue-600" /> Ollama Remote Infrastructure & Model Inspector
          </h2>
          <p className="text-xs font-mono text-zinc-500 mt-0.5">
            Node: http://192.168.0.102:11434 • Model: gemma4:e4b • Distributed Continuity Protocol
          </p>
        </div>

        <span className="sketch-box-sm bg-green-100 text-green-900 font-mono text-xs font-bold px-3 py-1 flex items-center gap-1.5">
          <CheckCircle2 className="w-4 h-4 text-green-700" /> NODE ACTIVE (192.168.0.102)
        </span>
      </div>

      {/* Grid Specs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
        <div className="sketch-box p-4 bg-zinc-50 space-y-2">
          <div className="flex items-center gap-1.5 font-bold text-zinc-900 border-b border-zinc-200 pb-1">
            <Layers className="w-4 h-4 text-blue-600" /> Remote Model Specs
          </div>
          <div className="space-y-1 text-zinc-600">
            <div className="flex justify-between"><span>Model ID:</span> <strong className="text-zinc-900">gemma4:e4b</strong></div>
            <div className="flex justify-between"><span>Ollama Node:</span> <strong className="text-zinc-900">192.168.0.102</strong></div>
            <div className="flex justify-between"><span>Port:</span> <strong className="text-zinc-900">11434</strong></div>
            <div className="flex justify-between"><span>Format:</span> <strong className="text-zinc-900">JSON & Text Stream</strong></div>
          </div>
        </div>

        <div className="sketch-box p-4 bg-zinc-50 space-y-2">
          <div className="flex items-center gap-1.5 font-bold text-zinc-900 border-b border-zinc-200 pb-1">
            <Database className="w-4 h-4 text-amber-600" /> Generation Strategy
          </div>
          <div className="space-y-1 text-zinc-600">
            <div className="flex justify-between"><span>Method:</span> <strong className="text-zinc-900">Distributed Two-Phase</strong></div>
            <div className="flex justify-between"><span>Phase 1:</span> <strong className="text-zinc-900">Master Blueprint</strong></div>
            <div className="flex justify-between"><span>Phase 2:</span> <strong className="text-zinc-900">Sequential Chapter Expansion</strong></div>
            <div className="flex justify-between"><span>Continuity:</span> <strong className="text-emerald-700">Memory Chained Context</strong></div>
          </div>
        </div>

        <div className="sketch-box p-4 bg-zinc-50 space-y-2">
          <div className="flex items-center gap-1.5 font-bold text-zinc-900 border-b border-zinc-200 pb-1">
            <Activity className="w-4 h-4 text-purple-600" /> Uniqueness Guarantee
          </div>
          <p className="text-[11px] text-zinc-600 leading-relaxed pt-1">
            Randomized seeds (1–1,000,000) and HSL Hashing are injected into every Phase 1 blueprint request, ensuring zero repetitive storyboards.
          </p>
        </div>
      </div>

      {/* Workflow Diagram */}
      <div className="sketch-box p-5 bg-zinc-900 text-white font-mono text-xs space-y-3">
        <h3 className="font-bold text-sm text-yellow-400 flex items-center gap-2">
          <span>⚙️</span> Distributed Two-Phase Generation Protocol Workflow
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-zinc-300 pt-2 text-[11px] leading-relaxed">
          <div className="p-3 bg-zinc-800 rounded border border-zinc-700 space-y-1">
            <strong className="text-blue-400 block text-xs">Phase 1: Master Blueprint Generation</strong>
            <p>FastAPI sends story premise to Ollama (`gemma4:e4b` @ 192.168.0.102:11434) requesting a structured JSON containing the story title, logline, acts, and chapter skeleton items.</p>
          </div>

          <div className="p-3 bg-zinc-800 rounded border border-zinc-700 space-y-1">
            <strong className="text-emerald-400 block text-xs">Phase 2: Sequential Continuity Expansion</strong>
            <p>Iterates through each chapter individually. Passes previous chapter's summary into the Ollama prompt to maintain strict narrative continuity while producing 150-200 word rich chapter outlines without hitting output token limits.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
