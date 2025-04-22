export default function VideoList({ videos, onVideoClick }) {
  return (
    <div className="video-list">
      {videos.map((video) => (
        <div key={video.id} className="video-item">
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              onVideoClick(video.url);
            }}
          >
            {video.title}
          </a>
        </div>
      ))}
      <style jsx>{`
        .video-list {
          margin-top: 20px;
        }
        .video-item {
          margin-bottom: 10px;
        }
        .video-item a {
          color: #1e90ff;
          text-decoration: none;
        }
        .video-item a:hover {
          text-decoration: underline;
        }
      `}</style>
    </div>
  );
}
