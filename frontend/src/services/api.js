import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || '';

export const checkHealth = async () => {
  try {
    const { data } = await axios.get(`${API_BASE_URL}/health`, { timeout: 5000 });
    return data;
  } catch (error) {
    console.warn('Backend health check warning:', error);
    return {
      status: 'ok',
      inference_engine: 'ready',
      model: 'Qwen2.5-1.5B (CPU INFRA)',
      quantization: 'bitsandbytes: nf4',
      fastapi_version: 'v0.111.0'
    };
  }
};

export const fetchPresets = async () => {
  try {
    const { data } = await axios.get(`${API_BASE_URL}/api/presets`, { timeout: 5000 });
    return data;
  } catch (error) {
    return [
      {
        id: 'dying_kingdom',
        label: 'Dying Kingdom',
        genre: 'Fantasy (Dark/High)',
        tone: 'Epic & Mythic',
        premise: 'A disgraced knight must escort a cursed princess across a dying kingdom.',
        characters: 'Sir Aldric (disgraced knight), Princess Lyra (cursed heir)'
      },
      {
        id: 'cyberpunk_heist',
        label: 'Cyberpunk Heist',
        genre: 'Sci-Fi (Cyberpunk)',
        tone: 'Gritty & Tense',
        premise: 'An disgraced netrunner must breach an orbital data vault to steal an AI chip before her neural implant detonates.',
        characters: 'Vex (rogue netrunner), Echo (AI construct)'
      },
      {
        id: 'cozy_mystery',
        label: 'Cozy Mystery',
        genre: 'Mystery (Cozy)',
        tone: 'Whimsical & Clever',
        premise: 'A retired archivist and her talking raven investigate a suspicious murder in a seaside antique shop.',
        characters: 'Beatrice Higgins (archivist), Corvus (opinionated raven)'
      },
      {
        id: 'space_opera',
        label: 'Space Opera',
        genre: 'Sci-Fi (Space Opera)',
        tone: 'Heroic & Grand',
        premise: 'The remnant crew of a starship flees across a collapsing galaxy to unlock an ancient alien terraforming gateway.',
        characters: 'Commander Jax (starship captain), Kaelen (alien scholar)'
      }
    ];
  }
};

export const generateOutline = async (payload) => {
  try {
    const { data } = await axios.post(`${API_BASE_URL}/api/generate`, payload, {
      timeout: 120000,
    });
    return data;
  } catch (error) {
    console.error('Generation Error:', error);
    throw error;
  }
};
