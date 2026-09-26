import React from 'react';
import { Network } from 'lucide-react';

export default function ModelSpecCard() {
  return (
    <div className="sketch-box p-4 bg-zinc-50 dark:bg-zinc-900/60 font-mono text-xs text-zinc-700 dark:text-zinc-300 space-y-2 border-dashed border-2 border-zinc-400 dark:border-zinc-700">
      <div className="flex items-center justify-between border-b border-zinc-300 dark:border-zinc-700 pb-1.5">
        <span className="font-bold font-sketch text-sm uppercase flex items-center gap-1.5 text-zinc-900 dark:text-white">
          <Network className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" /> INFRASTRUCTURE SPEC
        </span>
        <span className="sketch-tape bg-amber-100 dark:bg-blue-900 text-[10px] py-0 px-2 font-sketch">OLLAMA INFRA</span>
      </div>

      <p className="text-[11px] leading-relaxed text-zinc-600 dark:text-zinc-400 font-sans">
        Connected to <span className="bg-blue-100 dark:bg-blue-950 text-blue-900 dark:text-blue-300 px-1 py-0.5 rounded font-bold font-mono">192.168.0.102:11434</span> running model{' '}
        <span className="bg-amber-100 dark:bg-amber-950 text-amber-900 dark:text-amber-300 px-1 py-0.5 rounded font-bold font-mono">gemma4:e4b</span>. Method:{' '}
        <span className="bg-emerald-100 dark:bg-emerald-950 text-emerald-900 dark:text-emerald-300 px-1 py-0.5 rounded font-bold font-mono">Distributed Blueprint + Sequential Expansion</span> to maintain infinite token continuity!
      </p>
    </div>
  );
}
