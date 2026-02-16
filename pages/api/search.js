import ytSearch from 'yt-search';

export default async function handler(req, res) {
  const { query, type = 'video' } = req.query;

  if (!query) {
    return res.status(400).json({ error: 'Query parameter is required' });
  }

  try {
    // Utilize yt-search package more effectively with options
    const searchOptions = {
      query: query,
      pageStart: 1,
      pageEnd: 2, // Search 2 pages for better results
    };
    
    const result = await ytSearch(searchOptions);
    
    // Enhanced video mapping with more metadata
    const videos = result.videos.slice(0, 30).map((video) => ({
      id: video.videoId,
      title: video.title,
      url: video.url,
      thumbnail: video.thumbnail,
      duration: video.duration?.timestamp || '0:00',
      viewCount: video.views,
      author: {
        name: video.author?.name || 'Unknown',
        url: video.author?.url || video.author?.channel_url || '',
        verified: video.author?.verified || false
      },
      uploadedAt: video.ago || video.uploadedAt || '',
      description: video.description || ''
    }));

    res.status(200).json({ videos });
  } catch (error) {
    console.error('Error fetching videos:', error);
    res.status(500).json({ error: 'Failed to fetch videos' });
  }
}
