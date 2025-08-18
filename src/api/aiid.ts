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
  // Force mock data for now to ensure it works
  console.log("fetchIncidents: Using mock data for debugging")
  const { mockIncidents } = await import('./mockData')
  return mockIncidents
}
