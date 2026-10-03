import { useState } from 'react';

function LoginForm() {
// state variables to hold form data/inputs
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const [message, setMessage] = useState('');
const [isLoading, setIsLoading] = useState(false); // state variable to track loading state

// handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // stop page from refreshing on form submit
    setIsLoading(true); // set loading state to true
    setMessage(''); // clear any previous messages

    try {
      const response = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // tell server we're sending JSON data
        },
        body: JSON.stringify({ email, password }), // convert JS object to JSON string
      });

      const data = await response.json();
      if (response.ok) {
        setMessage(`Success! user ${data.user} logged in`);
        setEmail(''); // clear email input
        setPassword(''); // clear password input
        localStorage.setItem('token', data.token)
      } else {
        setMessage(`Error: ${data.error}`);
      }
    } catch (err) {
      console.error('Login error:', err); // para debugging and pawala sa pula sa linting error
      setMessage('Failed to connect to the server. Try again later.');
    } finally {
      setIsLoading(false); // set loading state to false
    }
  };

    return (
    <div style={{ maxWidth: '400px', margin: '2rem auto', padding: '2rem', border: '1px solid #ccc', borderRadius: '8px' }}>
      <h2>Login to your Account</h2>

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '1rem' }}>
          <label htmlFor="email" style={{ display: 'block', marginBottom: '0.5rem' }}>
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ width: '100%', padding: '0.5rem' }}
            placeholder="login@example.com"
          />
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <label htmlFor="password" style={{ display: 'block', marginBottom: '0.5rem' }}>
            Password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={8}
            style={{ width: '100%', padding: '0.5rem' }}
            placeholder="Minimum 8 characters"
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          style={{ width: '100%', padding: '0.75rem', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
        >
          {isLoading ? 'Logging in...' : 'Login'}
        </button>
      </form>

      {message && (
        <p style={{ marginTop: '1rem', color: message.includes('Error') || message.includes('Failed') ? 'red' : 'green' }}>
          {message}
        </p>
      )}
    </div>
  );
};

export default LoginForm;

