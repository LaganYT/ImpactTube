import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import ytSearch from 'yt-search';

export default function Watch() {
  const router = useRouter();
  const { v } = router.query;
  const [videoData, setVideoData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);  // Add loading state

  useEffect(() => {
    if (!v) return;

    const fetchVideoDetails = async () => {
      setLoading(true);  // Start loading
      setError(null); // Clear previous errors

      try {
        const res = await ytSearch({ videoId: v }); // Ensure yt-search returns a video response
        if (res && res.videos && res.videos.length > 0) {
          setVideoData(res.videos[0]); // Assuming the first video is the correct one
        } else {
          setError('Video not found');
        }
      } catch (err) {
        setError('Failed to fetch video data');
      } finally {
        setLoading(false);  // Stop loading
      }
    };

    fetchVideoDetails();
  }, [v]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px' }}>
      <div style={{ width: '80%', maxWidth: '1200px' }}>
        {v ? (
          <iframe
            width="100%"
            height="500px"
            src={`https://www.youtube-nocookie.com/embed/${v}`}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        ) : (
          <p>Loading video...</p>
        )}
      </div>

      <div style={{ width: '80%', maxWidth: '1200px', marginTop: '20px' }}>
        {loading && <p>Loading video details...</p>}  {/* Show loading message for video details */}
        {error && <p>{error}</p>}

        {videoData && !loading && (
          <>
            <h2>{videoData.title}</h2>
            <p>{videoData.description}</p>
            <p>
              Channel:{' '}
              <a
                href={`https://www.youtube.com/channel/${videoData.author.id}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: '#4EA8DE' }}
              >
                {videoData.author.name}
              </a>
            </p>
          </>
        )}
      </div>
    </div>
  );
}
