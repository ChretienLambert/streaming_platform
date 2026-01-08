# Streaming Platform Backend

## Overview
This is the backend API for the streaming platform, built with Node.js, Express, and MongoDB.

## Features
- User authentication with JWT
- Video and music content management
- File upload functionality
- Media streaming endpoints
- Search functionality
- Admin panel endpoints
- Rate limiting and security

## Installation

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables:
```bash
cp .env.example .env
# Edit .env with your configuration
```

3. Start MongoDB (make sure it's running on your system)

4. Start the server:
```bash
# Development
npm run dev

# Production
npm start
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout

### Videos
- `GET /api/videos` - Get all videos with pagination
- `GET /api/videos/featured` - Get featured videos
- `GET /api/videos/trending` - Get trending videos
- `GET /api/videos/:id` - Get single video
- `POST /api/videos` - Create new video (auth required)
- `PUT /api/videos/:id` - Update video (auth required)
- `DELETE /api/videos/:id` - Delete video (auth required)

### Music
- `GET /api/music` - Get all music with pagination
- `GET /api/music/featured` - Get featured music
- `GET /api/music/top-albums` - Get top albums
- `GET /api/music/:id` - Get single music track
- `POST /api/music` - Create new music (auth required)
- `PUT /api/music/:id` - Update music (auth required)
- `DELETE /api/music/:id` - Delete music (auth required)

### Users (Admin only)
- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get single user
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Deactivate user
- `GET /api/users/stats/overview` - Get user statistics

### Upload
- `POST /api/upload/video` - Upload video file
- `POST /api/upload/audio` - Upload audio file
- `POST /api/upload/image` - Upload image file
- `POST /api/upload/multiple` - Upload multiple files

### Streaming
- `GET /api/stream/video/:filename` - Stream video file
- `GET /api/stream/audio/:filename` - Stream audio file

### Search
- `GET /api/search` - Search videos and music
- `GET /api/search/suggestions` - Get search suggestions

## Environment Variables
- `PORT` - Server port (default: 5000)
- `MONGODB_URI` - MongoDB connection string
- `JWT_SECRET` - JWT secret key
- `JWT_EXPIRE` - JWT expiration time
- `NODE_ENV` - Environment (development/production)

## File Upload Structure
```
uploads/
├── videos/
├── audio/
└── images/
```

## Security Features
- JWT authentication
- Rate limiting
- CORS configuration
- Helmet security headers
- Input validation
- File type restrictions
