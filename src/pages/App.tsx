import React from 'react'
import { Link, NavLink, Outlet } from 'react-router-dom'

export default function App() {
  return (
    <div>
      <header className="border-b border-slate-200 bg-white/75 backdrop-blur sticky top-0 z-10">
        <div className="container-page flex items-center justify-between h-16">
          <Link to="/" className="text-lg font-bold tracking-tight">AIRE<span className="text-slate-500">.mini</span></Link>
          <nav className="flex items-center gap-6 text-sm text-slate-600">
            <NavLink to="/explainers">Explainers</NavLink>
            <NavLink to="/evaluation">Evaluation Hub</NavLink>
            <NavLink to="/incidents">Incidents</NavLink>
            <NavLink to="/policy">Policy</NavLink>
            <NavLink to="/blog">Blog</NavLink>
            <NavLink to="/newsletter">Newsletter</NavLink>
          </nav>
        </div>
      </header>
      <main className="container-page py-6">
        <Outlet />
      </main>
      <footer className="border-t border-slate-200 mt-12 py-6 text-sm text-slate-600">
        <div className="container-page flex items-center justify-between">
          <p>© 2025 AIRE mini prototype. Built with React + Tailwind.</p>
          <a className="link" href="https://github.com/dipespandey" target="_blank" rel="noreferrer">by Dipesh Pandey</a>
        </div>
      </footer>
    </div>
  )
}
