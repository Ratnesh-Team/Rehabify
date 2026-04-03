import { connectDB } from '@/lib/db'
import { AuthUser } from '@/lib/models/AuthUser'
import { User } from '@/lib/models/User'
import { Types } from 'mongoose'
import { headers } from 'next/headers'

export async function getCurrentUser() {
  try {
    const headersList = await headers()
    const userId = headersList.get('x-user-id')
    const userEmail = headersList.get('x-user-email')

    if (!userId && !userEmail) return null

    await connectDB()
    if (userId && Types.ObjectId.isValid(userId)) {
      const user = await User.findById(userId)
      if (user) {
        return {
          id: user._id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          role: user.role,
        }
      }

      const legacyUser = await AuthUser.findById(userId)
      if (legacyUser) {
        return {
          id: legacyUser._id,
          email: legacyUser.Email,
          firstName: legacyUser.Username,
          lastName: '',
          role: legacyUser.Role?.toUpperCase() ?? 'USER',
        }
      }
    }

    if (userEmail) {
      const legacyUserByEmail = await AuthUser.findOne({ Email: userEmail })
      if (legacyUserByEmail) {
        return {
          id: legacyUserByEmail._id,
          email: legacyUserByEmail.Email,
          firstName: legacyUserByEmail.Username,
          lastName: '',
          role: legacyUserByEmail.Role?.toUpperCase() ?? 'USER',
        }
      }
    }

    return null
  } catch (error) {
    console.error('Error getting current user:', error)
    return null
  }
}

export function getErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    return error.message
  }
  return 'An unknown error occurred'
}

export async function getUserById(id: string) {
  try {
    await connectDB()
    return await User.findById(id)
  } catch (error) {
    console.error('Error getting user:', error)
    return null
  }
}
