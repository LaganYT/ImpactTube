import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import VideoList from '../../components/VideoList';

export default function ChannelPage() {
  const router = useRouter();
  const { channel, url } = router.query;
  const [channelData, setChannelData] = useState(null);
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!channel) return;

    const fetchChannel = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(
          `/api/channel?channel=${encodeURIComponent(channel)}&channelUrl=${encodeURIComponent(url || '')}`
        );

        if (!response.ok) {
          throw new Error('Failed to load channel');
        }

        const data = await response.json();
        setChannelData(data.channel);
        setVideos(data.videos || []);
      } catch (err) {
        setError(err.message || 'Failed to load channel');
      } finally {
        setLoading(false);
      }
    };

    fetchChannel();
  }, [channel, url]);

  const handleVideoClick = (videoId) => {
    router.push(`/watch?v=${videoId}`);
  };

  if (loading) {
    return (
      <div className="channel-page">
        <div className="channel-loading">
          <div className="loading-spinner"></div>
          <p>Loading channel…</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="channel-page">
        <div className="channel-error">
          <h2>Unable to load channel</h2>
          <p>{error}</p>
          <button className="btn-primary" onClick={() => router.push('/')}>Go Home</button>
        </div>
      </div>
    );
  }

  return (
    <div className="channel-page">
      <div className="channel-banner"></div>

      {channelData && (
        <section className="channel-header">
          <div className="channel-avatar-wrap">
            {channelData.avatar ? (
              <img src={channelData.avatar} alt={channelData.name} className="channel-avatar" />
            ) : (
              <div className="channel-avatar-fallback">{channelData.name.charAt(0)}</div>
            )}
          </div>

          <div className="channel-details">
            <h1>{channelData.name}</h1>
            <p className="channel-stats">
              {channelData.verified ? '✓ Verified' : 'Channel'}
              {channelData.subscribers ? ` • ${channelData.subscribers}` : ''}
              {videos.length ? ` • ${videos.length} videos` : ''}
            </p>
            {channelData.description && (
              <p className="channel-description">{channelData.description}</p>
            )}
          </div>

          <div className="channel-actions">
            <button className="subscribe-btn">Subscribe</button>
            {channelData.url && (
              <a className="btn-secondary" href={channelData.url} target="_blank" rel="noopener noreferrer">
                Open on YouTube
              </a>
            )}
          </div>
        </section>
      )}

      <section className="channel-videos">
        <h2>Videos</h2>
        {videos.length > 0 ? (
          <VideoList videos={videos} onVideoClick={handleVideoClick} />
        ) : (
          <div className="channel-empty">No videos found for this channel yet.</div>
        )}
      </section>
    </div>
  );
}
