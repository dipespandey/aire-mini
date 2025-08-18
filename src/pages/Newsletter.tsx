import React, { useState } from 'react'

const pastEditions = [
  {
    id: 1,
    title: "December 2024: AI Safety Milestone & Policy Updates",
    date: "2024-12-01",
    highlights: [
      "EU AI Act implementation timeline announced",
      "New benchmark results from OpenAI and Anthropic",
      "Analysis of 15 new AI incidents reported this month"
    ]
  },
  {
    id: 2,
    title: "November 2024: Governance Frameworks & Research Trends",
    date: "2024-11-01",
    highlights: [
      "G7 AI governance framework published",
      "Safety evaluation methodology improvements",
      "Policy gap analysis from recent incidents"
    ]
  },
  {
    id: 3,
    title: "October 2024: Incident Response & International Cooperation",
    date: "2024-10-01",
    highlights: [
      "New international AI safety consortium formed",
      "Analysis of supply chain risks in AI systems",
      "Updated risk taxonomies and evaluation frameworks"
    ]
  }
]

export default function Newsletter() {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setSubscribed(true)
      setTimeout(() => setSubscribed(false), 3000)
      setEmail('')
    }
  }

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight mb-4">AI Risk Monitor Newsletter</h1>
        <p className="text-slate-600 max-w-2xl mx-auto">
          Monthly updates on the AI risk landscape, including incident analysis, policy developments, 
          and research trends from around the world.
        </p>
      </div>

      {/* Subscription Form */}
      <div className="card bg-gradient-to-br from-blue-50 to-slate-50">
        <div className="card-body text-center">
          <h2 className="text-xl font-semibold mb-4">Stay Informed</h2>
          <p className="text-slate-600 mb-6">
            Get monthly insights delivered to your inbox. Join 2,500+ AI researchers, 
            policymakers, and industry leaders.
          </p>
          
          {subscribed ? (
            <div className="text-green-600 font-medium">
              ✓ Thanks for subscribing! Check your inbox for confirmation.
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="max-w-md mx-auto flex gap-3">
              <input 
                className="border border-slate-300 rounded-md px-4 py-2 flex-1 focus:outline-none focus:ring-2 focus:ring-blue-500" 
                type="email" 
                placeholder="your@email.com" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button className="btn" type="submit">Subscribe</button>
            </form>
          )}
          
          <p className="text-xs text-slate-500 mt-3">
            Free forever. Unsubscribe anytime. No spam.
          </p>
        </div>
      </div>

      {/* Sample Content */}
      <div className="card">
        <div className="card-header">What You'll Get</div>
        <div className="card-body">
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-2xl mb-2">📊</div>
              <h3 className="font-semibold mb-2">Data-Driven Insights</h3>
              <p className="text-sm text-slate-600">
                Quantitative analysis of incident trends, policy coverage, and research progress
              </p>
            </div>
            <div className="text-center">
              <div className="text-2xl mb-2">🔍</div>
              <h3 className="font-semibold mb-2">Expert Analysis</h3>
              <p className="text-sm text-slate-600">
                Deep dives into significant events, policy changes, and emerging risks
              </p>
            </div>
            <div className="text-center">
              <div className="text-2xl mb-2">🌍</div>
              <h3 className="font-semibold mb-2">Global Perspective</h3>
              <p className="text-sm text-slate-600">
                Coverage of international developments and cross-border collaboration efforts
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Past Editions */}
      <div>
        <h2 className="text-2xl font-semibold mb-6">Recent Editions</h2>
        <div className="space-y-4">
          {pastEditions.map(edition => (
            <div key={edition.id} className="card">
              <div className="card-body">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="font-semibold text-slate-900">{edition.title}</h3>
                  <span className="text-sm text-slate-500">
                    {new Date(edition.date).toLocaleDateString()}
                  </span>
                </div>
                <ul className="text-sm text-slate-600 space-y-1">
                  {edition.highlights.map((highlight, i) => (
                    <li key={i}>• {highlight}</li>
                  ))}
                </ul>
                <button className="btn-secondary mt-3 text-sm">Read Full Edition</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
