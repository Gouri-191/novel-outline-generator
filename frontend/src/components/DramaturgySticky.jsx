import React from 'react';
import { Pin } from 'lucide-react';

export default function DramaturgySticky({ note, arcStatus = 'Pass' }) {
  return (
    <div className="sticky-note p-4 text-black font-sans text-xs space-y-1.5 relative mt-6 border-3 border-black dark:border-white">
      <div className="flex items-center justify-between font-mono font-bold border-b-2 border-black/30 pb-1">
        <span className="flex items-center gap-1 font-sketch text-lg uppercase tracking-wider text-black">
          <Pin className="w-4 h-4 text-amber-900" /> LORA DRAMATURGY STICKY NOTE
        </span>
        <span className="text-xs font-mono bg-amber-300 border-2 border-black px-2.5 py-0.5 rounded font-bold text-black">
          Arc Verification: {arcStatus}
        </span>
      </div>

      <p className="text-base leading-relaxed italic font-handwriting font-bold text-black pt-1">
        {note ||
          'Character Trajectory: Aldric shifts from blind knightly duty to individualized moral guardianship. Lyra shifts from fearful self-isolation to weaponized resolve. Pacing follows classic 3-Act Campbellian departure.'}
      </p>
    </div>
  );
}
