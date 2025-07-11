"use client";

import Image from "next/image";
import { X } from "lucide-react";
import { Product } from "@/types/Product";
import { useState } from "react";
import Link from "next/link";
interface Props {
  product: Product;
  onClose: () => void;
}

export default function ProductQuickView({ product, onClose }: Props) {
  const [selectedImage, setSelectedImage] = useState(product.image[0]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-2">
      <div className="bg-white w-full max-w-6xl p-6 rounded-xl relative grid grid-cols-1 md:grid-cols-[80px_1fr_1fr] gap-6 md:h-[500px]">
        {/* Nút đóng */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-red-500 z-10"
        >
          <X size={24} />
        </button>

        {/* Cột 1: Thumbnail bên trái */}
        <div className="flex flex-col gap-3 overflow-auto">
          {product.image.map((img, i) => (
            <button
              key={i}
              onClick={() => setSelectedImage(img)}
              className={`w-20 h-20 border-2 rounded-lg overflow-hidden relative group transition-all ${
                selectedImage === img
                  ? "border-red-500 ring-2 ring-red-500"
                  : "border-gray-200 hover:border-gray-400"
              }`}
            >
              <Image
                src={img}
                alt={`thumb-${i}`}
                fill
                className="object-cover group-hover:scale-105 transition-transform"
              />
            </button>
          ))}
        </div>

        {/* Cột 2: Ảnh lớn ở giữa */}
        <div className="relative border rounded overflow-hidden h-[300px] md:h-full bg-white">
          <Image
            src={selectedImage}
            alt={product.name}
            fill
            className="object-contain"
          />
        </div>

        {/* Cột 3: Thông tin sản phẩm */}
        <div className="flex flex-col justify-between space-y-4">
          <div>
            <h2 className="text-xl font-bold">{product.name}</h2>
            <p className="text-sm text-gray-600 mt-1">
              Tình trạng:{" "}
              <span
                className={`font-medium ${
                  product.soldOut || product.quantity === 0
                    ? "text-red-600"
                    : "text-green-600"
                }`}
              >
                {product.soldOut || product.quantity === 0
                  ? "Hết hàng"
                  : "Còn hàng"}
              </span>
            </p>
            <p className="text-red-600 text-2xl font-bold mt-2">
              {product.price.toLocaleString()}₫
            </p>
          </div>

          <div className="space-y-2">
            <button
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded w-full font-medium"
              disabled={product.soldOut || product.quantity === 0}
            >
              SỞ HỮU NGAY
            </button>

            <details className="border-t pt-2">
              <summary className="cursor-pointer font-medium text-sm">
                THÔNG SỐ SẢN PHẨM
              </summary>
              <div className="text-sm mt-1 text-gray-500">
                Chất liệu cao cấp, sử dụng tiện lợi cho gia đình và quán ăn.
              </div>
            </details>

            <details className="border-t pt-2">
              <summary className="cursor-pointer font-medium text-sm">
                MÔ TẢ SẢN PHẨM
              </summary>
              <div className="text-sm mt-1 text-gray-500">
                Sản phẩm được thiết kế ngẫu nhiên với họa tiết sinh động, phong
                cách Nhật Bản.
              </div>
            </details>

            <Link
              href={`/products/${product.id}`}
              className="text-right text-sm mt-2 text-blue-500 underline cursor-pointer block"
            >
              Xem chi tiết sản phẩm &gt;&gt;
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
