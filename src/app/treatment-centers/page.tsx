'use client'

import { LegacyShell } from '@/components/legacy/LegacyShell'
import Link from 'next/link'
import { useEffect, useMemo, useState } from 'react'

type Center = {
  _id: string
  Name: string
  Address: string
  Owner_Name: string
  Email?: string
  Contact_Number?: number
  ImageURL?: string
}

const PAGE_SIZE = 6

export default function TreatmentCentersPage() {
  const [items, setItems] = useState<Center[]>([])
  const [query, setQuery] = useState('')
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const load = async () => {
      try {
        const response = await fetch('/api/nmk')
        const result = await response.json()
        if (response.ok) {
          setItems(result.data ?? [])
        }
      } finally {
        setLoading(false)
      }
    }

    void load()
  }, [])

  const filteredItems = useMemo(() => {
    const search = query.trim().toLowerCase()
    if (!search) {
      return items
    }

    return items.filter(item => {
      const phone = String(item.Contact_Number ?? '')
      return (
        item.Name.toLowerCase().includes(search) ||
        item.Address.toLowerCase().includes(search) ||
        item.Owner_Name.toLowerCase().includes(search) ||
        (item.Email ?? '').toLowerCase().includes(search) ||
        phone.includes(search)
      )
    })
  }, [items, query])

  const totalPages = Math.max(1, Math.ceil(filteredItems.length / PAGE_SIZE))

  useEffect(() => {
    if (page > totalPages) {
      setPage(totalPages)
    }
  }, [page, totalPages])

  const start = (page - 1) * PAGE_SIZE
  const pagedItems = filteredItems.slice(start, start + PAGE_SIZE)

  return (
    <LegacyShell
      title="Treatment Centres"
      subtitle="Find registered rehabilitation and Nasha Mukti Kendras across India."
    >
      <div className="mb-4 flex justify-end">
        <input
          type="text"
          value={query}
          onChange={event => {
            setQuery(event.target.value)
            setPage(1)
          }}
          placeholder="Search by center, owner, address, email, or contact"
          className="w-full max-w-sm rounded-md border border-orange-200 px-3 py-2 text-sm outline-none ring-orange-300 focus:ring"
        />
      </div>

      {loading ? <p className="text-sm text-neutral-600">Loading centers...</p> : null}

      <div className="flex flex-wrap justify-around gap-6">
        {pagedItems.map(item => (
          <Link
            key={item._id}
            href={`/nmk?NMK_Code=${item._id}`}
            className="block w-full max-w-xs overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition hover:shadow-md"
          >
            <div className="h-52 w-full bg-slate-100">
              {item.ImageURL ? (
                <div
                  role="img"
                  aria-label={item.Name}
                  className="h-full w-full bg-cover bg-center"
                  style={{ backgroundImage: `url(${item.ImageURL})` }}
                />
              ) : null}
            </div>
            <div className="space-y-2 p-4">
              <h2 className="font-bold text-emerald-700">{item.Name}</h2>
              <p className="line-clamp-1 text-sm text-neutral-700">{item.Address}</p>
              <p className="text-sm font-semibold text-neutral-800">{item.Owner_Name}</p>
            </div>
          </Link>
        ))}
      </div>

      {!loading && pagedItems.length === 0 ? (
        <div className="rounded-xl border border-slate-200 bg-white p-8 text-center text-sm text-neutral-600 shadow-sm">
          No treatment centers matched your search.
        </div>
      ) : null}

      {!loading && totalPages > 1 ? (
        <div className="mt-6 flex items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => setPage(current => Math.max(1, current - 1))}
            disabled={page === 1}
            className="rounded-md border border-slate-300 px-3 py-2 text-sm disabled:opacity-50"
          >
            Previous
          </button>
          <span className="text-sm text-neutral-700">
            Page {page} of {totalPages}
          </span>
          <button
            type="button"
            onClick={() => setPage(current => Math.min(totalPages, current + 1))}
            disabled={page === totalPages}
            className="rounded-md border border-slate-300 px-3 py-2 text-sm disabled:opacity-50"
          >
            Next
          </button>
        </div>
      ) : null}
    </LegacyShell>
  )
}
