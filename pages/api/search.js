import ytsr from '@distube/ytsr';

export default async function handler(req, res) {
  const { query } = req.query;

  if (!query) {
    return res.status(400).json({ error: 'Query parameter is required' });
  }

  try {
    const result = await ytsr(query, { limit: 30, type: 'video' });

    const videos = result.items.map((video) => ({
      id: video.id,
      title: video.name,
      url: video.url,
      thumbnail: video.thumbnail,
      duration: video.duration || '0:00',
      viewCount: video.views,
      author: {
        name: video.author?.name || 'Unknown',
        url: video.author?.url || '',
        verified: video.author?.verified || false
      },
      uploadedAt: video.uploadedAt || '',
      description: video.description || ''
    }));

    res.status(200).json({ videos });
  } catch (error) {
    console.error('Error fetching videos:', error);
    res.status(500).json({ error: 'Failed to fetch videos' });
  }
}
