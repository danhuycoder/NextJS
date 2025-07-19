"use client";

import { useState } from "react";

export default function AdminLoginPage() {
  const [formData, setFormData] = useState({ userName: "", password: "" });
  const [message, setMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");

    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const data = await res.json();
    setMessage(data.message);

    if (res.ok) {
      // Điều hướng đến admin dashboard
      window.location.href = "/admin/dashboard";
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow max-w-sm w-full space-y-4"
      >
        <h2 className="text-2xl font-bold text-center">Admin Login</h2>
        <input
          type="text"
          name="userName"
          placeholder="Tên đăng nhập"
          value={formData.userName}
          onChange={handleChange}
          className="border rounded w-full p-2"
        />
        <input
          type="password"
          name="password"
          placeholder="Mật khẩu"
          value={formData.password}
          onChange={handleChange}
          className="border rounded w-full p-2"
        />
        {message && (
          <p className="text-center text-sm text-red-500">{message}</p>
        )}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          Đăng nhập
        </button>
      </form>
    </div>
  );
}
