// app/api/register/route.ts
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { fullName, email, phone, password } = body

    // ✅ Bạn có thể kiểm tra hoặc lưu vào DB ở đây
    console.log('Dữ liệu đăng ký:', { fullName, email, phone, password })

    // ✅ Trả về kết quả
    return NextResponse.json(
      { message: 'Đăng ký thành công!', user: { fullName, email, phone } },
      { status: 200 }
    )
  } catch (error) {
    return NextResponse.json(
      { message: 'Đăng ký thất bại', error: error },
      { status: 500 }
    )
  }
}
