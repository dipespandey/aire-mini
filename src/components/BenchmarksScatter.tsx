import React, { useEffect, useMemo, useState } from 'react'
import ReactECharts from 'echarts-for-react'
import type { EChartsOption } from 'echarts'
import { fetchOpenLLMResults } from '../api/hf'
import LoadingSpinner from './LoadingSpinner'

export default function BenchmarksScatter({height=360}:{height?:number}){
  const [rows, setRows] = useState<any[]>([])
  const [error, setError] = useState<string|null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(()=>{
    setLoading(true)
    fetchOpenLLMResults(100)
      .then(data => {
        console.log("BenchmarksScatter fetchOpenLLMResults returned:", data.length, "items")
        console.log("First few items:", data.slice(0, 3))
        setRows(data)
      })
      .catch(e=>{
        console.error("BenchmarksScatter fetchOpenLLMResults failed:", e)
        setError(e.message)
        // Force mock data on error
        import('../api/mockData').then(({ mockBenchmarks }) => {
          console.log("BenchmarksScatter using mock data:", mockBenchmarks.length, "items")
          setRows(mockBenchmarks)
        })
      })
      .finally(()=>setLoading(false))
  },[])

  const data = useMemo(()=>{
    console.log("BenchmarksScatter received rows:", rows.length, rows.slice(0, 2))
    
    // Map real fields from HF rows with more flexible fallbacks
    const mappedData = rows.map(r=>{
      // Use different combinations of metrics for x and y axes
      const xVal = Number(r.avg ?? r.arc ?? r.hellaswag ?? r.mmlu ?? 0)
      const yVal = Number(r.mmlu ?? r.hellaswag ?? r.avg ?? r.arc ?? 0)
      const size = Number(r.size_params_b ?? 7)
      
      return [xVal, yVal, size, r.model]
    }).filter(d=>!Number.isNaN(d[0]) && !Number.isNaN(d[1]) && d[0] > 0 && d[1] > 0)
    
    console.log("BenchmarksScatter mapped data:", mappedData.length, mappedData.slice(0, 3))
    return mappedData
  },[rows])

  const option: EChartsOption = {
    tooltip: {
      trigger: 'item',
      formatter: (p:any)=>{
        const [x,y,s,model] = p.value
        return `<div style="font-weight:600">${model}</div>
        <div>Performance Score: ${x?.toFixed?.(3) ?? '-'}</div>
        <div>Task Score: ${y?.toFixed?.(3) ?? '-'}</div>
        <div>Params (B): ${s ?? '-'}</div>`
      }
    },
    grid: { left: 48, right: 16, top: 24, bottom: 40 },
    xAxis: { type: 'value', name: 'Performance Score' },
    yAxis: { type: 'value', name: 'Task Score' },
    series: [{
      type: 'scatter',
      symbolSize: (val:any)=>{
        const s = val[2] || 2
        return Math.max(8, Math.min(40, s * 2))
      },
      data
    }]
  }

  if (loading) return <LoadingSpinner size="lg" />
  
  return (
    <div>
      {error ? <div className="text-sm text-red-600">HF error: {error}</div> : null}
      <ReactECharts option={option} style={{height}} />
    </div>
  )
}
