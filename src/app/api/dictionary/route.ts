import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get('q');

  if (!query) {
    return NextResponse.json(
      {
        error: 'Missing query',
      },
      { status: 400 }
    );
  }

  const backendUrl = process.env.BACKEND_API_URL;
  if (!backendUrl) {
    return NextResponse.json(
      { error: 'Missing BACKEND_API_URL env var' },
      { status: 500 }
    );
  }

  const apiUrl = `${
    process.env.BACKEND_API_URL
  }/api/words/search/${encodeURIComponent(query)}`;

  try {
    const res = await fetch(apiUrl);
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
        error: 'Failed to fetch from backend. Make sure the server is running.',
      },
      { status: 500 }
    );
  }
}
