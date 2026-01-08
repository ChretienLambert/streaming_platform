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
      // Fallback to mock data if API fails
      const mockFeaturedVideos = [
        { _id: '101', title: "Summer Blockbusters 2025", thumbnailUrl: "https://www.bu.edu/files/2025/06/summer-blockbusters_feat-crop.jpg" },
        { _id: '102', title: "Lilo & Stitch (2025)", thumbnailUrl: "https://imgc.allpostersimages.com/img/posters/disney-lilo-stitch-2025-hit-the-waves_u-l-fahuof0.jpg" },
        { _id: '103', title: "Summer Box Office Hits 2025", thumbnailUrl: "https://deadline.com/wp-content/uploads/2025/09/movie-posters.jpg?w=681&h=383&crop=1" },
        { _id: '104', title: "2025 Blockbuster Season", thumbnailUrl: "https://fashionreverie.com/wp-content/uploads/2025/06/2025_Blockbuster_Movies-e1750800115388.jpg" },
        { _id: '105', title: "Superman & More 2025", thumbnailUrl: "https://www.hollywoodinsider.com/wp-content/uploads/2025/05/The-Hollywood-Insider-2025-Summer-Blockbuster-Superman.jpg" },
        { _id: '106', title: "Summer Movies 2025", thumbnailUrl: "https://www.diversetechgeek.com/wp-content/uploads/2025/09/2025_summer_movies-1400x800.jpg" },
      ];

      const mockTrendingVideos = [
        { _id: '201', title: "Most Watched Series 2025", thumbnailUrl: "https://cdn.prod.website-files.com/630d4d1c4a462569dd189855/6883c2cdb041c2640f8e887c_Most%20Watched%20Series%E2%80%AF2025.webp" },
        { _id: '202', title: "TV & Movie Trends 2025", thumbnailUrl: "https://coolmaterial.com/wp-content/uploads/2025/02/Entertainment.jpg" },
        { _id: '203', title: "The White Lotus & Top Shows", thumbnailUrl: "https://img-s-msn-com.akamaized.net/tenant/amp/entityid/AA1S0KF4.img?w=800&h=415&q=60&m=2&f=jpg" },
        { _id: '204', title: "Hidden Gems 2025", thumbnailUrl: "https://dnm.nflximg.net/api/v6/BvVbc2Wxr2w6QuoANoSpJKEIWjQ/AAAAQWhYe14VwsMNuhoX1b3aBXfnpwCt4G9hGYZc0lkojw9Uhb1w1jrff8LcDKwKqWWEqsg_s5LtJk7B26tC3rOOACybQ3vlCKBSTsWlOqxkldMxVKyMxDeyxybumjDdFbpN3_Co1_e4gPbYlEMEsImnmvXwh5k.jpg?r=37d" },
        { _id: '205', title: "Most Watched TV Shows 2025", thumbnailUrl: "https://cdn.prod.website-files.com/630d4d1c4a462569dd189855/684b3d24f181a73d456ad40a_Most%20Watched%20TV%20Shows%202025%20.webp" },
      ];

      const mockTopAlbums = [
        { _id: '301', title: "Best Albums of 2025", artist: "Various Artists", coverImageUrl: "https://www.noripcord.com/content/images/2025/12/THE-BEST-50-ALBUMS-OF-2025.png" },
        { _id: '302', title: "NPR's Best Music 2025", artist: "Various Artists", coverImageUrl: "https://npr.brightspotcdn.com/dims3/default/strip/false/crop/3377x1900+0+0/resize/1400/quality/100/format/png/?url=http%3A%2F%2Fnpr-brightspot.s3.amazonaws.com%2Fce%2Fcb%2F15d08bb744e89d16f4595e374ed0%2F467f9e9c-57b7-44b1-84c7-b922280958d6.png" },
        { _id: '303', title: "DownBeat Best Albums 2025", artist: "Various Artists", coverImageUrl: "https://downbeat.com/images/news/_full/Best_of_Art_copy.jpg" },
        { _id: '304', title: "Most Anticipated Albums 2025", artist: "Various Artists", coverImageUrl: "https://hips.hearstapps.com/hmg-prod/images/jan-music-2025-lead-1-67911f1c66129.jpg?crop=0.6666666666666667xw:1xh;center,top&resize=1200:*" },
        { _id: '305', title: "Variety's Best Albums 2025", artist: "Various Artists", coverImageUrl: "https://variety.com/wp-content/uploads/2025/12/Best-Music-of-2025-Variety.jpg" },
        { _id: '306', title: "Best Hip-Hop Albums 2025", artist: "Various Artists", coverImageUrl: "https://www.rollingstone.com/wp-content/uploads/2025/12/Best-Hip-Hop-Albums.jpg" },
      ];

      // Try API, fallback to mock data
      try {
        const [featured, trending, albums] = await Promise.all([
          api.getFeaturedVideos(),
          api.getTrendingVideos(),
          api.getTopAlbums()
        ]);
        
        setFeaturedVideos(featured.videos || mockFeaturedVideos);
        setTrendingVideos(trending.videos || mockTrendingVideos);
        setTopAlbums(albums.music || mockTopAlbums);
      } catch (apiError) {
        console.log('API failed, using mock data:', apiError);
        setFeaturedVideos(mockFeaturedVideos);
        setTrendingVideos(mockTrendingVideos);
        setTopAlbums(mockTopAlbums);
      }
    } catch (error) {
      console.error('Home content fetch error:', error);
      // Set mock data as fallback
      setFeaturedVideos([
        { _id: '101', title: "Summer Blockbusters 2025", thumbnailUrl: "https://www.bu.edu/files/2025/06/summer-blockbusters_feat-crop.jpg" },
      ]);
      setTrendingVideos([
        { _id: '201', title: "Most Watched Series 2025", thumbnailUrl: "https://cdn.prod.website-files.com/630d4d1c4a462569dd189855/6883c2cdb041c2640f8e887c_Most%20Watched%20Series%E2%80%AF2025.webp" },
      ]);
      setTopAlbums([
        { _id: '301', title: "Best Albums of 2025", artist: "Various Artists", coverImageUrl: "https://www.noripcord.com/content/images/2025/12/THE-BEST-50-ALBUMS-OF-2025.png" },
      ]);
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
      {/* Hero Section – unchanged */}
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
            Stream the world's best movies, shows, and music — all in one place. No ads. Anytime. Anywhere.
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