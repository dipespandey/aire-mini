import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import App from './pages/App'
import Home from './pages/Home'
import Explainers from './pages/Explainers'
import Evaluation from './pages/Evaluation'
import Incidents from './pages/Incidents'
import Policy from './pages/Policy'
import Blog from './pages/Blog'
import Newsletter from './pages/Newsletter'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: 'explainers', element: <Explainers /> },
      { path: 'evaluation', element: <Evaluation /> },
      { path: 'incidents', element: <Incidents /> },
      { path: 'policy', element: <Policy /> },
      { path: 'blog', element: <Blog /> },
      { path: 'newsletter', element: <Newsletter /> },
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
