import { badRequest, internalServerError, ok } from '@/lib/api-response'
import { connectDB } from '@/lib/db'
import { Doctor } from '@/lib/models/Doctor'
import { NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    await connectDB()

    const searchParams = request.nextUrl.searchParams
    const specialization = searchParams.get('specialization')
    const approved = searchParams.get('approved')

    const filter: Record<string, string | boolean> = {}

    if (specialization) {
      filter.Specialization = specialization
    }

    if (approved) {
      if (approved !== 'true' && approved !== 'false') {
        return badRequest('Invalid approved value')
      }
      filter.IsVerified = approved === 'true'
    }

    const doctors = await Doctor.find(filter).lean()
    return ok(doctors, 'Doctors fetched successfully')
  } catch (error) {
    console.error('Search doctors error:', error)
    return internalServerError('Failed to search doctors')
  }
}
