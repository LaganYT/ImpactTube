import { useState } from 'react';
import { useRouter } from 'next/router';
import SearchBar from '../components/SearchBar';
import VideoList from '../components/VideoList';
import '../styles/Home.module.css'; // Import the new CSS file

export default function Home() {
  const [videos, setVideos] = useState([]);
  const [selectedVideoUrl, setSelectedVideoUrl] = useState('');
  const router = useRouter();

  const handleSearch = (query) => {
    router.push(`/search/${encodeURIComponent(query)}`);
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
    </div>
  );
}
