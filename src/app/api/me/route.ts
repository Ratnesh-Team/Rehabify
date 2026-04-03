import { internalServerError, unauthorized } from '@/lib/api-response'
import { normalizeRole, roleToAuthority } from '@/lib/auth-compat'
import { connectDB } from '@/lib/db'
import { getTokenFromCookie, verifyToken } from '@/lib/jwt'
import { AuthUser } from '@/lib/models/AuthUser'
import { User } from '@/lib/models/User'
import { Types } from 'mongoose'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    const tokenFromHeader = request.headers.get('authorization')?.replace('Bearer ', '')
    const token = tokenFromHeader || (await getTokenFromCookie())
    if (!token) {
      return unauthorized('Unauthorized')
    }

    const payload = await verifyToken(token)
    if (!payload?.sub) {
      return unauthorized('Invalid token')
    }

    await connectDB()

    // Try modern user model first.
    const user = await User.findById(payload.sub)
    if (user) {
      return NextResponse.json(
        {
          status: 200,
          message: 'Current user retrieved successfully',
          data: {
            id: user._id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            role: user.role,
            userName: `${user.firstName} ${user.lastName}`.trim(),
            authority: roleToAuthority(user.role),
          },
        },
        { status: 200 }
      )
    }

    // Fallback to legacy authDB model.
    const legacyUser = Types.ObjectId.isValid(payload.sub)
      ? await AuthUser.findById(payload.sub)
      : await AuthUser.findOne({ Email: payload.email })

    if (!legacyUser) {
      return unauthorized('User not found')
    }

    return NextResponse.json(
      {
        status: 200,
        message: 'Current user retrieved successfully',
        data: {
          id: legacyUser._id,
          email: legacyUser.Email,
          firstName: legacyUser.Username,
          lastName: '',
          role: normalizeRole(legacyUser.Role),
          userName: legacyUser.Username,
          authority: roleToAuthority(legacyUser.Role),
        },
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Get current user error:', error)
    return internalServerError()
  }
}
