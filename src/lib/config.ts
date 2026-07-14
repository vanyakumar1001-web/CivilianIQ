// Base URL for the Supabase Edge Functions backend (see /supabase in the main
// CivilianIQ repo). Set VITE_SUPABASE_FUNCTIONS_URL in your environment —
// e.g. https://<project-ref>.supabase.co/functions/v1 — after deploying the
// classify, coach, and deepgram-token functions.
const SUPABASE_FUNCTIONS_URL = import.meta.env.VITE_SUPABASE_FUNCTIONS_URL || '';

export function functionUrl(name: 'classify' | 'coach' | 'deepgram-token'): string {
  if (!SUPABASE_FUNCTIONS_URL) {
    console.warn(
      'VITE_SUPABASE_FUNCTIONS_URL is not set — API calls will fail until it points at your deployed Supabase Edge Functions.'
    );
  }
  return `${SUPABASE_FUNCTIONS_URL}/${name}`;
}
