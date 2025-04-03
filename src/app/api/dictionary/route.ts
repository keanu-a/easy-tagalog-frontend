import { NextResponse } from 'next/server';

// Validate environment variables
const backendUrl = process.env.BACKEND_API_URL;
if (!backendUrl) throw new Error('Missing environment variables: ');

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

  const apiUrl = `${
    process.env.BACKEND_API_URL
  }/words/search/${encodeURIComponent(query)}`;

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
        error: 'Internal Server Error',
      },
      { status: 500 }
    );
  }
}
