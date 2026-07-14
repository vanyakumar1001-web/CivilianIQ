interface JsonSchemaFormat {
  type: 'object';
  properties: Record<string, unknown>;
  required: string[];
  additionalProperties: false;
}

interface CreateMessageArgs {
  system: string;
  userContent: string;
  schema: JsonSchemaFormat;
  maxTokens: number;
}

export async function callClaude({ system, userContent, schema, maxTokens }: CreateMessageArgs) {
  const apiKey = Deno.env.get('ANTHROPIC_API_KEY');
  if (!apiKey) throw new Error('ANTHROPIC_API_KEY is not configured');

  const res = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify({
      model: 'claude-sonnet-5',
      max_tokens: maxTokens,
      system,
      messages: [{ role: 'user', content: userContent }],
      output_config: { format: { type: 'json_schema', schema } },
    }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Anthropic API error (${res.status}): ${text}`);
  }

  const data = await res.json();
  if (data.stop_reason === 'max_tokens') {
    throw new Error('Response truncated at max_tokens');
  }

  const textBlock = (data.content as { type: string; text?: string }[]).find((b) => b.type === 'text');
  if (!textBlock?.text) throw new Error('No text block in Anthropic response');

  return JSON.parse(textBlock.text);
}
