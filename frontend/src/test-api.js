import api from './services/api.js';

const testAPI = async () => {
  console.log('Testing API connectivity...');
  
  try {
    // Test basic health check
    console.log('1. Testing health endpoint...');
    const health = await api.request('/health');
    console.log('Health response:', health);
    
    // Test video endpoints
    console.log('2. Testing featured videos...');
    const featured = await api.getFeaturedVideos();
    console.log('Featured videos response:', featured);
    
    console.log('3. Testing specific video...');
    const video = await api.getVideo('695efd28e514e4f4a6974166');
    console.log('Video response:', video);
    
    // Test music endpoints
    console.log('4. Testing music albums...');
    const albums = await api.getTopAlbums();
    console.log('Albums response:', albums);
    
    console.log('5. Testing specific music...');
    const music = await api.getMusicTrack('695efd28e514e4f4a6974171');
    console.log('Music response:', music);
    
  } catch (error) {
    console.error('API test failed:', error);
  }
};

// Run test if this file is imported
testAPI();
