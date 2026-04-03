import type { Metadata } from 'next'
import { Cormorant_Garamond, Manrope } from 'next/font/google'
import Image from 'next/image'
import Link from 'next/link'

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
  title: 'Rehabify Demo | Nasha Mukti Kendra Operations Showcase',
  description:
    'Rehabify demo website showcasing how Nasha Mukti Kendra can operate across recovery centers, doctor access, and patient workflows. All data shown is dummy demo data.',
  alternates: {
    canonical: 'https://ratnesh-maurya.com/',
  },
  openGraph: {
    title: 'Rehabify Demo | Nasha Mukti Kendra Operations Showcase',
    description:
      'A demonstration platform for coordinated rehabilitation operations. Data shown is dummy demo data.',
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
      description:
        'Demo website that showcases how Nasha Mukti Kendra can operate as a coordinated rehabilitation platform.',
      publisher: {
        '@type': 'Organization',
        name: 'Rehabify',
        url: 'https://ratnesh-maurya.com/',
      },
      sameAs: ['https://blog.ratnesh-maurya.com/'],
    },
    {
      '@type': 'Organization',
      name: 'Rehabify',
      url: 'https://ratnesh-maurya.com/',
      description: 'Rehabilitation operations showcase for Nasha Mukti Kendra workflows.',
      logo: 'https://ratnesh-maurya.com/img/logo/logo-dark-full.png',
    },
    {
      '@type': 'WebPage',
      name: 'Rehabify Landing',
      url: 'https://ratnesh-maurya.com/',
      isPartOf: {
        '@type': 'WebSite',
        url: 'https://ratnesh-maurya.com/',
      },
      about: 'Nasha Mukti Kendra demo operations for rehabilitation workflow orchestration',
    },
  ],
}

const landingHighlights = [
  {
    title: 'Doctor Discovery',
    description: 'Browse doctor profiles and move quickly from search to appointment intent.',
  },
  {
    title: 'Center Onboarding',
    description: 'Register NMK operations with structured details that are ready for review.',
  },
  {
    title: 'Recovery Resources',
    description: 'Guide families to treatment centers and supportive resources in one flow.',
  },
]

const processSteps = [
  {
    step: '01',
    title: 'Discover',
    description: 'Users compare doctors and centers from a clear and trusted interface.',
  },
  {
    step: '02',
    title: 'Register',
    description: 'Care providers submit center and doctor records with complete context.',
  },
  {
    step: '03',
    title: 'Coordinate',
    description: 'Appointments, resources, and support actions stay aligned across teams.',
  },
]

