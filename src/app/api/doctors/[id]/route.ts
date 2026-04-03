import { badRequest, internalServerError, ok } from '@/lib/api-response'
import { connectDB } from '@/lib/db'
import { Doctor } from '@/lib/models/Doctor'
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
      return badRequest('Invalid doctor id')
    }

    await connectDB()
    const doctor = await Doctor.findById(id).lean()

    if (!doctor) {
      return badRequest('Doctor not found')
    }

    return ok(doctor, 'Doctor fetched successfully')
  } catch (error) {
    console.error('Get doctor by id error:', error)
    return internalServerError('Failed to fetch doctor')
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    if (!isValidObjectId(id)) {
      return badRequest('Invalid doctor id')
    }

    const body = await request.json()

    await connectDB()
    const updated = await Doctor.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    }).lean()

    if (!updated) {
      return badRequest('Doctor not found')
    }

    return ok(updated, 'Doctor updated successfully')
  } catch (error) {
    console.error('Update doctor error:', error)
    return internalServerError('Failed to update doctor')
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    if (!isValidObjectId(id)) {
      return badRequest('Invalid doctor id')
    }

    await connectDB()
    const deleted = await Doctor.findByIdAndDelete(id).lean()

    if (!deleted) {
      return badRequest('Doctor not found')
    }

    return ok(null, 'Doctor deleted successfully')
  } catch (error) {
    console.error('Delete doctor error:', error)
    return internalServerError('Failed to delete doctor')
  }
}
