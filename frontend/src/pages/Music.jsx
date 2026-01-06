import { useState } from 'react';
import { Search } from 'lucide-react';
import Card from '../components/common/Card';

const categories = ["All", "Albums", "Artists", "Playlists", "Podcasts", "New Releases", "Hip-Hop", "Pop"];

const mockMusic = [
  { id: 1, title: "The Life Of A Showgirl", artist: "Taylor Swift", year: 2025, tracks: 18, image: "https://deadline.com/wp-content/uploads/2025/08/The-Life-of-A-Showgirl-Red-Champagne.jpg?w=681&h=383&crop=1", isAvailable: true },
  { id: 2, title: "Hurry Up Tomorrow", artist: "The Weeknd", year: 2025, tracks: 14, image: "https://variety.com/wp-content/uploads/2025/01/albumcovertreatment-10-4.jpg?w=1000&h=562&crop=1", isAvailable: false },
  { id: 3, title: "GNX", artist: "Kendrick Lamar", year: 2025, tracks: 12, image: "https://wp.dailybruin.com/images/2025/02/kendricklamarwinnertakesall.png", isAvailable: true },
  { id: 4, title: "Cowboy Carter (Act II)", artist: "Beyoncé", year: 2025, tracks: 16, image: "https://i.guim.co.uk/img/media/5a9d4709581070c4f4e76a89d9838d492415d5ba/0_583_6926_4155/master/6926.jpg?width=465&dpr=1&s=none", isAvailable: true },
  { id: 5, title: "The Crux", artist: "Djo", year: 2025, tracks: 10, image: "https://ourculturemag.com/wp-content/uploads/bestalbumcovers-2.webp", isAvailable: false },
  { id: 6, title: "Glory", artist: "Perfume Genius", year: 2025, tracks: 11, image: "https://www.wallpaper.com/sites/default/files/styles/ws_image/public/2025/12/perfume_genius_glory.jpg", isAvailable: true },
];

const Music = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredMusic = mockMusic.filter(item =>
    (selectedCategory === "All" || item.genre === selectedCategory || item.artist.toLowerCase().includes(selectedCategory.toLowerCase())) &&
    (item.title.toLowerCase().includes(searchQuery.toLowerCase()) || item.artist.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <>
      {/* Hero Banner */}
      <section className="relative h-96 md:h-screen max-h-screen flex items-end pb-20 overflow-hidden">
        <img
          src="https://deadline.com/wp-content/uploads/2025/08/The-Life-of-A-Showgirl-Red-Champagne.jpg?w=681&h=383&crop=1"
          alt="Featured Album"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
          <h1 className="text-5xl md:text-7xl font-bold mb-4 bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
            Music Library
          </h1>
          <p className="text-xl md:text-3xl text-gray-300 max-w-3xl">
            Millions of songs, albums, and curated playlists in Hi-Fi quality.
          </p>
        </div>
      </section>

      {/* Search & Categories */}
      <section className="sticky top-0 z-40 bg-black/90 backdrop-blur-md border-b border-gray-800 py-6">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row gap-6 items-center">
          <div className="relative w-full md:w-96">
            <Search size={20} className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-500" />
            <input
              type="text"
              placeholder="Search music, artists, albums..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-14 pr-6 py-4 bg-gray-800 rounded-full focus:outline-none focus:ring-4 focus:ring-purple-600/50 transition"
            />
          </div>

          <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-6 py-3 rounded-full font-medium transition whitespace-nowrap ${
                  selectedCategory === cat
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Music Grid */}
      <section className="bg-gray-900 py-16">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-white">
            {searchQuery ? `Results for "${searchQuery}"` : selectedCategory}
          </h2>

          {filteredMusic.length === 0 ? (
            <p className="text-center text-2xl text-gray-500 py-20">No music found</p>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
              {filteredMusic.map((item) => (
                <Card
                  key={item.id}
                  id={item.id}
                  title={item.title}
                  subtitle={item.artist}
                  image={item.image}
                  type="music"
                  aspect="square"
                />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default Music;