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
  const params = {
    dataset: 'open-llm-leaderboard/results',
    config: 'default',
    split: 'train',
    offset: '0',
    length: intParam(limit, 1, 100),
  }

  const data = await hfJson('first-rows', params)

  const rawRows: HFRow[] = (data?.rows ?? []).map((r: any) => r?.row ?? r ?? {})

  const normalized = rawRows.map(r => {
    const leaderboard = r.results?.leaderboard ?? {}
    const metrics: Record<string, number> = {}

    // keys like "hellaswag,acc_norm" → "hellaswag"
    Object.entries(leaderboard).forEach(([k, v]) => {
      if (typeof v === "number") {
        const task = k.split(",")[0]
        metrics[task] = v
      }
    })

    return {
      model: r.model ?? r.model_name ?? r.repo ?? 'unknown',
      ...metrics,
    }
  })

  console.log("Fetched Open LLM normalized:", normalized.slice(0, 5))
  return normalized
}
