import { useState } from 'react';
import { supabase } from '../lib/supabaseClient';

export default function Login() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');

  async function handleLogin(e) {
    e.preventDefault();
    setError('');
    const { error } = await supabase.auth.signInWithOtp({ email });
    if (error) setError(error.message);
    else setSent(true);
  }

  return (
    <div className="login-wrap">
      <h1 style={{ fontSize: 26 }}>Trainingsnotizen</h1>
      <p className="subtitle">Melde dich mit deiner E-Mail an — ohne Passwort.</p>
      {sent ? (
        <p>Check dein Postfach — wir haben dir einen Login-Link geschickt.</p>
      ) : (
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="deine@email.de"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button type="submit">Link senden</button>
        </form>
      )}
      {error && <p style={{ color: 'var(--accent)' }}>{error}</p>}
    </div>
  );
}
