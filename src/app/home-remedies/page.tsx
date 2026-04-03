'use client'

import { LegacyShell } from '@/components/legacy/LegacyShell'
import Link from 'next/link'
import { useEffect, useMemo, useState } from 'react'

type Remedy = {
  id?: number
  ID?: number
  title?: string
  Title?: string
  content?: string
  Content?: string
  image?: string
  Image?: string
  author?: string
  Author?: string
  date?: string
  Date?: string
}

function getExcerpt(text: string, words = 20) {
  const parts = text.split(' ').filter(Boolean)
  if (parts.length <= words) {
    return text
  }

  return `${parts.slice(0, words).join(' ')}...`
}

export default function HomeRemediesPage() {
  const [items, setItems] = useState<Remedy[]>([])
  const [query, setQuery] = useState('')
  const [loading, setLoading] = useState(true)

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
    const search = query.trim().toLowerCase()
    if (!search) {
      return items
    }

    return items.filter(item => {
      const title = (item.title ?? item.Title ?? '').toLowerCase()
      const content = (item.content ?? item.Content ?? '').toLowerCase()
      return title.includes(search) || content.includes(search)
    })
  }, [items, query])

  return (
    <LegacyShell
      title="Home Remedies"
      subtitle="Explore practical recovery tips and wellness guidance articles."
    >
      <div className="mb-4 flex justify-end">
        <input
          type="text"
          value={query}
          onChange={event => setQuery(event.target.value)}
          placeholder="Search remedies..."
          className="w-full max-w-xs rounded-md border border-orange-200 px-3 py-2 text-sm outline-none ring-orange-300 focus:ring"
        />
      </div>

      {loading ? <p className="text-sm text-neutral-600">Loading remedies...</p> : null}

      <div className="flex flex-wrap justify-around gap-6">
        {filteredItems.map(item => {
          const blogId = item.id ?? item.ID ?? 1
          const title = item.title ?? item.Title ?? 'Untitled'
          const content = item.content ?? item.Content ?? ''
          const image = item.image ?? item.Image ?? ''
          const author = item.author ?? item.Author ?? 'Admin'
          const date = item.date ?? item.Date ?? 'N/A'

          return (
            <div
              key={`${blogId}-${title}`}
              className="w-full max-w-xs overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition hover:shadow-md"
            >
              <Link href={`/blog${blogId}`} className="block">
                <div className="h-52 w-full bg-slate-100">
                  {image ? (
                    <div
                      role="img"
                      aria-label={title}
                      className="h-full w-full bg-cover bg-center"
                      style={{ backgroundImage: `url(${image})` }}
                    />
                  ) : null}
                </div>

                <div className="space-y-2 p-4">
                  <h2 className="line-clamp-2 text-lg font-bold text-neutral-900">{title}</h2>
                  <p className="line-clamp-3 text-sm text-neutral-600">{getExcerpt(content)}</p>
                  <p className="text-xs text-neutral-500">
                    {author} - {date}
                  </p>
                </div>
              </Link>
            </div>
          )
        })}
      </div>

      {!loading && filteredItems.length === 0 ? (
        <div className="rounded-xl border border-slate-200 bg-white p-8 text-center text-sm text-neutral-600 shadow-sm">
          No remedies matched your search.
        </div>
      ) : null}
    </LegacyShell>
  )
}
