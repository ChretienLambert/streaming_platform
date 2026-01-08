const API_BASE_URL = '/api'; // Use relative URL for Vite proxy

console.log('🔥 API Service loaded with base URL:', API_BASE_URL, 'at', new Date().toISOString());

class ApiService {
  constructor() {
    this.baseURL = API_BASE_URL;
    // Handle localStorage availability for both browser and Node.js environments
    if (typeof window !== 'undefined') {
      this.token = localStorage.getItem('authToken');
    } else {
      this.token = null; // In Node.js/testing environment
    }
  }

  setToken(token) {
    this.token = token;
    if (token) {
      localStorage.setItem('authToken', token);
    } else {
      localStorage.removeItem('authToken');
    }
  }

  getHeaders() {
    const headers = {
      'Content-Type': 'application/json',
    };
    
    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }
    
    return headers;
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const config = {
      headers: this.getHeaders(),
      mode: 'cors',
      cache: 'no-cache',
      ...options,
    };

    console.log('🚀 Making API request:', { url, method: config.method || 'GET' });

    try {
      // Add timeout to prevent hanging requests
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout
      
      const response = await fetch(url, {
        ...config,
        signal: controller.signal,
      });
      
      clearTimeout(timeoutId);
      
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Something went wrong');
      }

      console.log('✅ API request successful:', url);
      return data;
    } catch (error) {
      console.error('❌ API Error:', error);
      console.error('❌ API Error details:', {
        url,
        method: config.method || 'GET',
        headers: config.headers,
        error: error.message,
        stack: error.stack
      });
      throw error;
    }
  }

  // Auth endpoints
  async register(userData) {
    return this.request('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  }

  async login(credentials) {
    const data = await this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
    
    if (data.token) {
      this.setToken(data.token);
    }
    
    return data;
  }

  async logout() {
    this.setToken(null);
    return this.request('/auth/logout', { method: 'POST' });
  }

  // Video endpoints
  async getVideos(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    return this.request(`/videos${queryString ? `?${queryString}` : ''}`);
  }

  async getVideo(id) {
    return this.request(`/videos/${id}`);
  }

  async getFeaturedVideos() {
    return this.request('/videos/featured');
  }

  async getTrendingVideos() {
    return this.request('/videos/trending');
  }

  async createVideo(videoData) {
    return this.request('/videos', {
      method: 'POST',
      body: JSON.stringify(videoData),
    });
  }

  async updateVideo(id, videoData) {
    return this.request(`/videos/${id}`, {
      method: 'PUT',
      body: JSON.stringify(videoData),
    });
  }

  async deleteVideo(id) {
    return this.request(`/videos/${id}`, { method: 'DELETE' });
  }

  // Music endpoints
  async getMusic(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    return this.request(`/music${queryString ? `?${queryString}` : ''}`);
  }

  async getMusicTrack(id) {
    return this.request(`/music/${id}`);
  }

  async getFeaturedMusic() {
    return this.request('/music/featured');
  }

  async getTopAlbums() {
    return this.request('/music/top-albums');
  }

  async createMusic(musicData) {
    return this.request('/music', {
      method: 'POST',
      body: JSON.stringify(musicData),
    });
  }

  async updateMusic(id, musicData) {
    return this.request(`/music/${id}`, {
      method: 'PUT',
      body: JSON.stringify(musicData),
    });
  }

  async deleteMusic(id) {
    return this.request(`/music/${id}`, { method: 'DELETE' });
  }

  // Search endpoints
  async search(query, type = 'all') {
    return this.request(`/search?q=${encodeURIComponent(query)}&type=${type}`);
  }

  async getSearchSuggestions(query) {
    return this.request(`/search/suggestions?q=${encodeURIComponent(query)}`);
  }

  // Upload endpoints
  async uploadVideo(file) {
    const formData = new FormData();
    formData.append('video', file);

    return this.request('/upload/video', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.token}`,
      },
      body: formData,
    });
  }

  async uploadAudio(file) {
    const formData = new FormData();
    formData.append('audio', file);

    return this.request('/upload/audio', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.token}`,
      },
      body: formData,
    });
  }

  async uploadImage(file) {
    const formData = new FormData();
    formData.append('image', file);

    return this.request('/upload/image', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.token}`,
      },
      body: formData,
    });
  }

  // Health check
  async healthCheck() {
    return this.request('/health');
  }
}

export default new ApiService();
