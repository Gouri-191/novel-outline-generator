import { useState } from 'react';
import ChapterCard from './ChapterCard';

function MainBoard({ theme, chapters, loading }) {
  const [activeTab, setActiveTab] = useState('storyboard');

  const handleDownload = (format) => {
    let content, type, filename;
    if (format === 'json') {
      content = JSON.stringify(chapters, null, 2);
      type = 'application/json';
      filename = 'NovelOutline.json';
    } else {
      content = chapters.map(ch => `### ${ch.title}\n**${ch.act}**\n${ch.summary}`).join('\n\n');
      type = 'text/markdown';
      filename = 'NovelOutline.md';
    }
    const blob = new Blob([content], { type });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="main-board">
      <div className="board-tabs" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', gap: '10px' }}>
          <div className={`tab ${activeTab === 'storyboard' ? 'active' : ''}`} onClick={() => setActiveTab('storyboard')}>
            Storyboard
          </div>
          <div className={`tab ${activeTab === 'raw' ? 'active' : ''}`} onClick={() => setActiveTab('raw')}>
            Raw JSON
          </div>
          <div className={`tab ${activeTab === 'markdown' ? 'active' : ''}`} onClick={() => setActiveTab('markdown')}>
            Markdown
          </div>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button 
            className="theme-toggle" 
            onClick={() => handleDownload('md')} 
            style={{ padding: '8px 15px', fontWeight: 'bold' }}
          >
            Download MD
          </button>
          <button 
            className="theme-toggle" 
            onClick={() => handleDownload('json')} 
            style={{ padding: '8px 15px', fontWeight: 'bold' }}
          >
            Download JSON
          </button>
        </div>
      </div>

      <div className="corkboard-content">
        {loading && (
          <div style={{ padding: '20px', fontSize: '1.5rem' }}>
            <p>Generating chapters... This might take a couple of minutes.</p>
          </div>
        )}
        {!loading && chapters.length === 0 && (
          <div style={{ padding: '20px', fontSize: '1.5rem', fontStyle: 'italic', opacity: 0.7 }}>
            <p>Pin a premise on the left and hit generate to see your outline.</p>
          </div>
        )}
        {!loading && chapters.length > 0 && activeTab === 'storyboard' && (
          chapters.map((ch, idx) => (
            <ChapterCard key={idx} chapter={ch} />
          ))
        )}
        {!loading && chapters.length > 0 && activeTab === 'raw' && (
          <pre style={{ background: '#fff', color: '#000', padding: '10px', border: '2px solid #000', width: '100%', overflowX: 'auto' }}>
            {JSON.stringify(chapters, null, 2)}
          </pre>
        )}
        {!loading && chapters.length > 0 && activeTab === 'markdown' && (
          <textarea 
            className="sketch-textarea" 
            style={{ width: '100%', height: '400px' }}
            readOnly
            value={chapters.map(ch => `### ${ch.title}\n**${ch.act}**\n${ch.summary}`).join('\n\n')}
          />
        )}
      </div>
    </div>
  );
}

export default MainBoard;
