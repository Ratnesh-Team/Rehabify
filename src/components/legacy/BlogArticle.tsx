import { LegacyShell } from '@/components/legacy/LegacyShell'

type BlogSection = {
  heading: string
  paragraphs: string[]
  bullets?: string[]
}

type BlogArticleProps = {
  title: string
  image: string
  author: string
  lastUpdated: string
  readTime: string
  sections: BlogSection[]
}

export function BlogArticle({
  title,
  image,
  author,
  lastUpdated,
  readTime,
  sections,
}: BlogArticleProps) {
  return (
    <LegacyShell title={title} subtitle="Home Remedies Article">
      <article className="mx-auto max-w-3xl rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-6 h-56 overflow-hidden rounded-lg bg-slate-100">
          <div
            role="img"
            aria-label={title}
            className="h-full w-full bg-cover bg-center"
            style={{ backgroundImage: `url(${image})` }}
          />
        </div>

        <div className="mb-5 flex flex-wrap items-center justify-between gap-3 text-sm text-neutral-600">
          <span className="font-semibold">Created by: {author}</span>
          <span>
            Last Updated {lastUpdated} - {readTime}
          </span>
        </div>

        <div className="space-y-6 text-sm leading-7 text-neutral-700">
          {sections.map(section => (
            <section key={section.heading} className="space-y-3">
              <h2 className="text-xl font-bold text-neutral-900">{section.heading}</h2>
              {section.paragraphs.map(paragraph => (
                <p key={paragraph}>{paragraph}</p>
              ))}
              {section.bullets ? (
                <ul className="list-disc space-y-2 pl-5">
                  {section.bullets.map(item => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              ) : null}
            </section>
          ))}
        </div>
      </article>
    </LegacyShell>
  )
}
