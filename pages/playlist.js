import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function Playlist() {
  const router = useRouter();
  const { playlistId } = router.query;
  const [videos, setVideos] = useState([]);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

  useEffect(() => {
    if (playlistId) {
      fetchPlaylistVideos(playlistId).then(setVideos).catch(console.error);
    }
  }, [playlistId]);

  const fetchPlaylistVideos = async (playlistId) => {
    try {
      const response = await fetch(`/api/playlist?playlistId=${encodeURIComponent(playlistId)}`);
      if (!response.ok) {
        throw new Error('Failed to fetch playlist videos');
      }
      const data = await response.json();
      return data.videos;
    } catch (error) {
      console.error('Error fetching playlist videos:', error);
      return [];
    }
  };

  const handleNextVideo = () => {
    if (currentVideoIndex < videos.length - 1) {
      setCurrentVideoIndex(currentVideoIndex + 1);
    }
  };

  const handlePreviousVideo = () => {
    if (currentVideoIndex > 0) {
      setCurrentVideoIndex(currentVideoIndex - 1);
    }
  };

  return (
    <div className="container">
      {videos.length > 0 ? (
        <>
          <div className="video-player">
            <iframe
              width="560"
              height="315"
              src={`https://www.youtube-nocookie.com/embed/${videos[currentVideoIndex].id}`}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
          <div className="controls">
            <button onClick={handlePreviousVideo} disabled={currentVideoIndex === 0}>
              Previous
            </button>
            <button onClick={handleNextVideo} disabled={currentVideoIndex === videos.length - 1}>
              Next
            </button>
          </div>
          <div className="queue">
            <h3>Queue</h3>
            <ul>
              {videos.map((video, index) => (
                <li key={video.id} style={{ fontWeight: index === currentVideoIndex ? 'bold' : 'normal' }}>
                  {video.title}
                </li>
              ))}
            </ul>
          </div>
        </>
      ) : (
        <p>Loading playlist...</p>
      )}
    </div>
  );
}
