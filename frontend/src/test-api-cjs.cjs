// CommonJS test to verify API service
const api = require('./services/api.js').default;

console.log('Testing API service (CommonJS)...');
console.log('✅ API service imported:', typeof api);

// Test a simple API call
api.healthCheck()
  .then(response => {
    console.log('✅ Health check success:', response);
  })
  .catch(error => {
    console.error('❌ Health check failed:', error);
  });

console.log('API service test completed');
