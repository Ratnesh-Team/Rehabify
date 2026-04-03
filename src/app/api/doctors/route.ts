import { created, internalServerError, ok } from '@/lib/api-response'
import { connectDB } from '@/lib/db'
import { Doctor } from '@/lib/models/Doctor'
import { NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    await connectDB()

    const searchParams = request.nextUrl.searchParams
    const filter: Record<string, string | boolean> = {}

    const role = searchParams.get('role')
    filter.IsVerified = role === 'superadmin' ? false : true

    const doctorCode = searchParams.get('Doctor_Code')
    if (doctorCode) {
      filter.Docter_Code = doctorCode
    }

    const doctors = await Doctor.find(filter).lean()
    return ok(doctors, 'Doctors fetched successfully')
  } catch (error) {
    console.error('Get doctors error:', error)
    return internalServerError('Failed to fetch doctors')
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    await connectDB()

    const doctor = await Doctor.create({ ...body, IsVerified: false })
    return created(doctor, 'Doctor inserted successfully')
  } catch (error) {
    console.error('Add doctor error:', error)
    return internalServerError('Failed to insert doctor')
  }
}
