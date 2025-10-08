import ytSearch from 'yt-search';

export default async function handler(req, res) {
  const { query } = req.query;

  if (!query) {
    return res.status(400).json({ error: 'Query parameter is required' });
  }

  try {
    const result = await ytSearch(query);
    const videos = result.videos.slice(0, 25).map((video) => ({
      id: video.videoId,
      title: video.title,
      url: video.url,
      thumbnail: video.thumbnail,
      duration: video.duration?.timestamp || '0:00',
      viewCount: video.views,
    }));

    res.status(200).json({ videos });
  } catch (error) {
    console.error('Error fetching videos:', error);
    res.status(500).json({ error: 'Failed to fetch videos' });
  }
}
