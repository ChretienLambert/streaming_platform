import { useParams, Link } from 'react-router-dom';
const MusicDetail = () => {
  const { id } = useParams();

  const allAlbums = [
    { id: 301, title: "The Life Of A Showgirl", artist: "Taylor Swift", cover: "...", isAvailable: true, tracks: 18 },
    { id: 302, title: "Hurry Up Tomorrow", artist: "The Weeknd", cover: "...", isAvailable: false },
    // ...
  ];

  const album = allAlbums.find(a => a.id === Number(id));

  if (!album) return <div className="min-h-screen flex items-center justify-center text-3xl text-gray-400">Album not found</div>;

  return (
    <>
      {album.isAvailable ? (
        /* === REAL PLAYER === */
        <section className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
          <img src={album.cover} alt={album.title} className="absolute inset-0 w-full h-full object-cover blur-lg scale-110" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />

          <div className="relative z-10 text-center px-6">
            <h3 className="text-4xl font-bold mb-4">Now Playing</h3>
            <p className="text-3xl mb-8">{album.title} — {album.artist}</p>
            <button className="w-24 h-24 bg-green-600 rounded-full flex items-center justify-center hover:bg-green-700 transform hover:scale-110 transition shadow-2xl">
              <span className="text-5xl ml-2">▶</span>
            </button>
            <p className="mt-8 text-gray-400">Mock Audio Player — Hi-Fi streaming coming soon!</p>
          </div>
        </section>
      ) : (
        /* === REDIRECT TO SPOTIFY === */
        <section className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
          <img src={album.cover} alt={album.title} className="absolute inset-0 w-full h-full object-cover blur-md" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent" />

          <div className="relative z-10 text-center px-6 max-w-4xl">
            <h2 className="text-4xl md:text-6xl font-bold mb-8 text-white">
              This album is not available on StreamHub yet
            </h2>
            <p className="text-xl md:text-2xl text-gray-300 mb-12">
              Stream it instantly on Spotify!
            </p>

            <a
              href={`https://open.spotify.com/search/${encodeURIComponent(album.title + ' ' + album.artist)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-4 px-12 py-6 bg-green-600 text-2xl font-bold rounded-full hover:bg-green-700 transform hover:scale-110 transition-all duration-300 shadow-2xl"
            >
              <span>Listen on Spotify</span>
              <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.6 0 12 0zm5.4 17.4c-.2.1-.4.1-.6 0-2.1-1.2-4.7-1.5-7.8-0.8-.4.1-.7-.1-.8-.5-.1-.4.1-.7.5-.8 3.5-.8 6.5-0.4 9 1.1.3.2.4.5.3.8zm0.9-3.2c-.2.2-.5.2-.7.1-2.4-1.4-6-1.8-8.9-1-.5.1-.9-.2-1-.7-.1-.5.2-.9.7-1 3.4-1 7.5-0.5 10.4 1.2.4.2.5.6.3 1zm1-3.4c-2.9-1.7-7.7-2.1-10.5-1.2-.6.1-1.1-.3-1.2-1-.1-.6.3-1.1 1-1.2 3.4-0.9 8.6-0.5 12 1.6.4.3.6.7.4 1.1-.2.4-.6.7-1 1z"/>
              </svg>
            </a>

            <p className="text-gray-400 mt-10 text-lg">
              Premium members get lossless audio and exclusives.{' '}
              <Link to="/subscription" className="text-purple-400 hover:text-purple-300 underline font-semibold">
                Upgrade now
              </Link>
            </p>
          </div>
        </section>
      )}

      {/* Album Info */}
      <section className="bg-gray-900 py-16">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-5xl font-bold mb-4">{album.title}</h1>
          <p className="text-3xl text-purple-300 mb-8">{album.artist}</p>
          <p className="text-xl text-gray-400">{album.tracks} tracks • {album.year}</p>
        </div>
      </section>
    </>
  );
};

export default MusicDetail;