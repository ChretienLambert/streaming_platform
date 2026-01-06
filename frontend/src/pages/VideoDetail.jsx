import { useParams, Link } from 'react-router-dom';

const VideoDetail = () => {
  const { id } = useParams();

  // Find video from all sources (you can combine mock data or fetch)
  const allVideos = [
    // Pull from featuredMovies, trendingShows, etc.
    { id: 101, title: "Dune: Part Two", poster: "...", isAvailable: true, year: 2025, duration: "2h 46m", description: "..." },
    { id: 102, title: "Lilo & Stitch (2025)", poster: "...", isAvailable: false },
    // Add more
  ];

  const video = allVideos.find(v => v.id === Number(id));

  if (!video) {
    return <div className="min-h-screen flex items-center justify-center text-3xl text-gray-400">Video not found</div>;
  }

  return (
    <>
      {video.isAvailable ? (
        /* === REAL PLAYER (or mock for now) === */
        <section className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
          <img src={video.poster} alt={video.title} className="absolute inset-0 w-full h-full object-cover blur-lg scale-110" />
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
      ) : (
        /* === UNAVAILABLE → REDIRECT TO NETFLIX === */
        <section className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
          <img src={video.poster} alt={video.title} className="absolute inset-0 w-full h-full object-cover blur-md" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent" />

          <div className="relative z-10 text-center px-6 max-w-4xl">
            <h2 className="text-4xl md:text-6xl font-bold mb-8 text-white">
              This video is not available on StreamHub yet
            </h2>
            <p className="text-xl md:text-2xl text-gray-300 mb-12">
              But you can watch it right now on Netflix!
            </p>

            <a
              href={`https://www.netflix.com/search?q=${encodeURIComponent(video.title)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-4 px-12 py-6 bg-red-600 text-2xl font-bold rounded-full hover:bg-red-700 transform hover:scale-110 transition-all duration-300 shadow-2xl"
            >
              <span>Watch on Netflix</span>
              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 4H5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zM8 8l8 4-8 4V8z"/>
              </svg>
            </a>

            <p className="text-gray-400 mt-10 text-lg">
              Want more exclusive content?{' '}
              <Link to="/subscription" className="text-red-400 hover:text-red-300 underline font-semibold">
                Upgrade to Premium
              </Link>
            </p>
          </div>
        </section>
      )}

      {/* Details Section (always shown) */}
      <section className="bg-gray-900 py-16">
        <div className="max-w-7xl mx-auto px-6">
          <h1 className="text-5xl font-bold mb-4">{video.title}</h1>
          <p className="text-xl text-gray-300 mb-8">{video.year} • {video.duration}</p>
          <p className="text-lg text-gray-400 max-w-4xl">{video.description || "No description available."}</p>
        </div>
      </section>
    </>
  );
};

export default VideoDetail;