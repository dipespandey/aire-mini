import React, { useEffect, useState } from 'react'
import ReactECharts from 'echarts-for-react'
import type { EChartsOption } from 'echarts'
import { fetchAISafetyPublicationsByYear } from '../api/openalex'
import LoadingSpinner from './LoadingSpinner'

export default function RiskPubsLine({ height=300 }: {height?: number}) {
  const [series, setSeries] = useState<{year:number, count:number}[]>([])
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(()=>{
    setLoading(true)
    fetchAISafetyPublicationsByYear()
      .then(setSeries)
      .catch(e=>setError(e.message))
      .finally(()=>setLoading(false))
  },[])

  const years = series.map(d=>d.year)
  const counts = series.map(d=>d.count)

  const option: EChartsOption = {
    tooltip: { trigger: 'axis' },
    grid: { left: 40, right: 16, top: 24, bottom: 36 },
    xAxis: { type: 'category', data: years },
    yAxis: { type: 'value', name: 'Publications' },
    series: [
      { type: 'line', data: counts, smooth: true }
    ]
  }
  if (loading) return <LoadingSpinner size="lg" />

  return (
    <div>
      {error ? <div className="text-sm text-red-600">OpenAlex error: {error}</div> : null}
      <ReactECharts option={option} style={{height}} notMerge={true} lazyUpdate={true} />
    </div>
  )
}
