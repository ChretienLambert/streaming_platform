import ContentRow from '../components/common/ContentRow';
import Card from '../components/common/Card';
import React from 'react';

const featuredMovies = [
  { id: 101, type: 'video', title: "Summer Blockbusters 2025", image: "https://www.bu.edu/files/2025/06/summer-blockbusters_feat-crop.jpg" },
  { id: 102, type: 'video', title: "Lilo & Stitch (2025)", image: "https://imgc.allpostersimages.com/img/posters/disney-lilo-stitch-2025-hit-the-waves_u-l-fahuof0.jpg" },
  { id: 103, type: 'video', title: "Summer Box Office Hits 2025", image: "https://deadline.com/wp-content/uploads/2025/09/movie-posters.jpg?w=681&h=383&crop=1" },
  { id: 104, type: 'video', title: "2025 Blockbuster Season", image: "https://fashionreverie.com/wp-content/uploads/2025/06/2025_Blockbuster_Movies-e1750800115388.jpg" },
  { id: 105, type: 'video', title: "Superman & More 2025", image: "https://www.hollywoodinsider.com/wp-content/uploads/2025/05/The-Hollywood-Insider-2025-Summer-Blockbuster-Superman.jpg" },
  { id: 106, type: 'video', title: "Summer Movies 2025", image: "https://www.diversetechgeek.com/wp-content/uploads/2025/09/2025_summer_movies-1400x800.jpg" },
  { id: 107, type: 'video', title: "Lilo & Stitch Hit The Waves", image: "https://m.media-amazon.com/images/I/71flAKks83L._AC_UF894,1000_QL80_.jpg" },
  { id: 108, type: 'video', title: "2025 Box Office Rebound", image: "https://media.cnn.com/api/v1/images/stellar/prod/gettyimages-2213020073.jpg?c=16x9&q=h_833,w_1480,c_fill" },
];

const trendingShows = [
  { id: 201, type: 'video', title: "Most Watched Series 2025", image: "https://cdn.prod.website-files.com/630d4d1c4a462569dd189855/6883c2cdb041c2640f8e887c_Most%20Watched%20Series%E2%80%AF2025.webp" },
  { id: 202, type: 'video', title: "TV & Movie Trends 2025", image: "https://coolmaterial.com/wp-content/uploads/2025/02/Entertainment.jpg" },
  { id: 203, type: 'video', title: "The White Lotus & Top Shows", image: "https://img-s-msn-com.akamaized.net/tenant/amp/entityid/AA1S0KF4.img?w=800&h=415&q=60&m=2&f=jpg" },
  { id: 204, type: 'video', title: "Hidden Gems 2025", image: "https://dnm.nflximg.net/api/v6/BvVbc2Wxr2w6QuoANoSpJKEIWjQ/AAAAQWhYe14VwsMNuhoX1b3aBXfnpwCt4G9hGYZc0lkojw9Uhb1w1jrff8LcDKwKqWWEqsg_s5LtJk7B26tC3rOOACybQ3vlCKBSTsWlOqxkldMxVKyMxDeyxybumjDdFbpN3_Co1_e4gPbYlEMEsImnmvXwh5k.jpg?r=37d" },
  { id: 205, type: 'video', title: "Most Watched TV Shows 2025", image: "https://cdn.prod.website-files.com/630d4d1c4a462569dd189855/684b3d24f181a73d456ad40a_Most%20Watched%20TV%20Shows%202025%20.webp" },
  { id: 206, type: 'video', title: "Pluribus (2025)", image: "https://preview.redd.it/vincent-gilligans-pluribus-2025-continues-his-trend-where-v0-9mj7c1e49v1g1.jpeg?width=1080&crop=smart&auto=webp&s=9599cf499378e074f9c2efe556861b88fdeb97e5" },
];

const topAlbums = [
  { id: 301, type: 'music', title: "Best Albums of 2025", image: "https://www.noripcord.com/content/images/2025/12/THE-BEST-50-ALBUMS-OF-2025.png" },
  { id: 302, type: 'music', title: "NPR's Best Music 2025", image: "https://npr.brightspotcdn.com/dims3/default/strip/false/crop/3377x1900+0+0/resize/1400/quality/100/format/png/?url=http%3A%2F%2Fnpr-brightspot.s3.amazonaws.com%2Fce%2Fcb%2F15d08bb744e89d16f4595e374ed0%2F467f9e9c-57b7-44b1-84c7-b922280958d6.png" },
  { id: 303, type: 'music', title: "DownBeat Best Albums 2025", image: "https://downbeat.com/images/news/_full/Best_of_Art_copy.jpg" },
  { id: 304, type: 'music', title: "Most Anticipated Albums 2025", image: "https://hips.hearstapps.com/hmg-prod/images/jan-music-2025-lead-1-67911f1c66129.jpg?crop=0.6666666666666667xw:1xh;center,top&resize=1200:*" },
  { id: 305, type: 'music', title: "Variety's Best Albums 2025", image: "https://variety.com/wp-content/uploads/2025/12/Best-Music-of-2025-Variety.jpg" },
  { id: 306, type: 'music', title: "Best Hip-Hop Albums 2025", image: "https://www.rollingstone.com/wp-content/uploads/2025/12/Best-Hip-Hop-Albums.jpg" },
];

const Home = () => {
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
        {featuredMovies.map((movie) => (
          <div key={movie.id} className="flex-none w-48 sm:w-64 md:w-72 lg:w-80 snap-start">
            <Card
              id={movie.id}
              title={movie.title}
              image={movie.image}
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
        {trendingShows.map((show) => (
          <div key={show.id} className="flex-none w-48 sm:w-64 md:w-72 lg:w-80 snap-start">
            <Card
              id={show.id}
              title={show.title}
              image={show.image}
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
          <div key={album.id} className="flex-none w-48 sm:w-64 md:w-72 lg:w-80 snap-start">
            <Card
              id={album.id}
              title={album.title}
              subtitle={album.artist || ''}
              image={album.image}
              type="music"
              aspect="square"
            />
          </div>
        ))}
      </div>
    </section>

          {/* Features Section – keep your existing three cards here */}
          <div className="py-24 px-6">
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Why Choose StreamHub?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {/* Your three feature cards */}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;