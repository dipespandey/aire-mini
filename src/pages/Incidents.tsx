import React from 'react'
import IncidentsTable from '../components/IncidentsTable'
import IncidentsOverTime from '../components/IncidentsOverTime'

export default function Incidents() {
  return (
    <div className="space-y-6">
      <div className="card">
        <div className="card-header">Incidents Over Time</div>
        <div className="card-body">
          <IncidentsOverTime height={320} />
        </div>
      </div>
      <div className="card">
        <div className="card-header">AI Incident Database — Interactive Table</div>
        <div className="card-body">
          <IncidentsTable />
        </div>
      </div>
      <p className="text-xs text-slate-500">Tip: If you see a CORS error locally, deploy to Cloudflare Pages (or enable the provided Cloudflare Function proxy) to allow server-side proxying of the GraphQL requests.</p>
    </div>
  )
}
