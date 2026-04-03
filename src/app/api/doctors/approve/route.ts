import { badRequest, internalServerError, ok } from '@/lib/api-response'
import { connectDB } from '@/lib/db'
import { Doctor } from '@/lib/models/Doctor'
import { Types } from 'mongoose'
import { NextRequest } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const id = request.nextUrl.searchParams.get('id')
    if (!id || !Types.ObjectId.isValid(id)) {
      return badRequest('Invalid doctor id')
    }

    await connectDB()
    await Doctor.updateOne({ _id: new Types.ObjectId(id) }, { $set: { IsVerified: true } })

    return ok(null, 'Doctor approved successfully')
  } catch (error) {
    console.error('Approve doctor error:', error)
    return internalServerError('Failed to approve doctor')
  }
}
