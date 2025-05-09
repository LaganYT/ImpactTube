import '../styles/globals.css';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';

export default function App({ Component, pageProps }) {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?query=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#181818] text-white font-['Roboto']">
      {/* Navbar */}
      <nav className="bg-gray-900 p-4 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-md border-b border-gray-700">
        <h1 className="text-2xl font-bold text-red-600">ImpactTube</h1>
        <form onSubmit={handleSearch} className="flex items-center gap-2 w-full sm:w-auto">
          <input
            type="text"
            placeholder="Search videos..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="px-3 py-1 rounded bg-gray-800 border border-gray-700 text-white w-full sm:w-64"
          />
          <button
            type="submit"
            className="px-3 py-1 bg-red-600 hover:bg-red-700 rounded text-white"
          >
            Search
          </button>
        </form>
        <Link href="/" className="text-blue-400 hover:underline">
          Home
        </Link>
      </nav>

      {/* Main Page Content */}
      <main className="flex-grow">
        <Component {...pageProps} />
      </main>
    </div>
  );
}
