import React, { useEffect, useState } from 'react';

const DirectTest = () => {
  const [result, setResult] = useState('Testing...');

  useEffect(() => {
    const testConnection = async () => {
      try {
        // Try multiple approaches
        const tests = [];
        
        // Test 1: Direct fetch with explicit headers
        try {
          const response = await fetch('http://127.0.0.1:5000/api/health', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json',
            },
            mode: 'cors'
          });
          const data = await response.json();
          tests.push({ method: '127.0.0.1 Direct', status: '✅ Success', data: data.status });
        } catch (error) {
          tests.push({ method: '127.0.0.1 Direct', status: '❌ Failed', error: error.message });
        }

        // Test 2: localhost direct
        try {
          const response = await fetch('http://localhost:5000/api/health', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json',
            },
            mode: 'cors'
          });
          const data = await response.json();
          tests.push({ method: 'localhost Direct', status: '✅ Success', data: data.status });
        } catch (error) {
          tests.push({ method: 'localhost Direct', status: '❌ Failed', error: error.message });
        }

        setResult(tests);
      } catch (error) {
        setResult([{ method: 'Test Suite', status: '❌ Failed', error: error.message }]);
      }
    };

    testConnection();
  }, []);

  return (
    <div style={{ 
      position: 'fixed', 
      bottom: '20px', 
      right: '20px', 
      background: 'rgba(0,0,0,0.95)', 
      color: 'white', 
      padding: '20px', 
      borderRadius: '10px',
      zIndex: 9999,
      maxWidth: '500px',
      fontSize: '12px'
    }}>
      <h3 style={{ margin: '0 0 15px 0', color: '#60a5fa' }}>🔗 Direct Connection Test</h3>
      {Array.isArray(result) ? result.map((test, index) => (
        <div key={index} style={{ marginBottom: '10px', padding: '8px', background: 'rgba(255,255,255,0.1)', borderRadius: '5px' }}>
          <div style={{ fontWeight: 'bold', marginBottom: '5px' }}>{test.method}</div>
          <div style={{ color: test.status.includes('✅') ? '#4ade80' : '#f87171' }}>
            {test.status}
          </div>
          {test.data && <div style={{ fontSize: '11px', color: '#94a3b8' }}>Data: {test.data}</div>}
          {test.error && <div style={{ fontSize: '11px', color: '#f87171' }}>Error: {test.error}</div>}
        </div>
      )) : (
        <div>{result}</div>
      )}
    </div>
  );
};

export default DirectTest;
