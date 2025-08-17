export async function fetchAIPoliciesFromWikidata() {
  const endpoint = 'https://query.wikidata.org/sparql'
  const query = `
    SELECT ?policy ?policyLabel ?country ?countryLabel ?inception WHERE {
      ?policy wdt:P31 ?doctype .
      FILTER(?doctype IN (wd:Q7748, wd:Q18377006, wd:Q1151909, wd:Q1151067, wd:Q180686, wd:Q59127078)).
      ?policy wdt:P921 wd:Q11660 .
      OPTIONAL { ?policy wdt:P1001 ?country . }
      OPTIONAL { ?policy wdt:P495 ?country . }
      OPTIONAL { ?policy wdt:P571 ?inception . }
      SERVICE wikibase:label { bd:serviceParam wikibase:language "en". }
    }
    LIMIT 200
  `
  const url = endpoint + '?format=json&query=' + encodeURIComponent(query)
  const res = await fetch(url, { headers: { 'Accept': 'application/sparql-results+json' } })
  if (!res.ok) throw new Error('Wikidata error: ' + res.status)
  const json = await res.json()
  const rows = json.results.bindings.map((b:any)=> ({
    policy: b.policy.value,
    policyLabel: b.policyLabel?.value ?? '(no label)',
    country: b.country?.value ?? null,
    countryLabel: b.countryLabel?.value ?? '—',
    inception: b.inception?.value ?? null
  }))
  return rows
}
