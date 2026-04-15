import type { Metadata } from 'next'
import { Cormorant_Garamond, Manrope } from 'next/font/google'
import Image from 'next/image'
import Link from 'next/link'
import { MobileMenu } from '@/components/landing/MobileMenu'

const displayFont = Cormorant_Garamond({
  subsets: ['latin'],
  variable: '--font-display',
  weight: ['500', '600', '700'],
})

const bodyFont = Manrope({
  subsets: ['latin'],
  variable: '--font-body',
  weight: ['400', '500', '600', '700', '800'],
})

export const metadata: Metadata = {
  title: 'Rehabify | Nasha Mukti Kendra Operations Platform',
  description:
    'Rehabify connects patients, doctors, and Nasha Mukti Kendras on one coordinated platform. Discover centers, book appointments, and manage recovery workflows.',
  alternates: { canonical: 'https://ratnesh-maurya.com/' },
  openGraph: {
    title: 'Rehabify | Nasha Mukti Kendra Operations Platform',
    description: 'A demonstration platform for coordinated rehabilitation operations.',
    url: 'https://ratnesh-maurya.com/',
    siteName: 'Rehabify',
    type: 'website',
  },
}

const landingJsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebSite',
      name: 'Rehabify Demo',
      url: 'https://ratnesh-maurya.com/',
      description: 'Demo website for Nasha Mukti Kendra rehabilitation platform.',
      publisher: { '@type': 'Organization', name: 'Rehabify', url: 'https://ratnesh-maurya.com/' },
    },
  ],
}

const features = [
  { icon: '🔍', title: 'Doctor Discovery', description: 'Browse verified doctor profiles, filter by specialization, and initiate appointment bookings in seconds.' },
  { icon: '🏥', title: 'Center Onboarding', description: 'Register Nasha Mukti Kendras with complete operational details ready for admin review.' },
  { icon: '🩺', title: 'Patient Management', description: 'Track patient admissions, treatment progress, counselling sessions, and recovery milestones.' },
  { icon: '📋', title: 'Approval Workflows', description: 'Superadmins review and approve doctors and centers through a structured verification pipeline.' },
  { icon: '💊', title: 'Recovery Resources', description: 'Guide families to home remedy content and treatment center directories in one integrated flow.' },
  { icon: '🤝', title: 'Community Support', description: 'Connect patients and families to a support network built around compassionate care.' },
]

const processSteps = [
  { step: '01', title: 'Discover', description: 'Compare doctors and centers from a clear and trusted interface.' },
  { step: '02', title: 'Register', description: 'Care providers submit center and doctor records with complete context.' },
  { step: '03', title: 'Coordinate', description: 'Appointments, resources, and support actions stay aligned across teams.' },
]

const stats = [
  { value: '100+', label: 'NMK Profiles' },
  { value: '50+', label: 'NGO Collaborations' },
  { value: '400+', label: 'Support Touchpoints' },
  { value: '24/7', label: 'Platform Availability' },
]

