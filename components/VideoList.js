import Link from 'next/link';

export default function VideoList({ videos, onVideoClick }) {
  return (
    <div className="video-list">
      {videos.map((video) => (
        <div key={video.id} className="video-item">
          <Link href={`/watch?v=${video.id}`}>
            {video.title}
          </Link>
        </div>
      ))}
      <style jsx>{`
        .video-list {
          margin-top: 20px;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .video-item {
          padding: 10px;
          border: 1px solid #ddd;
          border-radius: 4px;
          background-color: #fff;
          transition: transform 0.2s;
        }
        .video-item:hover {
          transform: scale(1.02);
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
        .video-item a {
          color: #1e90ff;
          text-decoration: none;
          font-weight: bold;
        }
        .video-item a:hover {
          text-decoration: underline;
        }
      `}</style>
    </div>
  );
}
