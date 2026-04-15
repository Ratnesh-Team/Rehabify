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
import { z } from 'zod'

const NMKCreateSchema = z.object({
  Name: z.string().min(1, 'Center name is required'),
  Address: z.string().min(1, 'Address is required'),
  Owner_Name: z.string().min(1, 'Owner name is required'),
  Contact_Number: z.union([z.string(), z.number()]).transform(v => Number(v)),
  Email: z.string().email('Valid email is required').optional(),
  State: z.string().min(1, 'State is required'),
  District: z.string().optional(),
  Pincode: z.union([z.string(), z.number()]).transform(v => Number(v)).optional(),
  Established_Year: z.union([z.string(), z.number()]).transform(v => Number(v)).optional(),
  ImageURL: z.string().url('ImageURL must be a valid URL').optional().or(z.literal('')),
  NMK_Verification_Image: z.string().optional(),
})

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

    const parsed = NMKCreateSchema.safeParse(body)
    if (!parsed.success) {
      const messages = parsed.error.issues.map(i => i.message).join(', ')
      return badRequest(messages)
    }

    await connectDB()
    const nmk = await NMK.create({ ...parsed.data, IsVerified: false })
    return created(nmk, 'NMK registered successfully')
  } catch (error) {
    console.error('Add NMK error:', error)
    return internalServerError('Failed to register NMK')
  }
}
