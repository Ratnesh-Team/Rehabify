'use client'

import { Eye, EyeOff } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

type FieldErrors = {
  firstName?: string
  lastName?: string
  email?: string
  password?: string
  confirmPassword?: string
  role?: string
}

const PASSWORD_MIN = 6

function validateEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

function validatePassword(password: string): string | undefined {
  if (password.length < PASSWORD_MIN) return `Min ${PASSWORD_MIN} characters`
  if (!/[A-Z]/.test(password)) return 'Need one uppercase letter'
  if (!/[0-9]/.test(password)) return 'Need one number'
  return undefined
}

export function SignupForm() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [serverError, setServerError] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({})
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    setFieldErrors(prev => ({ ...prev, [name]: undefined }))
    setServerError('')
  }

  const validate = (): boolean => {
    const errors: FieldErrors = {}

    if (!formData.firstName.trim()) errors.firstName = 'First name is required'
    if (!formData.lastName.trim()) errors.lastName = 'Last name is required'

    if (!formData.email.trim()) {
      errors.email = 'Email is required'
    } else if (!validateEmail(formData.email)) {
      errors.email = 'Enter a valid email'
    }

    const pwError = validatePassword(formData.password)
    if (!formData.password) {
      errors.password = 'Password is required'
    } else if (pwError) {
      errors.password = pwError
    }

    if (!formData.confirmPassword) {
      errors.confirmPassword = 'Please confirm your password'
    } else if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match'
    }

    if (!formData.role) errors.role = 'Please select a role'

    setFieldErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setServerError('')

    if (!validate()) return

    setLoading(true)
    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName: formData.firstName.trim(),
          lastName: formData.lastName.trim(),
          email: formData.email.trim().toLowerCase(),
          password: formData.password,
          confirmPassword: formData.confirmPassword,
          role: formData.role,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        setServerError(data.message || data.error || 'Signup failed. Try again.')
        return
      }

      router.push('/auth/signin')
    } catch {
      setServerError('Network error. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-full rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      {serverError ? (
        <div className="mb-4 rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
          {serverError}
        </div>
      ) : null}

      <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
        <div className="grid gap-3 md:grid-cols-2">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">
              First Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              autoComplete="given-name"
              className={`w-full rounded-md border px-3 py-2 text-sm outline-none ring-[#f75700] transition focus:ring ${fieldErrors.firstName ? 'border-red-400 bg-red-50' : 'border-gray-300'}`}
              placeholder="First name"
            />
            {fieldErrors.firstName ? (
              <p className="mt-1 text-xs text-red-600">{fieldErrors.firstName}</p>
            ) : null}
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">
              Last Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              autoComplete="family-name"
              className={`w-full rounded-md border px-3 py-2 text-sm outline-none ring-[#f75700] transition focus:ring ${fieldErrors.lastName ? 'border-red-400 bg-red-50' : 'border-gray-300'}`}
              placeholder="Last name"
            />
            {fieldErrors.lastName ? (
              <p className="mt-1 text-xs text-red-600">{fieldErrors.lastName}</p>
            ) : null}
          </div>
        </div>

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
          <label className="mb-1.5 block text-sm font-medium text-gray-700">
            Password <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              value={formData.password}
              onChange={handleChange}
              autoComplete="new-password"
              className={`w-full rounded-md border px-3 py-2 pr-10 text-sm outline-none ring-[#f75700] transition focus:ring ${fieldErrors.password ? 'border-red-400 bg-red-50' : 'border-gray-300'}`}
              placeholder="Min 6 chars, 1 uppercase, 1 number"
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

        <div>
          <label className="mb-1.5 block text-sm font-medium text-gray-700">
            Confirm Password <span className="text-red-500">*</span>
          </label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            autoComplete="new-password"
            className={`w-full rounded-md border px-3 py-2 text-sm outline-none ring-[#f75700] transition focus:ring ${fieldErrors.confirmPassword ? 'border-red-400 bg-red-50' : 'border-gray-300'}`}
            placeholder="Re-enter password"
          />
          {fieldErrors.confirmPassword ? (
            <p className="mt-1 text-xs text-red-600">{fieldErrors.confirmPassword}</p>
          ) : null}
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium text-gray-700">
            Role <span className="text-red-500">*</span>
          </label>
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className={`w-full rounded-md border px-3 py-2 text-sm outline-none ring-[#f75700] transition focus:ring ${fieldErrors.role ? 'border-red-400 bg-red-50' : 'border-gray-300'}`}
          >
            <option value="">Select role</option>
            <option value="admin">Admin</option>
            <option value="user">User</option>
          </select>
          {fieldErrors.role ? (
            <p className="mt-1 text-xs text-red-600">{fieldErrors.role}</p>
          ) : null}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-md bg-[#f75700] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#da4d00] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? 'Creating Account...' : 'Create Account'}
        </button>

        <p className="text-center text-sm text-gray-600">
          Already have an account?{' '}
          <Link href="/auth/signin" className="font-medium text-[#f75700] hover:underline">
            Sign in
          </Link>
        </p>
      </form>
    </div>
  )
}
