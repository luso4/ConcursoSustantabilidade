import React, { useState } from 'react';
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import './App.css';

// Sua configuração do Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAFAxzVh5z5erSUKqvSLh5OGxN9bxXrPug",
  authDomain: "sustentabilidade-cd465.firebaseapp.com",
  databaseURL: "https://sustentabilidade-cd465-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "sustentabilidade-cd465",
  storageBucket: "sustentabilidade-cd465.firebasestorage.app",
  messagingSenderId: "545614370680",
  appId: "1:545614370680:web:dfef3d8f7c5f44bea49a8d",
  measurementId: "G-604CWSPS2Z"
};

// Inicializar o Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    try {
      const userCredential = await signInWithEmailAndPassword(auth, `${username}@gmail.com`, password);
      const user = userCredential.user;

      alert('Login bem-sucedido');
      window.location.href = 'index.html';
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      setErrorMessage(error.message);
    }
  };

  return (
    <div className="form-container">
      <div className="form-box">
        <h2>Login Form</h2>
        <form onSubmit={handleLogin}>
          <div className="form-input">
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="form-input">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit">Login</button>
          {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
          <a href="signIn.html">Create an Account</a>
        </form>
      </div>
    </div>
  );
}

export default App;
