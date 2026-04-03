import { badRequest, internalServerError, ok } from '@/lib/api-response'
import { connectDB } from '@/lib/db'
import { NMK } from '@/lib/models/NMK'
import { NextRequest } from 'next/server'

function toRadians(value: number) {
  return (value * Math.PI) / 180
}

function distanceKm(lat1: number, lng1: number, lat2: number, lng2: number) {
  const earthRadiusKm = 6371
  const dLat = toRadians(lat2 - lat1)
  const dLng = toRadians(lng2 - lng1)

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(lat1)) *
      Math.cos(toRadians(lat2)) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2)

  return earthRadiusKm * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
}

export async function GET(request: NextRequest) {
  try {
    await connectDB()

    const searchParams = request.nextUrl.searchParams
    const latitudeRaw = searchParams.get('latitude')
    const longitudeRaw = searchParams.get('longitude')
    const radiusRaw = searchParams.get('radius') || '5'

    if (!latitudeRaw || !longitudeRaw) {
      return badRequest('latitude and longitude are required')
    }

    const latitude = Number.parseFloat(latitudeRaw)
    const longitude = Number.parseFloat(longitudeRaw)
    const radius = Number.parseFloat(radiusRaw)

    if (Number.isNaN(latitude) || Number.isNaN(longitude) || Number.isNaN(radius)) {
      return badRequest('Invalid latitude, longitude, or radius')
    }

    const centers = await NMK.find({ IsVerified: true }).lean()

    const matched = centers
      .filter(center => {
        const lat = Number.parseFloat(String((center as Record<string, unknown>).Latitude ?? 'NaN'))
        const lng = Number.parseFloat(String((center as Record<string, unknown>).Longitude ?? 'NaN'))
        if (Number.isNaN(lat) || Number.isNaN(lng)) {
          return false
        }
        return distanceKm(latitude, longitude, lat, lng) <= radius
      })
      .map(center => {
        const lat = Number.parseFloat(String((center as Record<string, unknown>).Latitude))
        const lng = Number.parseFloat(String((center as Record<string, unknown>).Longitude))
        return {
          ...center,
          distance: `${distanceKm(latitude, longitude, lat, lng).toFixed(1)} km`,
        }
      })

    return ok(matched, 'Centers fetched successfully')
  } catch (error) {
    console.error('Search centers error:', error)
    return internalServerError('Failed to search centers')
  }
}
