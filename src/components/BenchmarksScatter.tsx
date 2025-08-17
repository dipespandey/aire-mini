import React, { useEffect, useMemo, useState } from 'react'
import ReactECharts from 'echarts-for-react'
import type { EChartsOption } from 'echarts'
import { fetchOpenLLMResults } from '../api/hf'

export default function BenchmarksScatter({height=360}:{height?:number}){
  const [rows, setRows] = useState<any[]>([])
  const [error, setError] = useState<string|null>(null)

  useEffect(()=>{
    fetchOpenLLMResults(100).then(setRows).catch(e=>setError(e.message))
  },[])

  const data = useMemo(()=>{
    // Map real fields from HF rows
    return rows.map(r=>[
      Number(r.acc_norm ?? r.acc ?? 0),                  // x-axis
      Number(r.prompt_level_loose_acc ?? r.acc ?? 0),    // y-axis
      Number(r.size_params_b ?? 0),                      // bubble size
      r.model                                           // label
    ]).filter(d=>!Number.isNaN(d[0]) && !Number.isNaN(d[1]))
  },[rows])

  const option: EChartsOption = {
    tooltip: {
      trigger: 'item',
      formatter: (p:any)=>{
        const [x,y,s,model] = p.value
        return `<div style="font-weight:600">${model}</div>
        <div>Acc Norm: ${x?.toFixed?.(3) ?? '-'}</div>
        <div>Loose Acc: ${y?.toFixed?.(3) ?? '-'}</div>
        <div>Params (B): ${s ?? '-'}</div>`
      }
    },
    grid: { left: 48, right: 16, top: 24, bottom: 40 },
    xAxis: { type: 'value', name: 'Acc Norm' },
    yAxis: { type: 'value', name: 'Loose Acc' },
    series: [{
      type: 'scatter',
      symbolSize: (val:any)=>{
        const s = val[2] || 2
        return Math.max(8, Math.min(40, s * 2))
      },
      data
    }]
  }

  return (
    <div>
      {error ? <div className="text-sm text-red-600">HF error: {error}</div> : null}
      <ReactECharts option={option} style={{height}} />
    </div>
  )
}
