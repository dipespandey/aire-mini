import React from 'react'
import { Link } from 'react-router-dom'
import RiskPubsLine from '../components/RiskPubsLine'
import BenchmarksScatter from '../components/BenchmarksScatter'

export default function Home() {
  return (
    <div className="space-y-8">
      <section className="grid md:grid-cols-2 gap-6 items-center">
        <div className="space-y-4">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">AI Risk Explorer — Mini Prototype</h1>
          <p className="text-slate-600">A minimal, production-minded slice of AIRE: explainers, live data tables, and interactive charts powered by frequently updated public APIs.</p>
          <div className="flex gap-3">
            <Link className="btn" to="/explainers">View Explainers</Link>
            <Link className="btn" to="/evaluation">Evaluation Hub</Link>
          </div>
          <ul className="text-sm text-slate-600 list-disc pl-5">
            <li>Live data from OpenAlex (research), Hugging Face (benchmarks), Wikidata (policies), and AI Incident Database (incidents).</li>
            <li>Responsive, accessible, and production-ready patterns (tables, filters, charts, collapsible rows).</li>
          </ul>
        </div>
        <div className="grid gap-6">
          <div className="card">
            <div className="card-header">AI Safety Publications Over Time</div>
            <div className="card-body"><RiskPubsLine height={260} /></div>
          </div>
          <div className="card">
            <div className="card-header">Open LLM Leaderboard — Models Scatter</div>
            <div className="card-body"><BenchmarksScatter height={260} /></div>
          </div>
        </div>
      </section>
    </div>
  )
}
