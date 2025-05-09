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
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow">
        <Component {...pageProps} />
      </main>
      <footer className="bg-gray-900 text-white p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        <h1 className="text-xl font-bold">ImpactTube</h1>
        <form onSubmit={handleSearch} className="flex items-center gap-2">
          <input
            type="text"
            placeholder="Search videos..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="px-2 py-1 rounded bg-gray-800 border border-gray-700 text-white"
          />
          <button
            type="submit"
            className="px-3 py-1 bg-blue-600 hover:bg-blue-700 rounded text-white"
          >
            Search
          </button>
        </form>
        <Link href="/" className="text-blue-400 hover:underline">
          Home
        </Link>
      </footer>
    </div>
  );
}
