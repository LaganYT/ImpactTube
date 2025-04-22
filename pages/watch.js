import { useRouter } from 'next/router';

export default function Watch() {
  const router = useRouter();
  const { v } = router.query;

  return (
    <div className="video-player">
      {v ? (
        <iframe
          width="560"
          height="315"
          src={`https://www.youtube-nocookie.com/embed/${v}`}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
