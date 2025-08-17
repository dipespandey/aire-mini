import React, { useEffect, useMemo, useState } from 'react'
import { useReactTable, getCoreRowModel, flexRender, ColumnDef } from '@tanstack/react-table'
import { fetchOpenLLMResults } from '../api/hf'

type Row = {
  model: string
  avg: number | null
  mmlu: number | null
  arc: number | null
  hellaswag: number | null
  gsm8k: number | null
  size_params_b: number | null
}

export default function BenchmarksTable(){
  const [rows, setRows] = useState<Row[]>([])
  const [error, setError] = useState<string|null>(null)

  useEffect(()=>{
    fetchOpenLLMResults(100).then(setRows).catch(e=>setError(e.message))
  },[])

  const columns = useMemo<ColumnDef<Row>[]>(()=>[
    { header: 'Model', accessorKey: 'model' },
    { header: 'Avg', accessorKey: 'avg' },
    { header: 'MMLU', accessorKey: 'mmlu' },
    { header: 'ARC/HSwag', cell: info => info.row.original.arc ?? info.row.original.hellaswag ?? null },
    { header: 'GSM8K', accessorKey: 'gsm8k' },
    { header: 'Params (B)', accessorKey: 'size_params_b' },
  ],[])

  const table = useReactTable({ data: rows, columns, getCoreRowModel: getCoreRowModel() })
  return (
    <div className="overflow-x-auto">
      {error ? <div className="text-sm text-red-600">HF error: {error}</div> : null}
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
