import { badRequest, created, internalServerError, ok } from '@/lib/api-response'
import { connectDB } from '@/lib/db'
import { Doctor } from '@/lib/models/Doctor'
import { NextRequest } from 'next/server'
import { z } from 'zod'

const DoctorCreateSchema = z.object({
  Name: z.string().min(1, 'Doctor name is required'),
  Specialization: z.string().min(1, 'Specialization is required'),
  Email: z.string().email('Valid email is required'),
  Description: z.string().optional(),
  ClinicAddress: z.string().optional(),
  ContactNumber: z.union([z.string(), z.number()]).optional().transform(v =>
    v !== undefined && v !== '' ? Number(v) : undefined
  ),
  ImageURL: z.string().url('ImageURL must be a valid URL').optional().or(z.literal('')),
})

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

    const parsed = DoctorCreateSchema.safeParse(body)
    if (!parsed.success) {
      const messages = parsed.error.issues.map(i => i.message).join(', ')
      return badRequest(messages)
    }

    await connectDB()
    const doctor = await Doctor.create({ ...parsed.data, IsVerified: false })
    return created(doctor, 'Doctor registered successfully')
  } catch (error) {
    console.error('Add doctor error:', error)
    return internalServerError('Failed to register doctor')
  }
}
