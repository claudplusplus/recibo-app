import { useState, useEffect } from 'react';

function App() {
  const [dbTime, setDbTime] = useState('Loading...');

  useEffect(() => {
    // Fetching from your Express backend
    fetch('http://localhost:5000/api/health')
      .then(res => res.json())
      .then(data => setDbTime(data.dbTime))
      .catch(err => setDbTime('Error connecting to backend'));
  }, []);

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>Recibo App</h1>
      <p>Frontend is alive.</p>
      <h2>Database Time: {dbTime}</h2>
    </div>
  );
}
export default App;