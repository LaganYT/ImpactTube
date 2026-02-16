import ytSearch from 'yt-search';

export default async function handler(req, res) {
  const { count = 20 } = req.query;
  const requestedCount = Math.min(parseInt(count), 50); // Cap at 50 for performance

  try {
    // Improved algorithm: More targeted short-form content categories
    const shortsCategories = [
      // High-engagement shorts categories
      { term: 'funny shorts', weight: 3 },
      { term: 'viral shorts', weight: 3 },
      { term: 'trending shorts', weight: 3 },
      { term: 'comedy shorts', weight: 2 },
      { term: 'dance shorts', weight: 2 },
      { term: 'music shorts', weight: 2 },
      { term: 'gaming shorts', weight: 2 },
      { term: 'tutorial shorts', weight: 2 },
      { term: 'life hack shorts', weight: 2 },
      { term: 'satisfying shorts', weight: 2 },
      { term: 'cooking shorts', weight: 1 },
      { term: 'art shorts', weight: 1 },
      { term: 'fitness shorts', weight: 1 },
      { term: 'pet shorts', weight: 1 },
      { term: 'travel shorts', weight: 1 },
      { term: 'prank shorts', weight: 1 },
      { term: 'challenge shorts', weight: 1 },
      { term: 'reaction shorts', weight: 1 },
      { term: 'animation shorts', weight: 1 },
      { term: 'magic shorts', weight: 1 },
      { term: 'sports shorts', weight: 1 },
      { term: 'motivational shorts', weight: 1 }
    ];

    // Weighted random selection for better variety
    const totalWeight = shortsCategories.reduce((sum, cat) => sum + cat.weight, 0);
    let random = Math.random() * totalWeight;
    let selectedCategory = shortsCategories[0].term;
    
    for (const category of shortsCategories) {
      random -= category.weight;
      if (random <= 0) {
        selectedCategory = category.term;
        break;
      }
    }
    
    const searchTerm = selectedCategory;

    const result = await ytSearch(searchTerm);

    // Filter videos that are under 60 seconds (shorts format)
    const shortVideos = result.videos
      .filter((video) => {
        if (!video.duration?.seconds) return false;
        return video.duration.seconds <= 60 && video.duration.seconds > 10;
      })
      .slice(0, requestedCount)
      .map((video) => ({
        id: video.videoId,
        title: video.title,
        url: video.url,
        thumbnail: video.thumbnail,
        duration: video.duration?.timestamp || '0:00',
        viewCount: video.views,
        author: {
          name: video.author?.name || 'Unknown',
          url: video.author?.url || '#'
        }
      }));

    // If we don't have enough shorts, return all videos under 2 minutes
    if (shortVideos.length < Math.min(requestedCount, 5)) {
      const alternativeShorts = result.videos
        .filter((video) => {
          if (!video.duration?.seconds) return false;
          return video.duration.seconds <= 120;
        })
        .slice(0, requestedCount)
        .map((video) => ({
          id: video.videoId,
          title: video.title,
          url: video.url,
          thumbnail: video.thumbnail,
          duration: video.duration?.timestamp || '0:00',
          viewCount: video.views,
          author: {
            name: video.author?.name || 'Unknown',
            url: video.author?.url || '#'
          }
        }));

      return res.status(200).json({ shorts: alternativeShorts });
    }

    res.status(200).json({ shorts: shortVideos });
  } catch (error) {
    console.error('Error fetching shorts:', error);
    res.status(500).json({ error: 'Failed to fetch shorts' });
  }
}

