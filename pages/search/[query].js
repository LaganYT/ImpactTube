import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import VideoList from '../../components/VideoList';
import ytsr from '@distube/ytsr'; // Import @distube/ytsr

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
    try {
      const results = await ytsr(query, { limit: 25 }); // Fetch search results
      return results.items
        .filter((item) => item.type === 'video') // Only include videos
        .map((video) => ({
          id: video.id,
          title: video.name,
          url: video.url,
        }));
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
