import { hashLegacyPassword, normalizeRole, roleToAuthority } from '@/lib/auth-compat'
import { connectDB } from '@/lib/db'
import { setTokenCookie, signToken } from '@/lib/jwt'
import { AuthUser } from '@/lib/models/AuthUser'
import { User } from '@/lib/models/User'
import { NextRequest, NextResponse } from 'next/server'

function toEmailValue(value: unknown): string {
  return typeof value === 'string' ? value.trim() : ''
}

function toPasswordValue(value: unknown): string {
  return typeof value === 'string' ? value : ''
}

function buildSuccessPayload(params: {
  token: string
  id: string
  email: string
  role: string
  userName: string
  firstName?: string
  lastName?: string
}) {
  const authority = roleToAuthority(params.role)

  return {
    status: 200,
    message: 'User verified successfully',
    data: {
      token: params.token,
      user: {
        avatar: 'https://avatar.iran.liara.run/public',
        email: params.email,
        userName: params.userName,
        authority,
      },
    },
    token: params.token,
    user: {
      id: params.id,
      email: params.email,
      firstName: params.firstName ?? params.userName,
      lastName: params.lastName ?? '',
      role: normalizeRole(params.role),
      userName: params.userName,
      authority,
      avatar: 'https://avatar.iran.liara.run/public',
    },
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const email = toEmailValue(body?.email ?? body?.Email)
    const password = toPasswordValue(body?.password ?? body?.Password)

    if (!email || !password) {
      return NextResponse.json(
        { status: 400, message: 'Email and password are required', error: 'Validation failed' },
        { status: 400 }
      )
    }

    await connectDB()

    // 1) Legacy Go-compatible auth flow (authDB + sha256(password + SALT)).
    const legacyHashedPassword = hashLegacyPassword(password)
    const legacyUser = await AuthUser.findOne({
      Email: { $regex: `^${email.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}$`, $options: 'i' },
      Password: legacyHashedPassword,
    })

    if (legacyUser) {
      const token = await signToken({
        sub: legacyUser._id?.toString?.() || legacyUser.Email,
        email: legacyUser.Email,
        role: normalizeRole(legacyUser.Role),
        username: legacyUser.Username,
        authority: roleToAuthority(legacyUser.Role),
        source: 'legacy',
      })

      const payload = buildSuccessPayload({
        token,
        id: legacyUser._id?.toString?.() || legacyUser.Email,
        email: legacyUser.Email,
        role: legacyUser.Role,
        userName: legacyUser.Username,
      })

      const response = NextResponse.json(payload, { status: 200 })
      setTokenCookie(response, token)
      return response
    }

    // 2) Modern auth flow fallback for App Router-native users.
    const user = await User.findOne({ email: email.toLowerCase() }).select('+password')
    if (!user) {
      return NextResponse.json({ status: 401, message: 'Invalid email or password' }, { status: 401 })
    }

    const isPasswordValid = await user.comparePassword(password)
    if (!isPasswordValid) {
      return NextResponse.json({ status: 401, message: 'Invalid email or password' }, { status: 401 })
    }

    if (!user.isActive) {
      return NextResponse.json({ status: 403, message: 'User account is inactive' }, { status: 403 })
    }

    const token = await signToken({
      sub: user._id.toString(),
      email: user.email,
      role: user.role,
      authority: roleToAuthority(user.role),
      source: 'modern',
    })

    const payload = buildSuccessPayload({
      token,
      id: user._id.toString(),
      email: user.email,
      role: user.role,
      userName: `${user.firstName} ${user.lastName}`.trim(),
      firstName: user.firstName,
      lastName: user.lastName,
    })

    const response = NextResponse.json(payload, { status: 200 })
    setTokenCookie(response, token)

    return response
  } catch (error) {
    console.error('Signin error:', error)
    return NextResponse.json(
      { status: 500, message: 'Internal server error' },
      { status: 500 }
    )
  }
}
