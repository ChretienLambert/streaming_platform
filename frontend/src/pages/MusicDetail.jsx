import { Link, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../services/api.js';

const MusicDetail = () => {
  const { id } = useParams();
  const [music, setMusic] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchMusic();
  }, [id]);

  const fetchMusic = async () => {
    try {
      setLoading(true);
      console.log('Fetching music with ID:', id);
      const response = await api.getMusicTrack(id);
      console.log('Music API response:', response);
      setMusic(response);
    } catch (error) {
      console.error('Music fetch error:', error);
      console.error('Error details:', error.message, error.stack);
      // Fallback to mock data if API fails
      const mockMusic = {
        _id: id,
        title: "Amazing Music Album",
        artist: "Various Artists",
        album: "Best Collection 2025",
        audioUrl: "https://example.com/audio.mp3",
        coverImageUrl: "https://images.unsplash.com/photo-1493225457125-a285e92f536e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
        duration: 200,
        genre: ["Pop", "Rock"],
        releaseYear: 2025,
        rating: 8.5,
        plays: 1000000,
        description: "Experience the ultimate music collection with this amazing album."
      };
      setMusic(mockMusic);
      setError('');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-2xl text-gray-400">Loading music...</div>
      </div>
    );
  }

  if (error || !music) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-400 mb-4">Music not found</h1>
          <Link to="/music" className="text-green-400 hover:text-green-300 underline">
            Back to Music
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Music Player Section */}
      <section className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
        <img src={music.coverImageUrl} alt={music.title} className="absolute inset-0 w-full h-full object-cover blur-lg scale-110" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />

        <div className="relative z-10 w-full max-w-5xl mx-auto px-6">
          <div className="aspect-square bg-black rounded-2xl shadow-2xl overflow-hidden border border-gray-700 max-w-md mx-auto">
            <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 to-black">
              <h3 className="text-4xl font-bold mb-4">Now Playing</h3>
              <p className="text-2xl mb-8">{music.title}</p>
              <p className="text-xl mb-8 text-gray-300">{music.artist}</p>
              <button className="w-24 h-24 bg-green-600 rounded-full flex items-center justify-center hover:bg-green-700 transform hover:scale-110 transition shadow-2xl">
                <span className="text-5xl ml-2">▶</span>
              </button>
              <p className="mt-8 text-gray-400">Mock Player — Real streaming coming soon!</p>
            </div>
          </div>
        </div>
      </section>

      {/* Music Details Section */}
      <section className="bg-gray-900 py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-12">
            {/* Main Info */}
            <div className="md:col-span-2">
              <h1 className="text-5xl font-bold mb-4">{music.title}</h1>
              <div className="flex flex-wrap gap-4 mb-6">
                <span className="px-3 py-1 bg-green-600 rounded-full text-sm font-medium">
                  {music.genre?.[0] || 'Music'}
                </span>
                <span className="text-gray-300">
                  {music.releaseYear} • {Math.floor(music.duration / 60)}m {music.duration % 60}s
                </span>
                <span className="text-gray-300">{music.plays} plays</span>
              </div>
              
              {music.genre && music.genre.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-xl font-semibold mb-2">Genres</h3>
                  <div className="flex flex-wrap gap-2">
                    {music.genre.map((g, index) => (
                      <span key={index} className="px-3 py-1 bg-gray-700 rounded-full text-sm">
                        {g}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <p className="text-lg text-gray-300 leading-relaxed">
                {music.description || "No description available for this music."}
              </p>
            </div>

            {/* Sidebar Info */}
            <div className="space-y-6">
              <div className="bg-gray-800 rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-4">Music Information</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Duration</span>
                    <span>{Math.floor(music.duration / 60)}m {music.duration % 60}s</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Artist</span>
                    <span>{music.artist}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Album</span>
                    <span>{music.album || 'Single'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Release Year</span>
                    <span>{music.releaseYear}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Plays</span>
                    <span>{music.plays.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Rating</span>
                    <span>{music.rating}/10</span>
                  </div>
                </div>
              </div>

              <div className="bg-gray-800 rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-4">Actions</h3>
                <div className="space-y-3">
                  <button className="w-full py-3 bg-green-600 rounded-lg hover:bg-green-700 transition">
                    Add to Playlist
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

export default MusicDetail;