import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function Watch() {
  const router = useRouter();
  const { v } = router.query;
  const [videoData, setVideoData] = useState(null);
  const [relatedVideos, setRelatedVideos] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!v) return;

    const fetchVideoDetails = async () => {
      setLoading(true);
      setError(null);

      try {
        // Fetch video details
        const response = await fetch(`/api/video?videoId=${v}`);
        if (!response.ok) {
          if (response.status === 404) {
            throw new Error('Video not found');
          } else {
            throw new Error('Failed to fetch video details');
          }
        }
        const data = await response.json();
        setVideoData(data);

        // Fetch related videos
        const relatedResponse = await fetch(`/api/search?query=${encodeURIComponent(data.title)}`);
        if (relatedResponse.ok) {
          const relatedData = await relatedResponse.json();
          setRelatedVideos(relatedData.videos.filter(video => video.id !== v).slice(0, 8));
        }
      } catch (err) {
        setError(err.message || 'Failed to fetch video data');
      } finally {
        setLoading(false);
      }
    };

    fetchVideoDetails();
  }, [v]);

  const handleRelatedVideoClick = (videoId) => {
    router.push(`/watch?v=${videoId}`);
  };

  if (loading) {
    return (
      <div className="watch-page">
        <div className="container">
          <div className="loading-state">
            <div className="video-player-skeleton"></div>
            <div className="video-info-skeleton">
              <div className="skeleton title"></div>
              <div className="skeleton meta"></div>
              <div className="skeleton description"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="watch-page">
        <div className="container">
          <div className="error-state">
            <h2>Video Not Found</h2>
            <p>{error}</p>
            <button onClick={() => router.push('/')} className="btn-primary">
              Go Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="watch-page">
      <div className="container">
        <div className="video-container">
          {/* Main Video Player */}
          <div className="main-video">
            <div className="video-player">
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${v}?autoplay=1`}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>

            {videoData && (
              <div className="video-info">
                <h1 className="video-title" dangerouslySetInnerHTML={{ __html: videoData.title }}></h1>

                <div className="video-meta">
                  <div className="channel-info">
                    <a
                      href={videoData.author.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="channel-link"
                    >
                      <span dangerouslySetInnerHTML={{ __html: videoData.author.name }}></span>
                    </a>
                    {videoData.viewCount && (
                      <span className="view-count">
                        • {videoData.viewCount} views
                      </span>
                    )}
                  </div>

                  <div className="video-actions">
                    <button className="btn-secondary">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                      </svg>
                      Like
                    </button>
                    <button className="btn-secondary">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M15 5.5H9c-.83 0-1.5.67-1.5 1.5v9c0 .83.67 1.5 1.5 1.5h6c.83 0 1.5-.67 1.5-1.5v-9c0-.83-.67-1.5-1.5-1.5zm-6 0h6v9h-6v-9z"/>
                      </svg>
                      Share
                    </button>
                  </div>
                </div>

                <div className="video-description" dangerouslySetInnerHTML={{ __html: videoData.description }}></div>
              </div>
            )}
          </div>

          {/* Related Videos Sidebar */}
          {relatedVideos.length > 0 && (
            <div className="related-videos">
              <h3>Related Videos</h3>
              <div className="related-list">
                {relatedVideos.map((video) => (
                  <div
                    key={video.id}
                    className="related-item"
                    onClick={() => handleRelatedVideoClick(video.id)}
                  >
                    <img src={video.thumbnail} alt={video.title} />
                    <div className="related-content">
                      <h4 className="related-title">{video.title}</h4>
                      <div className="related-meta">
                        <span>{video.duration || '0:00'}</span>
                        {video.viewCount && (
                          <span>• {video.viewCount} views</span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
