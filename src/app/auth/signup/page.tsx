import { SignupForm } from '@/components/auth/SignupForm'
import Image from 'next/image'

export default function SignupPage() {
  return (
    <div className="grid min-h-screen lg:grid-cols-3">
      <aside
        className="hidden flex-col justify-between bg-cover bg-center bg-no-repeat p-10 text-black lg:flex"
        style={{ backgroundImage: "url('/img/others/Frame36.png')" }}
      >
        <Image src="/img/logo/logo-dark-full.png" alt="Rehabify logo" width={170} height={48} className="h-auto" />

        <div>
          <div className="mb-6 flex items-center gap-3">
            <Image src="/img/avatars/thumb-1.jpg" alt="Team member" width={70} height={70} className="rounded-full border-2 border-white object-cover" />
            <Image src="/img/avatars/thumb-2.jpg" alt="Team member" width={60} height={60} className="rounded-full border-2 border-white object-cover" />
            <Image src="/img/avatars/thumb-3.jpg" alt="Team member" width={50} height={50} className="rounded-full border-2 border-white object-cover" />
          </div>
          <p className="text-base font-semibold text-black">Rehabify Team</p>
          <p className="text-sm text-black/80">Developers</p>
          <p className="mt-6 text-lg font-semibold text-black/80">The Path to a Brighter Tomorrow</p>
        </div>

        <p className="text-sm text-black/80">Copyright {new Date().getFullYear()} Rehabify</p>
      </aside>

      <section className="col-span-2 flex items-center justify-center bg-white px-6 py-10">
        <div className="w-full max-w-md">
          <div className="mb-8">
            <h3 className="mb-1 text-3xl font-bold text-neutral-900">Sign Up</h3>
          </div>
          <SignupForm />
        </div>
      </section>
    </div>
  )
}
