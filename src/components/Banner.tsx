"use client";

import React from "react";

export default function HeroBanner() {
  return (
    <div
      className="w-full h-[666px] relative bg-cover bg-center"
      style={{ backgroundImage: "url('/image/banner.jpg')" }}
    >
      <div className="absolute inset-0 bg-black/10 flex items-center justify-center">
        <div className="text-white text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Chào mừng đến với Shop
          </h1>
          <p className="text-lg md:text-xl">
            Ưu đãi hot mỗi ngày - Mua sắm dễ dàng
          </p>
        </div>
      </div>
    </div>
  );
}
