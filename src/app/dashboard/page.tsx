'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'

type CurrentUser = {
  id: string
  email: string
  firstName: string
  lastName: string
  role: 'USER' | 'DOCTOR' | 'ADMIN'
}

export default function DashboardPage() {
  const [user, setUser] = useState<CurrentUser | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const load = async () => {
      try {
        const response = await fetch('/api/me')
        const result = await response.json()

        if (!response.ok) {
          setError(result?.message || 'Unable to load dashboard')
          return
        }

        setUser(result.data)
      } catch (err) {
        console.error(err)
        setError('Unable to load dashboard')
      } finally {
        setLoading(false)
      }
    }

    void load()
  }, [])

  return (
    <section className="space-y-6">
      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-wide text-[#f75700]">Admin Panel</p>
        <h1 className="mt-2 text-3xl font-black text-neutral-900">Dashboard Overview</h1>
        <p className="mt-2 text-sm text-neutral-600">
          Monitor users, doctors, Nasha Mukti Kendras, and home remedies in one place.
        </p>
      </div>

      {loading ? <p className="text-neutral-600">Loading profile...</p> : null}

      {error ? (
        <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-red-700">{error}</div>
      ) : null}

      {user ? (
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm text-neutral-500">Logged in as</p>
          <h2 className="text-xl font-semibold text-neutral-900">
            {user.firstName} {user.lastName}
          </h2>
          <p className="text-neutral-700">{user.email}</p>
          <p className="mt-3 inline-flex rounded-full bg-orange-100 px-3 py-1 text-xs font-semibold text-orange-800">
            Role: {user.role}
          </p>
        </div>
      ) : null}

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <h3 className="text-sm font-semibold text-slate-500">Users</h3>
          <p className="mt-2 text-3xl font-black text-[#f75700]">01</p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <h3 className="text-sm font-semibold text-slate-500">Doctors</h3>
          <p className="mt-2 text-3xl font-black text-[#f75700]">02</p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <h3 className="text-sm font-semibold text-slate-500">NMK Centers</h3>
          <p className="mt-2 text-3xl font-black text-[#f75700]">03</p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <h3 className="text-sm font-semibold text-slate-500">Home Remedies</h3>
          <p className="mt-2 text-3xl font-black text-[#f75700]">04</p>
        </div>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <h3 className="text-lg font-bold text-neutral-900">Quick Actions</h3>
        <p className="mt-1 text-sm text-neutral-600">Jump directly to frequently used operations.</p>
        <div className="mt-4 flex flex-wrap gap-2">
          <Link
            href="/register"
            className="rounded-md bg-[#f75700] px-3 py-2 text-sm font-semibold text-white hover:bg-[#da4d00]"
          >
            Manage NMK
          </Link>
          <Link
            href="/dashboard/users"
            className="rounded-md border border-orange-300 px-3 py-2 text-sm font-medium text-orange-700 hover:bg-orange-50"
          >
            Manage Patients
          </Link>
          <Link
            href="/superadmin"
            className="rounded-md border border-orange-300 px-3 py-2 text-sm font-medium text-orange-700 hover:bg-orange-50"
          >
            Approvals
          </Link>
        </div>
      </div>
    </section>
  )
}
