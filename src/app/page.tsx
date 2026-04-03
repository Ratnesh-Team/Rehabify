import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

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

export default function LandingGatewayPage() {
  return (
    <main className="min-h-screen bg-linear-to-br from-[#f7edd8] via-[#f9f4ea] to-[#f3e2bc] text-neutral-900">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(landingJsonLd) }} />
      <section className="mx-auto flex w-full max-w-7xl flex-col items-center gap-10 px-4 py-16 text-center md:px-8 md:py-20">
        <Image
          src="/img/logo/logo-dark-full.png"
          alt="Rehabify"
          width={220}
          height={64}
          className="h-auto"
          priority
        />

        <div className="max-w-3xl">
          <p className="mb-3 inline-flex rounded-full border border-[#d0b48a] bg-white/80 px-4 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-[#7a4b11]">
            Rehabify Platform
          </p>
          <h1 className="text-5xl font-black leading-tight md:text-6xl">
            The Path to a Brighter Tomorrow
          </h1>
          <p className="mt-4 text-sm font-semibold uppercase tracking-[0.08em] text-[#7a4b11] md:text-base">
            Motto: Demonstrating how Nasha Mukti Kendra can operate with clear, humane, and data-informed recovery workflows.
          </p>
          <p className="mt-5 text-base leading-7 text-[#554f47] md:text-lg">
            A modern rehabilitation and recovery platform connecting patients, centers, and healthcare
            professionals through one coordinated digital experience.
          </p>
          <p className="mt-3 rounded-lg border border-[#d0b48a] bg-white/70 px-4 py-2 text-sm text-[#554f47]">
            Demo Disclaimer: All data on this website is dummy data for demonstration and does not resemble any
            real person.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-3">
          <Link
            href="/home"
            className="inline-flex items-center rounded-full bg-[#f75700] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#df4f00]"
          >
            Enter Home
          </Link>
          <Link
            href="/auth/signin"
            className="inline-flex items-center rounded-full border border-[#cfb896] bg-white px-6 py-3 text-sm font-semibold text-[#5d4730] transition hover:bg-[#f7efdd]"
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

        <div className="grid w-full gap-4 md:grid-cols-3">
          <article className="rounded-2xl border border-[#b9e2df] bg-[#e9f7f6] p-5 text-left">
            <h2 className="text-xl font-black">Doctor Access</h2>
            <p className="mt-2 text-sm leading-6 text-[#35524f]">
              Search doctors, review profiles, and book appointments from a unified experience.
            </p>
          </article>
          <article className="rounded-2xl border border-[#f4c7a9] bg-[#fff1e6] p-5 text-left">
            <h2 className="text-xl font-black">Center Operations</h2>
            <p className="mt-2 text-sm leading-6 text-[#5f4735]">
              Register and manage NMK centers with verification, media, and patient workflows.
            </p>
          </article>
          <article className="rounded-2xl border border-[#cdc3f0] bg-[#f2edff] p-5 text-left">
            <h2 className="text-xl font-black">Community Resources</h2>
            <p className="mt-2 text-sm leading-6 text-[#4e4466]">
              Explore home remedies, treatment centers, and recovery resources in one navigation system.
            </p>
          </article>
        </div>
      </section>
    </main>
  )
}
