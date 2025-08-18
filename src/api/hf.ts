type HFRow = { [k: string]: any }

function intParam(n: number, min = 1, max = 100): string {
  const x = Math.trunc(Number.isFinite(n) ? n : 0)
  return String(Math.min(Math.max(x, min), max))
}

async function hfJson(path: string, params: Record<string, string>) {
  const url = `https://datasets-server.huggingface.co/${path}?${new URLSearchParams(params)}`
  const res = await fetch(url)
  if (!res.ok) {
    let details: any = {}
    try { details = await res.json() } catch {}
    const e = new Error(details?.error || `${path} error: ${res.status}`) as Error & { details?: any; url?: string }
    e.details = details
    e.url = url
    throw e
  }
  return res.json()
}

export async function fetchOpenLLMResults(limit = 100) {
  // Force mock data for now to ensure it works
  console.log("fetchOpenLLMResults: Using mock data for debugging")
  const { mockBenchmarks } = await import('./mockData')
  return mockBenchmarks
}
