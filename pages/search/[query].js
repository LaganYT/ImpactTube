import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import VideoList from '../../components/VideoList';

export default function SearchResults() {
  const router = useRouter();
  const { query } = router.query;
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState('relevance');

  useEffect(() => {
    if (query) {
      // Redirect to playlist player if query is a playlist URL
      if (query.startsWith('https://www.youtube.com/playlist?list=')) {
        const playlistRegex = /[?&]list=([^&]+)/;
        const playlistId = query.match(playlistRegex)?.[1];
        if (playlistId) {
          router.push(`/playlist/${encodeURIComponent(playlistId)}`);
          return;
        }
      }

      fetchVideos(query);
    }
  }, [query]);

  const fetchVideos = async (searchQuery) => {
    try {
      setLoading(true);
      const response = await fetch(`/api/search?query=${encodeURIComponent(searchQuery)}`);
      if (!response.ok) {
        throw new Error('Failed to fetch videos');
      }
      const data = await response.json();
      setVideos(data.videos);
    } catch (error) {
      console.error('Error fetching videos:', error);
      setVideos([]);
    } finally {
      setLoading(false);
    }
  };

  const handleVideoClick = (videoId) => {
    router.push(`/watch?v=${videoId}`);
  };

  const handleSortChange = (newSort) => {
    setSortBy(newSort);
    // In a real implementation, you'd refetch with sorting parameters
    // For now, we'll just update the state
  };

  if (loading) {
    return (
      <div className="search-page">
        <div className="search-loading">
          <div className="loading-spinner"></div>
          <p>Searching for videos...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="search-page">
      {/* Search Header */}
      <div className="search-header-section">
        <div className="search-header-content">
          <div className="search-info">
            <h1 className="search-title">
              Search Results for <span className="search-query">"{query}"</span>
            </h1>
            <p className="search-results-count">
              {videos.length} {videos.length === 1 ? 'video' : 'videos'} found
            </p>
          </div>
        </div>
      </div>

      {/* Search Results */}
      <div className="search-results-section">
        {videos.length > 0 ? (
          <div className="search-results-grid">
            <VideoList videos={videos} onVideoClick={handleVideoClick} />
          </div>
        ) : (
          <div className="no-results">
            <div className="no-results-icon">
              <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.35-4.35"></path>
              </svg>
            </div>
            <h3>No videos found</h3>
            <p>Try searching for something else or check your spelling.</p>
            <button
              onClick={() => router.push('/')}
              className="btn-primary"
            >
              Go Home
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
