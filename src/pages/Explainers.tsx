import React, { useState } from 'react'
import RiskPubsLine from '../components/RiskPubsLine'

export default function Explainers() {
  const [selectedRisk, setSelectedRisk] = useState(2)
  
  const riskLevels = [
    {
      level: 0,
      label: 'Low',
      color: 'bg-slate-50 border-slate-200 text-slate-700',
      selectedColor: 'bg-emerald-50 border-emerald-200 ring-2 ring-emerald-300',
      icon: '✅',
      description: 'Localized issues, limited blast radius, reversible.',
      examples: ['Minor model biases', 'Temporary service outages', 'Easily correctable errors']
    },
    {
      level: 1,
      label: 'Moderate',
      color: 'bg-slate-50 border-slate-200 text-slate-700',
      selectedColor: 'bg-amber-50 border-amber-200 ring-2 ring-amber-300',
      icon: '⚠️',
      description: 'Broader impact, needs coordination to mitigate.',
      examples: ['Data privacy violations', 'Algorithmic discrimination', 'Misinformation spread']
    },
    {
      level: 2,
      label: 'High',
      color: 'bg-slate-50 border-slate-200 text-slate-700',
      selectedColor: 'bg-orange-50 border-orange-200 ring-2 ring-orange-300',
      icon: '🚨',
      description: 'Serious harm plausible without safeguards; requires active monitoring.',
      examples: ['Autonomous vehicle accidents', 'Financial market manipulation', 'Critical infrastructure failures']
    },
    {
      level: 3,
      label: 'Severe',
      color: 'bg-slate-50 border-slate-200 text-slate-700',
      selectedColor: 'bg-rose-50 border-rose-200 ring-2 ring-rose-300',
      icon: '🔴',
      description: 'Widespread harm likely absent strong governance and technical controls.',
      examples: ['Mass surveillance systems', 'Autonomous weapons deployment', 'Economic disruption at scale']
    },
    {
      level: 4,
      label: 'Catastrophic',
      color: 'bg-slate-50 border-slate-200 text-slate-700',
      selectedColor: 'bg-violet-50 border-violet-200 ring-2 ring-violet-300',
      icon: '💀',
      description: 'Systemic harm on societal scale; requires immediate multi-stakeholder action.',
      examples: ['Existential risk scenarios', 'Complete social breakdown', 'Irreversible global consequences']
    }
  ]

  const selectedLevel = riskLevels[selectedRisk]

  return (
    <div className="space-y-6">
      <div className="card">
        <div className="card-header">AI Risk Level Explorer</div>
        <div className="card-body space-y-6">
          
          {/* Risk Level Cards */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Select a Risk Level to Explore</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
              {riskLevels.map((risk) => (
                <button
                  key={risk.level}
                  onClick={() => setSelectedRisk(risk.level)}
                  className={`p-4 border-2 rounded-lg transition-all duration-200 text-left hover:scale-105 ${
                    selectedRisk === risk.level ? risk.selectedColor : risk.color
                  }`}
                >
                  <div className="text-2xl mb-2">{risk.icon}</div>
                  <div className="font-semibold text-sm">{risk.label}</div>
                  <div className="text-xs opacity-75 mt-1">Level {risk.level + 1}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Selected Risk Details */}
          <div className={`p-6 border-2 rounded-lg ${selectedLevel.selectedColor}`}>
            <div className="flex items-start gap-4">
              <div className="text-4xl">{selectedLevel.icon}</div>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <h3 className="text-xl font-bold">{selectedLevel.label} Risk</h3>
                  <span className="text-sm opacity-75">Level {selectedLevel.level + 1}</span>
                </div>
                <p className="text-lg mb-4">{selectedLevel.description}</p>
                <div>
                  <h4 className="font-semibold mb-2">Example Scenarios:</h4>
                  <ul className="space-y-1">
                    {selectedLevel.examples.map((example, idx) => (
                      <li key={idx} className="text-sm opacity-90">• {example}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Risk Factor Categories */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Risk Assessment Dimensions</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 border rounded-lg bg-slate-50 border-slate-200">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xl">🔧</span>
                  <div className="font-semibold text-slate-700">Technical</div>
                </div>
                <ul className="text-sm text-slate-600 space-y-1">
                  <li>• Model evaluation coverage gaps</li>
                  <li>• Red-team findings & vulnerabilities</li>
                  <li>• Compute & access controls</li>
                  <li>• Safety mechanisms & guardrails</li>
                </ul>
              </div>
              <div className="p-4 border rounded-lg bg-slate-50 border-slate-200">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xl">🏛️</span>
                  <div className="font-semibold text-slate-700">Socio-economic</div>
                </div>
                <ul className="text-sm text-slate-600 space-y-1">
                  <li>• Labor displacement potential</li>
                  <li>• Disinformation & manipulation</li>
                  <li>• Critical infrastructure reliance</li>
                  <li>• Economic inequality effects</li>
                </ul>
              </div>
              <div className="p-4 border rounded-lg bg-slate-50 border-slate-200">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xl">⚖️</span>
                  <div className="font-semibold text-slate-700">Governance</div>
                </div>
                <ul className="text-sm text-slate-600 space-y-1">
                  <li>• Policy coverage & enforcement</li>
                  <li>• Regulatory compliance capacity</li>
                  <li>• International coordination</li>
                  <li>• Oversight & accountability</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-header">📈 Research Trend (AI Safety & Risk Publications)</div>
        <div className="card-body">
          <RiskPubsLine height={320} />
          <p className="text-xs text-slate-500 mt-2">
            Academic publications mentioning "AI safety" or "AI risk" over time, showing growing research attention
          </p>
        </div>
      </div>
    </div>
  )
}