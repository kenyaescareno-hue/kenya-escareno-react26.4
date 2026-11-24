
import { useState } from 'react';
import TextInputWithLabel from '../../shared/TextInputWithLabel.jsx';

function Logon({ onSetEmail, onSetToken }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');
  const [isLoggingOn, setIsLoggingOn] = useState(false);

  const handleLogon = async (event) => {
    event.preventDefault();
    setAuthError('');
    setIsLoggingOn(true);

    try {
      const response = await fetch('/api/users/logon', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.status === 200 && data.email && data.csrfToken) {
        onSetEmail(data.email);
        onSetToken(data.csrfToken);
      } else {
        setAuthError(`Authentication failed: ${data?.message}`);
      }
    } catch (error) {
      setAuthError(`Error: ${error.name} | ${error.message}`);
    } finally {
      setIsLoggingOn(false);
    }
  };

  return (
    <div>
      <h2>Log In</h2>

      {authError && <p role="alert">{authError}</p>}

      <form onSubmit={handleLogon}>
        <TextInputWithLabel
          elementId="email"
          labelText="Email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
        />

        <TextInputWithLabel
          elementId="password"
          labelText="Password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          type="password"
          required
        />

        <button type="submit" disabled={isLoggingOn}>
          {isLoggingOn ? 'Logging in...' : 'Log On'}
        </button>
      </form>
    </div>
  );
}

export default Logon;
