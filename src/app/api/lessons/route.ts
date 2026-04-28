import { NextResponse } from 'next/server';

// Validate environment variables
const backendUrl = process.env.BACKEND_API_URL;
if (!backendUrl)
  throw new Error('Missing environment variable: BACKEND_API_URL');

export async function GET() {
  const apiUrl = `${backendUrl}/api/lessons/summary`;

  try {
    const res = await fetch(apiUrl);
    const data = await res.json();

    if (!res.ok) {
      return NextResponse.json(
        { error: 'Backend returned error', details: data },
        { status: res.status },
      );
    }

    return NextResponse.json(data);
  } catch (err) {
    console.error('Lessons proxy error:', err);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 },
    );
  }
}
