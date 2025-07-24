"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { User, Lock } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const router = useRouter();

  const handleLogin = async () => {
    try {
      const res = await fetch("/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone, password }),
      });

      const data = await res.json();

      if (res.ok) {
        alert("✅ " + data.message);
        localStorage.setItem("user", JSON.stringify(data.user)); //Lưu user

        // Chuyển về trang chủ
        router.push("/");

        // Nếu cần lưu vào localStorage:
        if (remember) {
          localStorage.setItem("user", JSON.stringify(data.user));
        }
      } else {
        alert("❌ " + data.message);
      }
    } catch (err) {
      console.error(err);
      alert("❌ Không thể kết nối đến server!");
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md px-4">
        <Card className="bg-white p-8 rounded-xl shadow-lg border border-gray-100">
          <CardContent className="space-y-6">
            <h2 className="text-3xl font-bold text-center text-gray-900">
              Đăng nhập
            </h2>

            {/* Phone */}
            <div className="relative">
              <Input
                type="text"
                placeholder="Số điện thoại"
                className="pl-10 border-gray-300 rounded-lg"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
              <User className="absolute top-2.5 left-3 h-5 w-5 text-gray-400" />
            </div>

            {/* Password */}
            <div className="relative">
              <Input
                type="password"
                placeholder="Mật khẩu"
                className="pl-10 border-gray-300 rounded-lg"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Lock className="absolute top-2.5 left-3 h-5 w-5 text-gray-400" />
            </div>

            {/* Remember me */}
            <div className="flex justify-between text-sm items-center text-gray-600">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                  className="accent-blue-500"
                />
                <span>Nhớ mật khẩu</span>
              </label>
              <a href="#" className="hover:underline text-blue-500">
                Quên mật khẩu?
              </a>
            </div>

            {/* Submit */}
            <Button
              type="button"
              onClick={handleLogin}
              className="w-full rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700"
            >
              Đăng nhập
            </Button>

            <p className="text-center text-sm text-gray-600">
              Chưa có tài khoản?{" "}
              <a
                href="/register"
                className="text-blue-500 font-medium underline"
              >
                Đăng ký
              </a>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
