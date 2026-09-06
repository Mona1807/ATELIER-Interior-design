import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './LoginPage.css';

function BlueprintArt() {
  return (
    <svg className="auth-brand__blueprint" viewBox="0 0 500 640" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <path className="fill-panel" d="M60 80 H440 V560 H60 Z" />
      <path d="M60 80 H440 V560 H60 Z" />
      <line x1="60" y1="300" x2="300" y2="300" />
      <line x1="300" y1="80" x2="300" y2="560" />
      <line x1="300" y1="420" x2="440" y2="420" />
      <path d="M180 300 A 40 40 0 0 0 220 260" />
      <path d="M300 500 A 40 40 0 0 1 340 460" />
      <line x1="330" y1="120" x2="410" y2="120" />
      <line x1="330" y1="145" x2="410" y2="145" />
      <line x1="330" y1="170" x2="410" y2="170" />
      <line x1="330" y1="195" x2="410" y2="195" />
      <line x1="330" y1="220" x2="410" y2="220" />
      <circle cx="120" cy="200" r="26" />
      <path d="M94 200 H146" />
      <path d="M120 174 V226" />
      <path d="M100 400 H220 V470 H100 Z" />
      <path d="M100 435 H220" />
      <line x1="60" y1="595" x2="440" y2="595" />
      <line x1="60" y1="588" x2="60" y2="602" />
      <line x1="440" y1="588" x2="440" y2="602" />
    </svg>
  );
}

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const redirectTo = location.state?.from?.pathname || '/dashboard';

  function handleChange(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setSubmitting(true);
    try {
      await login(form);
      navigate(redirectTo, { replace: true });
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="auth-screen">
      <div className="auth-brand">
        <BlueprintArt />
        <div className="auth-brand__mark">Atelier</div>
        <div className="auth-brand__copy">
          <h1>Design the room, then design the room.</h1>
          <p>
            Sketch floor plans, redesign real spaces with AI, and bring your team into the
            same project — from first wall to final render.
          </p>
        </div>
        <div className="auth-brand__footer">Collaborative design, built for teams.</div>
      </div>

      <div className="auth-form-panel">
        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="auth-form__header">
            <h2>Welcome back</h2>
            <p>
              New here? <Link to="/register">Create an account</Link>
            </p>
          </div>

          {error && <div className="form-banner error">{error}</div>}

          <div className="field-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="you@studio.com"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="field-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              placeholder="••••••••"
              value={form.password}
              onChange={handleChange}
              required
            />
          </div>

          <button className="btn-primary" type="submit" disabled={submitting}>
            {submitting ? 'Logging in…' : 'Log in'}
          </button>
        </form>
      </div>
    </div>
  );
}
