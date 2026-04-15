import { badRequest, created, internalServerError, ok } from '@/lib/api-response'
import { connectDB } from '@/lib/db'
import { Patient } from '@/lib/models/Patient'
import { NextRequest } from 'next/server'
import { z } from 'zod'

const PatientCreateSchema = z.object({
  Name: z.string().min(1, 'Patient name is required'),
  Age: z.number().int().min(0).max(120).optional(),
  Gender: z.string().min(1, 'Gender is required'),
  State: z.string().min(1, 'State is required'),
  District: z.string().optional(),
  Guardian_Name: z.string().optional(),
  Addiction_Type: z.string().min(1, 'Addiction type is required'),
  Addiction_Duration: z.number().int().min(0).optional(),
  'Duration_of-Treatment': z.number().int().min(0).optional(),
  Is_Treatment_Completed: z.boolean().default(false),
  Under_Treatment: z.boolean().default(true),
  Employment_Status: z.number().int().min(0).max(1).default(0),
  Nasha_Mukti_Centre_Name: z.string().optional(),
  Nasha_Mukti_Centre_Address: z.string().optional(),
  Nasha_Mukti_Centre_Code: z.string().optional(),
  Joining_Date: z.string().optional(),
  Counselling_Count: z.number().int().min(0).optional(),
  Counsellor_Name: z.string().optional(),
})

export async function GET(request: NextRequest) {
  try {
    await connectDB()

    const searchParams = request.nextUrl.searchParams
    const filter: Record<string, string | number | boolean> = {}

    const addictionType = searchParams.get('Addiction_Type')
    if (addictionType) {
      filter.Addiction_Type = addictionType
    }

    const nmkCode = searchParams.get('NMK_Code')
    if (nmkCode) {
      filter.Nasha_Mukti_Centre_Code = nmkCode
    }

    const employmentStatus = searchParams.get('Employment_Status')
    if (employmentStatus) {
      const parsed = Number.parseInt(employmentStatus, 10)
      if (Number.isNaN(parsed)) {
        return badRequest('Invalid Employment_Status value')
      }
      filter.Employment_Status = parsed
    }

    const completed = searchParams.get('Is_Treatment_Completed')
    if (completed) {
      if (completed !== 'true' && completed !== 'false') {
        return badRequest('Invalid Is_Treatment_Completed value')
      }
      filter.Is_Treatment_Completed = completed === 'true'
    }

    const users = await Patient.find(filter).lean()
    return ok(users, 'Users retrieved successfully')
  } catch (error) {
    console.error('Get users error:', error)
    return internalServerError('Error finding users')
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const parsed = PatientCreateSchema.safeParse(body)
    if (!parsed.success) {
      const messages = parsed.error.issues.map(i => i.message).join(', ')
      return badRequest(messages)
    }

    await connectDB()
    const createdUser = await Patient.create(parsed.data)
    return created(createdUser, 'Patient added successfully')
  } catch (error) {
    console.error('Add patient error:', error)
    return internalServerError('Error adding patient')
  }
}
