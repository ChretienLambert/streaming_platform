import mongoose from 'mongoose';

const musicSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
    maxlength: [200, 'Title cannot exceed 200 characters']
  },
  artist: {
    type: String,
    required: [true, 'Artist is required'],
    trim: true,
    maxlength: [100, 'Artist name cannot exceed 100 characters']
  },
  album: {
    type: String,
    trim: true,
    maxlength: [200, 'Album name cannot exceed 200 characters']
  },
  audioUrl: {
    type: String,
    required: [true, 'Audio URL is required']
  },
  coverImageUrl: {
    type: String,
    required: [true, 'Cover image URL is required']
  },
  duration: {
    type: Number,
    required: [true, 'Duration is required']
  },
  genre: [{
    type: String,
    trim: true
  }],
  releaseYear: {
    type: Number,
    min: [1900, 'Release year must be after 1900'],
    max: [new Date().getFullYear() + 10, 'Release year cannot be too far in the future']
  },
  rating: {
    type: Number,
    min: [0, 'Rating cannot be less than 0'],
    max: [10, 'Rating cannot be more than 10'],
    default: 0
  },
  plays: {
    type: Number,
    default: 0
  },
  isFeatured: {
    type: Boolean,
    default: false
  },
  isTopAlbum: {
    type: Boolean,
    default: false
  },
  isActive: {
    type: Boolean,
    default: true
  },
  uploadedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  tags: [{
    type: String,
    trim: true
  }]
}, {
  timestamps: true
});

musicSchema.index({ title: 'text', artist: 'text', album: 'text', tags: 'text' });
musicSchema.index({ artist: 1, isActive: 1 });
musicSchema.index({ isFeatured: 1, isActive: 1 });
musicSchema.index({ isTopAlbum: 1, isActive: 1 });
musicSchema.index({ plays: -1 });

export default mongoose.model('Music', musicSchema);
