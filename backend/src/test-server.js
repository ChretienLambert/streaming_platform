const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 5000;

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Streaming Platform API is running (Test Mode)',
    timestamp: new Date().toISOString(),
    note: 'Running without database connection for testing'
  });
});

app.get('/api/test', (req, res) => {
  res.json({ 
    message: 'Test endpoint working!',
    timestamp: new Date().toISOString(),
    environment: 'development'
  });
});

app.post('/api/test/auth', (req, res) => {
  const { email, password } = req.body;
  res.json({
    message: 'Auth test successful',
    received: { email, password: '***' },
    token: 'test-jwt-token-' + Date.now(),
    user: {
      id: 'test-user-id',
      name: 'Test User',
      email: email,
      role: 'user'
    }
  });
});

app.get('/api/test/videos', (req, res) => {
  res.json({
    videos: [
      {
        id: 'test-video-1',
        title: 'Test Video 1',
        description: 'This is a test video',
        thumbnailUrl: 'https://via.placeholder.com/300x200?text=Video+1',
        videoUrl: '/uploads/videos/test-video.mp4',
        duration: 120,
        views: 1000,
        category: 'movie'
      },
      {
        id: 'test-video-2',
        title: 'Test Video 2',
        description: 'Another test video',
        thumbnailUrl: 'https://via.placeholder.com/300x200?text=Video+2',
        videoUrl: '/uploads/videos/test-video2.mp4',
        duration: 180,
        views: 500,
        category: 'series'
      }
    ],
    total: 2,
    currentPage: 1,
    totalPages: 1
  });
});

app.get('/api/test/music', (req, res) => {
  res.json({
    music: [
      {
        id: 'test-music-1',
        title: 'Test Song 1',
        artist: 'Test Artist',
        album: 'Test Album',
        coverImageUrl: 'https://via.placeholder.com/300x300?text=Album+1',
        audioUrl: '/uploads/audio/test-song.mp3',
        duration: 200,
        plays: 5000
      },
      {
        id: 'test-music-2',
        title: 'Test Song 2',
        artist: 'Another Artist',
        album: 'Another Album',
        coverImageUrl: 'https://via.placeholder.com/300x300?text=Album+2',
        audioUrl: '/uploads/audio/test-song2.mp3',
        duration: 180,
        plays: 3000
      }
    ],
    total: 2,
    currentPage: 1,
    totalPages: 1
  });
});

app.use('*', (req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

app.listen(PORT, () => {
  console.log(`Test server is running on port ${PORT}`);
  console.log('Available test endpoints:');
  console.log('- GET http://localhost:5000/api/health');
  console.log('- GET http://localhost:5000/api/test');
  console.log('- POST http://localhost:5000/api/test/auth');
  console.log('- GET http://localhost:5000/api/test/videos');
  console.log('- GET http://localhost:5000/api/test/music');
});
