import { badRequest, created, internalServerError, ok } from '@/lib/api-response'
import { connectDB } from '@/lib/db'
import { Patient } from '@/lib/models/Patient'
import { NextRequest } from 'next/server'

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
    await connectDB()

    const createdUser = await Patient.create(body)
    return created(createdUser, 'User inserted successfully')
  } catch (error) {
    console.error('Add patient error:', error)
    return internalServerError('Error inserting user')
  }
}
