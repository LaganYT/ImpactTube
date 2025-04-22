import axios from 'axios';

const API_KEY = 'YOUR_API_KEY';
const BASE_URL = 'https://www.googleapis.com/youtube/v3/search';

export const searchVideos = async (query) => {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        part: 'snippet',
        q: query,
        key: API_KEY,
        type: 'video',
        maxResults: 10,
      },
    });

    return response.data.items.map((item) => ({
      id: item.id.videoId,
      title: item.snippet.title,
      url: `https://www.youtube.com/watch?v=${item.id.videoId}`,
    }));
  } catch (error) {
    console.error('Error searching for videos:', error);
    return [];
  }
};
