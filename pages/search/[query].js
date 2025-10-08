import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import VideoList from '../../components/VideoList';

export default function SearchResults() {
  const router = useRouter();
  const { query } = router.query;
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    if (query) {
      // Redirect to playlist player if query is a playlist URL
      if (query.startsWith('https://www.youtube.com/playlist?list=')) {
        const playlistRegex = /[?&]list=([^&]+)/;
        const playlistId = query.match(playlistRegex)?.[1];
        if (playlistId) {
          router.push(`/playlist/${encodeURIComponent(playlistId)}`);
          return;
        }
      }

      fetchVideos(query).then(setVideos).catch(console.error);
    }
  }, [query]);

  const fetchVideos = async (query) => {
    try {
      const response = await fetch(`/api/search?query=${encodeURIComponent(query)}`);
      if (!response.ok) {
        throw new Error('Failed to fetch videos');
      }
      const data = await response.json();
      return data.videos;
    } catch (error) {
      console.error('Error fetching videos:', error);
      return [];
    }
  };

  const handleVideoClick = (videoId) => {
    router.push(`/watch?v=${videoId}`);
  };

  return (
    <div className="search-results-page">
      <div className="container">
        <div className="search-header">
          <h1>Search Results for "{query}"</h1>
          <p className="search-count">{videos.length} videos found</p>
        </div>
        <VideoList videos={videos} onVideoClick={handleVideoClick} />
      </div>
    </div>
  );
}
