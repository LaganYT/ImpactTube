import ytSearch from 'yt-search';

export default async function handler(req, res) {
  const { videoId } = req.query;

  if (!videoId) {
    return res.status(400).json({ error: 'Video ID is required' });
  }

  try {
    const result = await ytSearch({ videoId }); // Correctly pass videoId to ytSearch
    if (result && result.title) {
      return res.status(200).json(result); // Return the video details directly
    } else {
      return res.status(404).json({ error: 'Video not found' });
    }
  } catch (error) {
    console.error('Error fetching video details:', error);
    return res.status(500).json({ error: 'Failed to fetch video details' });
  }
}
