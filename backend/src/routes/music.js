import express from 'express';
import Music from '../models/Music.js';
import { auth, adminAuth } from '../middleware/auth.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const { page = 1, limit = 20, genre, artist, search } = req.query;
    const query = { isActive: true };

    if (genre) query.genre = { $in: [genre] };
    if (artist) query.artist = new RegExp(artist, 'i');
    if (search) {
      query.$text = { $search: search };
    }

    const music = await Music.find(query)
      .populate('uploadedBy', 'name')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Music.countDocuments(query);

    res.json({
      music,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    });
  } catch (error) {
    console.error('Get music error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/featured', async (req, res) => {
  try {
    const music = await Music.find({ isFeatured: true, isActive: true })
      .populate('uploadedBy', 'name')
      .sort({ plays: -1 })
      .limit(10);

    res.json(music);
  } catch (error) {
    console.error('Get featured music error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/top-albums', async (req, res) => {
  try {
    const music = await Music.find({ isTopAlbum: true, isActive: true })
      .populate('uploadedBy', 'name')
      .sort({ plays: -1 })
      .limit(10);

    res.json(music);
  } catch (error) {
    console.error('Get top albums error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const music = await Music.findById(req.params.id)
      .populate('uploadedBy', 'name');

    if (!music || !music.isActive) {
      return res.status(404).json({ message: 'Music not found' });
    }

    music.plays += 1;
    await music.save();

    res.json(music);
  } catch (error) {
    console.error('Get music error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/', auth, async (req, res) => {
  try {
    const {
      title,
      artist,
      album,
      audioUrl,
      coverImageUrl,
      duration,
      genre,
      releaseYear,
      tags
    } = req.body;

    const music = new Music({
      title,
      artist,
      album,
      audioUrl,
      coverImageUrl,
      duration,
      genre,
      releaseYear,
      tags,
      uploadedBy: req.user.userId
    });

    await music.save();
    await music.populate('uploadedBy', 'name');

    res.status(201).json(music);
  } catch (error) {
    console.error('Create music error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.put('/:id', auth, async (req, res) => {
  try {
    const music = await Music.findById(req.params.id);

    if (!music) {
      return res.status(404).json({ message: 'Music not found' });
    }

    if (music.uploadedBy.toString() !== req.user.userId && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized to update this music' });
    }

    Object.assign(music, req.body);
    await music.save();
    await music.populate('uploadedBy', 'name');

    res.json(music);
  } catch (error) {
    console.error('Update music error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.delete('/:id', auth, async (req, res) => {
  try {
    const music = await Music.findById(req.params.id);

    if (!music) {
      return res.status(404).json({ message: 'Music not found' });
    }

    if (music.uploadedBy.toString() !== req.user.userId && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized to delete this music' });
    }

    music.isActive = false;
    await music.save();

    res.json({ message: 'Music deleted successfully' });
  } catch (error) {
    console.error('Delete music error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
