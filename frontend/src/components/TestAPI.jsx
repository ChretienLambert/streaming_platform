import React, { useEffect, useState } from 'react';
import api from '../services/api.js';

const TestAPI = () => {
  const [status, setStatus] = useState('Testing...');
  const [directStatus, setDirectStatus] = useState('Testing...');

  useEffect(() => {
    const testAPI = async () => {
      try {
        console.log('🔥 Starting API test...');
        const result = await api.healthCheck();
        console.log('✅ Health check result:', result);
        setStatus('✅ API Working!');
      } catch (error) {
        console.error('❌ API test failed:', error);
        setStatus('❌ API Failed: ' + error.message);
      }
    };

    const testDirectFetch = async () => {
      try {
        console.log('🔥 Starting direct fetch test...');
        const response = await fetch('http://localhost:5000/api/health');
        const result = await response.json();
        console.log('✅ Direct fetch result:', result);
        setDirectStatus('✅ Direct Fetch Working!');
      } catch (error) {
        console.error('❌ Direct fetch failed:', error);
        setDirectStatus('❌ Direct Fetch Failed: ' + error.message);
      }
    };

    testAPI();
    testDirectFetch();
  }, []);

  return (
    <div style={{ 
      position: 'fixed', 
      top: '20px', 
      right: '20px', 
      background: 'rgba(0,0,0,0.9)', 
      color: 'white', 
      padding: '15px', 
      borderRadius: '5px',
      zIndex: 9999,
      maxWidth: '300px',
      fontSize: '12px'
    }}>
      <div style={{ marginBottom: '10px' }}>API Service: {status}</div>
      <div>Direct Fetch: {directStatus}</div>
    </div>
  );
};

export default TestAPI;
