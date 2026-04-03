import { jwtVerify, SignJWT } from 'jose'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

const key = new TextEncoder().encode(process.env.JWT_SECRET || 'dev-secret-key-change-in-production')

export interface JwtPayload {
  sub: string // user ID
  email: string
  role?: string
  username?: string
  authority?: string[]
  source?: 'legacy' | 'modern'
  iat?: number
  exp?: number
  [key: string]: unknown
}

export async function signToken(payload: JwtPayload): Promise<string> {
  return await new SignJWT(payload as Record<string, unknown>)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(key)
}

export async function verifyToken(token: string): Promise<JwtPayload | null> {
  try {
    const verified = await jwtVerify(token, key)
    return verified.payload as JwtPayload
  } catch {
    return null
  }
}

export async function getTokenFromCookie(): Promise<string | null> {
  const cookieStore = await cookies()
  return cookieStore.get('auth-token')?.value || null
}

export function setTokenCookie(response: NextResponse, token: string): void {
  response.cookies.set('auth-token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 7 * 24 * 60 * 60, // 7 days
    path: '/',
  })
}

export function removeTokenCookie(response: NextResponse): void {
  response.cookies.set('auth-token', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 0,
    path: '/',
  })
}
