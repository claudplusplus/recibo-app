import { useState } from 'react';

function BearerTest() {
  const [result, setResult] = useState('Click me');

  const handleTest = async () => {
    const token = localStorage.getItem('token');

    try {
      const response = await fetch('http://localhost:5000/api/test-protected', {
      method: 'GET',
      headers: {'Authorization': `Bearer ${token}`}
      });
      const data = await response.json();
      setResult(`Server replied with status ${response.status}: ${JSON.stringify(data)}`)
    } catch (err) {
      console.error("fetch failed:", err);
      setResult("network error");
    }
  }

  return (
    <div style={{ padding: '2rem', textAlign: 'center', border: '1px solid #ddd', borderRadius: '8px', margin: '2rem auto', maxWidth: '500px' }}>
      <h2>Bearer Token Test</h2>
      <button 
        onClick={handleTest} 
        style={{ padding: '1rem 2rem', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '1rem' }}
      >
        Test Protected Route
      </button>
      <p style={{ marginTop: '1rem', fontFamily: 'monospace', color: '#333' }}>{result}</p>
    </div>
  );
};

export default BearerTest;