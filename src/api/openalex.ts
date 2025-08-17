export async function fetchAISafetyPublicationsByYear() {
  // Group by year using OpenAlex (free, no auth). We use 'search' and 'group_by=publication_year'.
  // Docs: https://docs.openalex.org/how-to-use-the-api/api-overview
  const url = 'https://api.openalex.org/works?filter=title.search:AI%20safety OR title.search:AI%20risk&group_by=publication_year&per_page=200'

  const res = await fetch(url)
  if (!res.ok) throw new Error('OpenAlex error: ' + res.status)
  const data = await res.json()
  // data.group_by returns list of { key: '2023', count: n }
  const groups = (data?.group_by ?? []).map((g:any)=>({ year: Number(g.key), count: g.count }))
  // sort by year
  return groups.sort((a:any,b:any)=>a.year-b.year)
}
