import { LandingExperience } from '@/components/landing/LandingExperience'
import { AppShell } from '@/components/shell/AppShell'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Home | Rehabify Nasha Mukti Kendra Demo',
  description:
    'Homepage for the Rehabify Nasha Mukti Kendra demo. Explore doctors, NMK workflows, and recovery operations using dummy demo data.',
  alternates: {
    canonical: 'https://ratnesh-maurya.com/home',
  },
  openGraph: {
    title: 'Home | Rehabify Nasha Mukti Kendra Demo',
    description:
      'Demo homepage that shows how Nasha Mukti Kendra can coordinate healthcare workflows across patients, centers, and doctors.',
    url: 'https://ratnesh-maurya.com/home',
    siteName: 'Rehabify',
    type: 'website',
  },
}

const homeJsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      name: 'Rehabify',
      url: 'https://ratnesh-maurya.com/',
      sameAs: ['https://blog.ratnesh-maurya.com/'],
      description: 'Nasha Mukti Kendra operations demo for rehabilitation workflow management.',
    },
    {
      '@type': 'WebPage',
      name: 'Rehabify Home',
      url: 'https://ratnesh-maurya.com/home',
      description:
        'Demo homepage for Nasha Mukti Kendra operations with dummy data covering doctor discovery, NMK onboarding, and recovery resources.',
      isPartOf: {
        '@type': 'WebSite',
        url: 'https://ratnesh-maurya.com/',
      },
    },
  ],
}

export default function HomePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(homeJsonLd) }} />
      <AppShell title="Home" subtitle="Doctor access, NMK onboarding, and recovery resources.">
        <LandingExperience />
      </AppShell>
    </>
  )
}
