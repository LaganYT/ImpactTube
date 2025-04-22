import ytSearch from 'yt-search';

export const searchVideos = async (query) => {
  try {
    const result = await ytSearch(query);

    return result.videos.map((video) => ({
      id: video.videoId,
      title: video.title,
      url: video.url,
    }));
  } catch (error) {
    console.error('Error searching for videos:', error);
    return [];
  }
};
