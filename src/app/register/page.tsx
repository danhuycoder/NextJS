"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { User, Mail, Lock, Phone } from "lucide-react";
import { useState } from "react";

export default function RegisterPage() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fullName, email, phone, password }),
      });

      const data = await res.json();

      if (res.ok) {
        alert("✅ Đăng ký thành công!");
        console.log("Server response:", data);
      } else {
        alert("❌ Đăng ký thất bại: " + data.message);
      }
    } catch (error) {
      console.error("Lỗi khi gọi API:", error);
      alert("❌ Không thể kết nối đến server!");
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md px-4">
        <Card className="bg-white p-8 rounded-xl shadow-lg border border-gray-100">
          <CardContent className="space-y-6">
            <h2 className="text-3xl font-bold text-center text-gray-900">
              Đăng ký
            </h2>

            {/* Full Name */}
            <div className="relative">
              <Input
                type="text"
                placeholder="Họ và tên"
                className="pl-10 border-gray-300 rounded-lg"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
              <User className="absolute top-2.5 left-3 h-5 w-5 text-gray-400" />
            </div>

            {/* Email */}
            <div className="relative">
              <Input
                type="email"
                placeholder="Email"
                className="pl-10 border-gray-300 rounded-lg"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Mail className="absolute top-2.5 left-3 h-5 w-5 text-gray-400" />
            </div>

            {/* Phone */}
            <div className="relative">
              <Input
                type="tel"
                placeholder="Số điện thoại"
                className="pl-10 border-gray-300 rounded-lg"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
              <Phone className="absolute top-2.5 left-3 h-5 w-5 text-gray-400" />
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

            {/* Button */}
            <Button
              type="button"
              onClick={handleRegister}
              className="w-full rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700"
            >
              Đăng ký
            </Button>

            <p className="text-center text-sm text-gray-600">
              Đã có tài khoản?{" "}
              <a href="/login" className="text-blue-500 font-medium underline">
                Đăng nhập
              </a>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
