'use client'

import { FormEvent, useEffect, useState } from 'react'

type Doctor = {
  _id: string
  Name: string
  Specialization: string
  Email: string
  Description?: string
  ClinicAddress?: string
  ContactNumber?: string | number
  ImageURL?: string
  IsVerified: boolean
}

export default function DashboardDoctorsPage() {
  const [items, setItems] = useState<Doctor[]>([])
  const [name, setName] = useState('')
  const [specialization, setSpecialization] = useState('')
  const [email, setEmail] = useState('')
  const [query, setQuery] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const load = async () => {
    const response = await fetch('/api/doctors?role=admin')
    const result = await response.json()
    if (response.ok) {
      setItems(result.data ?? [])
    }
  }

  useEffect(() => {
    void load()
  }, [])

  const onAddDoctor = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!name || !specialization || !email) {
      return
    }

    setSubmitting(true)
    try {
      await fetch('/api/addDoctor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          Name: name,
          Specialization: specialization,
          Email: email,
        }),
      })

      setName('')
      setSpecialization('')
      setEmail('')
      await load()
    } finally {
      setSubmitting(false)
    }
  }

  const filteredItems = items.filter(item => {
    const search = query.trim().toLowerCase()
    if (!search) {
      return true
    }

    return (
      item.Name.toLowerCase().includes(search) ||
      item.Specialization.toLowerCase().includes(search) ||
      item.Email.toLowerCase().includes(search)
    )
  })

  return (
    <section className="space-y-5">
      <div className="flex flex-col justify-end gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-3xl font-black text-neutral-900">Doctor Appointment</h1>
        <input
          type="text"
          value={query}
          onChange={event => setQuery(event.target.value)}
          placeholder="Search..."
          className="w-full rounded-lg border border-orange-200 px-3 py-2 text-sm outline-none ring-orange-300 transition focus:ring sm:w-72"
        />
      </div>

      <form onSubmit={onAddDoctor} className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
        <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-orange-600">Register Doctor</p>
        <div className="grid gap-3 md:grid-cols-4">
          <input
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="Doctor name"
            className="rounded-lg border border-orange-200 px-3 py-2 text-sm outline-none ring-orange-300 focus:ring"
          />
          <input
            value={specialization}
            onChange={e => setSpecialization(e.target.value)}
            placeholder="Specialization"
            className="rounded-lg border border-orange-200 px-3 py-2 text-sm outline-none ring-orange-300 focus:ring"
          />
          <input
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="Email"
            className="rounded-lg border border-orange-200 px-3 py-2 text-sm outline-none ring-orange-300 focus:ring"
          />
          <button
            type="submit"
            disabled={submitting}
            className="rounded-lg bg-orange-500 px-3 py-2 text-sm font-semibold text-white hover:bg-orange-600 disabled:opacity-60"
          >
            {submitting ? 'Saving...' : 'Register Doctor'}
          </button>
        </div>
      </form>

      <div className="flex flex-wrap justify-around gap-6">
        {filteredItems.map(item => (
          <article
            key={item._id}
            className="w-full max-w-xs overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition hover:shadow-md"
          >
            <div className="h-52 w-full overflow-hidden bg-slate-100">
              {item.ImageURL ? (
                <div
                  role="img"
                  aria-label={item.Name}
                  className="h-full w-full bg-cover bg-center"
                  style={{ backgroundImage: `url(${item.ImageURL})` }}
                />
              ) : (
                <div className="flex h-full items-center justify-center text-sm text-slate-500">Doctor Photo</div>
              )}
            </div>
            <div className="space-y-2 p-4">
              <h3 className="font-bold text-emerald-700">{item.Name}</h3>
              <p className="text-sm text-neutral-700">{item.Specialization}</p>
              {item.Description ? <p className="text-sm text-neutral-600 line-clamp-2">{item.Description}</p> : null}
              {item.ClinicAddress ? <p className="text-sm text-neutral-600">Address: {item.ClinicAddress}</p> : null}
              <p className="text-sm text-neutral-600">{item.Email}</p>
              {item.ContactNumber ? <p className="text-sm text-neutral-600">{item.ContactNumber}</p> : null}
              <p className="pt-1 text-xs font-semibold text-orange-700">
                {item.IsVerified ? 'Verified' : 'Pending Verification'}
              </p>
            </div>
          </article>
        ))}
      </div>

      {filteredItems.length === 0 ? (
        <div className="rounded-xl border border-slate-200 bg-white p-8 text-center text-sm text-neutral-600 shadow-sm">
          No doctors matched your search.
        </div>
      ) : null}
    </section>
  )
}
