import React, { useEffect, useState } from 'react';

const NetworkTest = () => {
  const [results, setResults] = useState([]);

  useEffect(() => {
    const runTests = async () => {
      const tests = [];
      
      // Test 1: Direct fetch to backend
      try {
        const response = await fetch('http://localhost:5000/api/health');
        const data = await response.json();
        tests.push({ test: 'Direct Backend', status: '✅ Success', data: data.status });
      } catch (error) {
        tests.push({ test: 'Direct Backend', status: '❌ Failed', error: error.message });
      }

      // Test 2: API Service
      try {
        const api = await import('../services/api.js').then(m => m.default);
        const result = await api.healthCheck();
        tests.push({ test: 'API Service', status: '✅ Success', data: result.status });
      } catch (error) {
        tests.push({ test: 'API Service', status: '❌ Failed', error: error.message });
      }

      // Test 3: Check if fetch is available
      tests.push({ test: 'Fetch Available', status: typeof fetch !== 'undefined' ? '✅ Yes' : '❌ No' });

      // Test 4: Check current origin
      tests.push({ test: 'Current Origin', status: window.location.origin });

      setResults(tests);
    };

    runTests();
  }, []);

  return (
    <div style={{ 
      position: 'fixed', 
      top: '20px', 
      left: '20px', 
      background: 'rgba(0,0,0,0.95)', 
      color: 'white', 
      padding: '20px', 
      borderRadius: '10px',
      zIndex: 9999,
      maxWidth: '400px',
      fontSize: '14px'
    }}>
      <h3 style={{ margin: '0 0 15px 0', color: '#4ade80' }}>🔍 Network Diagnostic</h3>
      {results.map((result, index) => (
        <div key={index} style={{ marginBottom: '10px', padding: '8px', background: 'rgba(255,255,255,0.1)', borderRadius: '5px' }}>
          <div style={{ fontWeight: 'bold', marginBottom: '5px' }}>{result.test}</div>
          <div style={{ color: result.status.includes('✅') ? '#4ade80' : '#f87171' }}>
            {result.status}
          </div>
          {result.data && <div style={{ fontSize: '12px', color: '#94a3b8' }}>Data: {JSON.stringify(result.data)}</div>}
          {result.error && <div style={{ fontSize: '12px', color: '#f87171' }}>Error: {result.error}</div>}
        </div>
      ))}
    </div>
  );
};

export default NetworkTest;
