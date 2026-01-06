import { useState } from 'react';
import { Search } from 'lucide-react';
import Card from '../components/common/Card';

const categories = ["All", "Movies", "TV Shows", "New Releases", "Action", "Drama", "Comedy", "Sci-Fi"];

const mockVideos = [
  { id: 1, title: "Dune: Part Two", year: 2025, duration: "2h 46m", image: "https://image.tmdb.org/t/p/w500/8b8R8l88Qje9dn9OE8PY05Nxl1X.jpg", isAvailable: true },
  { id: 2, title: "Oppenheimer", year: 2023, duration: "3h", image: "https://image.tmdb.org/t/p/w500/rzRb63TldOKdKykvoWg6XC0smG9.jpg", isAvailable: true },
  { id: 3, title: "A Minecraft Movie", year: 2025, duration: "1h 45m", image: "https://i.ebayimg.com/images/g/M9wAAOSwtWpnwrJR/s-l1600.jpg", isAvailable: false },
  { id: 4, title: "Predator: Badlands", year: 2025, duration: "1h 55m", image: "https://i.etsystatic.com/43906454/r/il/2c7318/7434310859/il_fullxfull.7434310859_82e7.jpg", isAvailable: true },
  { id: 5, title: "The Legend of Ochi", year: 2025, duration: "1h 38m", image: "https://i.etsystatic.com/51274439/r/il/54af24/6745457937/il_fullxfull.6745457937_ruj2.jpg", isAvailable: false },
  { id: 6, title: "Frankenstein Reimagined", year: 2025, duration: "2h 10m", image: "https://cdn.mos.cms.futurecdn.net/nW8hdHunSWbuEEzjNLfuZR.jpg", isAvailable: true },
  // Add more as needed
];

const Videos = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredVideos = mockVideos.filter(video =>
    (selectedCategory === "All" || video.genre === selectedCategory) &&
    video.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      {/* Hero Banner */}
      <section className="relative h-96 md:h-screen max-h-screen flex items-end pb-20 overflow-hidden">
        <img
          src="https://image.tmdb.org/t/p/original/8b8R8l88Qje9dn9OE8PY05Nxl1X.jpg"
          alt="Featured Video"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
          <h1 className="text-5xl md:text-7xl font-bold mb-4 bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
            Movies & TV Shows
          </h1>
          <p className="text-xl md:text-3xl text-gray-300 max-w-3xl">
            Stream the latest blockbusters, series, and classics in stunning 4K.
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
              placeholder="Search videos..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-14 pr-6 py-4 bg-gray-800 rounded-full focus:outline-none focus:ring-4 focus:ring-red-600/50 transition"
            />
          </div>

          <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-6 py-3 rounded-full font-medium transition whitespace-nowrap ${
                  selectedCategory === cat
                    ? 'bg-red-600 text-white'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Video Grid */}
      <section className="bg-gray-900 py-16">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-white">
            {searchQuery ? `Results for "${searchQuery}"` : selectedCategory}
          </h2>

          {filteredVideos.length === 0 ? (
            <p className="text-center text-2xl text-gray-500 py-20">No videos found</p>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
              {filteredVideos.map((video) => (
                <Card
                  key={video.id}
                  id={video.id}
                  title={video.title}
                  subtitle={`${video.year} • ${video.duration}`}
                  image={video.image}
                  type="video"
                  aspect="portrait"
                />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default Videos;