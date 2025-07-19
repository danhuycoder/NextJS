import { NextResponse } from "next/server";

// Danh sách user giả lập
const users = [
  { userName: "admin", password: "123456" },
  { userName: "user1", password: "abcdef" },
];

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { userName, password } = body;

    // Kiểm tra input
    if (!userName || !password) {
      return NextResponse.json(
        { message: "Vui lòng nhập đầy đủ thông tin." },
        { status: 400 }
      );
    }

    // Kiểm tra user
    const user = users.find(
      (u) => u.userName === userName && u.password === password
    );

    if (!user) {
      return NextResponse.json(
        { message: "Sai tài khoản hoặc mật khẩu." },
        { status: 401 }
      );
    }

    return NextResponse.json(
      { message: "Đăng nhập thành công!", user: { userName: user.userName } },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ message: "Lỗi server." }, { status: 500 });
  }
}
