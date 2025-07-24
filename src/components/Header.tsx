"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ShoppingCart, User, Phone } from "lucide-react";
import Menu from "./Menu";
import { Button } from "./ui/button";

type CartItem = {
  id: number;
  name: string;
  price: number;
  image: string[];
  quantity: number;
};

export default function Header() {
  const [userName, setUserName] = useState<string | null>(null);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const loadData = () => {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        try {
          const user = JSON.parse(storedUser);
          setUserName(user.fullname || null);
        } catch {
          setUserName(null);
        }
      }

      const storedCart: CartItem[] = JSON.parse(
        localStorage.getItem("cart") || "[]"
      );
      const count = storedCart.reduce((sum, item) => sum + item.quantity, 0);
      setCartCount(count);
    };

    loadData();
    window.addEventListener("cart-update", loadData);

    return () => {
      window.removeEventListener("cart-update", loadData);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("cart");
    window.dispatchEvent(new Event("cart-update"));
    window.location.href = "/login";
  };

  return (
    <>
      {/* Top bar */}
      <div className="bg-gray-100 text-sm px-4 py-1 flex justify-between items-center text-gray-800">
        <div className="flex items-center gap-2">
          <Phone className="w-4 h-4" />
          <span className="font-medium text-red-600">09122457832</span>
        </div>

        <div className="flex items-center gap-4">
          {/* Tài khoản */}
          <div className="flex items-center gap-1">
            <User className="w-4 h-4" />
            {userName ? (
              <div className="flex items-center gap-2">
                {/* Link đến trang Account */}
                <Link
                  href="/accounts"
                  className="font-semibold text-red-600 hover:underline"
                >
                  {userName}
                </Link>
                <Button
                  size="sm"
                  variant="outline"
                  className="text-xs"
                  onClick={handleLogout}
                >
                  Đăng xuất
                </Button>
              </div>
            ) : (
              <Link href="/login" className="font-semibold hover:underline">
                Tài khoản
              </Link>
            )}
          </div>

          {/* Giỏ hàng */}
          <div className="flex items-center gap-1">
            <ShoppingCart className="w-4 h-4" />
            <Link href="/cart">
              Giỏ hàng (<span className="text-red-600">{cartCount}</span>)
            </Link>
          </div>
        </div>
      </div>

      {/* Menu điều hướng */}
      <Menu />
    </>
  );
}
