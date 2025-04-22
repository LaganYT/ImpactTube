import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import SearchBar from '../components/SearchBar';
import VideoList from '../components/VideoList';

export default function Home() {
  const [videos, setVideos] = useState([]);
  const [selectedVideoUrl, setSelectedVideoUrl] = useState('');
  const router = useRouter();

  useEffect(() => {
    fetchRandomVideos();
  }, []);

  const fetchRandomVideos = async () => {
    try {
      const response = await fetch('/api/search?query=random');
      if (!response.ok) {
        throw new Error('Failed to fetch random videos');
      }
      const data = await response.json();
      setVideos(data.videos);
    } catch (error) {
      console.error('Error fetching random videos:', error);
    }
  };

  const handleSearch = (query) => {
    router.push(`/search/${encodeURIComponent(query)}`);
  };

  const handleVideoClick = (url) => {
    setSelectedVideoUrl(url);
  };

  return (
    <div className="container">
      <h1 className="title">ImpactTube</h1>
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
