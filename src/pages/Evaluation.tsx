import React from 'react'
import BenchmarksScatter from '../components/BenchmarksScatter'
import BenchmarksTable from '../components/BenchmarksTable'

export default function Evaluation() {
  return (
    <div className="space-y-6">
      <div className="card">
        <div className="card-header">Open LLM Leaderboard — Interactive Scatter</div>
        <div className="card-body">
          <BenchmarksScatter height={360} />
        </div>
      </div>
      <div className="card">
        <div className="card-header">Benchmark Results (latest)</div>
        <div className="card-body">
          <BenchmarksTable />
        </div>
      </div>
    </div>
  )
}
