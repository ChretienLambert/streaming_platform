import mongoose from 'mongoose';
import Video from './models/Video.js';
import Music from './models/Music.js';
import User from './models/User.js';
import { config } from 'dotenv';

config();

const sampleVideos = [
  {
    title: "Summer Blockbusters 2025",
    description: "Experience the biggest and most exciting movies of summer 2025. Action-packed adventures, stunning visuals, and unforgettable stories await.",
    videoUrl: "https://example.com/summer-blockbusters.mp4",
    thumbnailUrl: "https://images.unsplash.com/photo-1489599519973-313be3d6e8b7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    duration: 150,
    category: "movie",
    genre: ["Action", "Adventure", "Sci-Fi"],
    releaseYear: 2025,
    rating: 8.7,
    views: 2500000,
    isFeatured: true,
    isTrending: false,
    isActive: true,
    tags: ["summer", "blockbuster", "2025", "action"]
  },
  {
    title: "Action Movies 2025",
    description: "The most thrilling action movies of 2025. Non-stop excitement, incredible stunts, and edge-of-your-seat entertainment.",
    videoUrl: "https://example.com/action-movies-2025.mp4",
    thumbnailUrl: "https://images.unsplash.com/photo-1536440136628-c8e12d77d5e4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    duration: 135,
    category: "movie",
    genre: ["Action", "Thriller"],
    releaseYear: 2025,
    rating: 8.3,
    views: 1800000,
    isFeatured: true,
    isTrending: false,
    isActive: true,
    tags: ["action", "thriller", "2025"]
  },
  {
    title: "Drama Collection 2025",
    description: "Emotionally powerful dramas that touch the heart and soul. Award-winning performances and compelling storytelling.",
    videoUrl: "https://example.com/drama-collection-2025.mp4",
    thumbnailUrl: "https://images.unsplash.com/photo-1485846174684-d8010985e7eb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    duration: 145,
    category: "movie",
    genre: ["Drama", "Romance"],
    releaseYear: 2025,
    rating: 8.9,
    views: 1200000,
    isFeatured: true,
    isTrending: false,
    isActive: true,
    tags: ["drama", "romance", "2025"]
  },
  {
    title: "Comedy Specials",
    description: "Laugh out loud with the best comedy specials of 2025. Stand-up, sketches, and hilarious moments.",
    videoUrl: "https://example.com/comedy-specials.mp4",
    thumbnailUrl: "https://images.unsplash.com/photo-1518676597929-c1db680b2cea?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    duration: 90,
    category: "movie",
    genre: ["Comedy"],
    releaseYear: 2025,
    rating: 8.1,
    views: 3200000,
    isFeatured: true,
    isTrending: false,
    isActive: true,
    tags: ["comedy", "specials", "2025"]
  },
  {
    title: "Sci-Fi Adventures",
    description: "Journey to new worlds with mind-bending science fiction adventures. Futuristic technology and alien encounters.",
    videoUrl: "https://example.com/sci-fi-adventures.mp4",
    thumbnailUrl: "https://images.unsplash.com/photo-1446776871956-20e023995bbd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    duration: 160,
    category: "movie",
    genre: ["Sci-Fi", "Adventure"],
    releaseYear: 2025,
    rating: 8.5,
    views: 2100000,
    isFeatured: true,
    isTrending: false,
    isActive: true,
    tags: ["sci-fi", "adventure", "2025"]
  },
  {
    title: "Horror Nights",
    description: "Terrifying horror movies that will keep you up all night. Psychological thrillers and supernatural encounters.",
    videoUrl: "https://example.com/horror-nights.mp4",
    thumbnailUrl: "https://images.unsplash.com/photo-1478720568477-4a37a344e0eb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    duration: 110,
    category: "movie",
    genre: ["Horror", "Thriller"],
    releaseYear: 2025,
    rating: 7.8,
    views: 1500000,
    isFeatured: true,
    isTrending: false,
    isActive: true,
    tags: ["horror", "thriller", "2025"]
  }
];

const trendingVideos = [
  {
    title: "Trending Series 1",
    description: "The most talked about series this week. Gripping storyline and amazing cast.",
    videoUrl: "https://example.com/trending-series-1.mp4",
    thumbnailUrl: "https://images.unsplash.com/photo-1594746452768-7210614fa4eb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    duration: 55,
    category: "series",
    genre: ["Drama", "Mystery"],
    releaseYear: 2025,
    rating: 9.1,
    views: 5500000,
    isFeatured: false,
    isTrending: true,
    isActive: true,
    tags: ["trending", "series", "drama", "mystery"]
  },
  {
    title: "Trending Series 2",
    description: "Viral sensation that everyone is watching. Binge-worthy entertainment.",
    videoUrl: "https://example.com/trending-series-2.mp4",
    thumbnailUrl: "https://images.unsplash.com/photo-1585900157414-701282e14885?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    duration: 48,
    category: "series",
    genre: ["Comedy", "Romance"],
    releaseYear: 2025,
    rating: 8.7,
    views: 4200000,
    isFeatured: false,
    isTrending: true,
    isActive: true,
    tags: ["trending", "series", "comedy", "romance"]
  },
  {
    title: "Trending Series 3",
    description: "Action-packed series that keeps viewers on the edge of their seats.",
    videoUrl: "https://example.com/trending-series-3.mp4",
    thumbnailUrl: "https://images.unsplash.com/photo-1535016405588-a96c5e22b77?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    duration: 52,
    category: "series",
    genre: ["Action", "Crime"],
    releaseYear: 2025,
    rating: 8.9,
    views: 3800000,
    isFeatured: false,
    isTrending: true,
    isActive: true,
    tags: ["trending", "series", "action", "crime"]
  },
  {
    title: "Trending Series 4",
    description: "Mind-bending thriller that has everyone talking. Plot twists you won't see coming.",
    videoUrl: "https://example.com/trending-series-4.mp4",
    thumbnailUrl: "https://images.unsplash.com/photo-1544947950-fa07a98f23e4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    duration: 60,
    category: "series",
    genre: ["Thriller", "Mystery"],
    releaseYear: 2025,
    rating: 9.0,
    views: 3500000,
    isFeatured: false,
    isTrending: true,
    isActive: true,
    tags: ["trending", "series", "thriller", "mystery"]
  },
  {
    title: "Trending Series 5",
    description: "Heartwarming story that has captured the hearts of millions worldwide.",
    videoUrl: "https://example.com/trending-series-5.mp4",
    thumbnailUrl: "https://images.unsplash.com/photo-1522869669789-2b78daea874d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    duration: 45,
    category: "series",
    genre: ["Drama", "Family"],
    releaseYear: 2025,
    rating: 8.6,
    views: 3100000,
    isFeatured: false,
    isTrending: true,
    isActive: true,
    tags: ["trending", "series", "drama", "family"]
  }
];

