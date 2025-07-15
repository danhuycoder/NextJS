"use client";

import React from "react";

export default function HeroBanner() {
  return (
    <div
      className="w-full min-h-[60vh] md:min-h-[666px] relative bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/image/banner.jpg')" }}
    >
      <div className="absolute inset-0 bg-black/10 flex items-center justify-center">
        <div className="text-white text-center px-4">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 leading-tight">
            Chào mừng đến với Shop
          </h1>
          <p className="text-base sm:text-lg md:text-xl max-w-xl mx-auto">
            Ưu đãi hot mỗi ngày - Mua sắm dễ dàng tại Gia Dụng Nhanh
          </p>
        </div>
      </div>
    </div>
  );
}
