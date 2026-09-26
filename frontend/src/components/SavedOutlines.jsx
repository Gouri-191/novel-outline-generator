import React from 'react';
import { Bookmark, Trash2, ArrowRight } from 'lucide-react';

export default function SavedOutlines({ savedList = [], onLoad, onDelete }) {
  if (savedList.length === 0) {
    return (
      <div className="sketch-box-lg bg-white dark:bg-[#1a1c26] p-12 text-center space-y-4">
        <div className="w-12 h-12 bg-amber-100 dark:bg-amber-900/50 border-2 border-zinc-900 dark:border-zinc-100 rounded-full flex items-center justify-center mx-auto text-amber-800 dark:text-amber-300 font-mono font-bold text-xl sketch-box-sm">
          <Bookmark className="w-6 h-6" />
        </div>
        <h3 className="font-bold font-sketch text-2xl text-zinc-900 dark:text-white">No Saved Outlines Yet</h3>
        <p className="text-sm font-handwriting text-zinc-500 dark:text-zinc-400 max-w-md mx-auto text-base">
          Generated story outlines will appear here. Weave a story outline in the Story Studio tab to get started!
        </p>
      </div>
    );
  }

  return (
    <div className="sketch-box-lg bg-white dark:bg-[#1a1c26] p-6 space-y-4">
      <div className="flex items-center justify-between border-b-2 border-zinc-900 dark:border-zinc-100 pb-3">
        <h2 className="font-bold font-sketch text-2xl text-zinc-900 dark:text-white flex items-center gap-2">
          <Bookmark className="w-6 h-6 text-blue-600 dark:text-blue-400" /> Saved Outlines ({savedList.length})
        </h2>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {savedList.map((item, idx) => (
          <div key={idx} className="sketch-box p-4 bg-zinc-50 dark:bg-[#151722] hover:bg-white dark:hover:bg-[#1a1c26] transition flex flex-col justify-between gap-3">
            <div>
              <div className="flex items-center justify-between">
                <h3 className="font-bold font-sketch text-xl text-zinc-900 dark:text-white">{item.title}</h3>
                <span className="sketch-box-sm bg-blue-100 dark:bg-blue-900/50 text-blue-900 dark:text-blue-300 font-mono text-[11px] px-2 py-0.5 font-bold">
                  {item.genre}
                </span>
              </div>
              <p className="text-sm italic text-zinc-600 dark:text-zinc-300 font-handwriting mt-1">"{item.logline}"</p>
              <div className="text-[11px] font-mono text-zinc-500 dark:text-zinc-400 mt-2">
                {item.chapters?.length || 0} Chapters • Est. {item.est_reading_hours || 6.2} hrs reading
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 border-t border-zinc-200 dark:border-zinc-800 pt-2 font-mono text-xs">
              <button
                onClick={() => onDelete(idx)}
                className="sketch-box-sm px-3 py-1 bg-red-100 dark:bg-red-950/60 hover:bg-red-200 dark:hover:bg-red-900 text-red-800 dark:text-red-300 font-bold flex items-center gap-1"
              >
                <Trash2 className="w-3.5 h-3.5" /> Delete
              </button>

              <button
                onClick={() => onLoad(item)}
                className="sketch-box-sm px-3 py-1 bg-blue-600 text-white hover:bg-blue-700 font-bold flex items-center gap-1 font-sketch text-sm"
              >
                Load Outline <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
