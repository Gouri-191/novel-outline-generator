import React from 'react';
import { Sparkles } from 'lucide-react';

export default function Loader() {
  return (
    <div className="sketch-box-lg bg-white p-12 text-center space-y-4">
      <div className="relative w-16 h-16 mx-auto">
        <div className="absolute inset-0 rounded-full border-4 border-blue-600 border-t-transparent animate-spin"></div>
        <div className="absolute inset-0 flex items-center justify-center text-blue-600">
          <Sparkles className="w-6 h-6 animate-pulse" />
        </div>
      </div>
      <div>
        <h3 className="font-bold text-lg text-zinc-900 font-mono">WEAVING STORY OUTLINE...</h3>
        <p className="text-xs text-zinc-500 font-mono mt-1">
          Passing premise through Qwen2.5 4-bit LoRA dramatic act attention layers
        </p>
      </div>
    </div>
  );
}
