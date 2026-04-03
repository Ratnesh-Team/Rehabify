import { badRequest, internalServerError, ok } from '@/lib/api-response'
import { connectDB } from '@/lib/db'
import { HomeRemedy } from '@/lib/models/HomeRemedy'
import { NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    await connectDB()

    const id = request.nextUrl.searchParams.get('id')
    const filter: Record<string, number> = {}

    if (id) {
      const idValue = Number.parseInt(id, 10)
      if (Number.isNaN(idValue)) {
        return badRequest("Invalid value for 'id'")
      }
      filter.id = idValue
    }

    const data = await HomeRemedy.find(filter).lean()
    return ok(data, 'Homeremedies details fetched successfully')
  } catch (error) {
    console.error('Get home remedies error:', error)
    return internalServerError('Failed to fetch Homeremedies details')
  }
}
