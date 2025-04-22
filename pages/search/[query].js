import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import VideoList from '../../components/VideoList';

export default function SearchResults() {
  const router = useRouter();
  const { query } = router.query;
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    if (query) {
      searchVideos(query).then(setVideos).catch(console.error);
    }
  }, [query]);

  const searchVideos = async (query) => {
    // Replace with actual API call
    return [
      { id: '1', title: `Result for ${query}`, url: 'https://www.youtube.com/watch?v=1' },
      { id: '2', title: `Another result for ${query}`, url: 'https://www.youtube.com/watch?v=2' },
    ];
  };

  return (
    <div>
      <h1>Search Results for "{query}"</h1>
      <VideoList videos={videos} onVideoClick={() => {}} />
    </div>
  );
}
