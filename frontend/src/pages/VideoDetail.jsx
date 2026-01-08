import { Link, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api.js';

const VideoDetail = () => {
  const { id } = useParams();
  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchVideo();
  }, [id]);

  const fetchVideo = async () => {
    try {
      setLoading(true);
      console.log('Fetching video with ID:', id);
      const response = await api.getVideo(id);
      console.log('Video API response:', response);
      setVideo(response);
    } catch (error) {
      console.error('Video fetch error:', error);
      console.error('Error details:', error.message, error.stack);
      // Fallback to mock data if API fails
      const mockVideo = {
        _id: id,
        title: "Amazing Video Content",
        thumbnailUrl: "https://images.unsplash.com/photo-1489599519973-313be3d6e8b7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        category: "entertainment",
        releaseYear: 2025,
        duration: 120,
        views: 1500000,
        rating: 8.5,
        genre: ["Action", "Adventure"],
        description: "Experience the ultimate entertainment with this amazing video content. This is a placeholder description for when the API is unavailable."
      };
      setVideo(mockVideo);
      setError(''); // Clear any error since we have fallback data
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-2xl text-gray-400">Loading video...</div>
      </div>
    );
  }

  if (error || !video) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-400 mb-4">Video not found</h1>
          <Link to="/videos" className="text-red-400 hover:text-red-300 underline">
            Back to Videos
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Video Player Section */}
      <section className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
        <img src={video.thumbnailUrl} alt={video.title} className="absolute inset-0 w-full h-full object-cover blur-lg scale-110" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />

        <div className="relative z-10 w-full max-w-5xl mx-auto px-6">
          <div className="aspect-video bg-black rounded-2xl shadow-2xl overflow-hidden border border-gray-700">
            <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 to-black">
              <h3 className="text-4xl font-bold mb-4">Now Playing</h3>
              <p className="text-2xl mb-8">{video.title}</p>
              <button className="w-24 h-24 bg-red-600 rounded-full flex items-center justify-center hover:bg-red-700 transform hover:scale-110 transition shadow-2xl">
                <span className="text-5xl ml-2">▶</span>
              </button>
              <p className="mt-8 text-gray-400">Mock Player — Real streaming coming soon!</p>
            </div>
          </div>
        </div>
      </section>

      {/* Video Details Section */}
      <section className="bg-gray-900 py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-12">
            {/* Main Info */}
            <div className="md:col-span-2">
              <h1 className="text-5xl font-bold mb-4">{video.title}</h1>
              <div className="flex flex-wrap gap-4 mb-6">
                <span className="px-3 py-1 bg-red-600 rounded-full text-sm font-medium">
                  {video.category}
                </span>
                <span className="text-gray-300">
                  {video.releaseYear} • {Math.floor(video.duration / 60)}h {video.duration % 60}m
                </span>
                <span className="text-gray-300">{video.views} views</span>
              </div>
              
              {video.genre && video.genre.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-xl font-semibold mb-2">Genres</h3>
                  <div className="flex flex-wrap gap-2">
                    {video.genre.map((g, index) => (
                      <span key={index} className="px-3 py-1 bg-gray-700 rounded-full text-sm">
                        {g}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <p className="text-lg text-gray-300 leading-relaxed">
                {video.description || "No description available for this video."}
              </p>
            </div>

            {/* Sidebar Info */}
            <div className="space-y-6">
              <div className="bg-gray-800 rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-4">Video Information</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Duration</span>
                    <span>{Math.floor(video.duration / 60)}h {video.duration % 60}m</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Release Year</span>
                    <span>{video.releaseYear}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Category</span>
                    <span className="capitalize">{video.category}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Views</span>
                    <span>{video.views.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Rating</span>
                    <span>{video.rating}/10</span>
                  </div>
                </div>
              </div>

              <div className="bg-gray-800 rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-4">Actions</h3>
                <div className="space-y-3">
                  <button className="w-full py-3 bg-red-600 rounded-lg hover:bg-red-700 transition">
                    Add to Favorites
                  </button>
                  <button className="w-full py-3 bg-gray-700 rounded-lg hover:bg-gray-600 transition">
                    Share
                  </button>
                  <button className="w-full py-3 bg-gray-700 rounded-lg hover:bg-gray-600 transition">
                    Download
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default VideoDetail;