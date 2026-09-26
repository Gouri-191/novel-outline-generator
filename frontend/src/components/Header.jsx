import React from 'react';
import { BookOpen, Bookmark, Cpu, FileText, Download, User, Network, Sun, Moon } from 'lucide-react';

export default function Header({
  activeTab,
  setActiveTab,
  onExportAll,
  theme = 'light',
  toggleTheme,
  ollamaModel = 'gemma4:e4b',
  ollamaHost = '192.168.0.102'
}) {
  return (
    <header className="border-b-4 border-black dark:border-white bg-white dark:bg-[#10121d] transition-colors duration-150">
      {/* Top Banner Navigation */}
      <div className="max-w-7xl mx-auto px-4 py-3 flex flex-wrap items-center justify-between gap-4">
        {/* Logo & Subtitle */}
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-blue-600 text-white font-sketch font-bold flex items-center justify-center sketch-box-sm text-2xl border-2 border-black dark:border-white">
            NC
          </div>
          <div>
            <h1 className="font-sketch font-bold text-3xl tracking-wide text-black dark:text-white flex items-center gap-2">
              NovelCraft
              <span className="text-xs font-mono bg-blue-100 dark:bg-blue-900 text-blue-900 dark:text-blue-200 px-2 py-0.5 rounded border-2 border-black dark:border-white font-bold">
                Ollama ({ollamaModel})
              </span>
            </h1>
          </div>
        </div>

        {/* Central Tab Navigation */}
        <nav className="flex items-center gap-2 font-sketch font-bold text-lg">
          <button
            onClick={() => setActiveTab('studio')}
            className={`px-4 py-1.5 rounded-xl flex items-center gap-2 border-2 transition-all ${
              activeTab === 'studio'
                ? 'bg-amber-200 dark:bg-blue-600 text-black dark:text-white border-black dark:border-white shadow-[3px_3px_0px_0px_#000000] dark:shadow-[3px_3px_0px_0px_#38bdf8] font-bold'
                : 'border-transparent text-zinc-800 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            Story Studio
          </button>

          <button
            onClick={() => setActiveTab('saved')}
            className={`px-4 py-1.5 rounded-xl flex items-center gap-2 border-2 transition-all ${
              activeTab === 'saved'
                ? 'bg-amber-200 dark:bg-blue-600 text-black dark:text-white border-black dark:border-white shadow-[3px_3px_0px_0px_#000000] dark:shadow-[3px_3px_0px_0px_#38bdf8] font-bold'
                : 'border-transparent text-zinc-800 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800'
            }`}
          >
            <Bookmark className="w-4 h-4" />
            Saved Outlines
          </button>

          <button
            onClick={() => setActiveTab('model')}
            className={`px-4 py-1.5 rounded-xl flex items-center gap-2 border-2 transition-all ${
              activeTab === 'model'
                ? 'bg-amber-200 dark:bg-blue-600 text-black dark:text-white border-black dark:border-white shadow-[3px_3px_0px_0px_#000000] dark:shadow-[3px_3px_0px_0px_#38bdf8] font-bold'
                : 'border-transparent text-zinc-800 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800'
            }`}
          >
            <Cpu className="w-4 h-4" />
            Model Inspector
          </button>

          <button
            onClick={() => setActiveTab('docs')}
            className={`px-4 py-1.5 rounded-xl flex items-center gap-2 border-2 transition-all ${
              activeTab === 'docs'
                ? 'bg-amber-200 dark:bg-blue-600 text-black dark:text-white border-black dark:border-white shadow-[3px_3px_0px_0px_#000000] dark:shadow-[3px_3px_0px_0px_#38bdf8] font-bold'
                : 'border-transparent text-zinc-800 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800'
            }`}
          >
            <FileText className="w-4 h-4" />
            Docs & API
          </button>
        </nav>

        {/* Right Status Pill, Theme Switcher & User Avatar */}
        <div className="flex items-center gap-3">
          {/* Light/Dark Theme Switcher Toggle */}
          <button
            onClick={toggleTheme}
            title={`Switch to ${theme === 'light' ? 'Dark' : 'Light'} Mode`}
            className="sketch-box-sm p-2 bg-amber-200 dark:bg-zinc-800 text-black dark:text-amber-300 hover:scale-105 transition flex items-center justify-center cursor-pointer border-2 border-black dark:border-white"
          >
            {theme === 'light' ? <Moon className="w-5 h-5 fill-amber-500 text-black" /> : <Sun className="w-5 h-5 text-amber-300" />}
          </button>

          <div className="sketch-box-sm bg-yellow-300 dark:bg-amber-400 text-black font-mono font-bold text-xs px-3 py-1.5 flex items-center gap-1.5 border-2 border-black dark:border-white">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 animate-pulse"></span>
            OLLAMA: {ollamaModel.toUpperCase()} [ACTIVE]
          </div>

          <button
            onClick={onExportAll}
            className="sketch-box-sm bg-blue-600 text-white font-sketch font-bold text-base px-3.5 py-1 flex items-center gap-1 hover:bg-blue-700 transition"
          >
            <Download className="w-4 h-4" />
            EXPORT
          </button>

          <div className="w-9 h-9 rounded-full bg-blue-700 text-white flex items-center justify-center font-bold text-xs sketch-box-sm">
            <User className="w-4 h-4" />
          </div>
        </div>
      </div>

      {/* Secondary Tech Status Bar */}
      <div className="bg-zinc-100 dark:bg-zinc-950 border-t-2 border-black dark:border-white py-1.5 px-4 text-xs font-mono font-bold text-zinc-900 dark:text-zinc-100 flex items-center justify-between max-w-7xl mx-auto">
        <div className="flex items-center gap-2">
          <Network className="w-4 h-4 text-blue-600 dark:text-blue-400" />
          <span>OLLAMA DISTRIBUTED INFRA • MODEL: {ollamaModel} • TARGET NODE: {ollamaHost}:11434</span>
        </div>
        <div className="flex items-center gap-4">
          <span>FastAPI v0.111 • Distributed Chained Expansion</span>
          <span className="cursor-pointer hover:text-black dark:hover:text-white">×</span>
        </div>
      </div>
    </header>
  );
}
