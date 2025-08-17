import React from 'react'
import PolicyTable from '../components/PolicyTable'
import PolicyNetwork from '../components/PolicyNetwork'

export default function Policy() {
  return (
    <div className="space-y-6">
      <div className="card">
        <div className="card-header">Policy Network — Countries ↔ Policies (Wikidata)</div>
        <div className="card-body">
          <PolicyNetwork height={380} />
        </div>
      </div>
      <div className="card">
        <div className="card-header">Policy Tracker (live from Wikidata)</div>
        <div className="card-body">
          <PolicyTable />
        </div>
      </div>
    </div>
  )
}
