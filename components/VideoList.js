export default function VideoList({ videos, onVideoClick }) {
  return (
    <div className="video-list">
      {videos.map((video) => (
        <div
          key={video.id}
          className="video-item"
          onClick={() => onVideoClick(video.id)}
        >
          <img src={video.thumbnail} alt={video.title} />
          <div className="video-play-overlay"></div>
          <div className="video-item-content">
            <h3 className="video-item-title">{video.title}</h3>
            <div className="video-item-meta">
              <span className="video-item-duration">
                {video.duration || '0:00'}
              </span>
              {video.viewCount && (
                <span>• {video.viewCount} views</span>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
