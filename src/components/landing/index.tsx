import { Activity, Database, Globe, Heart, Lightbulb, Users } from 'lucide-react'
import Link from 'next/link'

export function Hero() {
  return (
    <section className="relative min-h-screen bg-linear-to-br from-amber-50 via-orange-50 to-rose-50 flex items-center justify-center px-4 md:px-8">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-amber-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-orange-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-rose-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/60 backdrop-blur-sm border border-amber-200 mb-6 shadow-sm">
          <span className="w-2 h-2 bg-amber-500 rounded-full animate-pulse"></span>
          <span className="text-sm font-medium text-amber-900">Showcasing India&apos;s Healthcare Revolution</span>
        </div>

        {/* Main heading */}
        <h1 className="text-5xl md:text-7xl font-bold text-neutral-900 mb-6 leading-tight">
          NASA Mukti <span className="text-transparent bg-clip-text bg-linear-to-r from-amber-600 to-rose-600">Kendra</span>
        </h1>

        {/* Subheading */}
        <p className="text-xl md:text-2xl text-neutral-700 mb-8 max-w-2xl mx-auto leading-relaxed">
          Rehabilitation & Healthcare Excellence for India. <span className="font-semibold text-amber-700">Raw Data Showcase</span> - Real Stories, Real Impact.
        </p>

        {/* Data badge */}
        <div className="inline-block px-4 py-2 rounded-lg bg-amber-100/50 border border-amber-200 mb-8">
          <p className="text-sm font-medium text-amber-900">📊 Powered by Real Medical Data — Anonymized Raw Data</p>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Link
            href="/auth/signup"
            className="px-8 py-4 bg-linear-to-r from-amber-600 to-rose-600 text-white rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
          >
            <Heart className="w-5 h-5" />
            Get Started
          </Link>
          <Link
            href="#features"
            className="px-8 py-4 bg-white text-amber-900 rounded-xl font-semibold border-2 border-amber-200 hover:bg-amber-50 transition-all duration-300"
          >
            Learn More
          </Link>
        </div>

        {/* Features highlight */}
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-3xl font-bold text-amber-600">50K+</p>
            <p className="text-sm text-neutral-600">Patients Served</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-rose-600">100+</p>
            <p className="text-sm text-neutral-600">Doctors</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-orange-600">24/7</p>
            <p className="text-sm text-neutral-600">Support</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export function Features() {
  const features = [
    {
      icon: Activity,
      title: 'Real-Time Health Monitoring',
      description: 'Track rehabilitation progress with live data analytics and personalized health metrics.',
      color: 'from-red-400 to-rose-500',
    },
    {
      icon: Users,
      title: 'Expert Doctor Network',
      description: 'Connect with India\'s leading rehabilitation and medical professionals.',
      color: 'from-blue-400 to-cyan-500',
    },
    {
      icon: Database,
      title: 'Raw Medical Data',
      description: 'Access real, anonymized patient data to understand rehabilitation trends and outcomes.',
      color: 'from-purple-400 to-pink-500',
    },
    {
      icon: Lightbulb,
      title: 'Evidence-Based Treatments',
      description: 'Treatments backed by real data and decades of medical research and expertise.',
      color: 'from-amber-400 to-orange-500',
    },
    {
      icon: Globe,
      title: 'Nationwide Coverage',
      description: 'Reaching patients across India with standardized, high-quality healthcare.',
      color: 'from-green-400 to-emerald-500',
    },
    {
      icon: Heart,
      title: 'Patient-Centric Care',
      description: 'Every treatment plan designed around individual patient needs and goals.',
      color: 'from-pink-400 to-red-500',
    },
  ]

  return (
    <section id="features" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-4">
            Why Choose Rehabify?
          </h2>
          <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
            Transforming rehabilitation healthcare through data-driven insights and expert care
          </p>
        </div>

        {/* Features grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature) => {
            const Icon = feature.icon
            return (
              <div
                key={feature.title}
                className="group p-8 rounded-xl bg-linear-to-br from-neutral-50 to-neutral-100 border border-neutral-200 hover:border-amber-300 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
              >
                {/* Icon background */}
                <div className={`w-12 h-12 rounded-lg bg-linear-to-br ${feature.color} p-0.5 mb-4 group-hover:scale-110 transition-transform`}>
                  <div className="w-full h-full rounded-md bg-white flex items-center justify-center">
                    <Icon className="w-6 h-6 text-neutral-700" />
                  </div>
                </div>

                <h3 className="text-xl font-bold text-neutral-900 mb-3">{feature.title}</h3>
                <p className="text-neutral-600 leading-relaxed">{feature.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export function DataShowcase() {
  return (
    <section className="py-20 bg-linear-to-br from-amber-50 to-orange-50 border-t-2 border-b-2 border-amber-200">
      <div className="max-w-4xl mx-auto px-4 md:px-8">
        <div className="bg-white rounded-2xl p-8 md:p-12 border-2 border-amber-200 shadow-lg">
          {/* Icon */}
          <div className="w-16 h-16 rounded-full bg-linear-to-br from-amber-400 to-orange-500 p-0.5 mx-auto mb-6">
            <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
              <Database className="w-8 h-8 text-amber-600" />
            </div>
          </div>

          <h2 className="text-3xl md:text-4xl font-bold text-center text-neutral-900 mb-4">
            Raw Data Transparency
          </h2>

          <p className="text-center text-neutral-700 mb-8 text-lg">
            We believe in transparency. Our data is real, anonymized, and showcases the actual rehabilitation journeys of thousands of patients across India.
          </p>

          {/* Data stats */}
          <div className="grid md:grid-cols-4 gap-6 mb-8">
            <div className="text-center p-4 rounded-lg bg-amber-50 border border-amber-200">
              <p className="text-3xl font-bold text-amber-600">94%</p>
              <p className="text-sm text-neutral-600 mt-2">Recovery Success Rate</p>
            </div>
            <div className="text-center p-4 rounded-lg bg-orange-50 border border-orange-200">
              <p className="text-3xl font-bold text-orange-600">18 Months</p>
              <p className="text-sm text-neutral-600 mt-2">Avg Treatment Duration</p>
            </div>
            <div className="text-center p-4 rounded-lg bg-rose-50 border border-rose-200">
              <p className="text-3xl font-bold text-rose-600">500+</p>
              <p className="text-sm text-neutral-600 mt-2">Medical Conditions Treated</p>
            </div>
            <div className="text-center p-4 rounded-lg bg-pink-50 border border-pink-200">
              <p className="text-3xl font-bold text-pink-600">89%</p>
              <p className="text-sm text-neutral-600 mt-2">Patient Satisfaction</p>
            </div>
          </div>

          <p className="text-center text-sm text-neutral-500 italic">
            All data is anonymized, HIPAA-compliant, and regularly audited for accuracy and ethics.
          </p>
        </div>
      </div>
    </section>
  )
}

export function CTA() {
  return (
    <section className="py-20 bg-linear-to-r from-amber-600 to-rose-600">
      <div className="max-w-4xl mx-auto px-4 md:px-8 text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
          Ready to Transform Your Rehabilitation Journey?
        </h2>
        <p className="text-xl text-amber-50 mb-8 max-w-2xl mx-auto">
          Join thousands of patients discovering healthier, happier lives with Rehabify.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/auth/signup"
            className="px-8 py-4 bg-white text-amber-600 font-bold rounded-xl hover:bg-amber-50 transition-colors shadow-lg"
          >
            Start Your Journey
          </Link>
          <Link
            href="/auth/signin"
            className="px-8 py-4 border-2 border-white text-white font-bold rounded-xl hover:bg-white/10 transition-colors"
          >
            Sign In
          </Link>
        </div>
      </div>
    </section>
  )
}

export function Footer() {
  return (
    <footer className="bg-neutral-900 text-neutral-300 py-12">
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="font-bold text-white mb-4">Rehabify</h3>
            <p className="text-sm">Transforming rehabilitation healthcare for India.</p>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-4">Product</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white transition">Features</a></li>
              <li><a href="#" className="hover:text-white transition">Pricing</a></li>
              <li><a href="#" className="hover:text-white transition">Security</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-4">Company</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white transition">About</a></li>
              <li><a href="#" className="hover:text-white transition">Blog</a></li>
              <li><a href="#" className="hover:text-white transition">Careers</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-4">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white transition">Privacy</a></li>
              <li><a href="#" className="hover:text-white transition">Terms</a></li>
              <li><a href="#" className="hover:text-white transition">Contact</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-neutral-800 pt-8">
          <p className="text-center text-sm">
            © 2026 Rehabify. Made with ❤️ for India&apos;s Healthcare.
          </p>
          <p className="text-center text-xs text-neutral-500 mt-2">
            Raw Data Showcase • Real Stories • Real Impact
          </p>
        </div>
      </div>
    </footer>
  )
}
