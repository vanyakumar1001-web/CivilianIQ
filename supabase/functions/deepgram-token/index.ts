import { corsHeaders } from '../_shared/cors.ts';

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
// live transcription WebSocket directly without ever seeing the real API key.
Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  const apiKey = Deno.env.get('DEEPGRAM_API_KEY');
  if (!apiKey) {
    return new Response(JSON.stringify({ error: 'Live transcription is not configured' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
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
      return new Response(JSON.stringify({ error: 'Could not start live transcription' }), {
        status: 502,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const data: { key: string } = await res.json();
    return new Response(JSON.stringify({ key: data.key }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error('deepgram-token: error', err);
    return new Response(JSON.stringify({ error: 'Could not start live transcription' }), {
      status: 502,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
