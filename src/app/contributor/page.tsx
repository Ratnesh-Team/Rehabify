'use client'

import { AppShell } from '@/components/shell/AppShell'
import { useEffect, useMemo, useState } from 'react'

type Contributor = {
  id: number
  login: string
  avatar_url: string
  html_url: string
  contributions: number
  type: string
}

type Repo = {
  stargazers_count: number
  forks_count: number
  open_issues_count: number
}

export default function ContributorPage() {
  const [contributors, setContributors] = useState<Contributor[]>([])
  const [repo, setRepo] = useState<Repo | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const load = async () => {
      try {
        const [contributorsResponse, repoResponse] = await Promise.all([
          fetch('https://api.github.com/repos/Ratnesh-Team/Rehabify/contributors'),
          fetch('https://api.github.com/repos/Ratnesh-Team/Rehabify'),
        ])

        const [contributorsResult, repoResult] = await Promise.all([
          contributorsResponse.json(),
          repoResponse.json(),
        ])

        if (contributorsResponse.ok) {
          setContributors(contributorsResult)
        }

        if (repoResponse.ok) {
          setRepo(repoResult)
        }
      } finally {
        setLoading(false)
      }
    }

    void load()
  }, [])

  const totalContributions = useMemo(() => {
    return contributors.reduce((sum, item) => sum + item.contributions, 0)
  }, [contributors])

  return (
    <AppShell
      title="Contributors"
      subtitle="Shaping the future of Rehabify, one commit at a time."
    >
      <section
        className="relative mb-6 overflow-hidden rounded-xl bg-cover bg-center p-8 text-white"
        style={{
          backgroundImage:
            "linear-gradient(rgba(17,24,39,0.72), rgba(17,24,39,0.72)), url('https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1800&q=80')",
        }}
      >
        <h2 className="text-3xl font-black">Welcome to our platform</h2>
        <p className="mt-2 max-w-2xl text-sm text-white/90">Join our community and help improve rehabilitation technology.</p>
        <a
          href="https://github.com/Ratnesh-Team/Rehabify"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-5 inline-flex rounded-md bg-[#f75700] px-4 py-2 text-sm font-semibold text-white hover:bg-[#da4d00]"
        >
          Become a Contributor
        </a>
      </section>

      {loading ? <p className="text-sm text-neutral-600">Loading contributor data...</p> : null}

      <section className="mb-6 grid gap-4 md:grid-cols-4">
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <p className="text-xs uppercase tracking-wide text-neutral-500">Contributors</p>
          <p className="mt-2 text-3xl font-black text-[#f75700]">{contributors.length}</p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <p className="text-xs uppercase tracking-wide text-neutral-500">Total Contributions</p>
          <p className="mt-2 text-3xl font-black text-[#f75700]">{totalContributions}</p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <p className="text-xs uppercase tracking-wide text-neutral-500">GitHub Stars</p>
          <p className="mt-2 text-3xl font-black text-[#f75700]">{repo?.stargazers_count ?? 0}</p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <p className="text-xs uppercase tracking-wide text-neutral-500">Forks</p>
          <p className="mt-2 text-3xl font-black text-[#f75700]">{repo?.forks_count ?? 0}</p>
        </div>
      </section>

      <section>
        <h3 className="mb-4 text-2xl font-black text-neutral-900">Meet Our Contributors</h3>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {contributors.map(item => (
            <article
              key={item.id}
              className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <div className="p-5 text-center">
                <div className="mx-auto mb-4 h-24 w-24 overflow-hidden rounded-full border-4 border-orange-100">
                  <div
                    role="img"
                    aria-label={item.login}
                    className="h-full w-full bg-cover bg-center"
                    style={{ backgroundImage: `url(${item.avatar_url})` }}
                  />
                </div>
                <h4 className="text-lg font-bold text-neutral-900">{item.login}</h4>
                <p className="text-sm text-neutral-500">{item.type}</p>
                <p className="mt-3 inline-flex rounded-full bg-orange-100 px-3 py-1 text-xs font-semibold text-orange-700">
                  {item.contributions} contributions
                </p>
              </div>
              <div className="border-t border-slate-100 bg-slate-50 px-5 py-3">
                <a
                  href={item.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-medium text-blue-600 hover:underline"
                >
                  View Profile
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>
    </AppShell>
  )
}
