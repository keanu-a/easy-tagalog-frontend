import { NextRequest, NextResponse } from 'next/server';

// Validate environment variables
const backendUrl = process.env.BACKEND_API_URL;
if (!backendUrl) throw new Error('Missing environment variables: ');

export async function POST(req: Request) {
  const apiUrl = `${process.env.BACKEND_API_URL}/api/audio`;

  const { audioUrl } = await req.json();

  if (!audioUrl) {
    return NextResponse.json({ error: 'Missing audio URL' }, { status: 400 });
  }

  try {
    const res = await fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ audioUrl }),
    });

    const data = await res.json();

    if (!res.ok) {
      return NextResponse.json(
        { error: 'Backend returned error', details: data },
        { status: res.status }
      );
    }

    return NextResponse.json(data);
  } catch (err) {
    console.error('Dictionary proxy error:', err);
    return NextResponse.json(
      {
        error: 'Internal Server Error',
      },
      { status: 500 }
    );
  }
}
