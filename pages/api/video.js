import ytSearch from 'yt-search';

export default async function handler(req, res) {
  const { videoId } = req.query;

  if (!videoId) {
    return res.status(400).json({ error: 'Video ID is required' });
  }

  try {
    const result = await ytSearch({ videoId });
    if (result && result.videos && result.videos.length > 0) {
      return res.status(200).json(result.videos[0]); // Return the first video
    } else {
      return res.status(404).json({ error: 'Video not found' });
    }
  } catch (error) {
    console.error('Error fetching video details:', error);
    return res.status(500).json({ error: 'Failed to fetch video details' });
  }
}
