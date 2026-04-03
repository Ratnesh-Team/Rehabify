import { verifyToken } from '@/lib/jwt'
import { NextRequest, NextResponse } from 'next/server'

export async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname
  const isApiRoute = pathname.startsWith('/api')

  const legacyAliasMap: Record<string, string> = {
    '/api/doctor': '/api/doctors',
    '/api/addDoctor': '/api/doctors',
    '/api/addNmk': '/api/nmk',
    '/api/addPatient': '/api/users',
    '/api/signIn': '/api/auth/signin',
    '/api/signUp': '/api/auth/signup',
    '/api/NMK': '/api/nmk',
    '/api/NMK/approve': '/api/nmk/approve',
    '/Home': '/home',
    '/Database': '/database',
    '/TreatmentCenters': '/treatment-centers',
    '/HomeRemedies': '/home-remedies',
    '/Community': '/community',
    '/Ngo': '/ngo',
    '/Doctor': '/doctor',
    '/NMK': '/nmk',
    '/Register': '/register',
    '/Register/approval': '/register/approval',
    '/Register/userRegistration': '/register',
    '/Contributor': '/contributor',
    '/Settings': '/settings',
  }

  const rewrittenPath = legacyAliasMap[pathname]
  if (rewrittenPath) {
    const rewrittenUrl = request.nextUrl.clone()
    rewrittenUrl.pathname = rewrittenPath
    return NextResponse.rewrite(rewrittenUrl)
  }

  const token =
    request.headers.get('authorization')?.replace('Bearer ', '') ||
    request.cookies.get('auth-token')?.value

  const publicApiRoutes = [
    '/api/health',
    '/api/auth/signup',
    '/api/auth/signin',
    '/api/auth/logout',
    '/api/signUp',
    '/api/signIn',
  ]

  const publicPageRoutes = ['/', '/auth/signin', '/auth/signup']

  const isPublicRoute = isApiRoute
    ? publicApiRoutes.some(route => pathname.startsWith(route))
    : publicPageRoutes.some(route => pathname === route || pathname.startsWith('/auth'))

  if (isPublicRoute) {
    return NextResponse.next()
  }

  if (!token) {
    if (isApiRoute) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    return NextResponse.redirect(new URL('/auth/signin', request.url))
  }

  const payload = await verifyToken(token)
  if (!payload) {
    if (isApiRoute) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 })
    }
    return NextResponse.redirect(new URL('/auth/signin', request.url))
  }

  const requestHeaders = new Headers(request.headers)
  requestHeaders.set('x-user-id', payload.sub)
  requestHeaders.set('x-user-email', payload.email)
  if (payload.role) {
    requestHeaders.set('x-user-role', String(payload.role))
  }
  if (payload.source) {
    requestHeaders.set('x-user-source', String(payload.source))
  }

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  })
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|img/|manifest.json|robots.txt|sitemap.xml|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|txt|xml|json)$).*)',
  ],
}
