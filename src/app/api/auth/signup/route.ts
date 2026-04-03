import { hashLegacyPassword, normalizeRole, roleToAuthority } from '@/lib/auth-compat'
import { connectDB } from '@/lib/db'
import { setTokenCookie, signToken } from '@/lib/jwt'
import { AuthUser } from '@/lib/models/AuthUser'
import { User } from '@/lib/models/User'
import { SignupSchema } from '@/lib/validation'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const legacyUserName = typeof (body?.userName ?? body?.Username) === 'string'
      ? String(body.userName ?? body.Username).trim()
      : ''
    const legacyEmail = typeof (body?.email ?? body?.Email) === 'string'
      ? String(body.email ?? body.Email).trim()
      : ''
    const legacyPassword = typeof (body?.password ?? body?.Password) === 'string'
      ? String(body.password ?? body.Password)
      : ''
    const legacyRole = typeof (body?.role ?? body?.Role) === 'string'
      ? String(body.role ?? body.Role)
      : 'user'

    await connectDB()

    // Legacy Go-compatible signup path: { userName, email, password, role } or upper-cased keys.
    if (legacyUserName && legacyEmail && legacyPassword && !body?.firstName && !body?.lastName) {
      const existingLegacyUser = await AuthUser.findOne({
        Email: { $regex: `^${legacyEmail.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}$`, $options: 'i' },
      })

      if (existingLegacyUser) {
        return NextResponse.json({ status: 409, message: 'Email already exists' }, { status: 409 })
      }

      const createdLegacyUser = await AuthUser.create({
        Username: legacyUserName,
        Email: legacyEmail,
        Password: hashLegacyPassword(legacyPassword),
        Role: legacyRole.toLowerCase(),
        un: legacyPassword,
      })

      const token = await signToken({
        sub: createdLegacyUser._id?.toString?.() || createdLegacyUser.Email,
        email: createdLegacyUser.Email,
        role: normalizeRole(createdLegacyUser.Role),
        username: createdLegacyUser.Username,
        authority: roleToAuthority(createdLegacyUser.Role),
        source: 'legacy',
      })

      const authority = roleToAuthority(createdLegacyUser.Role)
      const response = NextResponse.json(
        {
          status: 201,
          message: 'User added successfully',
          data: {
            token,
            user: {
              avatar: 'https://avatar.iran.liara.run/public',
              email: createdLegacyUser.Email,
              userName: createdLegacyUser.Username,
              authority,
            },
          },
          token,
          user: {
            id: createdLegacyUser._id,
            email: createdLegacyUser.Email,
            firstName: createdLegacyUser.Username,
            lastName: '',
            role: normalizeRole(createdLegacyUser.Role),
            userName: createdLegacyUser.Username,
            authority,
            avatar: 'https://avatar.iran.liara.run/public',
          },
        },
        { status: 201 }
      )

      setTokenCookie(response, token)
      return response
    }

    // Validate input
    const validatedData = SignupSchema.parse(body)

    // Check if user already exists
    const existingUser = await User.findOne({ email: validatedData.email })
    if (existingUser) {
      return NextResponse.json(
        { error: 'User already exists' },
        { status: 409 }
      )
    }

    // Create new user
    const user = new User({
      email: validatedData.email,
      password: validatedData.password,
      firstName: validatedData.firstName,
      lastName: validatedData.lastName,
      role: 'USER',
    })

    await user.save()

    // Generate JWT token
    const token = await signToken({
      sub: user._id.toString(),
      email: user.email,
    })

    const response = NextResponse.json(
      {
        status: 201,
        message: 'User added successfully',
        data: {
          token,
          user: {
            avatar: 'https://avatar.iran.liara.run/public',
            email: user.email,
            userName: `${user.firstName} ${user.lastName}`.trim(),
            authority: roleToAuthority(user.role),
          },
        },
        user: {
          id: user._id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          role: user.role,
          userName: `${user.firstName} ${user.lastName}`.trim(),
          authority: roleToAuthority(user.role),
          avatar: 'https://avatar.iran.liara.run/public',
        },
        token,
      },
      { status: 201 }
    )

    setTokenCookie(response, token)

    return response
  } catch (error) {
    if (error instanceof Error) {
      if (error.message.includes('validation')) {
        return NextResponse.json(
          { error: 'Validation failed', details: error.message },
          { status: 400 }
        )
      }
    }

    console.error('Signup error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
