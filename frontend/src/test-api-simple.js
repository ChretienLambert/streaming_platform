// Simple test to verify API service is working
console.log('Testing API service...');

// Test basic fetch availability
if (typeof fetch !== 'undefined') {
  console.log('✅ Fetch is available');
} else {
  console.log('❌ Fetch is not available');
}

// Test API service instantiation
try {
  const api = await import('./services/api.js').then(module => module.default);
  console.log('✅ API service imported');
  
  // Test a simple API call
  const result = await api.healthCheck();
  console.log('✅ Health check success:', result);
} catch (error) {
  console.error('❌ API service error:', error);
}

console.log('API service test completed');
