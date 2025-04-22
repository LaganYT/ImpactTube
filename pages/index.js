import { useState } from 'react';
import SearchBar from '../components/SearchBar';
import VideoList from '../components/VideoList';
import { searchVideos } from '../utils/youtubeSearch';

export default function Home() {
  const [videos, setVideos] = useState([]);
  const [selectedVideoUrl, setSelectedVideoUrl] = useState('');

  const handleSearch = async (query) => {
    const results = await searchVideos(query);
    setVideos(results);
  };

  const handleVideoClick = (url) => {
    setSelectedVideoUrl(url);
  };

  return (
    <div className="container">
      <h1>ImpactTube</h1>
      <SearchBar onSearch={handleSearch} />
      <VideoList videos={videos} onVideoClick={handleVideoClick} />
      {selectedVideoUrl && (
        <div className="video-player">
          <iframe
            width="560"
            height="315"
            src={selectedVideoUrl}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      )}
      <style jsx>{`
        .container {
          max-width: 800px;
          margin: 0 auto;
          padding: 20px;
        }
        h1 {
          text-align: center;
        }
        .video-player {
          margin-top: 20px;
          text-align: center;
        }
      `}</style>
    </div>
  );
}
