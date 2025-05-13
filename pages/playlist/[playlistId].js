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

  const handleVideoClick = (index) => {
    setCurrentVideoIndex(index);
  };

  return (
    <div className="playlist-container">
      {videos.length > 0 ? (
        <>
          <div className="video-player">
            <iframe
              width="100%"
              height="100%"
              src={`https://www.youtube-nocookie.com/embed/${videos[currentVideoIndex].id}`}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
          <div className="playlist-queue">
            <h3 className="playlist-title">Playlist</h3>
            <ul className="queue-list">
              {videos.map((video, index) => (
                <li
                  key={video.id}
                  className={`queue-item ${index === currentVideoIndex ? 'active' : ''}`}
                  onClick={() => handleVideoClick(index)}
                >
                  <img src={video.thumbnail} alt={video.title} className="queue-thumbnail" />
                  <div className="queue-info">
                    <p className="queue-title">{video.title}</p>
                    <p className="queue-channel">{video.channel}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </>
      ) : (
        <p>Loading playlist...</p>
      )}
      <style jsx>{`
        .playlist-container {
          display: flex;
          height: 100vh;
          background-color: #181818;
          color: white;
        }
        .video-player {
          flex: 3;
          background-color: black;
        }
        .playlist-queue {
          flex: 1;
          background-color: #202020;
          overflow-y: auto;
          padding: 10px;
        }
        .playlist-title {
          font-size: 18px;
          font-weight: bold;
          margin-bottom: 10px;
        }
        .queue-list {
          list-style: none;
          padding: 0;
          margin: 0;
        }
        .queue-item {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 10px;
          cursor: pointer;
          border-radius: 4px;
          transition: background-color 0.3s;
        }
        .queue-item:hover {
          background-color: #333;
        }
        .queue-item.active {
          background-color: #444;
        }
        .queue-thumbnail {
          width: 80px;
          height: 45px;
          object-fit: cover;
          border-radius: 4px;
        }
        .queue-info {
          flex: 1;
        }
        .queue-title {
          font-size: 14px;
          font-weight: bold;
          color: white;
          margin: 0;
        }
        .queue-channel {
          font-size: 12px;
          color: #aaa;
          margin: 0;
        }
      `}</style>
    </div>
  );
}
