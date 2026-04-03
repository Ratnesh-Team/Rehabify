'use client'

import { AppShell } from '@/components/shell/AppShell'
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

type Doctor = {
  _id: string
  Name: string
  Description?: string
  Specialization?: string
  ClinicAddress?: string
  ContactNumber?: number | string
  Email?: string
  ImageURL?: string
}

export default function SuperadminPage() {
  const [pendingCenters, setPendingCenters] = useState<Center[]>([])
  const [pendingDoctors, setPendingDoctors] = useState<Doctor[]>([])
  const [loading, setLoading] = useState(true)
  const [busyAction, setBusyAction] = useState<string | null>(null)
  const [statusMessage, setStatusMessage] = useState('')

  const load = async () => {
    setLoading(true)
    setStatusMessage('')
    try {
      const [centersResponse, doctorsResponse] = await Promise.all([
        fetch('/api/nmk?role=superadmin', { cache: 'no-store' }),
        fetch('/api/doctors?role=superadmin', { cache: 'no-store' }),
      ])

      const [centersResult, doctorsResult] = await Promise.all([
        centersResponse.json(),
        doctorsResponse.json(),
      ])

      if (centersResponse.ok) {
        setPendingCenters(centersResult.data ?? [])
      } else {
        setPendingCenters([])
      }

      if (doctorsResponse.ok) {
        setPendingDoctors(doctorsResult.data ?? [])
      } else {
        setPendingDoctors([])
      }
    } catch {
      setStatusMessage('Unable to load pending approvals right now. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    void load()
  }, [])

  const onApproveCenter = async (id: string) => {
    setBusyAction(`center-${id}`)
    try {
      const response = await fetch(`/api/nmk/approve?id=${id}`, { method: 'POST' })
      const result = await response.json()

      if (!response.ok) {
        setStatusMessage(result?.message || 'Unable to approve center.')
        return
      }

      setStatusMessage('Center approved successfully.')
      await load()
    } finally {
      setBusyAction(null)
    }
  }

  const onApproveDoctor = async (id: string) => {
    setBusyAction(`doctor-${id}`)
    try {
      const response = await fetch(`/api/doctors/approve?id=${id}`, { method: 'POST' })
      const result = await response.json()

      if (!response.ok) {
        setStatusMessage(result?.message || 'Unable to approve doctor.')
        return
      }

      setStatusMessage('Doctor approved successfully.')
      await load()
    } finally {
      setBusyAction(null)
    }
  }

  return (
    <AppShell
      title="Approval"
      subtitle="Approve newly submitted doctors and Nasha Mukti Kendra registrations."
    >
      {loading ? <p className="text-sm text-neutral-600">Loading approvals...</p> : null}

      {statusMessage ? (
        <div className="mb-5 rounded-md border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
          {statusMessage}
        </div>
      ) : null}

      <section className="mb-6">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-xl font-black text-neutral-900">Doctors Pending Approval</h2>
          <span className="rounded-full bg-orange-100 px-3 py-1 text-xs font-semibold text-orange-800">
            {pendingDoctors.length}
          </span>
        </div>

        {pendingDoctors.length === 0 && !loading ? (
          <div className="rounded-xl border border-slate-200 bg-white p-8 text-center text-lg text-neutral-600 shadow-sm">
            No doctors pending approval.
          </div>
        ) : null}

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {pendingDoctors.map(item => (
            <article
              key={item._id}
              className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm"
            >
              <div className="h-56 bg-slate-100">
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
                <h3 className="text-xl font-bold text-cyan-600">{item.Name}</h3>
                <p><strong>Specialization:</strong> {item.Specialization || 'N/A'}</p>
                <p><strong>Address:</strong> {item.ClinicAddress || 'N/A'}</p>
                <p><strong>Email:</strong> {item.Email || 'N/A'}</p>
                <p><strong>Contact:</strong> {item.ContactNumber || 'N/A'}</p>
                <p className="line-clamp-3"><strong>Description:</strong> {item.Description || 'N/A'}</p>

                <button
                  type="button"
                  onClick={() => onApproveDoctor(item._id)}
                  disabled={busyAction === `doctor-${item._id}`}
                  className="mt-2 rounded-md bg-[#f75700] px-4 py-2 text-sm font-semibold text-white hover:bg-[#da4d00] disabled:opacity-60"
                >
                  {busyAction === `doctor-${item._id}` ? 'Approving...' : 'Approve Doctor'}
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section>
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-xl font-black text-neutral-900">Nasha Mukti Kendra Pending Approval</h2>
          <span className="rounded-full bg-orange-100 px-3 py-1 text-xs font-semibold text-orange-800">
            {pendingCenters.length}
          </span>
        </div>

        {pendingCenters.length === 0 && !loading ? (
          <div className="rounded-xl border border-slate-200 bg-white p-8 text-center text-lg text-neutral-600 shadow-sm">
            No NMK centers pending approval.
          </div>
        ) : null}

        <div className="flex flex-wrap justify-around gap-6">
          {pendingCenters.map(item => (
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
                    onClick={() => onApproveCenter(item._id)}
                    disabled={busyAction === `center-${item._id}`}
                    className="mt-2 rounded-md bg-[#f75700] px-4 py-2 text-sm font-semibold text-white hover:bg-[#da4d00] disabled:opacity-60"
                  >
                    {busyAction === `center-${item._id}` ? 'Approving...' : 'Approve Center'}
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </AppShell>
  )
}
