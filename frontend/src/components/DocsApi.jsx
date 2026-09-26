import React, { useState } from 'react';
import { FileText, Copy, Check } from 'lucide-react';

export default function DocsApi() {
  const [copiedCurl, setCopiedCurl] = useState(false);

  const curlSnippet = `curl -X POST "http://localhost:8000/api/generate" \\
  -H "Content-Type: application/json" \\
  -d '{
    "premise": "A disgraced knight must escort a cursed princess across a dying kingdom.",
    "genre": "Fantasy (Dark/High)",
    "tone": "Epic & Mythic",
    "num_chapters": 10,
    "characters": "Sir Aldric (disgraced knight), Princess Lyra"
  }'`;

  const copyCurl = () => {
    navigator.clipboard.writeText(curlSnippet);
    setCopiedCurl(true);
    setTimeout(() => setCopiedCurl(false), 2000);
  };

  return (
    <div className="sketch-box-lg bg-white p-6 space-y-6">
      <div className="border-b-2 border-zinc-900 pb-3">
        <h2 className="font-extrabold text-2xl text-zinc-900 font-sans flex items-center gap-2">
          <FileText className="w-6 h-6 text-blue-600" /> REST API & Integration Documentation
        </h2>
        <p className="text-xs font-mono text-zinc-500 mt-0.5">
          FastAPI v0.111.0 Endpoint Schema & Integration Examples
        </p>
      </div>

      {/* Endpoints Table */}
      <div className="space-y-3 font-mono text-xs">
        <h3 className="font-bold text-sm text-zinc-900 uppercase">Available Endpoints</h3>
        <div className="sketch-box overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead className="bg-zinc-100 border-b border-zinc-300 font-bold text-zinc-700">
              <tr>
                <th className="p-3 border-r border-zinc-300">Method</th>
                <th className="p-3 border-r border-zinc-300">Endpoint</th>
                <th className="p-3">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200">
              <tr>
                <td className="p-3 border-r border-zinc-200 font-bold text-green-700">GET</td>
                <td className="p-3 border-r border-zinc-200 font-bold">/health</td>
                <td className="p-3 text-zinc-600">Health check & inference engine state status</td>
              </tr>
              <tr>
                <td className="p-3 border-r border-zinc-200 font-bold text-green-700">GET</td>
                <td className="p-3 border-r border-zinc-200 font-bold">/api/presets</td>
                <td className="p-3 text-zinc-600">Returns list of starter story inspiration presets</td>
              </tr>
              <tr>
                <td className="p-3 border-r border-zinc-200 font-bold text-blue-700">POST</td>
                <td className="p-3 border-r border-zinc-200 font-bold">/api/generate</td>
                <td className="p-3 text-zinc-600">Generates structured chapter-by-chapter outline JSON</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* cURL Snippet */}
      <div className="space-y-2 font-mono text-xs">
        <div className="flex justify-between items-center">
          <h3 className="font-bold text-sm text-zinc-900 uppercase">cURL Request Example</h3>
          <button
            onClick={copyCurl}
            className="sketch-box-sm px-2.5 py-1 bg-zinc-100 hover:bg-zinc-200 text-zinc-800 font-bold flex items-center gap-1"
          >
            {copiedCurl ? <Check className="w-3.5 h-3.5 text-green-600" /> : <Copy className="w-3.5 h-3.5" />}
            {copiedCurl ? 'Copied!' : 'Copy cURL'}
          </button>
        </div>

        <div className="sketch-box p-4 bg-zinc-900 text-green-400 overflow-x-auto rounded-lg">
          <pre>{curlSnippet}</pre>
        </div>
      </div>
    </div>
  );
}
