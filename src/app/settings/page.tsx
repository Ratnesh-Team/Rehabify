'use client'

import { LegacyShell } from '@/components/legacy/LegacyShell'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

type CurrentUser = {
  id: string
  email: string
  firstName?: string
  lastName?: string
  role?: string
  authority?: string[]
}

function getDisplayName(user: CurrentUser) {
  const firstName = (user.firstName ?? '').trim()
  const lastName = (user.lastName ?? '').trim()
  const fullName = `${firstName} ${lastName}`.trim()

  if (fullName) {
    return fullName
  }

  return user.email
}

function getRoleLabel(user: CurrentUser) {
  if (Array.isArray(user.authority) && user.authority.length > 0) {
    return user.authority[0]
  }

  if (user.role) {
    return user.role
  }

  return 'USER'
}

export default function SettingsPage() {
  const router = useRouter()

  const [loading, setLoading] = useState(true)
  const [loggingOut, setLoggingOut] = useState(false)
  const [user, setUser] = useState<CurrentUser | null>(null)

  useEffect(() => {
    const load = async () => {
      try {
        const response = await fetch('/api/me', { cache: 'no-store' })
        if (!response.ok) {
          setUser(null)
          return
        }

        const result = await response.json()
        setUser(result.data ?? null)
      } finally {
        setLoading(false)
      }
    }

    void load()
  }, [])

  const handleLogout = async () => {
    setLoggingOut(true)
    try {
      await fetch('/api/auth/logout', { method: 'POST' })
      router.push('/auth/signin')
      router.refresh()
    } finally {
      setLoggingOut(false)
    }
  }

  return (
    <LegacyShell title="Settings" subtitle="Manage your session and account access.">
      {loading ? <p className="text-sm text-neutral-600">Loading account settings...</p> : null}

      {!loading && !user ? (
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm text-neutral-700">You are currently not logged in.</p>
          <div className="mt-4 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => router.push('/auth/signin')}
              className="rounded-md border border-orange-300 px-3 py-2 text-sm font-medium text-orange-700 hover:bg-orange-50"
            >
              Login
            </button>
            <button
              type="button"
              onClick={() => router.push('/auth/signup')}
              className="rounded-md bg-[#f75700] px-3 py-2 text-sm font-semibold text-white hover:bg-[#da4d00]"
            >
              Create Account
            </button>
          </div>
        </div>
      ) : null}

      {user ? (
        <div className="space-y-4">
          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-bold text-neutral-900">Account</h2>
            <dl className="mt-4 grid gap-3 text-sm">
              <div>
                <dt className="font-semibold text-neutral-700">Name</dt>
                <dd className="text-neutral-600">{getDisplayName(user)}</dd>
              </div>
              <div>
                <dt className="font-semibold text-neutral-700">Email</dt>
                <dd className="text-neutral-600">{user.email}</dd>
              </div>
              <div>
                <dt className="font-semibold text-neutral-700">Role</dt>
                <dd className="text-neutral-600">{getRoleLabel(user)}</dd>
              </div>
            </dl>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="text-base font-bold text-neutral-900">Session</h3>
            <p className="mt-2 text-sm text-neutral-600">Use logout to securely end your current session.</p>
            <button
              type="button"
              onClick={handleLogout}
              disabled={loggingOut}
              className="mt-4 rounded-md border border-amber-300 bg-white px-3 py-2 text-sm font-medium text-amber-700 hover:bg-amber-50 disabled:opacity-60"
            >
              {loggingOut ? 'Logging out...' : 'Logout'}
            </button>
          </div>
        </div>
      ) : null}
    </LegacyShell>
  )
}
