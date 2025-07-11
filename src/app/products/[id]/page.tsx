"use client";

import { useEffect, useState } from "react";
import { Product } from "@/types/Product";
import Image from "next/image";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Heart, HeartIcon, ShoppingCart, Zap } from "lucide-react";

export default function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState<number>(1);
  const [error, setError] = useState<string | null>(null);
  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProduct() {
      const res = await fetch(`http://localhost:3000/api/products/${id}`);
      if (res.ok) {
        const data = await res.json();
        setProduct(data);
        setSelectedImage(data.image[0]); // hiển thị ảnh đầu tiên
        if (data.soldOut || data.quantity === 0) {
          setQuantity(0);
        } else {
          setQuantity(1);
        }
      }
      setLoading(false);
    }

    fetchProduct();
  }, [id]);

  if (loading) return <div className="p-6">Đang tải...</div>;
  if (!product)
    return <div className="p-6 text-red-500">Không tìm thấy sản phẩm</div>;

  const isSoldOut = product.soldOut || product.quantity === 0;

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Image */}
        <div className="flex flex-col gap-4">
          {/* Ảnh lớn */}
          <div className="relative w-full h-[400px] rounded shadow overflow-hidden border">
            <Image
              src={selectedImage ?? product.image[0]}
              alt={product.name}
              fill
              className="object-contain"
            />
          </div>

          {/* Thumbnails */}
          <div className="flex gap-2 overflow-x-auto">
            {product.image.map((img, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(img)}
                className={`w-20 h-20 relative border rounded overflow-hidden ${
                  selectedImage === img ? "ring-2 ring-red-500" : ""
                }`}
              >
                <Image
                  src={img}
                  alt={`Thumbnail ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Details */}
        <div className="space-y-4">
          <h1 className="text-2xl font-bold">{product.name}</h1>
          <p className="text-gray-600 text-sm">
            Mã sản phẩm: <span className="font-medium">SP{product.id}</span>
          </p>

          <p className="text-red-600 text-2xl font-bold">
            {product.price.toLocaleString()}₫
          </p>

          <p
            className={`font-medium ${
              isSoldOut ? "text-red-500" : "text-green-700"
            }`}
          >
            {isSoldOut
              ? "Tạm hết hàng"
              : `Còn hàng (${product.quantity} sản phẩm)`}
          </p>

          {/* Số lượng */}
          <div className="flex items-center gap-2">
            <span className="font-semibold">Số lượng:</span>
            <div className="flex items-center border rounded px-2 py-1">
              <button
                onClick={() => {
                  if (quantity > 1) {
                    setQuantity((prev) => prev - 1);
                    setError(null);
                  }
                }}
                disabled={isSoldOut || quantity <= 1}
                className="px-2 text-lg disabled:opacity-30"
              >
                −
              </button>
              <input
                type="number"
                value={quantity}
                min={1}
                onChange={(e) => {
                  const val = Number(e.target.value);
                  if (val > product.quantity) {
                    setError("Số lượng bạn chọn vượt quá hàng tồn kho");
                  } else {
                    setQuantity(Math.max(1, val));
                    setError(null);
                  }
                }}
                disabled={isSoldOut}
                className="w-12 text-center outline-none bg-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
              />
              <button
                onClick={() => {
                  if (quantity < product.quantity) {
                    setQuantity((prev) => prev + 1);
                    setError(null);
                  } else {
                    setError("Số lượng bạn chọn vượt quá hàng tồn kho");
                  }
                }}
                disabled={isSoldOut}
                className="px-2 text-lg disabled:opacity-30"
              >
                +
              </button>
            </div>
          </div>

          {/* Thông báo lỗi */}
          {error && <p className="text-sm text-red-500 italic">{error}</p>}
          {isSoldOut && (
            <p className="text-sm text-red-500 italic">
              Sản phẩm hiện đang hết hàng — bạn không thể đặt số lượng
            </p>
          )}

          {/* Buttons */}
          <div className="flex flex-wrap gap-4 mt-4">
            <Button
              className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 flex items-center gap-2 cursor-pointer"
              disabled={isSoldOut}
            >
              <ShoppingCart size={18} />
              Thêm vào giỏ hàng
            </Button>
            <Button
              variant="outline"
              className="flex items-center gap-2 cursor-pointer"
              disabled={isSoldOut}
            >
              <Zap size={18} />
              Mua ngay
            </Button>
            <Button
              variant="ghost"
              onClick={() => setIsFavorite((prev) => !prev)}
              className={`flex items-center gap-1 ${
                isFavorite ? "text-red-600" : "text-gray-500"
              } cursor-pointer`}
            >
              {isFavorite ? (
                <HeartIcon fill="currentColor" size={20} />
              ) : (
                <Heart size={20} />
              )}
              {isFavorite ? "Đã yêu thích" : "Yêu thích"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