const sampleMusic = [
  {
    title: "Best Albums 2025",
    artist: "Various Artists",
    album: "Best of 2025 Collection",
    audioUrl: "https://example.com/best-albums-2025.mp3",
    coverImageUrl: "https://images.unsplash.com/photo-1493225457125-a285e92f536e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    duration: 240,
    genre: ["Pop", "Rock", "Electronic"],
    releaseYear: 2025,
    rating: 9.2,
    plays: 8900000,
    isFeatured: true,
    isTopAlbum: true,
    isActive: true,
    tags: ["2025", "best", "collection", "various"]
  },
  {
    title: "Top Hits Collection",
    artist: "Various Artists",
    album: "2025 Top Hits",
    audioUrl: "https://example.com/top-hits-collection.mp3",
    coverImageUrl: "https://images.unsplash.com/photo-1514528742617-e3ab1fdd2f1b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    duration: 180,
    genre: ["Pop", "Hip-Hop", "R&B"],
    releaseYear: 2025,
    rating: 8.8,
    plays: 7500000,
    isFeatured: true,
    isTopAlbum: true,
    isActive: true,
    tags: ["2025", "hits", "top", "various"]
  },
  {
    title: "Indie Favorites",
    artist: "Various Artists",
    album: "Indie Scene 2025",
    audioUrl: "https://example.com/indie-favorites.mp3",
    coverImageUrl: "https://images.unsplash.com/photo-1471473989661-752b83574cc2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    duration: 200,
    genre: ["Indie", "Alternative", "Rock"],
    releaseYear: 2025,
    rating: 8.5,
    plays: 4200000,
    isFeatured: true,
    isTopAlbum: true,
    isActive: true,
    tags: ["2025", "indie", "alternative", "various"]
  },
  {
    title: "Rock Classics",
    artist: "Various Artists",
    album: "Rock Legends Collection",
    audioUrl: "https://example.com/rock-classics.mp3",
    coverImageUrl: "https://images.unsplash.com/photo-1470225620780-acba849f8eb0?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    duration: 220,
    genre: ["Rock", "Classic Rock", "Metal"],
    releaseYear: 2025,
    rating: 9.0,
    plays: 6800000,
    isFeatured: true,
    isTopAlbum: true,
    isActive: true,
    tags: ["2025", "rock", "classics", "various"]
  },
  {
    title: "Electronic Mix",
    artist: "Various Artists",
    album: "Electronic Dreams 2025",
    audioUrl: "https://example.com/electronic-mix.mp3",
    coverImageUrl: "https://images.unsplash.com/photo-1470239822858-5c6edba56aa?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    duration: 190,
    genre: ["Electronic", "EDM", "Techno"],
    releaseYear: 2025,
    rating: 8.7,
    plays: 5200000,
    isFeatured: true,
    isTopAlbum: true,
    isActive: true,
    tags: ["2025", "electronic", "edm", "various"]
  },
  {
    title: "Jazz Essentials",
    artist: "Various Artists",
    album: "Jazz Masters 2025",
    audioUrl: "https://example.com/jazz-essentials.mp3",
    coverImageUrl: "https://images.unsplash.com/photo-1511379938547-c1f69419d2b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    duration: 210,
    genre: ["Jazz", "Smooth Jazz", "Bebop"],
    releaseYear: 2025,
    rating: 8.9,
    plays: 3800000,
    isFeatured: true,
    isTopAlbum: true,
    isActive: true,
    tags: ["2025", "jazz", "essentials", "various"]
  }
];

async function seedDatabase() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/streaming_platform');
    console.log('Connected to MongoDB');

    // Clear existing data
    await Video.deleteMany({});
    await Music.deleteMany({});
    await User.deleteMany({});
    console.log('Cleared existing data');

    // Create a default user
    const defaultUser = await User.create({
      name: "Admin User",
      email: "admin@streaming.com",
      password: "admin123",
      role: "admin"
    });
    console.log('Created default user:', defaultUser.email);

    // Add uploadedBy to all videos
    const allVideos = [...sampleVideos, ...trendingVideos];
    const videosWithUser = allVideos.map(video => ({
      ...video,
      uploadedBy: defaultUser._id
    }));

    // Insert sample videos
    await Video.insertMany(videosWithUser);
    console.log(`Inserted ${videosWithUser.length} videos`);

    // Insert sample music with uploadedBy
    const musicWithUser = sampleMusic.map(music => ({
      ...music,
      uploadedBy: defaultUser._id
    }));
    await Music.insertMany(musicWithUser);
    console.log(`Inserted ${musicWithUser.length} music tracks`);

    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
