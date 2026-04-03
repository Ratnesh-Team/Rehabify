'use client'

import { LegacyShell } from '@/components/legacy/LegacyShell'
import { useEffect, useMemo, useState } from 'react'

type DatabaseRow = {
  Name: string
  Addiction_Type: string
  State: string
  Is_Employed: 'Yes' | 'No'
  Gender: string
  Nasha_Mukti_Centre_Name: string
  Nasha_Mukti_Centre_Address: string
}

const pageSizes = [10, 20, 30, 40, 50]

function downloadJson(data: DatabaseRow[]) {
  const jsonContent = JSON.stringify(data, null, 2)
  const blob = new Blob([jsonContent], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const anchor = document.createElement('a')
  anchor.href = url
  anchor.download = 'database.json'
  anchor.click()
  URL.revokeObjectURL(url)
}

export default function DatabasePage() {
  const [rows, setRows] = useState<DatabaseRow[]>([])
  const [loading, setLoading] = useState(true)
  const [query, setQuery] = useState('')
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)

  useEffect(() => {
    const load = async () => {
      try {
        const response = await fetch('/api/users')
        const result = await response.json()

        if (!response.ok) {
          return
        }

        const mappedRows: DatabaseRow[] = (result.data ?? []).map((item: Record<string, unknown>) => ({
          Name: '*******',
          Addiction_Type: String(item.Addiction_Type ?? ''),
          State: String(item.State ?? ''),
          Is_Employed: Number(item.Employment_Status ?? 0) === 0 ? 'No' : 'Yes',
          Gender: String(item.Gender ?? ''),
          Nasha_Mukti_Centre_Name: String(item.Nasha_Mukti_Centre_Name ?? ''),
          Nasha_Mukti_Centre_Address: String(item.Nasha_Mukti_Centre_Address ?? ''),
        }))

        setRows(mappedRows)
      } finally {
        setLoading(false)
      }
    }

    void load()
  }, [])

  const filteredRows = useMemo(() => {
    const search = query.trim().toLowerCase()
    if (!search) {
      return rows
    }

    return rows.filter(row => {
      return (
        row.Name.toLowerCase().includes(search) ||
        row.Addiction_Type.toLowerCase().includes(search) ||
        row.State.toLowerCase().includes(search) ||
        row.Is_Employed.toLowerCase().includes(search) ||
        row.Gender.toLowerCase().includes(search) ||
        row.Nasha_Mukti_Centre_Name.toLowerCase().includes(search) ||
        row.Nasha_Mukti_Centre_Address.toLowerCase().includes(search)
      )
    })
  }, [rows, query])

  const totalPages = Math.max(1, Math.ceil(filteredRows.length / pageSize))

  useEffect(() => {
    if (page > totalPages) {
      setPage(totalPages)
    }
  }, [page, totalPages])

  useEffect(() => {
    setPage(1)
  }, [query, pageSize])

  const start = (page - 1) * pageSize
  const pagedRows = filteredRows.slice(start, start + pageSize)

  return (
    <LegacyShell title="Database" subtitle="View and manage rehabilitation user records.">
      <section className="space-y-4 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-lg font-semibold text-neutral-900">Users Data</h2>
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
            <input
              type="text"
              value={query}
              onChange={event => setQuery(event.target.value)}
              placeholder="Search..."
              className="rounded-md border border-orange-200 px-3 py-2 text-sm outline-none ring-orange-300 focus:ring"
            />
            <button
              type="button"
              onClick={() => downloadJson(filteredRows)}
              className="rounded-md bg-[#f75700] px-3 py-2 text-sm font-semibold text-white hover:bg-[#da4d00]"
            >
              Export JSON
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-100 text-neutral-700">
              <tr>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Addiction Type</th>
                <th className="px-4 py-3">State</th>
                <th className="px-4 py-3">Is Employed</th>
                <th className="px-4 py-3">Gender</th>
                <th className="px-4 py-3">NMK Name</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={6} className="px-4 py-8 text-center text-neutral-600">
                    Loading...
                  </td>
                </tr>
              ) : null}

              {!loading && pagedRows.map((row, index) => (
                <tr key={`${row.Nasha_Mukti_Centre_Name}-${index}`} className="border-t border-slate-100">
                  <td className="px-4 py-3">{row.Name}</td>
                  <td className="px-4 py-3">{row.Addiction_Type}</td>
                  <td className="px-4 py-3">{row.State}</td>
                  <td className="px-4 py-3">{row.Is_Employed}</td>
                  <td className="px-4 py-3">{row.Gender}</td>
                  <td className="px-4 py-3">{row.Nasha_Mukti_Centre_Name}</td>
                </tr>
              ))}

              {!loading && pagedRows.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-4 py-8 text-center font-semibold text-neutral-600">
                    Patients not yet registered.
                  </td>
                </tr>
              ) : null}
            </tbody>
          </table>
        </div>

        <div className="flex flex-col gap-2 pt-2 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2 text-sm text-neutral-600">
            <span>Rows per page</span>
            <select
              value={pageSize}
              onChange={event => setPageSize(Number(event.target.value))}
              className="rounded-md border border-slate-300 px-2 py-1"
            >
              {pageSizes.map(size => (
                <option key={size} value={size}>
                  {size} / page
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setPage(current => Math.max(1, current - 1))}
              disabled={page === 1}
              className="rounded-md border border-slate-300 px-3 py-1.5 text-sm disabled:opacity-50"
            >
              Previous
            </button>
            <span className="text-sm text-neutral-600">
              Page {page} of {totalPages}
            </span>
            <button
              type="button"
              onClick={() => setPage(current => Math.min(totalPages, current + 1))}
              disabled={page === totalPages}
              className="rounded-md border border-slate-300 px-3 py-1.5 text-sm disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      </section>
    </LegacyShell>
  )
}
