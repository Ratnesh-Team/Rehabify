'use client'

import { LogIn, LogOut, Settings, UserPlus } from 'lucide-react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useMemo, useState } from 'react'

type CurrentUser = {
  id: string
  email: string
  firstName?: string
  lastName?: string
  role?: string
  userName?: string
  authority?: string[]
}

type SessionActionsProps = {
  orientation?: 'vertical' | 'horizontal'
}

function getDisplayName(user: CurrentUser | null) {
  if (!user) {
    return ''
  }

  const firstName = (user.firstName ?? '').trim()
  const lastName = (user.lastName ?? '').trim()
  const fullName = `${firstName} ${lastName}`.trim()

  if (fullName) {
    return fullName
  }

  if (typeof user.userName === 'string' && user.userName.trim()) {
    return user.userName
  }

  return user.email
}

function getRoleLabel(user: CurrentUser | null) {
  if (!user) {
    return ''
  }

  if (Array.isArray(user.authority) && user.authority.length > 0) {
    return user.authority[0]
  }

  if (user.role) {
    return user.role
  }

  return 'USER'
}

export function SessionActions({ orientation = 'vertical' }: SessionActionsProps) {
  const router = useRouter()
  const pathname = usePathname()

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
      } catch {
        setUser(null)
      } finally {
        setLoading(false)
      }
    }

    void load()
  }, [])

  const needsRedirectAfterLogout = useMemo(() => {
    return (
      pathname.startsWith('/dashboard') ||
      pathname.startsWith('/settings') ||
      pathname.startsWith('/register') ||
      pathname.startsWith('/superadmin')
    )
  }, [pathname])

  const handleLogout = async () => {
    setLoggingOut(true)
    try {
      await fetch('/api/auth/logout', { method: 'POST' })
      setUser(null)

      if (needsRedirectAfterLogout) {
        router.push('/auth/signin')
      }

      router.refresh()
    } finally {
      setLoggingOut(false)
    }
  }

  const containerClass =
    orientation === 'horizontal' ? 'flex flex-wrap items-center gap-2' : 'flex flex-col gap-2'

  if (loading) {
    return <div className="text-xs text-neutral-500">Loading account...</div>
  }

  if (!user) {
    return (
      <div className={containerClass}>
        <Link
          href="/auth/signin"
          className="inline-flex items-center justify-center gap-2 rounded-md border border-orange-300 px-3 py-2 text-sm font-medium text-orange-700 hover:bg-orange-50"
        >
          <LogIn className="h-4 w-4" />
          Login
        </Link>
        <Link
          href="/auth/signup"
          className="inline-flex items-center justify-center gap-2 rounded-md bg-[#f75700] px-3 py-2 text-sm font-semibold text-white hover:bg-[#da4d00]"
        >
          <UserPlus className="h-4 w-4" />
          Sign Up
        </Link>
      </div>
    )
  }

  return (
    <div className="space-y-2">
      <div className="rounded-md border border-orange-100 bg-orange-50/70 p-3">
        <p className="truncate text-sm font-semibold text-neutral-900">{getDisplayName(user)}</p>
        <p className="truncate text-xs text-neutral-600">{user.email}</p>
        <p className="mt-1 text-[11px] font-semibold uppercase tracking-wide text-orange-700">
          {getRoleLabel(user)}
        </p>
      </div>

      <div className={containerClass}>
        <Link
          href="/settings"
          className="inline-flex items-center justify-center gap-2 rounded-md border border-slate-300 px-3 py-2 text-sm font-medium text-neutral-700 hover:bg-slate-50"
        >
          <Settings className="h-4 w-4" />
          Settings
        </Link>
        <button
          type="button"
          onClick={handleLogout}
          disabled={loggingOut}
          className="inline-flex items-center justify-center gap-2 rounded-md border border-amber-300 bg-white px-3 py-2 text-sm font-medium text-amber-700 hover:bg-amber-50 disabled:opacity-60"
        >
          <LogOut className="h-4 w-4" />
          {loggingOut ? 'Logging out...' : 'Logout'}
        </button>
      </div>
    </div>
  )
}