export default function LandingGatewayPage() {
  return (
    <main
      className={`${displayFont.variable} ${bodyFont.variable} min-h-screen bg-[radial-gradient(circle_at_12%_14%,_#fff7e8_0%,_#f7edd8_45%,_#f1e2c2_100%)] text-[#261f17] [font-family:var(--font-body)]`}
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(landingJsonLd) }} />

      <div className="relative overflow-hidden">
        <div className="pointer-events-none absolute -left-20 top-8 h-72 w-72 rounded-full bg-[#f75700]/12 blur-3xl" />
        <div className="pointer-events-none absolute right-0 top-0 h-72 w-72 rounded-full bg-[#0b6e69]/12 blur-3xl" />

        <div className="mx-auto w-full max-w-7xl px-4 pb-14 pt-6 md:px-8 md:pt-8">
          <header className="flex flex-wrap items-center justify-between gap-3 rounded-full border border-[#d7c6aa] bg-white/80 px-4 py-3 backdrop-blur md:px-6">
            <Image
              src="/img/logo/logo-dark-full.png"
              alt="Rehabify"
              width={164}
              height={44}
              className="h-auto"
              priority
            />
            <nav className="flex flex-wrap items-center gap-2 text-xs font-bold uppercase tracking-[0.09em] text-[#6a5640] sm:text-sm">
              <Link className="rounded-full px-3 py-2 transition hover:bg-[#f5ebd8]" href="/home">
                Home
              </Link>
              <Link className="rounded-full px-3 py-2 transition hover:bg-[#f5ebd8]" href="/doctor">
                Doctors
              </Link>
              <Link className="rounded-full px-3 py-2 transition hover:bg-[#f5ebd8]" href="/register">
                Register NMK
              </Link>
              <Link className="rounded-full px-3 py-2 transition hover:bg-[#f5ebd8]" href="/community">
                Community
              </Link>
            </nav>
          </header>

          <section className="mt-8 grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
            <article className="rounded-[2rem] border border-[#d9c8ac] bg-white/78 p-6 shadow-lg shadow-[#8c7447]/10 md:p-8">
              <p className="inline-flex rounded-full border border-[#cfb490] bg-[#fff4e2] px-4 py-1 text-xs font-bold uppercase tracking-[0.14em] text-[#8a5524]">
                Elegant Landing Experience
              </p>
              <h1 className="mt-4 text-4xl leading-tight text-[#251f18] [font-family:var(--font-display)] sm:text-5xl md:text-6xl">
                A Refined Digital Front Door for Recovery Workflows
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-7 text-[#584d40] md:text-lg">
                This root landing now presents the Rehabify story with stronger visual hierarchy, faster action
                paths, and clearer guidance for doctors, centers, and communities.
              </p>
              <p className="mt-3 rounded-xl border border-[#d8c7a9] bg-[#fffaf0] px-4 py-3 text-sm text-[#5f5344]">
                Demo Disclaimer: All data on this website is dummy data for demonstration and does not resemble
                any real person.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  href="/home"
                  className="inline-flex items-center rounded-full bg-[#f75700] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#df4f00]"
                >
                  Enter Home
                </Link>
                <Link
                  href="/auth/signin"
                  className="inline-flex items-center rounded-full border border-[#0b6e69] bg-white px-6 py-3 text-sm font-semibold text-[#0b6e69] transition hover:bg-[#e8f5f4]"
                >
                  Sign In
                </Link>
                <a
                  href="https://blog.ratnesh-maurya.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center rounded-full border border-[#cfb896] bg-white px-6 py-3 text-sm font-semibold text-[#5d4730] transition hover:bg-[#f7efdd]"
                >
                  Visit Blog
                </a>
              </div>
            </article>

            <aside className="rounded-[2rem] border border-[#bcdedb] bg-[#e9f7f6] p-6 shadow-lg shadow-[#1f5f5a]/10 md:p-8">
              <p className="text-xs font-bold uppercase tracking-[0.13em] text-[#0b6e69]">Operational Snapshot</p>
              <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
                <div className="rounded-2xl border border-[#d4ece9] bg-white/85 p-4">
                  <p className="text-3xl font-black text-[#f75700]">100+</p>
                  <p className="mt-1 text-sm font-semibold text-[#2f4f4b]">Nasha Mukti Kendra Profiles</p>
                </div>
                <div className="rounded-2xl border border-[#d4ece9] bg-white/85 p-4">
                  <p className="text-3xl font-black text-[#f75700]">50+</p>
                  <p className="mt-1 text-sm font-semibold text-[#2f4f4b]">NGO Collaboration Records</p>
                </div>
                <div className="rounded-2xl border border-[#d4ece9] bg-white/85 p-4">
                  <p className="text-3xl font-black text-[#f75700]">400+</p>
                  <p className="mt-1 text-sm font-semibold text-[#2f4f4b]">Community Support Touchpoints</p>
                </div>
              </div>
            </aside>
          </section>
        </div>
      </div>

      <section className="mx-auto mt-2 w-full max-w-7xl px-4 md:px-8">
        <div className="grid gap-4 md:grid-cols-3">
          {landingHighlights.map(item => (
            <article key={item.title} className="rounded-2xl border border-[#dccdb7] bg-white/82 p-5 shadow-sm">
              <h2 className="text-xl text-[#28221a] [font-family:var(--font-display)]">{item.title}</h2>
              <p className="mt-2 text-sm leading-6 text-[#584e41]">{item.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto mb-14 mt-6 w-full max-w-7xl px-4 md:px-8">
        <div className="rounded-[2rem] border border-[#d7c8b1] bg-[#fff7e9] p-6 md:p-8">
          <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
            <h2 className="text-3xl text-[#2a231c] [font-family:var(--font-display)]">How the platform flow works</h2>
            <Link
              href="/treatment-centers"
              className="inline-flex items-center rounded-full border border-[#d1c0a8] bg-white px-4 py-2 text-sm font-semibold text-[#66523d] transition hover:bg-[#f8efdf]"
            >
              Explore Centers
            </Link>
          </div>

          <div className="grid gap-3 md:grid-cols-3">
            {processSteps.map(item => (
              <article key={item.step} className="rounded-2xl border border-[#e5d8c5] bg-white p-4">
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#8a5524]">Step {item.step}</p>
                <h3 className="mt-2 text-lg font-bold text-[#2d251d]">{item.title}</h3>
                <p className="mt-1 text-sm leading-6 text-[#5e5245]">{item.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <footer className="border-t border-[#d7c7aa] bg-[#f5ecd9]">
        <div className="mx-auto grid w-full max-w-7xl gap-8 px-4 py-10 md:grid-cols-3 md:px-8">
          <div>
            <Image src="/img/logo/logo-dark-full.png" alt="Rehabify" width={150} height={40} className="h-auto" />
            <p className="mt-3 max-w-xs text-sm leading-6 text-[#5d5042]">
              Rehabify demonstrates clear and compassionate digital workflows for rehabilitation care.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-[0.1em] text-[#6f593f]">Quick Links</h3>
            <ul className="mt-3 space-y-2 text-sm text-[#584b3d]">
              <li>
                <Link href="/home" className="transition hover:text-[#f75700]">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/doctor" className="transition hover:text-[#f75700]">
                  Doctors
                </Link>
              </li>
              <li>
                <Link href="/register" className="transition hover:text-[#f75700]">
                  Register NMK
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-[0.1em] text-[#6f593f]">Support</h3>
            <ul className="mt-3 space-y-2 text-sm text-[#584b3d]">
              <li>
                <Link href="/community" className="transition hover:text-[#f75700]">
                  Community
                </Link>
              </li>
              <li>
                <Link href="/home-remedies" className="transition hover:text-[#f75700]">
                  Home Remedies
                </Link>
              </li>
              <li>
                <a
                  href="https://blog.ratnesh-maurya.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition hover:text-[#f75700]"
                >
                  Blog
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-[#deceaf] px-4 py-4 text-center text-xs tracking-[0.08em] text-[#6b5740] md:px-8">
          Copyright {new Date().getFullYear()} Rehabify Demo. Built for demonstration only.
        </div>
      </footer>
    </main>
  )
}
