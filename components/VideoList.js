import Link from 'next/link';
import '../styles/VideoList.module.css'; // Import the new CSS file

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
    </div>
  );
}
