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
    <div
      className="min-h-screen w-full flex items-center justify-center bg-cover bg-center relative"
      style={{ backgroundImage: "url('/image/background.jpg')" }}
    >
      <div className="absolute inset-0 bg-black/50 z-0" />

      <div className="w-full max-w-md px-4 z-10">
        <Card className="backdrop-blur-md bg-white/10 border border-white/30 text-white p-8 rounded-xl shadow-2xl">
          <CardContent className="space-y-6">
            <h2 className="text-3xl font-bold text-center mb-4">Login</h2>

            {/* Phone */}
            <div className="relative">
              <Input
                type="text"
                placeholder="Phone"
                className="pl-10 bg-white/20 border-none text-white placeholder:text-white/70 rounded-full"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
              <User className="absolute top-2.5 left-3 h-5 w-5 text-white/80" />
            </div>

            {/* Password */}
            <div className="relative">
              <Input
                type="password"
                placeholder="Password"
                className="pl-10 bg-white/20 border-none text-white placeholder:text-white/70 rounded-full"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Lock className="absolute top-2.5 left-3 h-5 w-5 text-white/80" />
            </div>

            {/* Remember me */}
            <div className="flex justify-between text-sm items-center">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                  className="accent-white"
                />
                <span>Remember Me</span>
              </label>
              <a href="#" className="hover:underline text-blue-200">
                Forgot Password?
              </a>
            </div>

            {/* Submit */}
            <Button
              type="button"
              onClick={handleLogin}
              className="w-full rounded-full bg-white text-blue-900 font-semibold hover:bg-gray-200"
            >
              Login
            </Button>

            <p className="text-center text-sm text-white/80">
              Don’t have an account?{" "}
              <a href="/register" className="text-white font-medium underline">
                Register
              </a>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
