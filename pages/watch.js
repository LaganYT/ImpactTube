import { useRouter } from 'next/router';

export default function Watch() {
  const router = useRouter();
  const { v } = router.query;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px' }}>
      <div style={{ width: '80%', maxWidth: '1200px' }}>
        {v ? (
          <iframe
            width="100%"
            height="500px"
            src={`https://www.youtube-nocookie.com/embed/${v}`}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        ) : (
          <p>Loading...</p>
        )}
      </div>
      <div style={{ width: '80%', maxWidth: '1200px', marginTop: '20px' }}>
        <h2>Video Title</h2>
        <p>Video description and other details...</p>
      </div>
    </div>
  );
}
