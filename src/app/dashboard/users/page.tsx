'use client'

import { Search } from 'lucide-react'
import { FormEvent, useCallback, useEffect, useState } from 'react'

type Patient = {
  _id: string
  Name: string
  Addiction_Type: string
  Nasha_Mukti_Centre_Code: string
  Is_Treatment_Completed: boolean
}

type Center = {
  _id: string
  Name: string
  Address?: string
}

export default function DashboardUsersPage() {
  const [items, setItems] = useState<Patient[]>([])
  const [centers, setCenters] = useState<Center[]>([])
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [name, setName] = useState('')
  const [addictionType, setAddictionType] = useState('')
  const [nmkCode, setNmkCode] = useState('')
  const [query, setQuery] = useState('')
  const [statusMessage, setStatusMessage] = useState('')

  const downloadAsJson = () => {
    const payload = JSON.stringify(filteredItems, null, 2)
    const blob = new Blob([payload], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const anchor = document.createElement('a')
    anchor.href = url
    anchor.download = 'users.json'
    anchor.click()
    URL.revokeObjectURL(url)
  }

  const load = useCallback(async () => {
    try {
      const [usersResponse, centersResponse] = await Promise.all([
        fetch('/api/users', { cache: 'no-store' }),
        fetch('/api/nmk', { cache: 'no-store' }),
      ])

      const [usersResult, centersResult] = await Promise.all([
        usersResponse.json(),
        centersResponse.json(),
      ])

      if (usersResponse.ok) {
        setItems(usersResult.data ?? [])
      }

      if (centersResponse.ok) {
        const nextCenters: Center[] = centersResult.data ?? []
        setCenters(nextCenters)
        if (!nmkCode && nextCenters.length > 0) {
          setNmkCode(nextCenters[0]._id)
        }
      }
    } finally {
      setLoading(false)
    }
  }, [nmkCode])

  useEffect(() => {
    void load()
  }, [load])

  const onAddPatient = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setStatusMessage('')

    if (!name || !addictionType || !nmkCode) {
      setStatusMessage('Please fill patient name, addiction type, and center.')
      return
    }

    const selectedCenter = centers.find(center => center._id === nmkCode)
    if (centers.length > 0 && !selectedCenter) {
      setStatusMessage('Please select a valid NMK center.')
      return
    }

    setSubmitting(true)
    try {
      const response = await fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          Name: name,
          Age: 0,
          Gender: 'Unknown',
          State: 'Not Provided',
          District: 'Not Provided',
          Guardian_Name: 'N/A',
          Addiction_Type: addictionType,
          Addiction_Duration: 0,
          'Duration_of-Treatment': 0,
          Nasha_Mukti_Centre_Code: nmkCode,
          Nasha_Mukti_Centre_Name: selectedCenter?.Name ?? 'Unknown Center',
          Nasha_Mukti_Centre_Address: selectedCenter?.Address ?? 'N/A',
          Joining_Date: new Date().toISOString().slice(0, 10),
          Employment_Status: 0,
          Counselling_Count: 0,
          Counsellor_Name: 'N/A',
          Under_Treatment: true,
          Is_Treatment_Completed: false,
        }),
      })

      const result = await response.json()
      if (!response.ok) {
        setStatusMessage(result?.message || 'Unable to add patient.')
        return
      }

      setName('')
      setAddictionType('')
      setStatusMessage('Patient added successfully.')
      await load()
    } catch {
      setStatusMessage('Unable to add patient right now. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  const filteredItems = items.filter(item => {
    const normalizedQuery = query.trim().toLowerCase()
    if (!normalizedQuery) {
      return true
    }

    return (
      item.Name.toLowerCase().includes(normalizedQuery) ||
      item.Addiction_Type.toLowerCase().includes(normalizedQuery) ||
      item.Nasha_Mukti_Centre_Code.toLowerCase().includes(normalizedQuery)
    )
  })

  return (
    <section className="space-y-5">
      <div className="flex flex-col gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-black tracking-tight text-neutral-900">Nasha Mukti Kendra Patient</h1>
          <p className="text-sm text-neutral-600">Search, export, and manage patient records.</p>
        </div>
        <div className="flex w-full flex-col gap-2 md:w-auto md:flex-row md:items-center">
          <label className="relative block w-full md:w-72">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-orange-500" />
            <input
              type="text"
              value={query}
              onChange={event => setQuery(event.target.value)}
              placeholder="Search..."
              className="w-full rounded-lg border border-orange-200 px-3 py-2 pl-9 text-sm outline-none ring-orange-300 transition focus:ring"
            />
          </label>
          <button
            type="button"
            onClick={downloadAsJson}
            className="rounded-lg bg-[#f75700] px-3 py-2 text-sm font-semibold text-white transition hover:bg-[#da4d00]"
          >
            Export JSON
          </button>
        </div>
      </div>

      <form onSubmit={onAddPatient} className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
        <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-orange-600">Add Patient</p>
        {statusMessage ? (
          <div className="mb-3 rounded-md border border-amber-200 bg-amber-50 px-3 py-2 text-sm text-amber-900">
            {statusMessage}
          </div>
        ) : null}
        <div className="grid gap-3 md:grid-cols-4">
          <input
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="Patient name"
            required
            className="rounded-lg border border-orange-200 px-3 py-2 text-sm outline-none ring-orange-300 focus:ring"
          />
          <input
            value={addictionType}
            onChange={e => setAddictionType(e.target.value)}
            placeholder="Addiction type"
            required
            className="rounded-lg border border-orange-200 px-3 py-2 text-sm outline-none ring-orange-300 focus:ring"
          />
          {centers.length > 0 ? (
            <select
              value={nmkCode}
              onChange={e => setNmkCode(e.target.value)}
              required
              className="rounded-lg border border-orange-200 px-3 py-2 text-sm outline-none ring-orange-300 focus:ring"
            >
              <option value="">Select NMK center</option>
              {centers.map(center => (
                <option key={center._id} value={center._id}>
                  {center.Name}
                </option>
              ))}
            </select>
          ) : (
            <input
              value={nmkCode}
              onChange={e => setNmkCode(e.target.value)}
              placeholder="NMK code"
              required
              className="rounded-lg border border-orange-200 px-3 py-2 text-sm outline-none ring-orange-300 focus:ring"
            />
          )}
          <button
            type="submit"
            disabled={submitting}
            className="rounded-lg bg-orange-500 px-3 py-2 text-sm font-semibold text-white hover:bg-orange-600 disabled:opacity-60"
          >
            {submitting ? 'Saving...' : 'Add Patient'}
          </button>
        </div>
      </form>

      {loading ? <p className="text-neutral-600">Loading users...</p> : null}
      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-100 text-neutral-700">
            <tr>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Addiction Type</th>
              <th className="px-4 py-3">NMK Code</th>
              <th className="px-4 py-3">Completed</th>
            </tr>
          </thead>
          <tbody>
            {filteredItems.map(item => (
              <tr key={item._id} className="border-t border-slate-100 odd:bg-white even:bg-slate-50/70">
                <td className="px-4 py-3">{item.Name}</td>
                <td className="px-4 py-3">{item.Addiction_Type}</td>
                <td className="px-4 py-3">{item.Nasha_Mukti_Centre_Code}</td>
                <td className="px-4 py-3">
                  <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${item.Is_Treatment_Completed ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-800'}`}>
                    {item.Is_Treatment_Completed ? 'Completed' : 'In Progress'}
                  </span>
                </td>
              </tr>
            ))}

            {!loading && filteredItems.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-4 py-8 text-center text-neutral-600">
                  No patients matched your search.
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>
    </section>
  )
}
