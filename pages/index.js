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
      // Fetch a random word
      const wordResponse = await fetch('https://random-word-api.herokuapp.com/word');
      if (!wordResponse.ok) {
        throw new Error('Failed to fetch random word');
      }
      const wordData = await wordResponse.json();
      const randomWord = wordData[0];

      // Use the random word in the search query
      const videoResponse = await fetch(`/api/search?query=${encodeURIComponent(randomWord)}`);
      if (!videoResponse.ok) {
        throw new Error('Failed to fetch random videos');
      }
      const videoData = await videoResponse.json();
      setVideos(videoData.videos);
    } catch (error) {
      console.error('Error fetching random videos:', error);
    }
  };

  const handleSearch = (query) => {
    router.push(`/search/${encodeURIComponent(query)}`);
  };

  const handleVideoClick = (url, isPlaylist = false) => {
    if (isPlaylist) {
      router.push(`/playlist?playlistId=${url}`);
    } else {
      setSelectedVideoUrl(url);
    }
  };

  return (
    <div className="container">
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
