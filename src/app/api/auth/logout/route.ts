import { removeTokenCookie } from '@/lib/jwt'
import { NextResponse } from 'next/server'

export async function POST() {
  const response = NextResponse.json(
    { status: 200, message: 'Logged out successfully', data: null },
    { status: 200 }
  )
  removeTokenCookie(response)
  return response
}
