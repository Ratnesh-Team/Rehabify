'use client'

import { SessionActions } from '@/components/auth/SessionActions'
import { LogoutButton } from '@/components/dashboard/LogoutButton'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

function desktopNavClassname(isActive: boolean) {
  if (isActive) {
    return 'block rounded-md bg-[#f75700] px-3 py-2 text-sm font-semibold text-white transition-colors'
  }

  return 'block rounded-md px-3 py-2 text-sm text-neutral-700 transition-colors hover:bg-orange-100/70'
}

function mobileNavClassname(isActive: boolean) {
  if (isActive) {
    return 'rounded-md bg-[#f75700] px-3 py-2 text-xs font-semibold text-white transition-colors'
  }

  return 'rounded-md px-3 py-2 text-xs text-neutral-700 transition-colors hover:bg-orange-100/70'
}

const links = [
  { href: '/dashboard', label: 'Overview' },
  { href: '/dashboard/users', label: 'Users' },
  { href: '/dashboard/doctors', label: 'Doctors' },
  { href: '/dashboard/nmk', label: 'NMK Centers' },
  { href: '/dashboard/home-remedies', label: 'Home Remedies' },
]

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      <div className="mx-auto flex w-full max-w-[1500px]">
        <aside className="sticky top-0 hidden h-screen w-72 shrink-0 flex-col border-r border-orange-200 bg-white md:flex">
          <div className="border-b border-orange-200 px-5 py-5">
            <Link href="/dashboard" className="inline-flex items-center">
              <Image src="/img/logo/logo-light-full.png" alt="Rehabify logo" width={150} height={42} className="h-auto" />
            </Link>
          </div>

          <nav className="flex-1 space-y-1 overflow-y-auto p-4">
            {links.map(link => (
              <Link key={link.href} href={link.href} className={desktopNavClassname(pathname === link.href)}>
                {link.label}
              </Link>
            ))}
            <Link
              href="/home"
              className="mt-4 block rounded-md border border-orange-300 px-3 py-2 text-sm font-medium text-orange-700 transition-colors hover:bg-orange-50"
            >
              Open Public Site
            </Link>
          </nav>

          <div className="border-t border-orange-200 p-4">
            <SessionActions />
          </div>
        </aside>

        <div className="flex min-h-screen min-w-0 flex-1 flex-col">
          <header className="sticky top-0 z-20 border-b border-orange-200 bg-white px-4 py-4 md:hidden">
            <div className="flex items-center justify-between gap-2">
              <Link href="/dashboard" className="inline-flex items-center">
                <Image src="/img/logo/logo-light-full.png" alt="Rehabify logo" width={140} height={40} className="h-auto" />
              </Link>
              <div className="flex items-center gap-2">
                <Link
                  href="/settings"
                  className="rounded-md border border-slate-300 px-2.5 py-1.5 text-xs font-medium text-neutral-700"
                >
                  Settings
                </Link>
                <LogoutButton />
              </div>
            </div>

            <nav className="mt-3 flex gap-2 overflow-x-auto pb-1">
              {links.map(link => (
                <Link key={link.href} href={link.href} className={`${mobileNavClassname(pathname === link.href)} whitespace-nowrap`}>
                  {link.label}
                </Link>
              ))}
            </nav>
          </header>

          <main className="flex-1 px-4 py-8 md:px-8">{children}</main>
        </div>
      </div>
    </div>
  )
}
