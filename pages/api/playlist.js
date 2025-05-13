import ytSearch from 'yt-search';

export default async function handler(req, res) {
  const { playlistId } = req.query;

  if (!playlistId) {
    return res.status(400).json({ error: 'Playlist ID is required' });
  }

  try {
    const result = await ytSearch({ listId: playlistId });
    const videos = result.videos.map((video) => ({
      id: video.videoId,
      title: video.title,
      url: video.url,
      thumbnail: video.thumbnail,
    }));

    res.status(200).json({ videos });
  } catch (error) {
    console.error('Error fetching playlist videos:', error);
    res.status(500).json({ error: 'Failed to fetch playlist videos' });
  }
}
