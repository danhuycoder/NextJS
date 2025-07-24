// app/api/admin/login/route.ts
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    // Kiểm tra login (ví dụ cơ bản)
    if (email === 'admin@example.com' && password === '123456') {
      const response = NextResponse.json({
        success: true,
        message: 'Login thành công',
      });

      // Set cookie admin-token
      response.cookies.set('admin-token', 'fake-jwt-token', {
        httpOnly: true,  // Không cho JS đọc
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        path: '/',
        maxAge: 60 * 60 * 24, // 1 ngày
      });

      return response;
    }

    return NextResponse.json(
      { success: false, message: 'Email hoặc mật khẩu không đúng' },
      { status: 401 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, message: 'Lỗi server' },
      { status: 500 }
    );
  }
}
