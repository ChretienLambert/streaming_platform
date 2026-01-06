import { useState } from 'react';
import { Search, Plus, Edit2, Trash2, Film, Music, Image as ImageIcon } from 'lucide-react';
import Loader from '../../components/common/Loader';
import ContentModal from '../../components/admin/ContentModal';

const mockData = {
  video: [
    { id: 1, title: "Dune: Part Two", year: 2025, duration: "2h 46m", genre: "Sci-Fi", image: "https://image.tmdb.org/t/p/w500/8b8R8l88Qje9dn9OE8PY05Nxl1X.jpg" },
    { id: 2, title: "Oppenheimer", year: 2023, duration: "3h", genre: "Drama", image: "https://image.tmdb.org/t/p/w500/rzRb63TldOKdKykvoWg6XC0smG9.jpg" },
    { id: 3, title: "A Minecraft Movie", year: 2025, duration: "1h 45m", genre: "Adventure", image: "https://i.ebayimg.com/images/g/M9wAAOSwtWpnwrJR/s-l1600.jpg" },
    { id: 4, title: "Predator: Badlands", year: 2025, duration: "1h 55m", genre: "Action", image: "https://i.etsystatic.com/43906454/r/il/2c7318/7434310859/il_fullxfull.7434310859_82e7.jpg" },
    { id: 5, title: "The Legend of Ochi", year: 2025, duration: "1h 38m", genre: "Fantasy", image: "https://i.etsystatic.com/51274439/r/il/54af24/6745457937/il_fullxfull.6745457937_ruj2.jpg" },
  ],
  music: [
    { id: 1, title: "The Life Of A Showgirl", artist: "Taylor Swift", year: 2025, tracks: 18, image: "https://deadline.com/wp-content/uploads/2025/08/The-Life-of-A-Showgirl-Red-Champagne.jpg?w=681&h=383&crop=1" },
    { id: 2, title: "Hurry Up Tomorrow", artist: "The Weeknd", year: 2025, tracks: 14, image: "https://variety.com/wp-content/uploads/2025/01/albumcovertreatment-10-4.jpg?w=1000&h=562&crop=1" },
    { id: 3, title: "GNX", artist: "Kendrick Lamar", year: 2025, tracks: 12, image: "https://wp.dailybruin.com/images/2025/02/kendricklamarwinnertakesall.png" },
    { id: 4, title: "Cowboy Carter (Act II)", artist: "Beyoncé", year: 2025, tracks: 16, image: "https://i.guim.co.uk/img/media/5a9d4709581070c4f4e76a89d9838d492415d5ba/0_583_6926_4155/master/6926.jpg?width=465&dpr=1&s=none" },
    { id: 5, title: "The Crux", artist: "Djo", year: 2025, tracks: 10, image: "https://ourculturemag.com/wp-content/uploads/bestalbumcovers-2.webp" },
  ],
};

