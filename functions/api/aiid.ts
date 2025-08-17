// File-based routing: /functions/api/aiid.ts -> available at /api/aiid
export const onRequestOptions: PagesFunction = async () => {
  return new Response('', {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
    }
  })
}

export const onRequestPost: PagesFunction = async ({ request }) => {
  const body = await request.text()
  const resp = await fetch('https://incidentdatabase.ai/api/graphql', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body
  })
  const text = await resp.text()
  return new Response(text, {
    status: resp.status,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    }
  })
}
