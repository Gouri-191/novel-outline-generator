import { useState } from 'react';
import Sidebar from './components/Sidebar';
import MainBoard from './components/MainBoard';
import './index.css';

function App() {
  const [theme, setTheme] = useState('light'); // strictly light or dark
  const [chapters, setChapters] = useState([]);
  const [loading, setLoading] = useState(false);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <div className={`app-container ${theme}-theme`}>
      <header className="top-bar">
        <div className="logo">NovelCraft</div>
        <div className="header-title">
          <h2>WRITER'S DRAFTING DESK</h2>
          <p className="subtitle">Star Developer: Gouri Vastava</p>
        </div>
        <button className="theme-toggle" onClick={toggleTheme}>
          Switch to {theme === 'light' ? 'Dark' : 'Light'} Theme
        </button>
      </header>
      
      <div className="workspace">
        <Sidebar 
          theme={theme} 
          setChapters={setChapters} 
          loading={loading} 
          setLoading={setLoading} 
        />
        <MainBoard 
          theme={theme} 
          chapters={chapters} 
          loading={loading} 
        />
      </div>
    </div>
  );
}

export default App;
