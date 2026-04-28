import ytSearch from 'yt-search';

const normalize = (value = '') => value.toLowerCase().trim();

const parseChannelId = (url = '') => {
  const channelMatch = url.match(/\/channel\/([A-Za-z0-9_-]+)/);
  if (channelMatch?.[1]) return channelMatch[1];

  const userMatch = url.match(/\/(?:c|user)\/([^/?]+)/);
  if (userMatch?.[1]) return userMatch[1];

  const handleMatch = url.match(/\/@([^/?]+)/);
  if (handleMatch?.[1]) return `@${handleMatch[1]}`;

  return null;
};

export default async function handler(req, res) {
  const { channel, channelUrl = '' } = req.query;

  if (!channel) {
    return res.status(400).json({ error: 'Channel parameter is required' });
  }

  try {
    const channelIdHint = parseChannelId(channelUrl);
    const channelQuery = channelIdHint ? `${channelIdHint}` : channel;

    const channelSearch = await ytSearch({ query: channelQuery, pageStart: 1, pageEnd: 1 });

    const channelInfo = channelSearch.channels?.find((item) =>
      normalize(item.name).includes(normalize(channel)) ||
      normalize(channel).includes(normalize(item.name))
    ) || channelSearch.channels?.[0];

    const videoSearch = await ytSearch({ query: channel, pageStart: 1, pageEnd: 2 });

    const matchingVideos = videoSearch.videos
      .filter((video) => {
        const authorName = normalize(video.author?.name);
        const requestedChannel = normalize(channel);

        if (!authorName || !requestedChannel) return false;
        return authorName === requestedChannel || authorName.includes(requestedChannel) || requestedChannel.includes(authorName);
      })
      .slice(0, 36)
      .map((video) => ({
        id: video.videoId,
        title: video.title,
        thumbnail: video.thumbnail,
        duration: video.duration?.timestamp || '0:00',
        viewCount: video.views,
        uploadedAt: video.ago || '',
        description: video.description || '',
        author: {
          name: video.author?.name || channel,
          url: video.author?.url || channelUrl || '',
          verified: video.author?.verified || false,
          avatar: video.author?.image || channelInfo?.thumbnail || ''
        }
      }));

    return res.status(200).json({
      channel: {
        name: channelInfo?.name || channel,
        url: channelInfo?.url || channelUrl || '',
        verified: channelInfo?.verified || false,
        subscribers: channelInfo?.subCountLabel || '',
        avatar: channelInfo?.thumbnail || matchingVideos[0]?.author?.avatar || '',
        description: channelInfo?.descriptionShort || ''
      },
      videos: matchingVideos
    });
  } catch (error) {
    console.error('Error fetching channel:', error);
    return res.status(500).json({ error: 'Failed to fetch channel details' });
  }
}
