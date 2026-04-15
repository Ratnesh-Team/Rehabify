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

type Stats = {
  patients: number
  doctors: number
  nmkCenters: number
}

export default function DashboardPage() {
  const [user, setUser] = useState<CurrentUser | null>(null)
  const [stats, setStats] = useState<Stats | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const load = async () => {
      try {
        const [meRes, usersRes, doctorsRes, nmkRes] = await Promise.all([
          fetch('/api/me'),
          fetch('/api/users', { cache: 'no-store' }),
          fetch('/api/doctors', { cache: 'no-store' }),
          fetch('/api/nmk', { cache: 'no-store' }),
        ])

        if (!meRes.ok) {
          const result = await meRes.json()
          setError(result?.message || 'Unable to load dashboard')
          return
        }

        const [meResult, usersResult, doctorsResult, nmkResult] = await Promise.all([
          meRes.json(),
          usersRes.json(),
          doctorsRes.json(),
          nmkRes.json(),
        ])

        setUser(meResult.data)
        setStats({
          patients: (usersResult.data ?? []).length,
          doctors: (doctorsResult.data ?? []).length,
          nmkCenters: (nmkResult.data ?? []).length,
        })
      } catch {
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

      {loading ? (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {[1, 2, 3].map(i => (
            <div key={i} className="animate-pulse rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="h-4 w-20 rounded bg-slate-200" />
              <div className="mt-3 h-8 w-12 rounded bg-slate-200" />
            </div>
          ))}
        </div>
      ) : null}

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

      {stats ? (
        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <h3 className="text-sm font-semibold text-slate-500">Patients</h3>
            <p className="mt-2 text-3xl font-black text-[#f75700]">{stats.patients}</p>
            <Link href="/dashboard/users" className="mt-2 inline-block text-xs text-orange-600 hover:underline">
              View all →
            </Link>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <h3 className="text-sm font-semibold text-slate-500">Doctors</h3>
            <p className="mt-2 text-3xl font-black text-[#f75700]">{stats.doctors}</p>
            <Link href="/dashboard/doctors" className="mt-2 inline-block text-xs text-orange-600 hover:underline">
              View all →
            </Link>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <h3 className="text-sm font-semibold text-slate-500">NMK Centers</h3>
            <p className="mt-2 text-3xl font-black text-[#f75700]">{stats.nmkCenters}</p>
            <Link href="/dashboard/nmk" className="mt-2 inline-block text-xs text-orange-600 hover:underline">
              View all →
            </Link>
          </div>
        </div>
      ) : null}

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
            href="/doctor"
            className="rounded-md border border-orange-300 px-3 py-2 text-sm font-medium text-orange-700 hover:bg-orange-50"
          >
            Doctors
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
