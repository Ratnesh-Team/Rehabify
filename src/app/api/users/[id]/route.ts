import { badRequest, internalServerError, ok } from '@/lib/api-response'
import { connectDB } from '@/lib/db'
import { Patient } from '@/lib/models/Patient'
import { Types } from 'mongoose'
import { NextRequest } from 'next/server'

function isValidObjectId(id: string) {
  return Types.ObjectId.isValid(id)
}

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    if (!isValidObjectId(id)) {
      return badRequest('Invalid user id')
    }

    await connectDB()
    const user = await Patient.findById(id).lean()

    if (!user) {
      return badRequest('User not found')
    }

    return ok(user, 'User fetched successfully')
  } catch (error) {
    console.error('Get user by id error:', error)
    return internalServerError('Failed to fetch user')
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    if (!isValidObjectId(id)) {
      return badRequest('Invalid user id')
    }

    const body = await request.json()

    await connectDB()
    const updated = await Patient.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    }).lean()

    if (!updated) {
      return badRequest('User not found')
    }

    return ok(updated, 'User updated successfully')
  } catch (error) {
    console.error('Update user error:', error)
    return internalServerError('Failed to update user')
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    if (!isValidObjectId(id)) {
      return badRequest('Invalid user id')
    }

    await connectDB()
    const deleted = await Patient.findByIdAndDelete(id).lean()

    if (!deleted) {
      return badRequest('User not found')
    }

    return ok(null, 'User deleted successfully')
  } catch (error) {
    console.error('Delete user error:', error)
    return internalServerError('Failed to delete user')
  }
}
