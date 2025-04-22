import { useState } from 'react';
import SearchBar from '../components/SearchBar';
import VideoList from '../components/VideoList';
import VideoList from '../components/VideoList';
export default function Home() {
  const [videos, setVideos] = useState([]);
  const [selectedVideoUrl, setSelectedVideoUrl] = useState('');
  const [videos, setVideos] = useState([]);
  const handleSearch = async (query) => {eoUrl] = useState('');
    try {
      const results = await searchVideos(query);
      setVideos(results);${encodeURIComponent(query)}`);
    } catch (error) {
      console.error(error);
    }st handleVideoClick = (url) => {
  };setSelectedVideoUrl(url);
  };
  const handleVideoClick = (url) => {
    setSelectedVideoUrl(url);
  };<div className="container">
      <h1>ImpactTube</h1>
  return (rchBar onSearch={handleSearch} />
    <div className="container">} onVideoClick={handleVideoClick} />
      <h1>ImpactTube</h1>& (
      <SearchBar onSearch={handleSearch} />
      <VideoList videos={videos} onVideoClick={handleVideoClick} />
      {selectedVideoUrl && (
        <div className="video-player">
          <iframeselectedVideoUrl}
            width="560"="0"
            height="315"erometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            src={selectedVideoUrl}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>iner {
      )}  max-width: 800px;
      <style jsx>{` auto;
        .container {0px;
          max-width: 800px; #121212;
          margin: 0 auto;
          padding: 20px;
          background-color: #f9f9f9;
          color: #333;ter;
          border-radius: 8px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);eo-player {
        }
        h1 { text-align: center;
          text-align: center;
          color: #1e90ff;
        }
        .video-player {
          margin-top: 20px;
          text-align: center;        }      `}</style>    </div>
  );
}
