import ytSearch from 'yt-search';

export default async function handler(req, res) {
  const { count = 20 } = req.query;
  const requestedCount = Math.min(parseInt(count), 50); // Cap at 50 for performance

  try {
    // Diverse search strategies for better variety
    const searchStrategies = [
      // Popular hashtags
      '#shorts', '#viral', '#trending', '#fyp', '#foryou',
      // Categories
      'funny', 'comedy', 'dance', 'music', 'gaming', 'tutorial', 'life hacks',
      'amazing', 'satisfying', 'cooking', 'art', 'fitness', 'pets', 'travel',
      // Time-based trending
      'today', 'this week', 'latest', 'new',
      // Entertainment
      'pranks', 'challenges', 'reactions', 'animation', 'magic tricks',
      'sports highlights', 'motivational', 'facts', 'science', 'tech'
    ];

    // Add some randomness with combined terms occasionally
    const useDoubleSearch = Math.random() > 0.7;
    let searchTerm;
    
    if (useDoubleSearch && searchStrategies.length > 1) {
      const term1 = searchStrategies[Math.floor(Math.random() * searchStrategies.length)];
      const term2 = searchStrategies[Math.floor(Math.random() * searchStrategies.length)];
      searchTerm = term1 !== term2 ? `${term1} ${term2}` : term1;
    } else {
      searchTerm = searchStrategies[Math.floor(Math.random() * searchStrategies.length)];
    }

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

