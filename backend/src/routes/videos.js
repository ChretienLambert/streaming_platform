import express from 'express';
import Video from '../models/Video.js';
import { auth, adminAuth } from '../middleware/auth.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const { page = 1, limit = 20, category, genre, search } = req.query;
    const query = { isActive: true };

    if (category) query.category = category;
    if (genre) query.genre = { $in: [genre] };
    if (search) {
      query.$text = { $search: search };
    }

    const videos = await Video.find(query)
      .populate('uploadedBy', 'name')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Video.countDocuments(query);

    res.json({
      videos,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    });
  } catch (error) {
    console.error('Get videos error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/featured', async (req, res) => {
  try {
    const videos = await Video.find({ isFeatured: true, isActive: true })
      .populate('uploadedBy', 'name')
      .sort({ views: -1 })
      .limit(10);

    res.json(videos);
  } catch (error) {
    console.error('Get featured videos error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/trending', async (req, res) => {
  try {
    const videos = await Video.find({ isTrending: true, isActive: true })
      .populate('uploadedBy', 'name')
      .sort({ views: -1 })
      .limit(10);

    res.json(videos);
  } catch (error) {
    console.error('Get trending videos error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const video = await Video.findById(req.params.id)
      .populate('uploadedBy', 'name');

    if (!video || !video.isActive) {
      return res.status(404).json({ message: 'Video not found' });
    }

    video.views += 1;
    await video.save();

    res.json(video);
  } catch (error) {
    console.error('Get video error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/', auth, async (req, res) => {
  try {
    const {
      title,
      description,
      videoUrl,
      thumbnailUrl,
      duration,
      category,
      genre,
      releaseYear,
      tags
    } = req.body;

    const video = new Video({
      title,
      description,
      videoUrl,
      thumbnailUrl,
      duration,
      category,
      genre,
      releaseYear,
      tags,
      uploadedBy: req.user.userId
    });

    await video.save();
    await video.populate('uploadedBy', 'name');

    res.status(201).json(video);
  } catch (error) {
    console.error('Create video error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.put('/:id', auth, async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);

    if (!video) {
      return res.status(404).json({ message: 'Video not found' });
    }

    if (video.uploadedBy.toString() !== req.user.userId && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized to update this video' });
    }

    Object.assign(video, req.body);
    await video.save();
    await video.populate('uploadedBy', 'name');

    res.json(video);
  } catch (error) {
    console.error('Update video error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.delete('/:id', auth, async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);

    if (!video) {
      return res.status(404).json({ message: 'Video not found' });
    }

    if (video.uploadedBy.toString() !== req.user.userId && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized to delete this video' });
    }

    video.isActive = false;
    await video.save();

    res.json({ message: 'Video deleted successfully' });
  } catch (error) {
    console.error('Delete video error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
