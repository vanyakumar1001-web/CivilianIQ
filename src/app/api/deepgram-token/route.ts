import { NextResponse } from 'next/server';

// Cached for the life of this server process — avoids one extra Deepgram
// call per session just to look up an id that never changes.
let cachedProjectId: string | null = null;

async function getProjectId(apiKey: string): Promise<string> {
  if (cachedProjectId) return cachedProjectId;

  const res = await fetch('https://api.deepgram.com/v1/projects', {
    headers: { Authorization: `Token ${apiKey}` },
  });
  if (!res.ok) {
    throw new Error(`Failed to list Deepgram projects (${res.status})`);
  }
  const data: { projects?: { project_id: string }[] } = await res.json();
  const projectId = data?.projects?.[0]?.project_id;
  if (!projectId) throw new Error('No Deepgram project found for this API key');

  cachedProjectId = projectId;
  return projectId;
}

// Mints a short-lived, narrowly-scoped Deepgram key so the browser can open a
// live transcription WebSocket directly without ever seeing our real API key.
export async function POST() {
  const apiKey = process.env.DEEPGRAM_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: 'Live transcription is not configured' }, { status: 500 });
  }

  try {
    const projectId = await getProjectId(apiKey);

    const res = await fetch(`https://api.deepgram.com/v1/projects/${projectId}/keys`, {
      method: 'POST',
      headers: {
        Authorization: `Token ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        comment: 'civilianiq-live-session',
        scopes: ['usage:write'],
        time_to_live_in_seconds: 300,
      }),
    });

    if (!res.ok) {
      const text = await res.text();
      console.error('deepgram-token: key creation failed', res.status, text);
      return NextResponse.json({ error: 'Could not start live transcription' }, { status: 502 });
    }

    const data: { key: string } = await res.json();
    return NextResponse.json({ key: data.key });
  } catch (err) {
    console.error('deepgram-token: error', err);
    return NextResponse.json({ error: 'Could not start live transcription' }, { status: 502 });
  }
}
