'use client'

import { SessionActions } from '@/components/auth/SessionActions'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ReactNode } from 'react'

const navLinks = [
  { href: '/home', label: 'Home' },
  { href: '/database', label: 'Database' },
  { href: '/treatment-centers', label: 'Treatment Centers' },
  { href: '/home-remedies', label: 'Home Remedies' },
  { href: '/doctor', label: 'Doctor Appointment' },
  { href: '/register', label: 'Manage NMK' },
  { href: '/superadmin', label: 'Approval' },
  { href: '/contributor', label: 'Contributor' },
]

type AppShellProps = {
  title: string
  subtitle?: string
  children: ReactNode
}

function desktopNavClassname(isCurrent: boolean) {
  if (isCurrent) {
    return 'block rounded-md bg-[#f75700] px-3 py-2 text-sm font-semibold text-white transition-colors'
  }

  return 'block rounded-md px-3 py-2 text-sm text-neutral-700 transition-colors hover:bg-orange-100/80'
}

function mobileNavClassname(isCurrent: boolean) {
  if (isCurrent) {
    return 'rounded-md bg-[#f75700] px-3 py-2 text-xs font-semibold text-white transition-colors'
  }

  return 'rounded-md px-3 py-2 text-xs text-neutral-700 transition-colors hover:bg-orange-100/80'
}

function isActive(pathname: string, href: string) {
  if (href === '/home') {
    return pathname === '/home'
  }

  return pathname === href || pathname.startsWith(`${href}/`)
}

export function AppShell({ title, subtitle, children }: AppShellProps) {
  const pathname = usePathname()

  return (
    <main className="min-h-screen bg-[#f8fafc]">
      <div className="mx-auto flex w-full max-w-375">
        <aside className="sticky top-0 hidden h-screen w-72 shrink-0 flex-col border-r border-orange-200 bg-white md:flex">
          <div className="border-b border-orange-200 px-5 py-5">
            <Link href="/home" className="inline-flex items-center">
              <Image src="/img/logo/logo-light-full.png" alt="Rehabify" width={150} height={42} className="h-auto" />
            </Link>
          </div>

          <nav className="flex-1 space-y-1 overflow-y-auto p-4">
            {navLinks.map(link => (
              <Link key={link.href} href={link.href} className={desktopNavClassname(isActive(pathname, link.href))}>
                {link.label}
              </Link>
            ))}
            <Link
              href="/dashboard"
              className="mt-4 block rounded-md border border-orange-300 px-3 py-2 text-sm font-medium text-orange-700 transition-colors hover:bg-orange-50"
            >
              Admin Dashboard
            </Link>
          </nav>

          <div className="border-t border-orange-200 p-4">
            <SessionActions />
          </div>
        </aside>

        <div className="flex min-h-screen min-w-0 flex-1 flex-col">
          <header className="sticky top-0 z-20 border-b border-orange-200 bg-white px-4 py-4 md:hidden">
            <div className="flex items-center justify-between gap-3">
              <Link href="/home" className="inline-flex items-center">
                <Image src="/img/logo/logo-light-full.png" alt="Rehabify" width={140} height={40} className="h-auto" />
              </Link>
              <Link
                href="/dashboard"
                className="rounded-md border border-orange-300 px-2.5 py-1.5 text-xs font-medium text-orange-700"
              >
                Dashboard
              </Link>
            </div>

            <nav className="mt-3 flex gap-2 overflow-x-auto pb-1">
              {navLinks.map(link => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`${mobileNavClassname(isActive(pathname, link.href))} whitespace-nowrap`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </header>

          <section className="flex-1 px-4 py-8 md:px-8">
            <div className="mb-5 rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
              <h1 className="text-3xl font-black text-neutral-900">{title}</h1>
              {subtitle ? <p className="mt-2 text-sm text-neutral-600">{subtitle}</p> : null}
            </div>

            {children}
          </section>
        </div>
      </div>
    </main>
  )
}
