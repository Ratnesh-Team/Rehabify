import { badRequest, internalServerError, ok } from '@/lib/api-response'
import { connectDB } from '@/lib/db'
import { NMK } from '@/lib/models/NMK'
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
      return badRequest('Invalid center id')
    }

    await connectDB()
    const center = await NMK.findById(id).lean()

    if (!center) {
      return badRequest('Center not found')
    }

    return ok(center, 'Center fetched successfully')
  } catch (error) {
    console.error('Get center by id error:', error)
    return internalServerError('Failed to fetch center')
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    if (!isValidObjectId(id)) {
      return badRequest('Invalid center id')
    }

    const body = await request.json()

    await connectDB()
    const updated = await NMK.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    }).lean()

    if (!updated) {
      return badRequest('Center not found')
    }

    return ok(updated, 'Center updated successfully')
  } catch (error) {
    console.error('Update center error:', error)
    return internalServerError('Failed to update center')
  }
}
