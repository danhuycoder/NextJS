// app/api/admin/login/route.ts
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    // Kiểm tra email & password (ví dụ đơn giản)
    if (email === 'admin@example.com' && password === '123456') {
      // Trả về JWT token hoặc session (tạm thời trả dữ liệu mock)
      return NextResponse.json({ success: true, token: 'fake-jwt-token' });
    }

    return NextResponse.json(
      { success: false, message: 'Email hoặc mật khẩu không đúng' },
      { status: 401 }
    );
  } catch  {
    return NextResponse.json(
      { success: false, message: 'Lỗi server' },
      { status: 500 }
    );
  }
}
