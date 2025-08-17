const GRAPHQL = `
  query LatestIncidents($limit: Int!) {
    incidents(offset: 0, limit: $limit, sortBy: {field: "date", direction: "desc"}) {
      incident_id
      title
      date
      editors
      tags
      reports {
        title
        url
      }
    }
  }
`

// We call a relative /api/aiid proxy (Cloudflare Pages Function provided in /functions/aiid.ts)
export async function fetchIncidents(limit=100) {
  const url = '/api/aiid'
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query: GRAPHQL, variables: { limit } })
  })
  if (!res.ok) throw new Error('AIID GraphQL error: ' + res.status)
  const data = await res.json()
  // Normalize defensively
  const list = data?.data?.incidents ?? []
  return list.map((it:any)=> ({
    id: it.incident_id ?? it.id ?? 'n/a',
    title: it.title ?? '(untitled)',
    date: it.date ?? null,
    tags: it.tags ?? [],
    reports: it.reports ?? []
  }))
}
