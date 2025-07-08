'use client'

import Image from 'next/image'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { User, Mail, Lock, Phone } from 'lucide-react'
import { useState } from 'react'

export default function RegisterPage() {
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')

  const handleRegister = async () => {
    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ fullName, email, phone, password }),
      })

      const data = await res.json()

      if (res.ok) {
        alert('✅ Đăng ký thành công!')
        console.log('Server response:', data)
      } else {
        alert('❌ Đăng ký thất bại: ' + data.message)
      }
    } catch (error) {
      console.error('Lỗi khi gọi API:', error)
      alert('❌ Không thể kết nối đến server!')
    }
  }

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* Background image */}
      <div className="fixed inset-0 -z-10">
        <Image
          src="/image/background.jpg"
          alt="Background"
          fill
          className="object-cover"
          priority
        />
      </div>

      <div className="fixed inset-0 bg-black/40 -z-10" />

      <div className="flex items-center justify-center min-h-screen px-4">
        <div className="w-full max-w-md">
          <Card className="backdrop-blur-md bg-white/10 border border-white/30 text-white p-8 rounded-xl shadow-2xl">
            <CardContent className="space-y-6">
              <h2 className="text-3xl font-bold text-center mb-4">Register</h2>

              {/* Full Name */}
              <div className="relative">
                <Input
                  type="text"
                  placeholder="Full Name"
                  className="pl-10 bg-white/20 border-none text-white placeholder:text-white/70 rounded-full"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                />
                <User className="absolute top-2.5 left-3 h-5 w-5 text-white/80" />
              </div>

              {/* Email */}
              <div className="relative">
                <Input
                  type="email"
                  placeholder="Email"
                  className="pl-10 bg-white/20 border-none text-white placeholder:text-white/70 rounded-full"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Mail className="absolute top-2.5 left-3 h-5 w-5 text-white/80" />
              </div>

              {/* Phone */}
              <div className="relative">
                <Input
                  type="tel"
                  placeholder="Phone Number"
                  className="pl-10 bg-white/20 border-none text-white placeholder:text-white/70 rounded-full"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
                <Phone className="absolute top-2.5 left-3 h-5 w-5 text-white/80" />
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

              {/* Button */}
              <Button
                type="button"
                onClick={handleRegister}
                className="w-full rounded-full bg-white text-blue-900 font-semibold hover:bg-gray-200"
              >
                Register
              </Button>

              <p className="text-center text-sm text-white/80">
                Already have an account?{' '}
                <a href="/login" className="text-white font-medium underline">
                  Login
                </a>
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
