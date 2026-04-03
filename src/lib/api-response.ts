import { NextResponse } from 'next/server'

export function ok(data: unknown, message = 'Success') {
  return NextResponse.json({ status: 200, message, data }, { status: 200 })
}

export function created(data: unknown, message = 'Created') {
  return NextResponse.json({ status: 201, message, data }, { status: 201 })
}

export function badRequest(message: string) {
  return NextResponse.json({ status: 400, message, data: null }, { status: 400 })
}

export function unauthorized(message = 'Unauthorized') {
  return NextResponse.json({ status: 401, message, data: null }, { status: 401 })
}

export function forbidden(message = 'Forbidden') {
  return NextResponse.json({ status: 403, message, data: null }, { status: 403 })
}

export function internalServerError(message = 'Internal server error') {
  return NextResponse.json({ status: 500, message, data: null }, { status: 500 })
}
