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
    </div>
  );
}
