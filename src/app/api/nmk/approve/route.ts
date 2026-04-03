import {
    badRequest,
    internalServerError,
    ok,
} from '@/lib/api-response'
import { connectDB } from '@/lib/db'
import { NMK } from '@/lib/models/NMK'
import { Types } from 'mongoose'
import { NextRequest } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const id = request.nextUrl.searchParams.get('id')
    if (!id || !Types.ObjectId.isValid(id)) {
      return badRequest('Invalid NMK code')
    }

    await connectDB()
    await NMK.updateOne({ _id: new Types.ObjectId(id) }, { $set: { IsVerified: true } })

    return ok(null, 'NMK code approved successfully')
  } catch (error) {
    console.error('Approve NMK error:', error)
    return internalServerError('Failed to approve NMK code')
  }
}
