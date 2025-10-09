import { useEffect, useState, useRef, useCallback } from 'react';
import { useRouter } from 'next/router';

export default function Shorts() {
  const [shorts, setShorts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const containerRef = useRef(null);
  const isScrolling = useRef(false);
  const router = useRouter();

  useEffect(() => {
    fetchShorts();
  }, []);

  const fetchShorts = async (count = 6) => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(`/api/shorts?count=${count}`);

      if (!response.ok) {
        throw new Error('Failed to fetch shorts');
      }

      const data = await response.json();
      setShorts(data.shorts);
    } catch (err) {
      setError(err.message || 'Failed to load shorts');
    } finally {
      setLoading(false);
    }
  };

  const loadMoreShorts = useCallback(async (count = 1) => {
    if (isLoadingMore || shorts.length === 0) return;

    try {
      setIsLoadingMore(true);
      const response = await fetch(`/api/shorts?count=${count}`);

      if (!response.ok) {
        throw new Error('Failed to fetch more shorts');
      }

      const data = await response.json();
      setShorts(prev => [...prev, ...data.shorts]);
    } catch (err) {
      console.error('Error loading more shorts:', err);
    } finally {
      setIsLoadingMore(false);
    }
  }, [isLoadingMore, shorts.length]);

  // Check if we need to load more shorts (maintain 6 ahead)
  useEffect(() => {
    const shortsAhead = shorts.length - currentIndex - 1;
    // Load more when we have less than 6 shorts ahead and not already loading
    if (shortsAhead < 6 && !isLoadingMore && shorts.length > 0) {
      const shortsNeeded = 6 - shortsAhead;
      loadMoreShorts(shortsNeeded);
    }
  }, [currentIndex, shorts.length, isLoadingMore, loadMoreShorts]);

  // Auto-scroll functionality
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current || isScrolling.current) return;

      const container = containerRef.current;
      const scrollPosition = container.scrollTop;
      const itemHeight = container.clientHeight;
      const newIndex = Math.round(scrollPosition / itemHeight);

      if (newIndex !== currentIndex && newIndex < shorts.length) {
        setCurrentIndex(newIndex);
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
      return () => container.removeEventListener('scroll', handleScroll);
    }
  }, [currentIndex, shorts.length]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowDown' && currentIndex < shorts.length - 1) {
        scrollToShort(currentIndex + 1);
      } else if (e.key === 'ArrowUp' && currentIndex > 0) {
        scrollToShort(currentIndex - 1);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, shorts.length]);

  const scrollToShort = (index) => {
    if (!containerRef.current) return;

    isScrolling.current = true;
    const container = containerRef.current;
    const targetScroll = index * container.clientHeight;

    container.scrollTo({
      top: targetScroll,
      behavior: 'smooth'
    });

    setTimeout(() => {
      isScrolling.current = false;
      setCurrentIndex(index);
    }, 500);
  };

  const handleNextShort = () => {
    if (currentIndex < shorts.length - 1) {
      scrollToShort(currentIndex + 1);
    }
  };

  const handlePrevShort = () => {
    if (currentIndex > 0) {
      scrollToShort(currentIndex - 1);
    }
  };

  if (loading) {
    return (
      <div className="shorts-page">
        <div className="shorts-loading">
          <div className="loading-spinner"></div>
          <p>Loading Shorts...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="shorts-page">
        <div className="shorts-error">
          <h2>Failed to Load Shorts</h2>
          <p>{error}</p>
          <button onClick={fetchShorts} className="btn-primary">
            Try Again
          </button>
          <button onClick={() => router.push('/')} className="btn-secondary">
            Go Home
          </button>
        </div>
      </div>
    );
  }

  if (shorts.length === 0) {
    return (
      <div className="shorts-page">
        <div className="shorts-error">
          <h2>No Shorts Available</h2>
          <p>We couldn't find any shorts at the moment.</p>
          <button onClick={fetchShorts} className="btn-primary">
            Refresh
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="shorts-page">
      {/* Beta Badge */}
      <div className="shorts-beta-badge">
        <span className="beta-text">BETA</span>
      </div>

      {/* Header */}
      <div className="shorts-header">
        <h1>Shorts</h1>
        <p className="shorts-count">
          {currentIndex + 1} / {shorts.length}
        </p>
      </div>

      {/* Shorts Container */}
      <div className="shorts-container" ref={containerRef}>
        {shorts.map((short, index) => (
          <div
            key={short.id}
            className={`short-item ${index === currentIndex ? 'active' : ''}`}
          >
            <div className="short-content">
              <div className="short-video-wrapper">
                <iframe
                  src={`https://www.youtube-nocookie.com/embed/${short.id}?autoplay=${index === currentIndex ? 1 : 0}&mute=0&controls=1&modestbranding=1&playsinline=1`}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="short-iframe"
                ></iframe>
              </div>

              <div className="short-sidebar">
                <div className="short-info">
                  <h3 className="short-title">{short.title}</h3>
                  <div className="short-meta">
                    <a
                      href={short.author.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="short-author"
                    >
                      {short.author.name}
                    </a>
                    {short.viewCount && (
                      <span className="short-views">
                        {short.viewCount} views
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {isLoadingMore && (
        <div className="shorts-loading-indicator">
          <div className="loading-spinner-small"></div>
        </div>
      )}

      {/* Navigation Controls */}
      <div className="shorts-controls">
        <button
          onClick={handlePrevShort}
          disabled={currentIndex === 0}
          className="shorts-nav-btn shorts-prev"
          title="Previous (↑)"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z"/>
          </svg>
        </button>

        <button
          onClick={handleNextShort}
          disabled={currentIndex === shorts.length - 1}
          className="shorts-nav-btn shorts-next"
          title="Next (↓)"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"/>
          </svg>
        </button>
      </div>

      {/* Instructions */}
      <div className="shorts-instructions">
        <p>Use arrow keys ↑ ↓ or scroll to navigate</p>
      </div>
    </div>
  );
}

