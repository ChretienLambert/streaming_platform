import React, { useEffect, useState } from 'react';

const ProxyTest = () => {
  const [status, setStatus] = useState('Testing proxy...');

  useEffect(() => {
    const testProxy = async () => {
      try {
        console.log('🔧 Testing Vite proxy...');
        // This should now go through Vite proxy to localhost:5000
        const response = await fetch('/api/health');
        const data = await response.json();
        console.log('✅ Proxy test successful:', data);
        setStatus(`✅ Proxy Working! Status: ${data.status}`);
      } catch (error) {
        console.error('❌ Proxy test failed:', error);
        setStatus(`❌ Proxy Failed: ${error.message}`);
      }
    };

    testProxy();
  }, []);

  return (
    <div style={{ 
      position: 'fixed', 
      top: '20px', 
      left: '20px', 
      background: 'rgba(34, 197, 94, 0.95)', 
      color: 'white', 
      padding: '15px', 
      borderRadius: '8px',
      zIndex: 9999,
      fontSize: '14px',
      fontWeight: 'bold'
    }}>
      🚀 Vite Proxy Status: {status}
    </div>
  );
};

export default ProxyTest;
