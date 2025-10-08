import '../styles/globals.css';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { FaGithub, FaHome, FaSearch, FaCompass } from 'react-icons/fa';

export default function App({ Component, pageProps }) {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search/${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#0f172a]">
      {/* Modern Navbar */}
      <nav className="modern-navbar">
        <div className="nav-container">
          <div className="nav-left">
            <Link href="/" className="nav-logo">
              <h1 className="logo-text">ImpactTube</h1>
            </Link>
          </div>

          <div className="nav-center">
            <form onSubmit={handleSearch} className="nav-search">
              <div className="search-wrapper">
                <FaSearch className="search-icon" />
                <input
                  type="text"
                  placeholder="Search videos, playlists, or channels..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="nav-search-input"
                />
                <button type="submit" className="nav-search-button">
                  Search
                </button>
              </div>
            </form>
          </div>

          <div className="nav-right">
            <a
              href="https://github.com/LaganYT/ImpactTube"
              target="_blank"
              rel="noopener noreferrer"
              className="github-link"
              title="View on GitHub"
            >
              <FaGithub size={20} />
            </a>
          </div>
        </div>
      </nav>

      {/* Main Page Content */}
      <main className="main-content">
        <Component {...pageProps} />
      </main>
    </div>
  );
}
