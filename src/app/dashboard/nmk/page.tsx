'use client'

import { FormEvent, useEffect, useState } from 'react'

type NMK = {
  _id: string
  Name: string
  District: string
  State: string
  NMK_Code: string
  IsVerified: boolean
}

export default function DashboardNmkPage() {
  const [items, setItems] = useState<NMK[]>([])
  const [pendingItems, setPendingItems] = useState<NMK[]>([])
  const [name, setName] = useState('')
  const [district, setDistrict] = useState('')
  const [state, setState] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const load = async () => {
    const [verifiedResponse, pendingResponse] = await Promise.all([
      fetch('/api/nmk'),
      fetch('/api/nmk?role=superadmin'),
    ])

    const [verifiedResult, pendingResult] = await Promise.all([
      verifiedResponse.json(),
      pendingResponse.json(),
    ])

    if (verifiedResponse.ok) {
      setItems(verifiedResult.data ?? [])
    }

    if (pendingResponse.ok) {
      setPendingItems(pendingResult.data ?? [])
    }
  }

  useEffect(() => {
    void load()
  }, [])

  const onAddNmk = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!name || !district || !state) {
      return
    }

    setSubmitting(true)
    try {
      await fetch('/api/addNmk', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          Name: name,
          District: district,
          State: state,
        }),
      })

      setName('')
      setDistrict('')
      setState('')
      await load()
    } finally {
      setSubmitting(false)
    }
  }

  const onApprove = async (id: string) => {
    await fetch(`/api/nmk/approve?id=${id}`, { method: 'POST' })
    await load()
  }

  return (
    <section className="space-y-5">
      <h1 className="text-3xl font-black tracking-tight text-neutral-900">Manage NMK</h1>

      <form onSubmit={onAddNmk} className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
        <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-orange-600">Register Center</p>
        <div className="grid gap-3 md:grid-cols-4">
          <input
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="Center name"
            className="rounded-lg border border-orange-200 px-3 py-2 text-sm outline-none ring-orange-300 focus:ring"
          />
          <input
            value={district}
            onChange={e => setDistrict(e.target.value)}
            placeholder="District"
            className="rounded-lg border border-orange-200 px-3 py-2 text-sm outline-none ring-orange-300 focus:ring"
          />
          <input
            value={state}
            onChange={e => setState(e.target.value)}
            placeholder="State"
            className="rounded-lg border border-orange-200 px-3 py-2 text-sm outline-none ring-orange-300 focus:ring"
          />
          <button
            type="submit"
            disabled={submitting}
            className="rounded-lg bg-orange-500 px-3 py-2 text-sm font-semibold text-white hover:bg-orange-600 disabled:opacity-60"
          >
            {submitting ? 'Saving...' : 'Add Center'}
          </button>
        </div>
      </form>

      {pendingItems.length > 0 ? (
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <h2 className="text-sm font-bold uppercase tracking-wide text-orange-700">Pending Approval</h2>
          <div className="mt-3 grid gap-3 md:grid-cols-2">
            {pendingItems.map(item => (
              <article key={item._id} className="rounded-xl border border-orange-100 bg-orange-50/50 p-4">
                <h3 className="font-semibold text-neutral-900">{item.Name}</h3>
                <p className="text-sm text-neutral-600">
                  {item.District}, {item.State}
                </p>
                <p className="text-sm text-neutral-500">Code: {item.NMK_Code}</p>
                <button
                  type="button"
                  onClick={() => onApprove(item._id)}
                  className="mt-3 rounded-lg bg-orange-500 px-3 py-1.5 text-xs font-semibold text-white hover:bg-orange-600"
                >
                  Approve
                </button>
              </article>
            ))}
          </div>
        </div>
      ) : null}

      <div className="grid gap-3 md:grid-cols-2">
        {items.map(item => (
          <article key={item._id} className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <h2 className="text-lg font-semibold text-cyan-600">{item.Name}</h2>
            <p className="text-sm text-neutral-600">
              {item.District}, {item.State}
            </p>
            <p className="text-sm text-neutral-500">Code: {item.NMK_Code}</p>
            <p className="mt-2 text-xs font-medium text-orange-700">
              {item.IsVerified ? 'Verified' : 'Pending'}
            </p>
          </article>
        ))}
      </div>
    </section>
  )
}
