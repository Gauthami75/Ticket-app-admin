// LoginPage.js
import React, { useState } from 'react';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = () => {
    // Compare username and password with environment variables
    if (username === process.env.NEXT_PUBLIC_USER_NAME && password === process.env.NEXT_PUBLIC_PASSWORD) {
      // Authentication successful, redirect to the Ticket List page
      window.location.href = '/ticketList';
    } else {
      setErrorMessage('Incorrect username or password');
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <div className="input-container">
        <label>Username:</label>
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
      </div>
      <div className="input-container">
        <label>Password:</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </div><br/>
      <button onClick={handleLogin}>Login</button>
      {errorMessage && <div className="error-message">{errorMessage}</div>}
    </div>
  );
};

export default LoginPage;
