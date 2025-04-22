import React from 'react';

export default function VideoList({ videos }) {
  return (
    <div>
      {videos.map((video) => (
        <div key={video.id}>
          <a href={video.url} target="_blank" rel="noopener noreferrer">
            {video.title}
          </a>
        </div>
      ))}
    </div>
  );
}
