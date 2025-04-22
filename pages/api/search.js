import ytsr from '@distube/ytsr';

export default async function handler(req, res) {
  const { query } = req.query;

  if (!query) {
    return res.status(400).json({ error: 'Query parameter is required' });
  }

  try {
    const results = await ytsr(query, { limit: 25 });
    const videos = results.items
      .filter((item) => item.type === 'video')
      .map((video) => ({
        id: video.id,
        title: video.name,
        url: video.url,
        thumbnail: video.bestThumbnail.url, // Add thumbnail
      }));

    res.status(200).json({ videos });
  } catch (error) {
    console.error('Error fetching videos:', error);
    res.status(500).json({ error: 'Failed to fetch videos' });
  }
}
