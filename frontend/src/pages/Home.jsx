import ContentRow from '../components/common/ContentRow';
import Card from '../components/common/Card';
import React, { useState, useEffect } from 'react';
import api from '../services/api.js';

const Home = () => {
  const [featuredVideos, setFeaturedVideos] = useState([]);
  const [trendingVideos, setTrendingVideos] = useState([]);
  const [topAlbums, setTopAlbums] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchHomeContent();
  }, []);

  const fetchHomeContent = async () => {
    try {
      setLoading(true);
      
      // Fallback mock data with proper URLs
      const mockFeaturedVideos = [
        { _id: '101', title: "Summer Blockbusters 2025", thumbnailUrl: "https://images.unsplash.com/photo-1489599519973-313be3d6e8b7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
        { _id: '102', title: "Action Movies 2025", thumbnailUrl: "https://images.unsplash.com/photo-1536440136628-c8e12d77d5e4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
        { _id: '103', title: "Drama Collection 2025", thumbnailUrl: "https://images.unsplash.com/photo-1485846174684-d8010985e7eb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
        { _id: '104', title: "Comedy Specials", thumbnailUrl: "https://images.unsplash.com/photo-1518676597929-c1db680b2cea?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
        { _id: '105', title: "Sci-Fi Adventures", thumbnailUrl: "https://images.unsplash.com/photo-1446776871956-20e023995bbd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
        { _id: '106', title: "Horror Nights", thumbnailUrl: "https://images.unsplash.com/photo-1478720568477-4a37a344e0eb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
      ];

      const mockTrendingVideos = [
        { _id: '201', title: "Trending Series 1", thumbnailUrl: "https://images.unsplash.com/photo-1594746452768-7210614fa4eb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
        { _id: '202', title: "Trending Series 2", thumbnailUrl: "https://images.unsplash.com/photo-1585900157414-701282e14885?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
        { _id: '203', title: "Trending Series 3", thumbnailUrl: "https://images.unsplash.com/photo-1535016405588-a96c5e22b77?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
        { _id: '204', title: "Trending Series 4", thumbnailUrl: "https://images.unsplash.com/photo-1544947950-fa07a98f23e4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
        { _id: '205', title: "Trending Series 5", thumbnailUrl: "https://images.unsplash.com/photo-1522869669789-2b78daea874d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
      ];

      const mockTopAlbums = [
        { _id: '301', title: "Best Albums 2025", artist: "Various Artists", coverImageUrl: "https://images.unsplash.com/photo-1493225457125-a285e92f536e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" },
        { _id: '302', title: "Top Hits Collection", artist: "Various Artists", coverImageUrl: "https://images.unsplash.com/photo-1514528742617-e3ab1fdd2f1b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" },
        { _id: '303', title: "Indie Favorites", artist: "Various Artists", coverImageUrl: "https://images.unsplash.com/photo-1471473989661-752b83574cc2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" },
        { _id: '304', title: "Rock Classics", artist: "Various Artists", coverImageUrl: "https://images.unsplash.com/photo-1470225620780-acba849f8eb0?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" },
        { _id: '305', title: "Electronic Mix", artist: "Various Artists", coverImageUrl: "https://images.unsplash.com/photo-1470239822858-5c6edba56aa?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" },
        { _id: '306', title: "Jazz Essentials", artist: "Various Artists", coverImageUrl: "https://images.unsplash.com/photo-1511379938547-c1f69419d2b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" },
      ];

      // Try API, fallback to mock data
      try {
        const [featured, trending, albums] = await Promise.all([
          api.getFeaturedVideos(),
          api.getTrendingVideos(),
          api.getTopAlbums()
        ]);
        
        setFeaturedVideos(featured || mockFeaturedVideos);
        setTrendingVideos(trending || mockTrendingVideos);
        setTopAlbums(albums || mockTopAlbums);
        
        console.log('✅ Home content loaded successfully');
      } catch (apiError) {
        console.log('❌ API failed, using mock data:', apiError);
        // Always fall back to mock data if API fails
        setFeaturedVideos(mockFeaturedVideos);
        setTrendingVideos(mockTrendingVideos);
        setTopAlbums(mockTopAlbums);
      } finally {
        setLoading(false);
      }
    } catch (error) {
      console.error('Home content fetch error:', error);
      // Set mock data as fallback
      setFeaturedVideos(mockFeaturedVideos);
      setTrendingVideos(mockTrendingVideos);
      setTopAlbums(mockTopAlbums);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-2xl text-gray-400">Loading amazing content...</div>
      </div>
    );
  }

  return (
    <>
      {/* Hero Section */}
      <section className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1489599519973-313be3d6e8b7?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/90" />
        <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight">
            <span className="bg-gradient-to-r from-red-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              Unlimited Videos & Music
            </span>
          </h1>
          <p className="text-xl md:text-3xl text-gray-200 mb-10 max-w-3xl mx-auto">
            Stream world's best movies, shows, and music — all in one place. No ads. Anytime. Anywhere.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <a
              href="/signup"
              className="px-10 py-5 bg-red-600 text-xl font-semibold rounded-full hover:bg-red-700 transform hover:scale-105 transition duration-300 shadow-2xl"
            >
              Start Free Trial
            </a>
            <a
              href="/videos"
              className="px-10 py-5 bg-white/10 backdrop-blur-md text-xl font-semibold rounded-full hover:bg-white/20 border border-white/30 transform hover:scale-105 transition duration-300"
            >
              Explore Content
            </a>
          </div>
        </div>
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-8 h-12 border-2 border-white/50 rounded-full flex justify-center">
            <div className="w-1 h-4 bg-white/70 rounded-full mt-3 animate-pulse" />
          </div>
        </div>
      </section>

      {/* Content Rows Section */}
      <section className="bg-gray-900/95 -mt-32 pt-48 pb-24 relative z-20">
        <div className="max-w-7xl mx-auto">

          {/* Featured Movies */}
          <section className="mb-16">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 px-6 md:px-8">Featured Movies</h2>
            <div className="flex overflow-x-auto scrollbar-hide gap-4 px-6 md:px-8 pb-8 scroll-smooth snap-x snap-mandatory">
              {featuredVideos.map((video) => (
                <div key={video._id} className="flex-none w-48 sm:w-64 md:w-72 lg:w-80 snap-start">
                  <Card
                    id={video._id}
                    title={video.title}
                    image={video.thumbnailUrl}
                    type="video"
                    aspect="portrait"
                  />
                </div>
              ))}
            </div>
          </section>

          {/* Trending TV Shows */}
          <section className="mb-16">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 px-6 md:px-8">Trending TV Shows</h2>
            <div className="flex overflow-x-auto scrollbar-hide gap-4 px-6 md:px-8 pb-8 scroll-smooth snap-x snap-mandatory">
              {trendingVideos.map((video) => (
                <div key={video._id} className="flex-none w-48 sm:w-64 md:w-72 lg:w-80 snap-start">
                  <Card
                    id={video._id}
                    title={video.title}
                    image={video.thumbnailUrl}
                    type="video"
                    aspect="portrait"
                  />
                </div>
              ))}
            </div>
          </section>

          {/* Top Music Albums */}
          <section className="mb-16">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 px-6 md:px-8">Top Music Albums</h2>
            <div className="flex overflow-x-auto scrollbar-hide gap-4 px-6 md:px-8 pb-8 scroll-smooth snap-x snap-mandatory">
              {topAlbums.map((album) => (
                <div key={album._id} className="flex-none w-48 sm:w-64 md:w-72 lg:w-80 snap-start">
                  <Card
                    id={album._id}
                    title={album.title}
                    subtitle={album.artist}
                    image={album.coverImageUrl}
                    type="music"
                    aspect="square"
                  />
                </div>
              ))}
            </div>
          </section>

          {/* Features Section */}
          <div className="py-24 px-6">
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Why Choose StreamHub?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              
              {/* Reason 1: All-in-One Platform */}
              <div className="bg-gray-800/50 backdrop-blur-xl rounded-2xl p-10 border border-gray-700 hover:border-purple-500/50 transition-all duration-300 hover:scale-105">
                <div className="text-center mb-8">
                  <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full mb-6">
                    <span className="text-3xl">🎬🎵</span>
                  </div>
                  <h3 className="text-2xl font-bold mb-4">All-in-One Platform</h3>
                </div>
                <p className="text-gray-300 text-lg mb-6">
                  Why subscribe to multiple services? StreamHub combines premium movies, TV shows, and millions of songs in one seamless experience. Watch blockbusters and stream chart-topping albums without switching apps.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3 text-gray-400">
                    <span className="text-green-400 text-xl">✓</span>
                    <span>Unified library of video & music</span>
                  </li>
                  <li className="flex items-center gap-3 text-gray-400">
                    <span className="text-green-400 text-xl">✓</span>
                    <span>Single subscription for everything</span>
                  </li>
                  <li className="flex items-center gap-3 text-gray-400">
                    <span className="text-green-400 text-xl">✓</span>
                    <span>Cross-platform sync</span>
                  </li>
                </ul>
              </div>

              {/* Reason 2: Superior Quality */}
              <div className="bg-gray-800/50 backdrop-blur-xl rounded-2xl p-10 border border-gray-700 hover:border-purple-500/50 transition-all duration-300 hover:scale-105">
                <div className="text-center mb-8">
                  <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-full mb-6">
                    <span className="text-3xl">✨</span>
                  </div>
                  <h3 className="text-2xl font-bold mb-4">Superior Quality & Experience</h3>
                </div>
                <p className="text-gray-300 text-lg mb-6">
                  Experience entertainment like never before with 4K HDR streaming, lossless Hi-Fi audio, and zero advertisements. Our adaptive streaming ensures perfect playback on any device, any connection.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3 text-gray-400">
                    <span className="text-green-400 text-xl">✓</span>
                    <span>4K HDR & Dolby Atmos support</span>
                  </li>
                  <li className="flex items-center gap-3 text-gray-400">
                    <span className="text-green-400 text-xl">✓</span>
                    <span>Hi-Fi lossless audio streaming</span>
                  </li>
                  <li className="flex items-center gap-3 text-gray-400">
                    <span className="text-green-400 text-xl">✓</span>
                    <span>100% ad-free experience</span>
                  </li>
                </ul>
              </div>

              {/* Reason 3: Smart Features */}
              <div className="bg-gray-800/50 backdrop-blur-xl rounded-2xl p-10 border border-gray-700 hover:border-purple-500/50 transition-all duration-300 hover:scale-105">
                <div className="text-center mb-8">
                  <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-green-600 to-emerald-600 rounded-full mb-6">
                    <span className="text-3xl">🤖</span>
                  </div>
                  <h3 className="text-2xl font-bold mb-4">Smart & Personalized</h3>
                </div>
                <p className="text-gray-300 text-lg mb-6">
                  Our AI-powered recommendation engine learns your tastes to suggest content you'll love. Create family profiles, download for offline enjoyment, and enjoy seamless transitions between devices.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3 text-gray-400">
                    <span className="text-green-400 text-xl">✓</span>
                    <span>AI-powered recommendations</span>
                  </li>
                  <li className="flex items-center gap-3 text-gray-400">
                    <span className="text-green-400 text-xl">✓</span>
                    <span>Offline downloads for travel</span>
                  </li>
                  <li className="flex items-center gap-3 text-gray-400">
                    <span className="text-green-400 text-xl">✓</span>
                    <span>Up to 6 simultaneous streams</span>
                  </li>
                </ul>
              </div>

            </div>

            {/* Stats Section */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20 pt-12 border-t border-gray-700/50">
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">10M+</div>
                <div className="text-gray-400">Active Subscribers</div>
              </div>
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-2">100K+</div>
                <div className="text-gray-400">Movies & Shows</div>
              </div>
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent mb-2">80M+</div>
                <div className="text-gray-400">Songs Available</div>
              </div>
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent mb-2">190+</div>
                <div className="text-gray-400">Countries Available</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