const ManageContent = ({ type }) => {
  // Normalize type to handle plural forms (videos → video)
  let normalizedType = type;
  if (type === 'videos') normalizedType = 'video';
  if (type === 'musics') normalizedType = 'music';

  // Safety check
  if (!normalizedType || !mockData[normalizedType]) {
    return (
      <div className="p-10 text-center">
        <p className="text-red-400 text-2xl mb-4">Error: Invalid content type "{type}"</p>
        <p className="text-gray-400 mb-8">
          Please access this page through the <strong>Admin Sidebar</strong>.
        </p>
        <a
          href="/admin"
          className="inline-block px-8 py-4 bg-gradient-to-r from-red-600 to-purple-600 rounded-xl hover:from-red-700 hover:to-purple-700 transition shadow-lg"
        >
          Go to Dashboard
        </a>
      </div>
    );
  }

  const [items, setItems] = useState(mockData[normalizedType]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [loading, setLoading] = useState(false);

  const isVideo = normalizedType === 'video';
  const title = isVideo ? 'Videos' : 'Music';
  const Icon = isVideo ? Film : Music;

  const filteredItems = items.filter((item) =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (item.artist && item.artist.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (item.genre && item.genre.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleDelete = (id) => {
    if (confirm(`Delete this ${isVideo ? 'video' : 'music item'}?`)) {
      setLoading(true);
      setTimeout(() => {
        setItems(items.filter((i) => i.id !== id));
        setLoading(false);
      }, 400);
    }
  };

  const handleSave = (data) => {
    setLoading(true);
    setTimeout(() => {
      if (editingItem) {
        setItems(items.map((i) => (i.id === editingItem.id ? { ...i, ...data } : i)));
      } else {
        setItems([...items, { id: Date.now(), ...data }]);
      }
      setShowModal(false);
      setEditingItem(null);
      setLoading(false);
    }, 600);
  };

  if (loading) return <Loader />;

  return (
    <div className="p-6 lg:p-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
        <div className="flex items-center gap-4">
          <div className={`p-3 rounded-xl bg-gradient-to-br ${isVideo ? 'from-red-500 to-orange-500' : 'from-purple-500 to-pink-500'}`}>
            <Icon size={32} className="text-white" />
          </div>
          <div>
            <h1 className="text-4xl font-bold text-white">Manage {title}</h1>
            <p className="text-gray-400">Total: {items.length} items</p>
          </div>
        </div>

        <button
          onClick={() => {
            setEditingItem(null);
            setShowModal(true);
          }}
          className={`flex items-center gap-3 px-6 py-4 rounded-xl font-semibold transition-all hover:scale-105 shadow-lg text-white ${
            isVideo
              ? 'bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700'
              : 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700'
          }`}
        >
          <Plus size={24} />
          Add New {isVideo ? 'Video' : 'Music'}
        </button>
      </div>

      {/* Search */}
      <div className="mb-8">
        <div className="relative max-w-md">
          <Search size={20} className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-500" />
          <input
            type="text"
            placeholder={`Search ${title.toLowerCase()} by title${!isVideo ? ', artist' : ''}...`}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-14 pr-6 py-4 bg-gray-800 rounded-xl focus:outline-none focus:ring-4 focus:ring-red-600/30 transition"
          />
        </div>
      </div>

      {/* Desktop Table */}
      <div className="hidden md:block bg-gray-800/50 backdrop-blur rounded-2xl overflow-hidden border border-gray-700">
        <table className="w-full">
          <thead className="bg-gray-900/80">
            <tr>
              <th className="text-left p-6">Preview</th>
              <th className="text-left p-6">Title</th>
              {!isVideo && <th className="text-left p-6">Artist</th>}
              <th className="text-left p-6">Year</th>
              <th className="text-left p-6">{isVideo ? 'Duration / Genre' : 'Tracks'}</th>
              <th className="text-right p-6">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredItems.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center py-12 text-gray-500">
                  No items found
                </td>
              </tr>
            ) : (
              filteredItems.map((item) => (
                <tr key={item.id} className="border-t border-gray-700 hover:bg-gray-800/30 transition">
                  <td className="p-6">
                    {item.image ? (
                      <img src={item.image} alt={item.title} className="w-20 h-20 object-cover rounded-lg" />
                    ) : (
                      <div className="w-20 h-20 bg-gray-700 rounded-lg flex items-center justify-center">
                        <ImageIcon size={28} className="text-gray-500" />
                      </div>
                    )}
                  </td>
                  <td className="p-6 font-semibold">{item.title}</td>
                  {!isVideo && <td className="p-6">{item.artist || '-'}</td>}
                  <td className="p-6">{item.year || '-'}</td>
                  <td className="p-6 text-gray-300">
                    {isVideo ? `${item.duration || '-'} • ${item.genre || '-'}` : item.tracks || '-'}
                  </td>
                  <td className="p-6 text-right">
                    <button
                      onClick={() => {
                        setEditingItem(item);
                        setShowModal(true);
                      }}
                      className="text-blue-400 hover:text-blue-300 mr-6"
                    >
                      <Edit2 size={20} />
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="text-red-400 hover:text-red-300"
                    >
                      <Trash2 size={20} />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden grid grid-cols-1 sm:grid-cols-2 gap-6">
        {filteredItems.length === 0 ? (
          <p className="col-span-2 text-center text-gray-500 py-12">No items found</p>
        ) : (
          filteredItems.map((item) => (
            <div key={item.id} className="bg-gray-800/50 backdrop-blur rounded-2xl p-6 border border-gray-700">
              <div className="flex gap-4">
                {item.image ? (
                  <img src={item.image} alt={item.title} className="w-24 h-24 object-cover rounded-lg flex-shrink-0" />
                ) : (
                  <div className="w-24 h-24 bg-gray-700 rounded-lg flex items-center justify-center flex-shrink-0">
                    <ImageIcon size={32} className="text-gray-500" />
                  </div>
                )}
                <div className="flex-1">
                  <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                  {!isVideo && <p className="text-gray-400 mb-1">{item.artist}</p>}
                  <p className="text-sm text-gray-500">
                    {item.year} • {isVideo ? item.duration : `${item.tracks} tracks`}
                  </p>
                  {isVideo && <p className="text-sm text-gray-500 mt-1">{item.genre}</p>}
                </div>
              </div>
              <div className="flex justify-end gap-4 mt-6">
                <button
                  onClick={() => {
                    setEditingItem(item);
                    setShowModal(true);
                  }}
                  className="p-3 bg-gray-700 rounded-lg hover:bg-gray-600 transition"
                >
                  <Edit2 size={20} className="text-blue-400" />
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="p-3 bg-gray-700 rounded-lg hover:bg-red-900/30 transition"
                >
                  <Trash2 size={20} className="text-red-400" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {showModal && (
        <ContentModal
          type={normalizedType}
          data={editingItem}
          onSave={handleSave}
          onClose={() => {
            setShowModal(false);
            setEditingItem(null);
          }}
        />
      )}
    </div>
  );
};

export default ManageContent;