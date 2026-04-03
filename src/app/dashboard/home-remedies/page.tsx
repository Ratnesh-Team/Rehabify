'use client'

import { Search } from 'lucide-react'
import Image from 'next/image'
import { useEffect, useMemo, useState } from 'react'

type Remedy = {
  _id: string
  title?: string
  Title?: string
  content?: string
  Content?: string
  category?: string
  Category?: string
  author?: string
  Author?: string
  date?: string
  Date?: string
  image?: string
  Image?: string
}

export default function DashboardHomeRemediesPage() {
  const [items, setItems] = useState<Remedy[]>([])
  const [loading, setLoading] = useState(true)
  const [query, setQuery] = useState('')

  useEffect(() => {
    const load = async () => {
      try {
        const response = await fetch('/api/home-remedies')
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
    const normalizedQuery = query.trim().toLowerCase()
    if (!normalizedQuery) {
      return items
    }

    return items.filter(item => {
      const title = (item.title ?? item.Title ?? '').toLowerCase()
      const category = (item.category ?? item.Category ?? '').toLowerCase()
      const content = (item.content ?? item.Content ?? '').toLowerCase()
      return (
        title.includes(normalizedQuery) ||
        category.includes(normalizedQuery) ||
        content.includes(normalizedQuery)
      )
    })
  }, [items, query])

  return (
    <section className="space-y-5">
      <div className="flex flex-col gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-black text-neutral-900">Home Remedies</h1>
          <p className="text-sm text-neutral-600">Search and review remedy content from the legacy knowledge base.</p>
        </div>
        <label className="relative block w-full md:max-w-xs">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-orange-500" />
          <input
            type="text"
            value={query}
            onChange={event => setQuery(event.target.value)}
            placeholder="Search remedies..."
            className="w-full rounded-lg border border-orange-200 px-3 py-2 pl-9 text-sm outline-none ring-orange-300 transition focus:ring"
          />
        </label>
      </div>

      {loading ? <p className="text-neutral-600">Loading remedies...</p> : null}

      {!loading && filteredItems.length === 0 ? (
        <div className="rounded-xl border border-slate-200 bg-white p-8 text-center text-sm text-neutral-600 shadow-sm">
          No remedies matched your search.
        </div>
      ) : null}

      <div className="flex flex-wrap justify-around gap-6">
        {filteredItems.map(item => {
          const title = item.title ?? item.Title ?? 'Untitled Remedy'
          const category = item.category ?? item.Category ?? 'General'
          const author = item.author ?? item.Author ?? 'Rehabify'
          const date = item.date ?? item.Date ?? 'N/A'
          const excerpt = item.content ?? item.Content ?? ''
          const image = item.image ?? item.Image ?? ''

          return (
            <article
              key={item._id}
              className="w-full max-w-xs overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition-all duration-200 hover:shadow-md"
            >
              <div className="relative h-52 bg-slate-100">
                {image ? (
                  <Image
                    src={image}
                    alt={title}
                    fill
                    unoptimized
                    sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                    className="object-cover"
                  />
                ) : null}
              </div>
              <div className="space-y-2 p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-orange-700">{category}</p>
                <h2 className="line-clamp-2 text-lg font-bold text-neutral-900">{title}</h2>
                <p className="line-clamp-3 text-sm text-neutral-600">{excerpt || 'No summary available.'}</p>
                <p className="pt-1 text-xs text-neutral-500">
                  {author} • {date}
                </p>
              </div>
            </article>
          )
        })}
      </div>
    </section>
  )
}
