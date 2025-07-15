"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Product } from "@/types/Product";
import { useRouter } from "next/navigation";

export default function CheckoutPage() {
  const [cart, setCart] = useState<Product[]>([]);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const router = useRouter();

  useEffect(() => {
    const storedCart: Product[] = JSON.parse(
      localStorage.getItem("cart") || "[]"
    );
    setCart(storedCart);
  }, []);

  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleOrder = () => {
    if (!name || !phone || !address) {
      alert("Vui lòng điền đầy đủ thông tin");
      return;
    }

    // Giả lập lưu đơn hàng (ở đây có thể gửi về server hoặc lưu localStorage)
    const order = {
      id: Date.now(),
      customer: { name, phone, address },
      items: cart,
      total: totalPrice,
    };

    console.log("Order submitted:", order);
    localStorage.removeItem("cart");
    window.dispatchEvent(new Event("cart-update"));
    alert("✅ Đặt hàng thành công!");
    router.push("/");
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6">Thanh toán</h1>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Thông tin khách hàng */}
        <div className="space-y-4">
          <Input
            placeholder="Họ và tên"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Input
            placeholder="Số điện thoại"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <Input
            placeholder="Địa chỉ giao hàng"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>

        {/* Danh sách sản phẩm */}
        <div className="border rounded-md p-4 bg-white shadow-sm space-y-3">
          <h2 className="text-lg font-semibold mb-2">
            Sản phẩm ({cart.length})
          </h2>
          {cart.map((item) => (
            <div key={item.id} className="flex justify-between text-sm">
              <span>
                {item.name} x {item.quantity}
              </span>
              <span>{(item.price * item.quantity).toLocaleString()} ₫</span>
            </div>
          ))}
          <div className="font-bold text-red-600 flex justify-between pt-2 border-t">
            <span>Tổng tiền:</span>
            <span>{totalPrice.toLocaleString()} ₫</span>
          </div>
        </div>
      </div>

      <div className="text-right mt-6">
        <Button
          onClick={handleOrder}
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-2"
        >
          Xác nhận đặt hàng
        </Button>
      </div>
    </div>
  );
}
