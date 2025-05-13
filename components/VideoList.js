import Link from 'next/link';

export default function VideoList({ videos, onVideoClick }) {
  return (
    <div className="video-list">
      {videos.map((video) => (
        <div key={video.id} className="video-item">
          <img src={video.thumbnail} alt={video.title} />
          <Link href={video.isPlaylist ? `/playlist?playlistId=${video.id}` : `/watch?v=${video.id}`}>
            {video.title}
          </Link>
        </div>
      ))}
    </div>
  );
}
