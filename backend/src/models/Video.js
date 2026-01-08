import mongoose from 'mongoose';

const videoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
    maxlength: [200, 'Title cannot exceed 200 characters']
  },
  description: {
    type: String,
    trim: true,
    maxlength: [1000, 'Description cannot exceed 1000 characters']
  },
  videoUrl: {
    type: String,
    required: [true, 'Video URL is required']
  },
  thumbnailUrl: {
    type: String,
    required: [true, 'Thumbnail URL is required']
  },
  duration: {
    type: Number,
    required: [true, 'Duration is required']
  },
  category: {
    type: String,
    enum: ['movie', 'series', 'documentary', 'short', 'other'],
    default: 'other'
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
  views: {
    type: Number,
    default: 0
  },
  isFeatured: {
    type: Boolean,
    default: false
  },
  isTrending: {
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

videoSchema.index({ title: 'text', description: 'text', tags: 'text' });
videoSchema.index({ category: 1, isActive: 1 });
videoSchema.index({ isFeatured: 1, isActive: 1 });
videoSchema.index({ isTrending: 1, isActive: 1 });
videoSchema.index({ views: -1 });

export default mongoose.model('Video', videoSchema);
