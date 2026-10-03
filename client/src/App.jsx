import LoginForm from './LoginForm';
import BearerTest from './BearerTest';

function App() {
  return (
    <div style ={{ padding: '2rem', fontFamily: 'sans-serif'}}>
      <h1 style = {{ textAlign: 'center'}}>
        Recibo App
      </h1>
      <h2>
        <LoginForm />
      </h2>
      <h3>
        <BearerTest />
      </h3>
    </div>
  )
}

export default App;