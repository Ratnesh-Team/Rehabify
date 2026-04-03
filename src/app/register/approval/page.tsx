import { LegacyShell } from '@/components/legacy/LegacyShell'
import Link from 'next/link'

export default function RegisterApprovalPage() {
  return (
    <LegacyShell
      title="Data Verification In Progress"
      subtitle="We are verifying your Nasha Mukti Kendra details."
    >
      <div className="rounded-xl border border-orange-200 bg-white p-10 text-center shadow-sm">
        <p className="text-lg font-semibold text-neutral-900">Usually it takes 2 to 5 days.</p>
        <p className="mt-3 text-sm text-neutral-600">
          While we verify your data, you can explore the database and other services.
        </p>

        <Link
          href="/database"
          className="mt-6 inline-flex rounded-full bg-[#f75700] px-6 py-3 text-sm font-semibold text-white hover:bg-[#da4d00]"
        >
          Go to Database
        </Link>
      </div>
    </LegacyShell>
  )
}
