"use client";

import Link from "next/link";
import { Input } from "./ui/input";
import { Search, Menu as MenuIcon, X } from "lucide-react";
import { useState } from "react";

export default function Menu() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="border-b shadow-sm bg-white">
      {/* Top bar */}
      <div className="flex items-center justify-between px-4 sm:px-6 py-3">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="bg-yellow-400 px-4 py-1 rounded">
            <span className="font-bold text-black text-lg">
              giadungnhanh.com
            </span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex gap-6 text-sm font-semibold">
          <Link href="/about" className="hover:underline">
            GIỚI THIỆU
          </Link>
          <Link href="/binh-nuoc" className="hover:underline">
            TẤT CẢ SẢN PHẨM
          </Link>
          <Link href="/hang-su" className="hover:underline">
            BÌNH NƯỚC - LY NƯỚC
          </Link>
          <Link href="/khuyen-mai" className="hover:underline">
            HÀNG SỨ THỦY TINH
          </Link>
          <Link href="/khuyen-mai" className="hover:underline text-red-600">
            KHUYẾN MÃI
          </Link>
          <Link href="/tin-tuc" className="hover:underline text-red-600">
            TIN TỨC
          </Link>
          <Link href="/lien-he" className="hover:underline text-red-600">
            LIÊN HỆ
          </Link>
        </nav>

        {/* Search - Hidden on small screens */}
        <div className="relative hidden md:block w-56">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            type="text"
            placeholder="Tìm kiếm..."
            className="w-full pl-9 pr-3 py-1 text-sm rounded-2xl border"
          />
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2"
        >
          {mobileMenuOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <MenuIcon className="w-6 h-6" />
          )}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden px-4 pb-4 space-y-2 text-sm font-semibold bg-white shadow-md">
          <Link href="/about" onClick={() => setMobileMenuOpen(false)}>
            GIỚI THIỆU
          </Link>
          <Link href="/binh-nuoc" onClick={() => setMobileMenuOpen(false)}>
            TẤT CẢ SẢN PHẨM
          </Link>
          <Link href="/hang-su" onClick={() => setMobileMenuOpen(false)}>
            BÌNH NƯỚC - LY NƯỚC
          </Link>
          <Link href="/khuyen-mai" onClick={() => setMobileMenuOpen(false)}>
            HÀNG SỨ THỦY TINH
          </Link>
          <Link
            href="/khuyen-mai"
            onClick={() => setMobileMenuOpen(false)}
            className="text-red-600"
          >
            KHUYẾN MÃI
          </Link>
          <Link
            href="/tin-tuc"
            onClick={() => setMobileMenuOpen(false)}
            className="text-red-600"
          >
            TIN TỨC
          </Link>
          <Link
            href="/lien-he"
            onClick={() => setMobileMenuOpen(false)}
            className="text-red-600"
          >
            LIÊN HỆ
          </Link>

          {/* Search in mobile */}
          <div className="relative mt-3">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              type="text"
              placeholder="Tìm kiếm..."
              className="w-full pl-9 pr-3 py-1 text-sm rounded-2xl border"
            />
          </div>
        </div>
      )}
    </header>
  );
}
