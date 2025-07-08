import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const { fullName, email, phone, password } = await req.json()

    if (!fullName || !email || !phone || !password) {
      return NextResponse.json({ message: 'Vui lòng điền đầy đủ thông tin.' }, { status: 400 })
    }

    // Giả lập lưu dữ liệu vào "database" (có thể thay bằng thực tế như Prisma, MongoDB...)
    console.log('✅ Dữ liệu đăng ký:', { fullName, email, phone, password })

    return NextResponse.json({
      message: 'Đăng ký thành công!',
      user: { fullName, email, phone },
    }, { status: 200 })
  } catch (error) {
    console.error('❌ Lỗi trong API register:', error)
    return NextResponse.json({ message: 'Lỗi server!' }, { status: 500 })
  }
}
