"use client";

import {
  Facebook,
  Instagram,
  Phone,
  MapPin,
  MessageSquare,
} from "lucide-react";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-gray-100 text-gray-800 text-sm mt-10 border-t">
      <div className="max-w-6xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Thông tin liên hệ */}
        <div>
          <h3 className="font-semibold text-base mb-2">HỖ TRỢ KHÁCH HÀNG</h3>
          <p className="mb-1 font-medium">CÔNG TY TNHH GIA DỤNG NHANH</p>
          <div className="flex items-start mb-1">
            <MapPin className="w-4 h-4 mt-1 mr-2 text-gray-600" />
            <p>
              334/1E7 - 18 Lộc Long Quân, Phường 5, Quận 11, TP. Hồ Chí Minh
            </p>
          </div>
          <div className="flex items-center">
            <Phone className="w-4 h-4 mr-2 text-red-600" />
            <a
              href="tel:0912241237"
              className="text-red-600 font-semibold hover:underline"
            >
              0912.241.237
            </a>
          </div>
        </div>

        {/* Chính sách */}
        <div>
          <h3 className="font-semibold text-base mb-2">VỀ CHÚNG TÔI</h3>
          <ul className="space-y-1">
            <li>
              <a href="/gioi-thieu" className="hover:underline">
                Giới thiệu
              </a>
            </li>
            <li>
              <a href="/chinh-sach-bao-mat" className="hover:underline">
                Chính sách bảo mật
              </a>
            </li>
            <li>
              <a href="/chinh-sach-doi-tra" className="hover:underline">
                Chính sách đổi trả
              </a>
            </li>
            <li>
              <a href="/chinh-sach-van-chuyen" className="hover:underline">
                Chính sách vận chuyển
              </a>
            </li>
          </ul>
        </div>

        {/* Mạng xã hội */}
        <div>
          <h3 className="font-semibold text-base mb-2">
            KẾT NỐI VỚI CHÚNG TÔI
          </h3>
          <div className="flex space-x-4 mt-2">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Facebook className="w-5 h-5 text-blue-600 hover:scale-110 transition" />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Instagram className="w-5 h-5 text-pink-500 hover:scale-110 transition" />
            </a>
            <a
              href="https://zalo.me/0399922905"
              target="_blank"
              rel="noopener noreferrer"
            >
              <MessageSquare className="w-5 h-5 text-blue-400 hover:scale-110 transition" />
            </a>
          </div>
        </div>
      </div>

      {/* Bản quyền */}
      <div className="text-center text-xs text-gray-500 py-4 border-t">
        © {year} Giadungnhanh.com. All rights reserved.
      </div>
    </footer>
  );
}
