import crypto from 'crypto'

export function hashLegacyPassword(password: string): string {
  // Legacy Go backend used SALT; some environments only expose JWT_SECRET with the same value.
  const salt = process.env.SALT || process.env.JWT_SECRET || ''
  return crypto.createHash('sha256').update(`${password}${salt}`).digest('hex')
}

export function normalizeRole(role?: string | null): 'SUPERADMIN' | 'ADMIN' | 'USER' {
  const value = (role || '').toLowerCase()
  if (value === 'superadmin') return 'SUPERADMIN'
  if (value === 'admin') return 'ADMIN'
  return 'USER'
}

export function roleToAuthority(role?: string | null): string[] {
  const normalized = normalizeRole(role)
  if (normalized === 'SUPERADMIN') {
    return ['SUPERADMIN', 'USER']
  }
  if (normalized === 'ADMIN') {
    return ['ADMIN', 'USER']
  }
  return ['USER']
}
