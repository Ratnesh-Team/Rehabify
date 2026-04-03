import {
    badRequest,
    created,
    internalServerError,
    ok,
} from '@/lib/api-response'
import { connectDB } from '@/lib/db'
import { NMK } from '@/lib/models/NMK'
import { Types } from 'mongoose'
import { NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    await connectDB()

    const searchParams = request.nextUrl.searchParams
    const filter: Record<string, string | boolean | Types.ObjectId> = {}

    const email = searchParams.get('email')
    if (email) {
      filter.Email = email
    } else {
      const role = searchParams.get('role')
      filter.IsVerified = role === 'superadmin' ? false : true
    }

    const code = searchParams.get('NMK_Code')
    if (code) {
      if (!Types.ObjectId.isValid(code)) {
        return badRequest('Invalid NMK code')
      }
      filter._id = new Types.ObjectId(code)
    }

    const data = await NMK.find(filter).lean()
    return ok(data, 'NMK codes fetched successfully')
  } catch (error) {
    console.error('Get NMK error:', error)
    return internalServerError('Failed to fetch NMK codes')
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    await connectDB()

    const nmk = await NMK.create({ ...body, IsVerified: false })
    return created(nmk, 'NMK data inserted successfully')
  } catch (error) {
    console.error('Add NMK error:', error)
    return internalServerError('Failed to insert NMK data')
  }
}
