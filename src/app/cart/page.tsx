"use client";

import { useEffect, useState } from "react";
import { Product } from "@/types/Product";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function CartPage() {
  const [cart, setCart] = useState<Product[]>([]);
  const [total, setTotal] = useState<number>(0);

  useEffect(() => {
    const stored = localStorage.getItem("cart");
    if (stored) {
      const items: Product[] = JSON.parse(stored);
      setCart(items);
      calculateTotal(items);
    }
  }, []);

  const calculateTotal = (items: Product[]) => {
    const sum = items.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
    setTotal(sum);
  };

  const removeItem = (id: number) => {
    const updated = cart.filter((item) => item.id !== id);
    setCart(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
    calculateTotal(updated);
  };

  const updateQuantity = (id: number, qty: number) => {
    const updated = cart.map((item) =>
      item.id === id ? { ...item, quantity: qty } : item
    );
    setCart(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
    calculateTotal(updated);
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center text-gray-500">
        <p className="text-xl mb-4">🛒 Giỏ hàng của bạn đang trống</p>
        <Link href="/">
          <Button className="bg-red-600 hover:bg-red-700 text-white">
            Tiếp tục mua sắm
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6">🛒 Giỏ hàng của bạn</h1>

      <div className="space-y-6">
        {cart.map((item) => (
          <div
            key={item.id}
            className="flex flex-col sm:flex-row items-center gap-4 p-4 border rounded-lg shadow-sm"
          >
            <div className="relative w-32 h-32 flex-shrink-0 rounded overflow-hidden border">
              <Image
                src={item.image[0]}
                alt={item.name}
                fill
                className="object-cover"
              />
            </div>
            <div className="flex-1">
              <h2 className="text-lg font-semibold">{item.name}</h2>
              <p className="text-red-600 font-bold">
                {item.price.toLocaleString()}₫
              </p>
              <div className="flex items-center gap-3 mt-2">
                <span>Số lượng:</span>
                <input
                  type="number"
                  min={1}
                  value={item.quantity}
                  onChange={(e) =>
                    updateQuantity(item.id, Math.max(1, Number(e.target.value)))
                  }
                  className="w-16 text-center border rounded px-2 py-1"
                />
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => removeItem(item.id)}
                  className="text-red-500 hover:underline"
                >
                  Xoá
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Tổng tiền + Thanh toán */}
      <div className="mt-10 border-t pt-6 flex justify-between items-center">
        <div className="text-xl font-semibold text-gray-800">
          Tổng cộng:{" "}
          <span className="text-red-600">{total.toLocaleString()}₫</span>
        </div>
        <Link href="/pay">
          <Button className="bg-green-600 hover:bg-green-700 text-white px-6 py-2">
            Tiến hành thanh toán
          </Button>
        </Link>
      </div>
    </div>
  );
}