export default function LandingGatewayPage() {
  return (
    <main
      className={`${displayFont.variable} ${bodyFont.variable} min-h-screen bg-[radial-gradient(circle_at_12%_14%,_#fff7e8_0%,_#f7edd8_45%,_#f1e2c2_100%)] text-[#261f17] [font-family:var(--font-body)]`}
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(landingJsonLd) }} />

      {/* ── Header ── */}
      <div className="relative overflow-hidden">
        <div className="pointer-events-none absolute -left-20 top-8 h-72 w-72 rounded-full bg-[#f75700]/12 blur-3xl" />
        <div className="pointer-events-none absolute right-0 top-0 h-72 w-72 rounded-full bg-[#0b6e69]/12 blur-3xl" />

        <div className="mx-auto w-full max-w-7xl px-4 pb-10 pt-5 sm:pb-14 sm:pt-6 md:px-8">

          {/* Nav bar */}
          <header className="flex items-center justify-between gap-3 rounded-full border border-[#d7c6aa] bg-white/80 px-4 py-3 backdrop-blur md:px-6">
            <Link href="/">
              <Image
                src="/img/logo/logo-dark-full.png"
                alt="Rehabify"
                width={140}
                height={38}
                className="h-auto w-30 sm:w-37.5"
                priority
              />
            </Link>

            {/* Desktop nav */}
            <nav className="hidden items-center gap-1 text-xs font-bold uppercase tracking-[0.09em] text-[#6a5640] sm:flex sm:text-sm">
              <Link className="rounded-full px-3 py-2 transition hover:bg-[#f5ebd8]" href="/home">Home</Link>
              <Link className="rounded-full px-3 py-2 transition hover:bg-[#f5ebd8]" href="/doctor">Doctors</Link>
              <Link className="hidden rounded-full px-3 py-2 transition hover:bg-[#f5ebd8] md:block" href="/register">Register NMK</Link>
              <Link className="hidden rounded-full px-3 py-2 transition hover:bg-[#f5ebd8] lg:block" href="/community">Community</Link>
              <Link
                href="/auth/signin"
                className="ml-1 rounded-full border border-[#0b6e69] px-4 py-2 text-[#0b6e69] transition hover:bg-[#e8f5f4]"
              >
                Sign In
              </Link>
            </nav>

            {/* Mobile hamburger */}
            <MobileMenu />
          </header>

          {/* ── Hero ── */}
          <section className="mt-6 grid gap-5 sm:mt-8 lg:grid-cols-[1.2fr_0.8fr] lg:gap-6">

            {/* Hero card */}
            <article className="rounded-3xl border border-[#d9c8ac] bg-white/78 p-5 shadow-lg shadow-[#8c7447]/10 sm:rounded-4xl sm:p-8 md:p-10">
              <span className="inline-flex rounded-full border border-[#cfb490] bg-[#fff4e2] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-[#8a5524] sm:px-4 sm:text-xs">
                Rehabilitation Platform
              </span>
              <h1 className="mt-3 text-3xl leading-tight text-[#251f18] [font-family:var(--font-display)] sm:mt-4 sm:text-4xl md:text-5xl lg:text-6xl">
                Digital Infrastructure for Recovery Workflows
              </h1>
              <p className="mt-4 text-sm leading-7 text-[#584d40] sm:mt-5 sm:text-base md:text-lg">
                Rehabify connects patients, doctors, and Nasha Mukti Kendras — from discovery to discharge, every step streamlined.
              </p>
              <div className="mt-3 rounded-xl border border-[#d8c7a9] bg-[#fffaf0] px-4 py-3 text-xs text-[#5f5344] sm:text-sm">
                <strong>Demo Disclaimer:</strong> All data is dummy data for demonstration purposes only.
              </div>

              <div className="mt-5 flex flex-col gap-3 sm:mt-7 sm:flex-row sm:flex-wrap">
                <Link
                  href="/home"
                  className="flex w-full items-center justify-center gap-2 rounded-full bg-[#f75700] px-6 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-[#df4f00] sm:w-auto sm:px-7 sm:py-3.5"
                >
                  Explore Platform
                </Link>
                <Link
                  href="/auth/signup"
                  className="flex w-full items-center justify-center gap-2 rounded-full border border-[#0b6e69] bg-white px-6 py-3 text-sm font-semibold text-[#0b6e69] transition hover:bg-[#e8f5f4] sm:w-auto sm:px-7 sm:py-3.5"
                >
                  Create Account
                </Link>
              </div>
            </article>

            {/* Stats panel */}
            <aside className="rounded-3xl border border-[#bcdedb] bg-[#e9f7f6] p-5 shadow-lg shadow-[#1f5f5a]/10 sm:rounded-4xl sm:p-6 md:p-8">
              <p className="text-xs font-bold uppercase tracking-[0.13em] text-[#0b6e69]">Platform Snapshot</p>
              <div className="mt-3 grid grid-cols-2 gap-3 lg:grid-cols-1">
                {stats.map(stat => (
                  <div key={stat.label} className="rounded-2xl border border-[#d4ece9] bg-white/85 p-3 sm:p-4">
                    <p className="text-2xl font-black text-[#f75700] sm:text-3xl">{stat.value}</p>
                    <p className="mt-1 text-xs font-semibold text-[#2f4f4b] sm:text-sm">{stat.label}</p>
                  </div>
                ))}
              </div>
            </aside>
          </section>
        </div>
      </div>

      {/* ── Features Grid ── */}
      <section className="mx-auto mt-2 w-full max-w-7xl px-4 sm:mt-4 md:px-8">
        <div className="mb-5 flex flex-wrap items-end justify-between gap-3 sm:mb-6">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.12em] text-[#8a5524]">Platform Features</p>
            <h2 className="mt-1 text-2xl text-[#2a231c] [font-family:var(--font-display)] sm:text-3xl">
              Everything you need, in one place
            </h2>
          </div>
          <Link
            href="/doctor"
            className="inline-flex items-center rounded-full border border-[#d1c0a8] bg-white px-4 py-2 text-xs font-semibold text-[#66523d] transition hover:bg-[#f8efdf] sm:text-sm"
          >
            Browse Doctors
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {features.map(item => (
            <article
              key={item.title}
              className="rounded-2xl border border-[#dccdb7] bg-white/82 p-5 shadow-sm transition hover:shadow-md"
            >
              <span className="text-2xl">{item.icon}</span>
              <h3 className="mt-3 text-base font-bold text-[#28221a] sm:text-lg">{item.title}</h3>
              <p className="mt-2 text-sm leading-6 text-[#584e41]">{item.description}</p>
            </article>
          ))}
        </div>
      </section>

      {/* ── How It Works ── */}
      <section className="mx-auto mb-8 mt-6 w-full max-w-7xl px-4 sm:mb-10 sm:mt-8 md:px-8">
        <div className="rounded-3xl border border-[#d7c8b1] bg-[#fff7e9] p-5 sm:rounded-4xl sm:p-6 md:p-10">
          <div className="mb-5 flex flex-wrap items-end justify-between gap-3 sm:mb-6">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.12em] text-[#8a5524]">Simple Process</p>
              <h2 className="mt-1 text-2xl text-[#2a231c] [font-family:var(--font-display)] sm:text-3xl">
                How the platform works
              </h2>
            </div>
            <Link
              href="/treatment-centers"
              className="inline-flex items-center rounded-full border border-[#d1c0a8] bg-white px-4 py-2 text-xs font-semibold text-[#66523d] transition hover:bg-[#f8efdf] sm:text-sm"
            >
              Explore Centers
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {processSteps.map(item => (
              <article key={item.step} className="rounded-2xl border border-[#e5d8c5] bg-white p-5">
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#8a5524]">Step {item.step}</p>
                <h3 className="mt-3 text-lg font-bold text-[#2d251d] [font-family:var(--font-display)] sm:text-xl">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-[#5e5245]">{item.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Banner ── */}
      <section className="mx-auto mb-12 w-full max-w-7xl px-4 sm:mb-14 md:px-8">
        <div className="flex flex-col items-center gap-4 rounded-3xl border border-[#d7c8b1] bg-linear-to-br from-[#f75700] to-[#c44600] p-7 text-center text-white shadow-lg sm:rounded-4xl sm:p-10 md:p-12">
          <h2 className="text-2xl font-bold [font-family:var(--font-display)] sm:text-3xl md:text-4xl">
            Ready to get started?
          </h2>
          <p className="max-w-xl text-sm leading-6 text-white/85 sm:text-base">
            Register your Nasha Mukti Kendra, discover verified doctors, or explore recovery resources — all from one platform.
          </p>
          <div className="flex w-full flex-col gap-3 pt-1 sm:w-auto sm:flex-row sm:flex-wrap sm:justify-center">
            <Link
              href="/auth/signup"
              className="flex w-full items-center justify-center rounded-full bg-white px-7 py-3.5 text-sm font-bold text-[#f75700] transition hover:bg-orange-50 sm:w-auto"
            >
              Sign Up Free
            </Link>
            <Link
              href="/register"
              className="flex w-full items-center justify-center rounded-full border border-white/50 px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-white/10 sm:w-auto"
            >
              Register NMK
            </Link>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t border-[#d7c7aa] bg-[#f5ecd9]">
        <div className="mx-auto grid w-full max-w-7xl gap-8 px-4 py-10 sm:grid-cols-2 md:grid-cols-4 md:px-8">
          <div className="sm:col-span-2 md:col-span-2">
            <Image src="/img/logo/logo-dark-full.png" alt="Rehabify" width={150} height={40} className="h-auto" />
            <p className="mt-3 max-w-sm text-sm leading-6 text-[#5d5042]">
              Rehabify demonstrates clear and compassionate digital workflows for rehabilitation care coordination across India.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-[0.1em] text-[#6f593f]">Platform</h3>
            <ul className="mt-3 flex flex-col gap-2 text-sm text-[#584b3d]">
              <li><Link href="/home" className="transition hover:text-[#f75700]">Home</Link></li>
              <li><Link href="/doctor" className="transition hover:text-[#f75700]">Doctors</Link></li>
              <li><Link href="/register" className="transition hover:text-[#f75700]">Register NMK</Link></li>
              <li><Link href="/treatment-centers" className="transition hover:text-[#f75700]">Treatment Centers</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-[0.1em] text-[#6f593f]">Support</h3>
            <ul className="mt-3 flex flex-col gap-2 text-sm text-[#584b3d]">
              <li><Link href="/community" className="transition hover:text-[#f75700]">Community</Link></li>
              <li><Link href="/home-remedies" className="transition hover:text-[#f75700]">Home Remedies</Link></li>
              <li>
                <a href="https://blog.ratnesh-maurya.com/" target="_blank" rel="noopener noreferrer" className="transition hover:text-[#f75700]">Blog</a>
              </li>
              <li><Link href="/auth/signin" className="transition hover:text-[#f75700]">Sign In</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-[#deceaf] px-4 py-4 text-center text-xs tracking-[0.08em] text-[#6b5740] md:px-8">
          Copyright {new Date().getFullYear()} Rehabify Demo. Built for demonstration purposes only.
        </div>
      </footer>
    </main>
  )
}
