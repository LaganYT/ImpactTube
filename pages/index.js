import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import VideoList from '../components/VideoList';

export default function Home() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetchRandomVideos();
  }, []);

  const fetchRandomVideos = async () => {
    try {
      setLoading(true);
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
      const response = await fetch('/api/search?query=popular');
      if (response.ok) {
        const data = await response.json();
        setVideos(data.videos.slice(0, 12));
      }
    } catch (error) {
      console.error('Error fetching popular videos:', error);
    }
  };


  const handleVideoClick = (videoId) => {
    router.push(`/watch?v=${videoId}`);
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="container">
          <div className="hero-content">
            <h1 className="hero-title">
              Discover Amazing Content
            </h1>
            <p className="hero-subtitle">
              Explore millions of videos, playlists, and channels from around the world
            </p>

          </div>
        </div>
      </section>

      {/* Featured Videos Section */}
      <section className="featured-section">
        <div className="container">
          <div className="section-header">
            <h2>Featured Videos</h2>
            <p>Discover trending and popular content curated just for you</p>
          </div>

          {loading ? (
            <div className="loading-grid">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="video-skeleton">
                  <div className="skeleton thumbnail"></div>
                  <div className="skeleton title"></div>
                  <div className="skeleton meta"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="fade-in">
              <VideoList videos={videos} onVideoClick={handleVideoClick} />
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
