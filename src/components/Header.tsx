"use client";

import Link from "next/link";
import { ShoppingCart, User, Phone } from "lucide-react";

export default function Header() {
  return (
    <>
      {/* Top bar */}
      <div className="bg-gray-100 text-sm px-4 py-1 flex justify-between items-center text-gray-800">
        <div className="flex items-center gap-2">
          <Phone className="w-4 h-4" />
          <span className="font-medium text-blue-600">09122457832</span>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1">
            <User className="w-4 h-4" />
            <Link href="/login">Tài khoản</Link>
          </div>
          <div className="flex items-center gap-1">
            <ShoppingCart className="w-4 h-4" />
            <Link href="/">
              Giỏ hàng (<span className="text-red-600">0</span>)
            </Link>
          </div>
        </div>
      </div>

      {/* Main nav */}
      <header className="flex items-center justify-between px-6 py-3 border-b shadow-sm bg-white">
        <Link href="/" className="flex items-center gap-2">
          <div className="bg-yellow-400 px-4 py-1 rounded">
            <span className="font-bold text-black text-lg">
              giadungnhanh.com
            </span>
          </div>
        </Link>
        <nav className="flex gap-6 text-sm">
          <Link href="/tat-ca" className="hover:underline">
            Tất cả
          </Link>
          <Link href="/binh-nuoc" className="hover:underline">
            Bình nước
          </Link>
          <Link
            href="/hang-su"
            className="hover:underline text-red-600 font-semibold"
          >
            Hàng sứ
          </Link>
          <Link
            href="/khuyen-mai"
            className="hover:underline text-red-600 font-semibold"
          >
            Khuyến mãi
          </Link>
        </nav>
        <div className="relative w-56">
          <input
            type="text"
            placeholder="Tìm kiếm..."
            className="w-full border rounded px-3 py-1 text-sm"
          />
        </div>
      </header>
    </>
  );
}
