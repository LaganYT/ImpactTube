import '../styles/globals.css';
import 'lite-youtube-embed/src/lite-yt-embed.css';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { FaGithub, FaHome, FaSearch, FaCompass, FaPlay } from 'react-icons/fa';

export default function App({ Component, pageProps }) {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');

  // Load lite-youtube-embed script on client side
  useEffect(() => {
    if (typeof window !== 'undefined') {
      import('lite-youtube-embed');
    }
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search/${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#0f172a]">
      {/* Modern Redesigned Navbar */}
      <nav className="redesigned-navbar">
        <div className="navbar-content">
          {/* Left Section - Logo & Navigation */}
          <div className="navbar-left">
            <Link href="/" className="brand-logo">
              <div className="logo-icon">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M10 15l5.19-3L10 9v6m11.56-7.83c.13.47.22 1.1.28 1.9.07.8.1 1.49.1 2.09L22 12c0 2.19-.16 3.8-.44 4.83-.25.9-.83 1.48-1.73 1.73-.47.13-1.33.22-2.65.28-1.3.07-2.49.1-3.59.1L12 19c-4.19 0-6.8-.16-7.83-.44-.9-.25-1.48-.83-1.73-1.73-.13-.47-.22-1.1-.28-1.9-.07-.8-.1-1.49-.1-2.09L2 12c0-2.19.16-3.8.44-4.83.25-.9.83-1.48 1.73-1.73.47-.13 1.33-.22 2.65-.28 1.3-.07 2.49-.1 3.59-.1L12 5c4.19 0 6.8.16 7.83.44.9.25 1.48.83 1.73 1.73z"/>
                </svg>
              </div>
              <span className="brand-name">ImpactTube</span>
            </Link>
            
            <div className="nav-links">
              <Link href="/" className={`nav-link ${router.pathname === '/' ? 'active' : ''}`}>
                <FaHome size={16} />
                <span>Home</span>
              </Link>
              <Link href="/shorts" className={`nav-link ${router.pathname === '/shorts' ? 'active' : ''}`}>
                <FaPlay size={14} />
                <span>Shorts</span>
                <span className="beta-badge">BETA</span>
              </Link>
            </div>
          </div>

          {/* Center Section - Search */}
          <div className="navbar-center">
            <form onSubmit={handleSearch} className="search-form">
              <input
                type="text"
                placeholder="Search videos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input"
              />
              <button type="submit" className="search-btn">
                <FaSearch size={16} />
              </button>
            </form>
          </div>

          {/* Right Section - Actions */}
          <div className="navbar-right">
            <a
              href="https://github.com/LaganYT/ImpactTube"
              target="_blank"
              rel="noopener noreferrer"
              className="nav-icon-btn"
              title="View on GitHub"
            >
              <FaGithub size={20} />
            </a>
          </div>
        </div>
      </nav>

      {/* Main Page Content */}
      <main className="main-content" style={{ minHeight: 'calc(100vh - 56px)' }}>
        <Component {...pageProps} />
      </main>
    </div>
  );
}
