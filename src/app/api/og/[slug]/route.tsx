import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export async function GET(request: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#000000',
          backgroundImage: 'radial-gradient(circle at 50% 0%, #0072ff 0%, #000000 70%)',
          color: 'white',
          fontWeight: 700,
        }}
      >
        <div style={{ fontSize: 32, marginBottom: 20, opacity: 0.5, fontFamily: 'monospace' }}>dscrd.wtf</div>
        <div style={{ fontSize: 96, background: 'linear-gradient(to bottom, #fff, #888)', backgroundClip: 'text', color: 'transparent' }}>
          /{slug}
        </div>
        <div style={{ 
            fontSize: 24, 
            marginTop: 40, 
            padding: '10px 30px', 
            borderRadius: 50, 
            backgroundColor: '#0072ff',
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            boxShadow: '0 0 40px -10px #0072ff'
        }}>
            View Profile
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    },
  );
}
