import React, { useEffect, useMemo, useState } from 'react'
import { useReactTable, getCoreRowModel, flexRender, ColumnDef } from '@tanstack/react-table'
import { fetchAIPoliciesFromWikidata } from '../api/wikidata'

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

  useEffect(()=>{
    fetchAIPoliciesFromWikidata().then(setRows).catch(e=>setError(e.message))
  },[])

  const columns = useMemo<ColumnDef<Row>[]>(()=>[
    { header: 'Policy', cell: info => <a className="link" href={info.row.original.policy} target="_blank" rel="noreferrer">{info.row.original.policyLabel}</a> },
    { header: 'Country', accessorKey: 'countryLabel' },
    { header: 'Inception', cell: info => info.row.original.inception ? info.row.original.inception.slice(0,10) : '—' }
  ],[])

  const table = useReactTable({ data: rows, columns, getCoreRowModel: getCoreRowModel() })
  return (
    <div className="overflow-x-auto">
      {error ? <div className="text-sm text-red-600">Wikidata error: {error}</div> : null}
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
