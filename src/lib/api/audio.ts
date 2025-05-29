// Sends POST request to backend to get a signed S3 URL
export async function fetchWordAudioUrl(audioUrl: string): Promise<string> {
  const res = await fetch('/api/audio', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ audioUrl }),
  });

  if (!res.ok) throw new Error('Failed to fetch audio URL');
  const data = await res.json();

  return data.audioUrl;
}
