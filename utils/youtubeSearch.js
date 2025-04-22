import ytsr from '@distube/ytsr';

export const searchVideos = async (query) => {
  try {
    const searchResults = await ytsr(query, { limit: 10 });
    return searchResults.items
      .filter((item) => item.type === 'video')
      .map((item) => ({
        id: item.id,
        title: item.title,
        url: item.url,
      }));
  } catch (error) {
    console.error('Error searching for videos:', error);
    return [];
  }
};
