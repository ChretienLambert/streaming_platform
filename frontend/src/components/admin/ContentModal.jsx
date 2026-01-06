import { useState } from 'react';

const ContentModal = ({ type: initialType, data, onSave, onClose }) => {
  const [formData, setFormData] = useState(
    data || {
      type: initialType,
      title: '',
      year: '',
      duration: '',
      genre: '',
      artist: '',
      trackCount: '',
      image: '',
    }
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
      <div className="bg-gray-800 rounded-2xl p-8 w-full max-w-lg mx-4">
        <h2 className="text-3xl font-bold mb-8">
          {data ? 'Edit' : 'Add'} {formData.type === 'video' ? 'Video' : 'Music'}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Type Selector (only for new content) */}
          {!data && (
            <select
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value })}
              className="w-full px-5 py-4 bg-gray-700 rounded-lg focus:ring-4 focus:ring-red-600/50"
            >
              <option value="video">Video</option>
              <option value="music">Music</option>
            </select>
          )}

          <input
            type="text"
            placeholder="Title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="w-full px-5 py-4 bg-gray-700 rounded-lg focus:ring-4 focus:ring-red-600/50"
            required
          />

          <input
            type="number"
            placeholder="Year"
            value={formData.year}
            onChange={(e) => setFormData({ ...formData, year: e.target.value })}
            className="w-full px-5 py-4 bg-gray-700 rounded-lg"
          />

          {formData.type === 'video' ? (
            <>
              <input
                type="text"
                placeholder="Duration (e.g. 2h 46m)"
                value={formData.duration}
                onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                className="w-full px-5 py-4 bg-gray-700 rounded-lg"
              />
              <input
                type="text"
                placeholder="Genre"
                value={formData.genre}
                onChange={(e) => setFormData({ ...formData, genre: e.target.value })}
                className="w-full px-5 py-4 bg-gray-700 rounded-lg"
              />
            </>
          ) : (
            <>
              <input
                type="text"
                placeholder="Artist"
                value={formData.artist}
                onChange={(e) => setFormData({ ...formData, artist: e.target.value })}
                className="w-full px-5 py-4 bg-gray-700 rounded-lg"
              />
              <input
                type="number"
                placeholder="Track Count"
                value={formData.trackCount}
                onChange={(e) => setFormData({ ...formData, trackCount: e.target.value })}
                className="w-full px-5 py-4 bg-gray-700 rounded-lg"
              />
            </>
          )}

          <input
            type="text"
            placeholder="Image URL"
            value={formData.image}
            onChange={(e) => setFormData({ ...formData, image: e.target.value })}
            className="w-full px-5 py-4 bg-gray-700 rounded-lg"
          />

          <div className="flex gap-4">
            <button
              type="submit"
              className="flex-1 bg-red-600 py-4 rounded-lg hover:bg-red-700 transition"
            >
              Save
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-gray-700 py-4 rounded-lg hover:bg-gray-600 transition"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContentModal;