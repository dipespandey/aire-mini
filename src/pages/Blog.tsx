import React from 'react'

const blogPosts = [
  {
    id: 1,
    title: "The Evolution of AI Safety Research: A 2024 Perspective",
    excerpt: "An analysis of recent trends in AI safety research, including new methodologies for alignment and capability evaluation.",
    author: "Dr. Sarah Chen",
    date: "2024-12-15",
    readTime: "8 min read",
    tags: ["AI Safety", "Research", "Alignment"]
  },
  {
    id: 2,
    title: "Policy Gaps in AI Regulation: Lessons from Recent Incidents",
    excerpt: "Examining how recent AI incidents have revealed gaps in current regulatory frameworks and policy approaches.",
    author: "Prof. Michael Rodriguez",
    date: "2024-12-10",
    readTime: "12 min read",
    tags: ["Policy", "Regulation", "Incidents"]
  },
  {
    id: 3,
    title: "Benchmark Limitations: What LLM Evaluations Don't Tell Us",
    excerpt: "A critical look at current benchmarking practices and their limitations in assessing real-world AI capabilities.",
    author: "Dr. Lisa Wang",
    date: "2024-12-05",
    readTime: "10 min read",
    tags: ["Benchmarks", "Evaluation", "LLMs"]
  }
]

export default function Blog() {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight mb-4">AI Risk Explorer Blog</h1>
        <p className="text-slate-600 max-w-2xl mx-auto">
          Expert insights on AI risks, policy developments, and research trends from leading voices in AI safety and governance.
        </p>
      </div>

      <div className="grid gap-6">
        {blogPosts.map(post => (
          <article key={post.id} className="card hover:shadow-lg transition-shadow">
            <div className="card-body">
              <div className="flex justify-between items-start mb-3">
                <div className="space-y-2 flex-1">
                  <h2 className="text-xl font-semibold text-slate-900 hover:text-blue-700 cursor-pointer">
                    {post.title}
                  </h2>
                  <p className="text-slate-600">{post.excerpt}</p>
                </div>
              </div>
              
              <div className="flex items-center justify-between text-sm text-slate-500">
                <div className="flex items-center gap-4">
                  <span>By {post.author}</span>
                  <span>•</span>
                  <span>{new Date(post.date).toLocaleDateString()}</span>
                  <span>•</span>
                  <span>{post.readTime}</span>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-2 mt-3">
                {post.tags.map(tag => (
                  <span key={tag} className="badge">{tag}</span>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>

      <div className="card bg-slate-50">
        <div className="card-body text-center">
          <h3 className="text-lg font-semibold mb-2">Want to contribute?</h3>
          <p className="text-slate-600 mb-4">
            We're always looking for expert perspectives on AI risks and safety. 
            Share your insights with the community.
          </p>
          <button className="btn">Submit Article</button>
        </div>
      </div>
    </div>
  )
}
