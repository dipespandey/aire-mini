import React, { useEffect, useMemo, useState } from 'react'
import { useReactTable, getCoreRowModel, flexRender, ColumnDef, getSortedRowModel, SortingState, getFilteredRowModel } from '@tanstack/react-table'
import { fetchAIPoliciesFromWikidata } from '../api/wikidata'
import LoadingSpinner from './LoadingSpinner'

type Row = {
  policy: string
  policyLabel: string
  country: string | null
  countryLabel: string
  inception: string | null
}

export default function PolicyTable(){
  const [rows, setRows] = useState<Row[]>([])
  const [error, setError] = useState<string|null>(null)
  const [loading, setLoading] = useState(true)
  const [sorting, setSorting] = useState<SortingState>([])
  const [globalFilter, setGlobalFilter] = useState('')

  useEffect(()=>{
    setLoading(true)
    fetchAIPoliciesFromWikidata()
      .then(setRows)
      .catch(e=>setError(e.message))
      .finally(()=>setLoading(false))
  },[])

  const columns = useMemo<ColumnDef<Row>[]>(()=>[
    { 
      header: 'Policy', 
      accessorKey: 'policyLabel',
      cell: info => (
        <a 
          className="link font-medium" 
          href={info.row.original.policy} 
          target="_blank" 
          rel="noreferrer"
        >
          {info.row.original.policyLabel}
        </a>
      )
    },
    { 
      header: 'Country', 
      accessorKey: 'countryLabel',
      cell: info => (
        <span className={info.getValue() === '—' ? 'text-slate-400' : ''}>
          {info.getValue() as string}
        </span>
      )
    },
    { 
      header: 'Inception', 
      accessorKey: 'inception',
      cell: info => {
        const date = info.row.original.inception
        return date ? new Date(date).toLocaleDateString() : '—'
      }
    }
  ],[])

  const table = useReactTable({ 
    data: rows, 
    columns, 
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: { sorting, globalFilter },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
  })
  if (loading) return <LoadingSpinner size="lg" />

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <input
          value={globalFilter ?? ''}
          onChange={e => setGlobalFilter(e.target.value)}
          placeholder="Search policies..."
          className="border border-slate-300 rounded px-3 py-2 text-sm"
        />
        <span className="text-sm text-slate-600">
          {table.getFilteredRowModel().rows.length} policy(ies)
        </span>
      </div>
      
      {error ? <div className="text-sm text-red-600 mb-4">Wikidata error: {error}</div> : null}
      
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
              <tr key={row.id} className="border-b hover:bg-slate-50">
                {row.getVisibleCells().map(cell => (
                  <td key={cell.id} className="px-3 py-2">{flexRender(cell.column.columnDef.cell ?? cell.column.columnDef.accessorKey as any, cell.getContext())}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
