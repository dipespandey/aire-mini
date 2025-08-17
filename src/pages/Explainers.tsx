import React, { useState } from 'react'
import RiskPubsLine from '../components/RiskPubsLine'

export default function Explainers() {
  const [risk, setRisk] = useState(2)
  const labels = ['Low', 'Moderate', 'High', 'Severe', 'Catastrophic']
  const descriptions = [
    'Localized issues, limited blast radius, reversible.',
    'Broader impact, needs coordination to mitigate.',
    'Serious harm plausible without safeguards; requires active monitoring.',
    'Widespread harm likely absent strong governance and technical controls.',
    'Systemic harm on societal scale; requires immediate multi-stakeholder action.'
  ]
  return (
    <div className="space-y-6">
      <div className="card">
        <div className="card-header">Risk Explainer</div>
        <div className="card-body space-y-4">
          <label className="block text-sm font-medium">Risk level</label>
          <input type="range" min={0} max={4} value={risk} onChange={e=>setRisk(parseInt(e.target.value))} className="w-full"/>
          <div className="p-3 bg-slate-50 border rounded">
            <div className="flex items-center gap-3">
              <span className="badge">{labels[risk]}</span>
              <span className="text-slate-700">{descriptions[risk]}</span>
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-3 text-sm">
            <div className="p-3 border rounded">
              <div className="font-semibold mb-1">Technical</div>
              <ul className="list-disc pl-4 space-y-1">
                <li>Model eval coverage gaps</li>
                <li>Red-team findings</li>
                <li>Compute & access controls</li>
              </ul>
            </div>
            <div className="p-3 border rounded">
              <div className="font-semibold mb-1">Socio-economic</div>
              <ul className="list-disc pl-4 space-y-1">
                <li>Labor displacement</li>
                <li>Disinformation exposure</li>
                <li>Critical infrastructure reliance</li>
              </ul>
            </div>
            <div className="p-3 border rounded">
              <div className="font-semibold mb-1">Governance</div>
              <ul className="list-disc pl-4 space-y-1">
                <li>Policy coverage</li>
                <li>Compliance capacity</li>
                <li>International coordination</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-header">Research Trend (AI Safety & Risk)</div>
        <div className="card-body">
          <RiskPubsLine height={320} />
        </div>
      </div>
    </div>
  )
}
