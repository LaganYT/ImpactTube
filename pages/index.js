import { useState } from 'react';
import SearchBar from '../components/SearchBar';
import VideoList from '../components/VideoList';
import { searchVideos } from '../utils/youtubeSearch';

export default function Home() {
  const [videos, setVideos] = useState([]);

  const handleSearch = async (query) => {
    const results = await searchVideos(query);
    setVideos(results);
  };

  return (
    <div>
      <h1>ImpactTube</h1>
      <SearchBar onSearch={handleSearch} />
      <VideoList videos={videos} />
    </div>
  );
}
