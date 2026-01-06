import { useSearchParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

// Reuse mock data from Videos & Music (or import if moved to shared file)
const mockVideos = [ /* same as in Videos.jsx, with id and title */ ];
const mockMusic = [ /* same as in Music.jsx, with id, title, artist */ ];

const allContent = [
  ...mockVideos.map(v => ({ ...v, type: 'video' })),
  ...mockMusic.map(m => ({ ...m, type: 'music' }))
];

const Search = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [results, setResults] = useState({ videos: [], music: [] });

  useEffect(() => {
    if (query) {
      const lowerQuery = query.toLowerCase();
      const videoResults = mockVideos.filter(v => v.title.toLowerCase().includes(lowerQuery));
      const musicResults = mockMusic.filter(m => 
        m.title.toLowerCase().includes(lowerQuery) || 
        m.artist.toLowerCase().includes(lowerQuery)
      );
      setResults({ videos: videoResults, music: musicResults });
    }
  }, [query]);

  return (
    <div className="min-h-screen bg-gray-900 pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-6">
        <h1 className="text-4xl md:text-6xl font-bold mb-12">
          Search Results for "<span className="text-red-500">{query}</span>"
        </h1>

        {results.videos.length === 0 && results.music.length === 0 ? (
          <p className="text-2xl text-gray-400 text-center py-20">No results found. Try something else!</p>
        ) : (
          <>
            {/* Videos Results */}
            {results.videos.length > 0 && (
              <section className="mb-20">
                <h2 className="text-3xl font-bold mb-8 text-red-500">Videos & Movies</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
                  {results.videos.map((video) => (
                    <Link key={video.id} to={`/video/${video.id}`} className="group">
                      <div className="relative overflow-hidden rounded-lg shadow-2xl transform transition duration-300 group-hover:scale-110">
                        <img src={video.image} alt={video.title} className="w-full aspect-[2/3] object-cover" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 opacity-0 group-hover:opacity-100 transition p-4 flex items-end">
                          <p className="font-bold">{video.title}</p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            )}

            {/* Music Results */}
            {results.music.length > 0 && (
              <section>
                <h2 className="text-3xl font-bold mb-8 text-purple-500">Music & Albums</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
                  {results.music.map((music) => (
                    <Link key={music.id} to={`/music/${music.id}`} className="group">
                      <div className="relative overflow-hidden rounded-lg shadow-2xl transform transition duration-300 group-hover:scale-110">
                        <img src={music.image} alt={music.title} className="w-full aspect-square object-cover" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 opacity-0 group-hover:opacity-100 transition p-4 flex flex-col justify-end">
                          <p className="font-bold text-lg">{music.title}</p>
                          <p className="text-sm text-gray-300">{music.artist}</p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Search;