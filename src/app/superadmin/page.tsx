'use client'

import { LegacyShell } from '@/components/legacy/LegacyShell'
import { useEffect, useState } from 'react'

type Center = {
  _id: string
  Name: string
  Address: string
  Owner_Name: string
  Email?: string
  Contact_Number?: number
  State?: string
  District?: string
  Pincode?: number
  Established_Year?: number
  ImageURL?: string
  NMK_Verification_Image?: string
}

export default function SuperadminPage() {
  const [items, setItems] = useState<Center[]>([])
  const [loading, setLoading] = useState(true)
  const [busyId, setBusyId] = useState<string | null>(null)

  const load = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/nmk?role=superadmin')
      const result = await response.json()
      if (response.ok) {
        setItems(result.data ?? [])
      }
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    void load()
  }, [])

  const onApprove = async (id: string) => {
    setBusyId(id)
    try {
      await fetch(`/api/nmk/approve?id=${id}`, { method: 'POST' })
      await load()
    } finally {
      setBusyId(null)
    }
  }

  return (
    <LegacyShell
      title="Approval"
      subtitle="Approve newly submitted Nasha Mukti Kendra registrations."
    >
      {loading ? <p className="text-sm text-neutral-600">Loading approvals...</p> : null}

      {items.length === 0 && !loading ? (
        <div className="rounded-xl border border-slate-200 bg-white p-8 text-center text-lg text-neutral-600 shadow-sm">
          No items to verify.
        </div>
      ) : null}

      <div className="flex flex-wrap justify-around gap-6">
        {items.map(item => (
          <article
            key={item._id}
            className="w-full max-w-3xl overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm"
          >
            <div className="grid md:grid-cols-2">
              <div className="h-72 bg-slate-100">
                {item.ImageURL ? (
                  <div
                    role="img"
                    aria-label={item.Name}
                    className="h-full w-full bg-cover bg-center"
                    style={{ backgroundImage: `url(${item.ImageURL})` }}
                  />
                ) : null}
              </div>

              <div className="space-y-1 p-5 text-sm text-neutral-700">
                <h2 className="text-xl font-bold text-cyan-600">{item.Name}</h2>
                <p>
                  {item.Address}{' '}
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(item.Address)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    (View on map)
                  </a>
                </p>
                <p>{item.Owner_Name}</p>
                <p>{item.Email ?? 'N/A'}</p>
                <p>{item.Contact_Number ?? 'N/A'}</p>
                <p>State: {item.State ?? 'N/A'}</p>
                <p>District: {item.District ?? 'N/A'}</p>
                <p>Pincode: {item.Pincode ?? 'N/A'}</p>
                <p>Established Year: {item.Established_Year ?? 'N/A'}</p>
                {item.NMK_Verification_Image ? (
                  <p>
                    Document:{' '}
                    <a
                      href={item.NMK_Verification_Image}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="break-all text-blue-600 hover:underline"
                    >
                      {item.NMK_Verification_Image}
                    </a>
                  </p>
                ) : null}

                <button
                  type="button"
                  onClick={() => onApprove(item._id)}
                  disabled={busyId === item._id}
                  className="mt-2 rounded-md bg-[#f75700] px-4 py-2 text-sm font-semibold text-white hover:bg-[#da4d00] disabled:opacity-60"
                >
                  {busyId === item._id ? 'Approving...' : 'Approve'}
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </LegacyShell>
  )
}
