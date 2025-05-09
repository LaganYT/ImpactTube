import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import ytSearch from 'yt-search';

export default function Watch() {
  const router = useRouter();
  const { v } = router.query;
  const [videoData, setVideoData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!v) return;

    const fetchVideoDetails = async () => {
      try {
        const res = await ytSearch({ videoId: v });
        const video = res.videos[0]; // Get the first video from the result

        if (video) {
          setVideoData(video);
        } else {
          setError('Video not found');
        }
      } catch (err) {
        setError('Failed to fetch video data');
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
        {error && <p>{error}</p>}

        {videoData && (
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
