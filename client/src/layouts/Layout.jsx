import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import './Layout.css';

export default function Layout() {
  return (
    <div className="app-shell">
      <Header />

      <div className="app-shell__content">
        <Outlet />
      </div>

      <footer className="site-footer">
        <span>Atelier — AI Design Platform</span>
        <span>AI Interior & Building Design</span>
      </footer>
    </div>
  );
}
