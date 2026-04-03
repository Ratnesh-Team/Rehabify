'use client'

import { LegacyShell } from '@/components/legacy/LegacyShell'
import { useSearchParams } from 'next/navigation'
import { Suspense, useEffect, useMemo, useState } from 'react'

type Center = {
  _id: string
  Name: string
  Address: string
  Owner_Name: string
  Email?: string
  Contact_Number?: number
  ImageURL?: string
}

type Patient = {
  _id: string
  Name: string
  Addiction_Type: string
  State: string
  Gender: string
  Joining_Date: string
  Employment_Status: number
}

const PAGE_TITLE = 'NMK'
const PAGE_SUBTITLE =
  'View center details and anonymized patient records for the selected center.'

function NmkPageContent() {
  const searchParams = useSearchParams()
  const nmkCode = searchParams.get('NMK_Code')

  const [center, setCenter] = useState<Center | null>(null)
  const [patients, setPatients] = useState<Patient[]>([])
  const [loading, setLoading] = useState(true)
  const [query, setQuery] = useState('')

  useEffect(() => {
    const load = async () => {
      if (!nmkCode) {
        setLoading(false)
        return
      }

      try {
        const [centerResponse, usersResponse] = await Promise.all([
          fetch(`/api/nmk?NMK_Code=${encodeURIComponent(nmkCode)}`),
          fetch(`/api/users?NMK_Code=${encodeURIComponent(nmkCode)}`),
        ])

        const [centerResult, usersResult] = await Promise.all([
          centerResponse.json(),
          usersResponse.json(),
        ])

        if (centerResponse.ok) {
          const centerData = centerResult.data ?? []
          setCenter(centerData[0] ?? null)
        }

        if (usersResponse.ok) {
          setPatients(usersResult.data ?? [])
        }
      } finally {
        setLoading(false)
      }
    }

    void load()
  }, [nmkCode])

  const filteredPatients = useMemo(() => {
    const search = query.trim().toLowerCase()
    if (!search) {
      return patients
    }

    return patients.filter(patient => {
      return (
        patient.Addiction_Type.toLowerCase().includes(search) ||
        patient.State.toLowerCase().includes(search) ||
        patient.Gender.toLowerCase().includes(search) ||
        patient.Joining_Date.toLowerCase().includes(search)
      )
    })
  }, [patients, query])

  const downloadJson = () => {
    const payload = filteredPatients.map(patient => ({
      ...patient,
      Name: '*******',
      Employment_Status: patient.Employment_Status === 1 ? 'Yes' : 'No',
    }))

    const blob = new Blob([JSON.stringify(payload, null, 2)], {
      type: 'application/json',
    })

    const url = URL.createObjectURL(blob)
    const anchor = document.createElement('a')
    anchor.href = url
    anchor.download = 'nmk-patients.json'
    anchor.click()
    URL.revokeObjectURL(url)
  }

  return (
    <LegacyShell
      title={PAGE_TITLE}
      subtitle={PAGE_SUBTITLE}
    >
      {!nmkCode ? (
        <div className="rounded-xl border border-slate-200 bg-white p-8 text-center text-sm text-neutral-600 shadow-sm">
          NMK_Code query parameter is required.
        </div>
      ) : null}

      {loading ? <p className="text-sm text-neutral-600">Loading center data...</p> : null}

      {center ? (
        <div className="mb-5 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
          <div className="grid md:grid-cols-2">
            <div className="h-64 bg-slate-100">
              {center.ImageURL ? (
                <div
                  role="img"
                  aria-label={center.Name}
                  className="h-full w-full bg-cover bg-center"
                  style={{ backgroundImage: `url(${center.ImageURL})` }}
                />
              ) : null}
            </div>
            <div className="space-y-2 p-5">
              <h2 className="text-2xl font-bold text-cyan-600">{center.Name}</h2>
              <p className="text-sm text-neutral-700">
                {center.Address}{' '}
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(center.Address)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  (View on map)
                </a>
              </p>
              <p className="text-sm font-semibold text-neutral-800">{center.Owner_Name}</p>
              <p className="text-sm text-neutral-700">{center.Email ?? 'N/A'}</p>
              <p className="text-sm text-neutral-700">{center.Contact_Number ?? 'N/A'}</p>
            </div>
          </div>
        </div>
      ) : null}

      <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <h3 className="text-lg font-semibold text-neutral-900">Nasha Mukti Kendra Patient</h3>
          <div className="flex gap-2">
            <input
              type="text"
              value={query}
              onChange={event => setQuery(event.target.value)}
              placeholder="Search..."
              className="rounded-md border border-orange-200 px-3 py-2 text-sm outline-none ring-orange-300 focus:ring"
            />
            <button
              type="button"
              onClick={downloadJson}
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
                <th className="px-4 py-3">Gender</th>
                <th className="px-4 py-3">Joining Date</th>
                <th className="px-4 py-3">Employed</th>
              </tr>
            </thead>
            <tbody>
              {filteredPatients.map(patient => (
                <tr key={patient._id} className="border-t border-slate-100">
                  <td className="px-4 py-3">*******</td>
                  <td className="px-4 py-3">{patient.Addiction_Type}</td>
                  <td className="px-4 py-3">{patient.State}</td>
                  <td className="px-4 py-3">{patient.Gender}</td>
                  <td className="px-4 py-3">{patient.Joining_Date}</td>
                  <td className="px-4 py-3">{patient.Employment_Status === 1 ? 'Yes' : 'No'}</td>
                </tr>
              ))}

              {!loading && filteredPatients.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-4 py-8 text-center text-neutral-600">
                    Patients not yet registered.
                  </td>
                </tr>
              ) : null}
            </tbody>
          </table>
        </div>
      </div>
    </LegacyShell>
  )
}

export default function NmkPage() {
  return (
    <Suspense
      fallback={
        <LegacyShell title={PAGE_TITLE} subtitle={PAGE_SUBTITLE}>
          <p className="text-sm text-neutral-600">Loading center data...</p>
        </LegacyShell>
      }
    >
      <NmkPageContent />
    </Suspense>
  )
}
