import React, { useEffect, useMemo, useState } from 'react'
import { useReactTable, getCoreRowModel, flexRender, ColumnDef } from '@tanstack/react-table'
import { fetchIncidents } from '../api/aiid'

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

  useEffect(()=>{
    fetchIncidents(50).then(setRows).catch(e=>setError(e.message))
  },[])

  const columns = useMemo<ColumnDef<Row>[]>(()=>[
    { header: 'ID', accessorKey: 'id' },
    { header: 'Title', accessorKey: 'title' },
    { header: 'Date', accessorKey: 'date' },
    { header: 'Tags', cell: info => <div className="flex flex-wrap gap-1">{(info.row.original.tags || []).map((t,i)=>(<span key={i} className="badge">{t}</span>))}</div> },
    { header: 'Reports', cell: info => <ul className="list-disc pl-4">{(info.row.original.reports||[]).slice(0,3).map((r,i)=>(<li key={i}><a className="link" href={r.url} target="_blank" rel="noreferrer">{r.title || r.url}</a></li>))}</ul> }
  ],[])

  const table = useReactTable({ data: rows, columns, getCoreRowModel: getCoreRowModel() })
  return (
    <div className="overflow-x-auto">
      {error ? <div className="text-sm text-red-600">AIID error: {error}</div> : null}
      <table className="min-w-full text-sm">
        <thead className="bg-slate-100 text-slate-700">
          {table.getHeaderGroups().map(hg=> (
            <tr key={hg.id}>
              {hg.headers.map(h=> (
                <th key={h.id} className="text-left px-3 py-2">{flexRender(h.column.columnDef.header, h.getContext())}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map(row=> (
            <tr key={row.id} className="border-b">
              {row.getVisibleCells().map(cell => (
                <td key={cell.id} className="px-3 py-2">{flexRender(cell.column.columnDef.cell ?? cell.column.columnDef.accessorKey as any, cell.getContext())}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
