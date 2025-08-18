import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import RiskPubsLine from '../components/RiskPubsLine'
import BenchmarksScatter from '../components/BenchmarksScatter'

export default function Home() {
  const [stats, setStats] = useState({
    incidents: '500+',
    policies: '200+',
    benchmarks: '100+',
    publications: '1000+'
  })

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <section className="text-center py-12 bg-gradient-to-br from-slate-50 to-slate-100 -mx-4 px-4 rounded-lg">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
          AI Risk Explorer 
          <span className="text-slate-500 font-normal"> Mini Prototype</span>
        </h1>
        <p className="text-xl text-slate-600 max-w-3xl mx-auto mb-8">
          A comprehensive platform for monitoring large-scale AI risks through interactive data visualization, 
          policy tracking, and incident analysis.
        </p>
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          <Link className="btn" to="/explainers">
            📊 Risk Explainers
          </Link>
          <Link className="btn" to="/evaluation">
            🧪 Evaluation Hub
          </Link>
          <Link className="btn" to="/incidents">
            ⚠️ Incident Tracker
          </Link>
          <Link className="btn" to="/policy">
            📋 Policy Tracker
          </Link>
        </div>
        
        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
          <div className="bg-white rounded-lg p-4 shadow-sm border">
            <div className="text-2xl font-bold text-slate-900">{stats.incidents}</div>
            <div className="text-sm text-slate-600">AI Incidents</div>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-sm border">
            <div className="text-2xl font-bold text-slate-900">{stats.policies}</div>
            <div className="text-sm text-slate-600">Policies Tracked</div>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-sm border">
            <div className="text-2xl font-bold text-slate-900">{stats.benchmarks}</div>
            <div className="text-sm text-slate-600">Benchmarks</div>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-sm border">
            <div className="text-2xl font-bold text-slate-900">{stats.publications}</div>
            <div className="text-sm text-slate-600">Research Papers</div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="grid md:grid-cols-3 gap-6">
        <div className="card">
          <div className="card-header">🔍 Live Data Integration</div>
          <div className="card-body">
            <p className="text-sm text-slate-600 mb-3">
              Real-time data from trusted sources including OpenAlex, Hugging Face, Wikidata, and the AI Incident Database.
            </p>
            <ul className="text-sm text-slate-600 space-y-1">
              <li>• Research publications tracking</li>
              <li>• Model performance benchmarks</li>
              <li>• Policy and regulation updates</li>
              <li>• Incident monitoring and analysis</li>
            </ul>
          </div>
        </div>
        
        <div className="card">
          <div className="card-header">📊 Interactive Visualizations</div>
          <div className="card-body">
            <p className="text-sm text-slate-600 mb-3">
              Advanced charts, sortable tables, and network graphs for comprehensive data exploration.
            </p>
            <ul className="text-sm text-slate-600 space-y-1">
              <li>• Collapsible data tables</li>
              <li>• Real-time filtering and search</li>
              <li>• Interactive scatter plots</li>
              <li>• Network relationship mapping</li>
            </ul>
          </div>
        </div>
        
        <div className="card">
          <div className="card-header">⚡ Production Ready</div>
          <div className="card-body">
            <p className="text-sm text-slate-600 mb-3">
              Built with modern web technologies and best practices for performance and accessibility.
            </p>
            <ul className="text-sm text-slate-600 space-y-1">
              <li>• Responsive design</li>
              <li>• Error handling & loading states</li>
              <li>• TypeScript for type safety</li>
              <li>• Optimized API interactions</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Charts Section */}
      <section className="grid lg:grid-cols-2 gap-6">
        <div className="card">
          <div className="card-header">📈 AI Safety Research Trends</div>
          <div className="card-body">
            <RiskPubsLine height={300} />
            <p className="text-xs text-slate-500 mt-2">
              Publications mentioning "AI safety" or "AI risk" over time (OpenAlex data)
            </p>
          </div>
        </div>
        <div className="card">
          <div className="card-header">🎯 Model Performance Landscape</div>
          <div className="card-body">
            <BenchmarksScatter height={300} />
            <p className="text-xs text-slate-500 mt-2">
              Open LLM Leaderboard models by performance metrics (Hugging Face data)
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
