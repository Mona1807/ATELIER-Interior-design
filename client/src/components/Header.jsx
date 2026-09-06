import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Header.css';

export default function Header() {
  const { isAuthenticated, user, logout, initializing } = useAuth();
  const navigate = useNavigate();

  async function handleLogout() {
    await logout();
    navigate('/login', { replace: true });
  }

  return (
    <header className="site-header">
      <Link to="/" className="site-header__mark">
        Atelier
      </Link>

      {initializing ? null : isAuthenticated ? (
        <div className="site-header__user">
          <Link to="/dashboard" className="site-header__link">
            Dashboard
          </Link>
          <div className="site-header__avatar">{user?.name?.charAt(0)?.toUpperCase() || '?'}</div>
          <button className="btn-ghost" onClick={handleLogout}>
            Log out
          </button>
        </div>
      ) : (
        <nav className="site-header__nav">
          <Link to="/login" className="site-header__link">
            Log in
          </Link>
          <Link to="/register" className="btn-secondary">
            Sign up
          </Link>
        </nav>
      )}
    </header>
  );
}
