import React, { useEffect, useMemo, useState } from 'react'
import { useReactTable, getCoreRowModel, flexRender, ColumnDef, getSortedRowModel, SortingState, getFilteredRowModel } from '@tanstack/react-table'
import { fetchIncidents } from '../api/aiid'
import LoadingSpinner from './LoadingSpinner'

type Row = {
  id: string
  title: string
  date: string | null
  tags: string[]
  reports: { title: string, url: string }[]
}

export default function IncidentsTable(){
  const [rows, setRows] = useState<Row[]>([])
  const [error, setError] = useState<string|null>(null)
  const [loading, setLoading] = useState(true)
  const [sorting, setSorting] = useState<SortingState>([])
  const [globalFilter, setGlobalFilter] = useState('')
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set())

  useEffect(()=>{
    setLoading(true)
    fetchIncidents(50)
      .then(data => {
        console.log("IncidentsTable received data:", data?.length || 0, "incidents")
        setRows(Array.isArray(data) ? data : [])
      })
      .catch(e=>{
        console.error("IncidentsTable error:", e)
        setError(e.message)
        setRows([]) // Ensure rows is always an array
      })
      .finally(()=>setLoading(false))
  },[])

  const toggleExpanded = (id: string) => {
    const newExpanded = new Set(expandedRows)
    if (newExpanded.has(id)) {
      newExpanded.delete(id)
    } else {
      newExpanded.add(id)
    }
    setExpandedRows(newExpanded)
  }

  const columns = useMemo<ColumnDef<Row>[]>(()=>[
    { 
      id: 'expand',
      header: '',
      cell: info => (
        <button 
          onClick={() => toggleExpanded(info.row.original.id)}
          className="text-blue-600 hover:text-blue-800 font-mono text-lg"
        >
          {expandedRows.has(info.row.original.id) ? '−' : '+'}
        </button>
      ),
      size: 40,
      enableSorting: false,
      enableGlobalFilter: false
    },
    { 
      header: 'ID', 
      accessorKey: 'id',
      cell: info => <span className="font-mono text-sm">{info.getValue() as string}</span>
    },
    { 
      header: 'Title', 
      accessorKey: 'title',
      cell: info => <div className="font-medium">{info.getValue() as string}</div>
    },
    { 
      header: 'Date', 
      accessorKey: 'date',
      cell: info => {
        const date = info.getValue() as string | null
        return date ? new Date(date).toLocaleDateString() : '—'
      }
    },
    { 
      header: 'Tags',
      accessorKey: 'tags',
      cell: info => (
        <div className="flex flex-wrap gap-1">
          {(info.row.original.tags || []).slice(0, 3).map((t,i)=>(
            <span key={i} className="badge">{t}</span>
          ))}
          {(info.row.original.tags || []).length > 3 && (
            <span className="text-xs text-slate-500">+{info.row.original.tags.length - 3} more</span>
          )}
        </div>
      ),
      filterFn: 'arrIncludesAll'
    }
  ],[expandedRows])

  const table = useReactTable({ 
    data: rows, 
    columns, 
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: { sorting, globalFilter },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: 'includesString',
    enableFilters: true,
    enableGlobalFilter: true,
  })
  if (loading) return <LoadingSpinner size="lg" />

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <input
          value={globalFilter ?? ''}
          onChange={e => setGlobalFilter(e.target.value)}
          placeholder="Search incidents..."
          className="border border-slate-300 rounded px-3 py-2 text-sm"
        />
        <span className="text-sm text-slate-600">
          {table.getFilteredRowModel().rows.length} incident(s)
        </span>
      </div>
      
      {error ? <div className="text-sm text-red-600 mb-4">AIID error: {error}</div> : null}
      
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="bg-slate-100 text-slate-700">
            {table.getHeaderGroups().map(hg=> (
              <tr key={hg.id}>
                {hg.headers.map(h=> (
                  <th 
                    key={h.id} 
                    className="text-left px-3 py-2 cursor-pointer hover:bg-slate-200 select-none"
                    onClick={h.column.getToggleSortingHandler()}
                  >
                    <div className="flex items-center gap-2">
                      {flexRender(h.column.columnDef.header, h.getContext())}
                      {{
                        asc: ' ↑',
                        desc: ' ↓',
                      }[h.column.getIsSorted() as string] ?? ''}
                    </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map(row=> (
              <React.Fragment key={row.id}>
                <tr className="border-b hover:bg-slate-50">
                  {row.getVisibleCells().map(cell => (
                    <td key={cell.id} className="px-3 py-2">{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
                  ))}
                </tr>
                {expandedRows.has(row.original.id) && (
                  <tr className="bg-slate-50">
                    <td colSpan={5} className="px-3 py-4">
                      <div className="space-y-3">
                        <div>
                          <h4 className="font-semibold text-sm mb-2">All Tags:</h4>
                          <div className="flex flex-wrap gap-1">
                            {row.original.tags.map((tag, i) => (
                              <span key={i} className="badge">{tag}</span>
                            ))}
                          </div>
                        </div>
                        <div>
                          <h4 className="font-semibold text-sm mb-2">Reports ({row.original.reports.length}):</h4>
                          <ul className="space-y-1">
                            {row.original.reports.map((report, i) => (
                              <li key={i}>
                                <a 
                                  className="link text-sm" 
                                  href={report.url} 
                                  target="_blank" 
                                  rel="noreferrer"
                                >
                                  {report.title || report.url}
                                </a>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
