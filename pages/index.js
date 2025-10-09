import { useState, useEffect, useCallback, useRef } from 'react';
import { useRouter } from 'next/router';
import VideoList from '../components/VideoList';

export default function Home() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const router = useRouter();
  const loadingMoreRef = useRef(null);

  useEffect(() => {
    fetchRandomVideos();
  }, []);

  const fetchRandomVideos = async () => {
    try {
      setLoading(true);
      setHasMore(true); // Reset hasMore when refreshing
      // Fetch a random word for variety
      const wordResponse = await fetch('https://random-word-api.herokuapp.com/word');
      if (!wordResponse.ok) {
        throw new Error('Failed to fetch random word');
      }
      const wordData = await wordResponse.json();
      const randomWord = wordData[0];

      // Use the random word in the search query
      const videoResponse = await fetch(`/api/search?query=${encodeURIComponent(randomWord)}`);
      if (!videoResponse.ok) {
        throw new Error('Failed to fetch random videos');
      }
      const videoData = await videoResponse.json();
      setVideos(videoData.videos.slice(0, 12)); // Limit to 12 videos for homepage
    } catch (error) {
      console.error('Error fetching random videos:', error);
      // Fallback: fetch popular videos
      fetchPopularVideos();
    } finally {
      setLoading(false);
    }
  };

  const fetchPopularVideos = async () => {
    try {
      setHasMore(true); // Reset hasMore when fetching popular videos
      const response = await fetch('/api/search?query=popular');
      if (response.ok) {
        const data = await response.json();
        setVideos(data.videos.slice(0, 12));
      }
    } catch (error) {
      console.error('Error fetching popular videos:', error);
    }
  };

  const loadMoreVideos = useCallback(async () => {
    if (loadingMore || !hasMore) return;

    try {
      setLoadingMore(true);

      // Fetch more random videos
      const wordResponse = await fetch('https://random-word-api.herokuapp.com/word');
      if (!wordResponse.ok) {
        throw new Error('Failed to fetch random word');
      }
      const wordData = await wordResponse.json();
      const randomWord = wordData[0];

      const videoResponse = await fetch(`/api/search?query=${encodeURIComponent(randomWord)}`);
      if (!videoResponse.ok) {
        throw new Error('Failed to fetch more videos');
      }

      const videoData = await videoResponse.json();
      const newVideos = videoData.videos.slice(0, 12);

      // Only add videos if we got some back
      if (newVideos.length > 0) {
        setVideos(prev => [...prev, ...newVideos]);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error('Error loading more videos:', error);
      setHasMore(false);
    } finally {
      setLoadingMore(false);
    }
  }, [loadingMore, hasMore]);

  // Infinite scroll functionality
  useEffect(() => {
    const handleScroll = () => {
      if (!loadingMoreRef.current) return;

      const element = loadingMoreRef.current;
      const rect = element.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Trigger loading when the loading indicator is 100px above the bottom of the viewport
      if (rect.top <= windowHeight + 100) {
        loadMoreVideos();
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loadMoreVideos]);


  const handleVideoClick = (videoId) => {
    router.push(`/watch?v=${videoId}`);
  };

  return (
    <div className="homepage">
      {/* Header Bar */}
      <div className="homepage-header">
        <div className="header-content">
          <div className="header-left">
            <h1 className="homepage-title">Latest Videos</h1>
            <div className="header-subtitle">
              Discover trending content curated for you
            </div>
          </div>

          <div className="header-actions">
            <button
              onClick={fetchRandomVideos}
              className="refresh-btn"
              disabled={loading}
              title="Load new random videos"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="23 4 23 10 17 10"></polyline>
                <polyline points="1 20 1 14 7 14"></polyline>
                <path d="m3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path>
              </svg>
              <span>New Videos</span>
            </button>
          </div>
        </div>
      </div>

      {/* Video Grid */}
      <div className="videos-container">
        {loading ? (
          <div className="videos-loading">
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} className="video-card-skeleton">
                <div className="skeleton thumbnail"></div>
                <div className="skeleton info">
                  <div className="skeleton title"></div>
                  <div className="skeleton meta"></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <>
            <div className="videos-grid">
              <VideoList videos={videos} onVideoClick={handleVideoClick} />
            </div>

            {/* Infinite Scroll Loading Indicator */}
            {hasMore && (
              <div
                ref={loadingMoreRef}
                className="infinite-scroll-trigger"
              >
                {loadingMore ? (
                  <div className="infinite-loading">
                    <div className="loading-spinner"></div>
                    <span>Loading more videos...</span>
                  </div>
                ) : (
                  <div className="infinite-scroll-spacer"></div>
                )}
              </div>
            )}

            {/* End of Feed Message */}
            {!hasMore && videos.length > 0 && (
              <div className="end-of-feed">
                <p>You've reached the end! 🎉</p>
                <button
                  onClick={fetchRandomVideos}
                  className="refresh-btn"
                  disabled={loading}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="23 4 23 10 17 10"></polyline>
                    <polyline points="1 20 1 14 7 14"></polyline>
                    <path d="m3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path>
                  </svg>
                  <span>Load New Videos</span>
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
