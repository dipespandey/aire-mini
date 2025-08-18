import React, { useEffect, useMemo, useState } from 'react'
import { useReactTable, getCoreRowModel, flexRender, ColumnDef, getSortedRowModel, SortingState } from '@tanstack/react-table'
import { fetchOpenLLMResults } from '../api/hf'
import LoadingSpinner from './LoadingSpinner'

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
  const [loading, setLoading] = useState(true)
  const [sorting, setSorting] = useState<SortingState>([])

  useEffect(()=>{
    setLoading(true)
    fetchOpenLLMResults(100)
      .then(data => {
        console.log("BenchmarksTable received data:", data.length, data.slice(0, 2))
        setRows(data)
      })
      .catch(e=>{
        console.error("BenchmarksTable failed:", e)
        setError(e.message)
        // Force mock data on error
        import('../api/mockData').then(({ mockBenchmarks }) => {
          console.log("BenchmarksTable using mock data:", mockBenchmarks.length, "items")
          setRows(mockBenchmarks)
        })
      })
      .finally(()=>setLoading(false))
  },[])

  const columns = useMemo<ColumnDef<Row>[]>(()=>[
    { 
      header: 'Model', 
      accessorKey: 'model',
      cell: info => <div className="font-medium">{info.getValue() as string}</div>
    },
    { 
      header: 'Avg', 
      accessorKey: 'avg',
      cell: info => {
        const val = info.getValue() as number | null
        return val && val > 0 ? val.toFixed(3) : '—'
      }
    },
    { 
      header: 'MMLU', 
      accessorKey: 'mmlu',
      cell: info => {
        const val = info.getValue() as number | null
        return val && val > 0 ? val.toFixed(3) : '—'
      }
    },
    { 
      header: 'ARC', 
      accessorKey: 'arc',
      cell: info => {
        const val = info.getValue() as number | null
        return val && val > 0 ? val.toFixed(3) : '—'
      }
    },
    { 
      header: 'HellaSwag', 
      accessorKey: 'hellaswag',
      cell: info => {
        const val = info.getValue() as number | null
        return val && val > 0 ? val.toFixed(3) : '—'
      }
    },
    { 
      header: 'GSM8K', 
      accessorKey: 'gsm8k',
      cell: info => {
        const val = info.getValue() as number | null
        return val && val > 0 ? val.toFixed(3) : '—'
      }
    },
    { 
      header: 'Params (B)', 
      accessorKey: 'size_params_b',
      cell: info => {
        const val = info.getValue() as number | null
        return val ? `${val}B` : '—'
      }
    },
  ],[])

  const table = useReactTable({ 
    data: rows, 
    columns, 
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    state: { sorting },
    onSortingChange: setSorting,
  })
  if (loading) return <LoadingSpinner size="lg" />

  return (
    <div className="overflow-x-auto">
      {error ? <div className="text-sm text-red-600 mb-4">HF error: {error}</div> : null}
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
  )
}
