'use client'

import { Eye, EyeOff } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

type FieldErrors = {
  email?: string
  password?: string
}

function validateEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export function SigninForm() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [serverError, setServerError] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({})
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    setFieldErrors(prev => ({ ...prev, [name]: undefined }))
    setServerError('')
  }

  const validate = (): boolean => {
    const errors: FieldErrors = {}

    if (!formData.email.trim()) {
      errors.email = 'Email is required'
    } else if (!validateEmail(formData.email)) {
      errors.email = 'Enter a valid email address'
    }

    if (!formData.password) {
      errors.password = 'Password is required'
    }

    setFieldErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setServerError('')

    if (!validate()) return

    setLoading(true)
    try {
      const response = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: formData.email.trim().toLowerCase(),
          password: formData.password,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        setServerError(data.message || data.error || 'Invalid email or password.')
        return
      }

      router.push('/dashboard')
    } catch {
      setServerError('Network error. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const fillTestCredentials = () => {
    setFormData({ email: 'admin@gmail.com', password: '123Qwe1' })
    setFieldErrors({})
    setServerError('')
  }

  return (
    <div className="w-full rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className="mb-4 flex items-center justify-between rounded-lg border border-amber-200 bg-amber-50 px-3 py-2">
        <div>
          <p className="text-xs font-semibold text-amber-800">Demo credentials</p>
          <p className="mt-0.5 font-mono text-xs text-amber-700">admin@gmail.com / 123Qwe1</p>
        </div>
        <button
          type="button"
          onClick={fillTestCredentials}
          className="ml-3 shrink-0 rounded-md bg-amber-500 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-amber-600"
        >
          Autofill
        </button>
      </div>

      {serverError ? (
        <div className="mb-4 rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
          {serverError}
        </div>
      ) : null}

      <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-gray-700">
            Email <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            autoComplete="email"
            className={`w-full rounded-md border px-3 py-2 text-sm outline-none ring-[#f75700] transition focus:ring ${fieldErrors.email ? 'border-red-400 bg-red-50' : 'border-gray-300'}`}
            placeholder="you@example.com"
          />
          {fieldErrors.email ? (
            <p className="mt-1 text-xs text-red-600">{fieldErrors.email}</p>
          ) : null}
        </div>

        <div>
          <div className="mb-1.5 flex items-center justify-between">
            <label className="text-sm font-medium text-gray-700">
              Password <span className="text-red-500">*</span>
            </label>
            <Link
              href="/auth/signup"
              className="text-xs text-[#f75700] hover:underline"
            >
              New here? Sign up
            </Link>
          </div>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              value={formData.password}
              onChange={handleChange}
              autoComplete="current-password"
              className={`w-full rounded-md border px-3 py-2 pr-10 text-sm outline-none ring-[#f75700] transition focus:ring ${fieldErrors.password ? 'border-red-400 bg-red-50' : 'border-gray-300'}`}
              placeholder="Your password"
            />
            <button
              type="button"
              onClick={() => setShowPassword(p => !p)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
          {fieldErrors.password ? (
            <p className="mt-1 text-xs text-red-600">{fieldErrors.password}</p>
          ) : null}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-md bg-[#f75700] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#da4d00] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? 'Signing in...' : 'Sign In'}
        </button>

        <p className="text-center text-sm text-gray-600">
          Don&apos;t have an account?{' '}
          <Link href="/auth/signup" className="font-medium text-[#f75700] hover:underline">
            Sign up
          </Link>
        </p>
      </form>
    </div>
  )
}
