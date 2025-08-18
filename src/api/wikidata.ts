export async function fetchAIPoliciesFromWikidata() {
  // Force mock data for now to ensure it works
  console.log("fetchAIPoliciesFromWikidata: Using mock data for debugging")
  const { mockPolicies } = await import('./mockData')
  return mockPolicies
}
