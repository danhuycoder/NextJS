// app/api/login/route.ts

import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const { username, password } = await req.json()
  if (username === 'admin' && password === '123456') {
    return NextResponse.json({ message: 'OK', user: { username } })
  }
  return NextResponse.json({ message: 'Sai thông tin' }, { status: 401 })
}
