import React, { useEffect, useMemo, useState } from 'react'
import ReactECharts from 'echarts-for-react'
import type { EChartsOption } from 'echarts'
import { fetchIncidents } from '../api/aiid'

function toMonth(s:string){ return s?.slice(0,7) } // YYYY-MM

export default function IncidentsOverTime({height=320}:{height?:number}){
  const [rows, setRows] = useState<any[]>([])
  const [error, setError] = useState<string|null>(null)

  useEffect(()=>{
    fetchIncidents(200).then(setRows).catch(e=>setError(e.message))
  },[])

  const seriesData = useMemo(()=>{
    const counts = new Map<string, number>()
    for(const r of rows){
      if(!r.date) continue
      const m = toMonth(r.date)
      counts.set(m, (counts.get(m) || 0) + 1)
    }
    const ts = Array.from(counts.entries()).sort(([a],[b])=> a.localeCompare(b))
    return ts
  },[rows])

  const option: EChartsOption = {
    tooltip: { trigger: 'axis' },
    grid: { left: 48, right: 16, top: 24, bottom: 40 },
    xAxis: { type: 'category', data: seriesData.map(d=>d[0]), name: 'Month' },
    yAxis: { type: 'value', name: 'Incidents' },
    series: [{ type: 'line', data: seriesData.map(d=>d[1]), smooth: true }]
  }
  return (
    <div>
      {error ? <div className="text-sm text-red-600">AIID error: {error}</div> : null}
      <ReactECharts option={option} style={{height}} />
    </div>
  )
}
