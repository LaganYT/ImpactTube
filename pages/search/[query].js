import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import VideoList from '../../components/VideoList';
import ytSearch from 'yt-search';

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
      const { videos } = await ytSearch(query);
      return videos.map((video) => ({
        id: video.videoId,
        title: video.title,
        url: `https://www.youtube.com/watch?v=${video.videoId}`,
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
