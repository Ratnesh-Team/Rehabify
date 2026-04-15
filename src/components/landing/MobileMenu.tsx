'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'

const navLinks = [
  { href: '/home', label: 'Home' },
  { href: '/doctor', label: 'Doctors' },
  { href: '/register', label: 'Register NMK' },
  { href: '/community', label: 'Community' },
]

export function MobileMenu() {
  const [open, setOpen] = useState(false)

  // close on route change / escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false) }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [])

  return (
    <div className="relative sm:hidden">
      <button
        type="button"
        aria-label={open ? 'Close menu' : 'Open menu'}
        aria-expanded={open}
        onClick={() => setOpen(o => !o)}
        className="flex size-9 items-center justify-center rounded-full border border-[#d7c6aa] bg-white/80 text-[#6a5640]"
      >
        {open ? (
          /* X icon */
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <line x1="2" y1="2" x2="14" y2="14" /><line x1="14" y1="2" x2="2" y2="14" />
          </svg>
        ) : (
          /* Hamburger */
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <line x1="2" y1="4" x2="14" y2="4" /><line x1="2" y1="8" x2="14" y2="8" /><line x1="2" y1="12" x2="14" y2="12" />
          </svg>
        )}
      </button>

      {open ? (
        <>
          {/* backdrop */}
          <div
            className="fixed inset-0 z-30"
            onClick={() => setOpen(false)}
            aria-hidden="true"
          />
          {/* drawer */}
          <nav className="absolute right-0 top-12 z-40 min-w-[180px] rounded-2xl border border-[#d7c6aa] bg-white/95 p-3 shadow-xl backdrop-blur">
            {navLinks.map(link => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="block rounded-xl px-4 py-2.5 text-sm font-semibold text-[#6a5640] transition hover:bg-[#f5ebd8]"
              >
                {link.label}
              </Link>
            ))}
            <div className="my-2 border-t border-[#ede0c8]" />
            <Link
              href="/auth/signin"
              onClick={() => setOpen(false)}
              className="block rounded-xl border border-[#0b6e69] px-4 py-2.5 text-center text-sm font-semibold text-[#0b6e69] transition hover:bg-[#e8f5f4]"
            >
              Sign In
            </Link>
          </nav>
        </>
      ) : null}
    </div>
  )
}
