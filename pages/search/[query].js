import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import VideoList from '../../components/VideoList';

export default function SearchResults() {
  const router = useRouter();
  const { query } = router.query;
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    if (query) {
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

  return (
    <div>
      <h1>Search Results for "{query}"</h1>
      <VideoList videos={videos} onVideoClick={() => {}} />
    </div>
  );
}
