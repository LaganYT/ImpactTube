export default function VideoList({ videos, onVideoClick }) {
  return (
    <div className="video-list">
      {videos.map((video) => (
        <div
          key={video.id}
          className="video-item"
          onClick={() => onVideoClick(video.id)}
        >
          <div className="video-thumbnail-container">
            <img src={video.thumbnail} alt={video.title} className="video-thumbnail" />
            <div className="video-play-overlay"></div>
            {video.duration && (
              <span className="video-duration-badge">{video.duration}</span>
            )}
          </div>
          <div className="video-item-content">
            <h3 className="video-item-title">{video.title}</h3>
            <div className="video-item-meta">
              {video.author?.name && (
                <div className="video-author">
                  <span>{video.author.name}</span>
                  {video.author.verified && (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="verified-badge">
                      <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/>
                    </svg>
                  )}
                </div>
              )}
              <div className="video-stats">
                {video.viewCount && (
                  <span>{video.viewCount} views</span>
                )}
                {video.uploadedAt && (
                  <span>• {video.uploadedAt}</span>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
