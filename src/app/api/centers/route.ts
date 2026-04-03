import { badRequest, created, internalServerError, ok } from '@/lib/api-response'
import { connectDB } from '@/lib/db'
import { NMK } from '@/lib/models/NMK'
import { NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    await connectDB()

    const searchParams = request.nextUrl.searchParams
    const filter: Record<string, string | boolean> = {}

    const city = searchParams.get('city')
    if (city) {
      filter.District = city
    }

    const state = searchParams.get('state')
    if (state) {
      filter.State = state
    }

    const approved = searchParams.get('approved')
    if (approved) {
      if (approved !== 'true' && approved !== 'false') {
        return badRequest('Invalid approved value')
      }
      filter.IsVerified = approved === 'true'
    }

    const data = await NMK.find(filter).lean()
    return ok(data, 'Centers fetched successfully')
  } catch (error) {
    console.error('Get centers error:', error)
    return internalServerError('Failed to fetch centers')
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    await connectDB()

    const center = await NMK.create({ ...body, IsVerified: false })
    return created(center, 'Center registered successfully')
  } catch (error) {
    console.error('Create center error:', error)
    return internalServerError('Failed to create center')
  }
}
