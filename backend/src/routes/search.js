import express from 'express';
import Video from '../models/Video.js';
import Music from '../models/Music.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const { q, type = 'all', page = 1, limit = 20 } = req.query;

    if (!q) {
      return res.status(400).json({ message: 'Search query is required' });
    }

    let results = {
      videos: [],
      music: [],
      total: 0
    };

    const searchQuery = { $text: { $search: q }, isActive: true };

    if (type === 'all' || type === 'videos') {
      const videos = await Video.find(searchQuery)
        .populate('uploadedBy', 'name')
        .sort({ score: { $meta: 'textScore' } })
        .limit(type === 'all' ? 10 : limit * 1)
        .skip(type === 'all' ? 0 : (page - 1) * limit);

      results.videos = videos;
    }

    if (type === 'all' || type === 'music') {
      const music = await Music.find(searchQuery)
        .populate('uploadedBy', 'name')
        .sort({ score: { $meta: 'textScore' } })
        .limit(type === 'all' ? 10 : limit * 1)
        .skip(type === 'all' ? 0 : (page - 1) * limit);

      results.music = music;
    }

    results.total = results.videos.length + results.music.length;

    res.json(results);
  } catch (error) {
    console.error('Search error:', error);
    res.status(500).json({ message: 'Server error during search' });
  }
});

router.get('/suggestions', async (req, res) => {
  try {
    const { q } = req.query;

    if (!q || q.length < 2) {
      return res.json({ suggestions: [] });
    }

    const videoSuggestions = await Video.find(
      { 
        title: { $regex: q, $options: 'i' }, 
        isActive: true 
      },
      { title: 1, _id: 1 }
    ).limit(5);

    const musicSuggestions = await Music.find(
      { 
        title: { $regex: q, $options: 'i' }, 
        isActive: true 
      },
      { title: 1, artist: 1, _id: 1 }
    ).limit(5);

    const suggestions = [
      ...videoSuggestions.map(v => ({ 
        id: v._id, 
        title: v.title, 
        type: 'video' 
      })),
      ...musicSuggestions.map(m => ({ 
        id: m._id, 
        title: `${m.title} - ${m.artist}`, 
        type: 'music' 
      }))
    ];

    res.json({ suggestions });
  } catch (error) {
    console.error('Search suggestions error:', error);
    res.status(500).json({ message: 'Server error during search suggestions' });
  }
});

export default router;
