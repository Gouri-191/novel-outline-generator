import React, { useState } from 'react';
import { Download, Copy, RefreshCw, ChevronUp, ChevronDown, Check, BookOpen, Code, FileText } from 'lucide-react';
import DramaturgySticky from './DramaturgySticky';

export default function OutlineDisplay({ outline, onReroll }) {
  const [viewMode, setViewMode] = useState('storyboard'); // 'storyboard' | 'json' | 'markdown'
  const [copied, setCopied] = useState(false);
  const [collapsedChapters, setCollapsedChapters] = useState({});

  if (!outline) return null;

  const toggleChapter = (num) => {
    setCollapsedChapters((prev) => ({ ...prev, [num]: !prev[num] }));
  };

  const handleCopy = () => {
    let content = '';
    if (viewMode === 'json') {
      content = JSON.stringify(outline, null, 2);
    } else if (viewMode === 'markdown') {
      content = getMarkdownFormat(outline);
    } else {
      content = `${outline.title}\n${outline.logline}\n\n` +
        outline.chapters.map((c) => `CH ${c.number}: ${c.title}\n${c.summary}\n`).join('\n');
    }
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getMarkdownFormat = (data) => {
    return `# ${data.title}\n\n*${data.logline}*\n\n` +
      `**Genre:** ${data.genre} | **Tone:** ${data.tone} | **Target Words:** ${data.target_words.toLocaleString()}\n\n` +
      `---\n\n` +
      data.chapters.map((c) => (
        `### CH ${c.number.toString().padStart(2, '0')}: ${c.title} (${c.act || 'Act'})\n` +
        `**POV:** ${c.pov || 'N/A'} | **Setting:** ${c.setting || 'N/A'} | **Conflict:** ${c.conflict || 'N/A'}\n\n` +
        `${c.summary}\n\n`
      )).join('\n');
  };

  const handleExportMarkdown = () => {
    const md = getMarkdownFormat(outline);
    const blob = new Blob([md], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${outline.title.replace(/\s+/g, '_').toLowerCase()}_outline.md`;
    a.click();
  };

  return (
    <div className="sketch-box-lg bg-white dark:bg-[#141622] p-6 space-y-6">
      {/* View Switcher Header & Action Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b-4 border-black dark:border-white pb-4">
        {/* Left View Tabs */}
        <div className="flex items-center gap-1 font-sketch font-bold text-lg">
          <button
            onClick={() => setViewMode('storyboard')}
            className={`px-4 py-1 rounded-lg border-2 flex items-center gap-1.5 transition ${
              viewMode === 'storyboard'
                ? 'bg-black dark:bg-white text-white dark:text-black border-black dark:border-white shadow-[3px_3px_0px_0px_#000000] dark:shadow-[3px_3px_0px_0px_#38bdf8]'
                : 'bg-white dark:bg-zinc-800 text-black dark:text-white border-black dark:border-white hover:bg-zinc-100 dark:hover:bg-zinc-700'
            }`}
          >
            <BookOpen className="w-4 h-4" /> Storyboard
          </button>

          <button
            onClick={() => setViewMode('json')}
            className={`px-4 py-1 rounded-lg border-2 flex items-center gap-1.5 transition ${
              viewMode === 'json'
                ? 'bg-black dark:bg-white text-white dark:text-black border-black dark:border-white shadow-[3px_3px_0px_0px_#000000] dark:shadow-[3px_3px_0px_0px_#38bdf8]'
                : 'bg-white dark:bg-zinc-800 text-black dark:text-white border-black dark:border-white hover:bg-zinc-100 dark:hover:bg-zinc-700'
            }`}
          >
            <Code className="w-4 h-4" /> Raw JSON
          </button>

          <button
            onClick={() => setViewMode('markdown')}
            className={`px-4 py-1 rounded-lg border-2 flex items-center gap-1.5 transition ${
              viewMode === 'markdown'
                ? 'bg-black dark:bg-white text-white dark:text-black border-black dark:border-white shadow-[3px_3px_0px_0px_#000000] dark:shadow-[3px_3px_0px_0px_#38bdf8]'
                : 'bg-white dark:bg-zinc-800 text-black dark:text-white border-black dark:border-white hover:bg-zinc-100 dark:hover:bg-zinc-700'
            }`}
          >
            <FileText className="w-4 h-4" /> Markdown (.MD)
          </button>
        </div>

        {/* Right Toolbar Actions */}
        <div className="flex items-center gap-2 font-mono text-xs font-bold">
          <button
            onClick={handleExportMarkdown}
            className="sketch-box-sm px-3 py-1.5 bg-white dark:bg-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-700 text-black dark:text-white border-2 border-black dark:border-white flex items-center gap-1"
          >
            <Download className="w-4 h-4" /> Export
          </button>

          <button
            onClick={handleCopy}
            className="sketch-box-sm px-3 py-1.5 bg-white dark:bg-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-700 text-black dark:text-white border-2 border-black dark:border-white flex items-center gap-1"
          >
            {copied ? <Check className="w-4 h-4 text-green-600 dark:text-green-400" /> : <Copy className="w-4 h-4" />}
            {copied ? 'Copied!' : 'Copy'}
          </button>

          <button
            onClick={onReroll}
            className="sketch-box-sm px-3 py-1.5 bg-amber-300 dark:bg-amber-400 hover:bg-amber-400 text-black border-2 border-black dark:border-white flex items-center gap-1 font-bold"
          >
            <RefreshCw className="w-4 h-4" /> Reroll
          </button>
        </div>
      </div>

      {/* Main Storyboard Content View */}
      {viewMode === 'storyboard' && (
        <div className="space-y-6">
          {/* Outline Header Block */}
          <div>
            <h2 className="text-4xl font-bold tracking-wide text-black dark:text-white font-sketch">
              {outline.title}
            </h2>
            <p className="text-lg italic text-zinc-900 dark:text-zinc-100 mt-1 font-handwriting leading-relaxed font-bold">
              "{outline.logline}"
            </p>

            {/* Badges Pill Bar */}
            <div className="flex flex-wrap items-center gap-2 mt-4 font-mono text-xs font-bold">
              <span className="sketch-box-sm px-3 py-1 bg-zinc-100 dark:bg-zinc-800 text-black dark:text-white border-2 border-black dark:border-white flex items-center gap-1">
                📖 {outline.chapters.length} Chapters
              </span>
              <span className="sketch-box-sm px-3 py-1 bg-amber-100 dark:bg-amber-950 text-amber-950 dark:text-amber-200 border-2 border-black dark:border-white flex items-center gap-1">
                🎯 ~{(outline.target_words || outline.chapters.length * 8500).toLocaleString()} Target Words
              </span>
              <span className="sketch-box-sm px-3 py-1 bg-yellow-300 dark:bg-amber-400 text-black border-2 border-black dark:border-white flex items-center gap-1">
                ⚔️ {outline.genre || 'Dark Fantasy'}
              </span>
              <span className="sketch-box-sm px-3 py-1 bg-zinc-100 dark:bg-zinc-800 text-black dark:text-white border-2 border-black dark:border-white flex items-center gap-1">
                ⌛ Est. Reading: {outline.est_reading_hours || 6.2} hrs
              </span>
            </div>
          </div>

          {/* Chapter Corkboard Cards List */}
          <div className="space-y-4">
            {outline.chapters.map((ch) => {
              const isCollapsed = collapsedChapters[ch.number];
              return (
                <div
                  key={ch.number}
                  className="sketch-box p-4 bg-white dark:bg-[#191b29] transition hover:shadow-[5px_6px_0px_0px_#000000] dark:hover:shadow-[5px_6px_0px_0px_#38bdf8]"
                >
                  {/* Chapter Header Line */}
                  <div className="flex items-center justify-between border-b-2 border-zinc-200 dark:border-zinc-800 pb-2">
                    <div className="flex items-center gap-3">
                      <span className="sketch-box-sm bg-blue-600 text-white font-mono font-bold text-xs px-2.5 py-1 border-2 border-black dark:border-white">
                        CH {ch.number.toString().padStart(2, '0')}
                      </span>
                      <h3 className="font-bold text-2xl font-sketch text-black dark:text-white">{ch.title}</h3>
                    </div>

                    <div className="flex items-center gap-2 font-mono text-xs">
                      {ch.act && (
                        <span className="sketch-box-sm bg-zinc-100 dark:bg-zinc-800 text-black dark:text-white px-2.5 py-0.5 font-bold font-sketch text-base border-2 border-black dark:border-white">
                          {ch.act}
                        </span>
                      )}
                      <button
                        onClick={() => toggleChapter(ch.number)}
                        className="text-black dark:text-white p-1"
                      >
                        {isCollapsed ? <ChevronDown className="w-5 h-5" /> : <ChevronUp className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>

                  {/* Chapter Summary & Metadata */}
                  {!isCollapsed && (
                    <div className="pt-3 space-y-3">
                      <p className="text-lg text-black dark:text-white leading-relaxed font-handwriting font-bold">
                        {ch.summary}
                      </p>

                      <div className="pt-2 border-t-2 border-zinc-200 dark:border-zinc-800 text-xs font-mono font-bold text-zinc-900 dark:text-zinc-100 flex flex-wrap items-center gap-4">
                        <span>
                          <strong className="text-blue-700 dark:text-blue-400">POV:</strong> {ch.pov || 'Sir Aldric'}
                        </span>
                        <span>•</span>
                        <span>
                          <strong className="text-red-700 dark:text-red-400">Setting:</strong> {ch.setting || 'Sunken Courtyard'}
                        </span>
                        <span>•</span>
                        <span>
                          <strong className="text-black dark:text-white">Conflict:</strong> {ch.conflict || 'Honor vs Obligation'}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Yellow Sticky Note Component */}
          <DramaturgySticky note={outline.dramaturgy_note} arcStatus={outline.arc_verification || 'Pass'} />
        </div>
      )}

      {/* Raw JSON View */}
      {viewMode === 'json' && (
        <div className="sketch-box p-4 bg-zinc-950 text-green-400 font-mono text-xs overflow-x-auto rounded-lg border-2 border-black dark:border-white font-bold">
          <pre>{JSON.stringify(outline, null, 2)}</pre>
        </div>
      )}

      {/* Markdown View */}
      {viewMode === 'markdown' && (
        <div className="sketch-box p-5 bg-zinc-50 dark:bg-zinc-900 font-mono text-xs font-bold text-black dark:text-white space-y-4 whitespace-pre-wrap leading-relaxed border-2 border-black dark:border-white">
          {getMarkdownFormat(outline)}
        </div>
      )}
    </div>
  );
}
