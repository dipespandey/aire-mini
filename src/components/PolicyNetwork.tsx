import React, { useEffect, useMemo, useState } from 'react'
import ReactECharts from 'echarts-for-react'
import type { EChartsOption } from 'echarts'
import { fetchAIPoliciesFromWikidata } from '../api/wikidata'
import LoadingSpinner from './LoadingSpinner'

export default function PolicyNetwork({height=380}:{height?:number}){
  const [rows, setRows] = useState<any[]>([])
  const [error, setError] = useState<string|null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(()=>{ 
    setLoading(true)
    fetchAIPoliciesFromWikidata()
      .then(setRows)
      .catch(e=>setError(e.message))
      .finally(()=>setLoading(false))
  },[])

  const { nodes, edges } = useMemo(()=>{
    const nodesMap = new Map<string, any>()
    const edges: any[] = []
    for(const r of rows){
      const countryId = r.country || 'unknown'
      const cLabel = r.countryLabel || 'Unknown'
      if(!nodesMap.has(countryId)){
        nodesMap.set(countryId, { id: countryId, name: cLabel, category: 0, symbolSize: 28 })
      }
      nodesMap.set(r.policy, { id: r.policy, name: r.policyLabel, category: 1, symbolSize: 12 })
      edges.push({ source: countryId, target: r.policy })
    }
    return { nodes: Array.from(nodesMap.values()), edges }
  },[rows])

  const option: EChartsOption = {
    tooltip: { trigger: 'item' },
    legend: [{ data: ['Country','Policy'] }],
    series: [{
      type: 'graph',
      layout: 'force',
      roam: true,
      data: nodes.map(n => ({...n, value: n.name})),
      categories: [{ name: 'Country' }, { name: 'Policy' }],
      edges,
      label: { show: false },
      force: { repulsion: 150, gravity: 0.05 }
    }]
  }
  if (loading) return <LoadingSpinner size="lg" />

  return (
    <div>
      {error ? <div className="text-sm text-red-600">Wikidata error: {error}</div> : null}
      <ReactECharts option={option} style={{height}} />
    </div>
  )
}
