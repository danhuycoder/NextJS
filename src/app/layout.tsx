// app/layout.tsx
import "./globals.css";
import { Inter } from "next/font/google";
import { Metadata } from "next";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuLink,
  NavigationMenuTrigger,
  NavigationMenuContent,
} from "@/components/ui/navigation-menu";
import { ShoppingCart, User, Phone, Search } from "lucide-react";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Giadungnhanh.com",
  description: "Trang web bán đồ gia dụng",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="bg-gray-100 text-sm px-4 py-1 flex justify-between items-center text-gray-800">
          <div className="flex items-center gap-2">
            <Phone className="w-4 h-4" />
            <span className="font-medium text-blue-600">09122457832</span>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <User className="w-4 h-4" />
              <Link href="/login">Tài khoản</Link>
            </div>
            <div className="flex items-center gap-1">
              <ShoppingCart className="w-4 h-4" />
              <Link href="/">
                Giỏ hàng (<span className="text-red-600">0</span>)
              </Link>
            </div>
          </div>
        </div>

        {/* Main Navbar */}

        <header className="flex items-center justify-between px-6 py-3 border-b shadow-sm bg-white">
          <Link href="/" className="flex items-center gap-2">
            <div className="bg-yellow-400 px-4 py-1 rounded">
              <span className="font-bold text-black text-lg">
                giadungnhanh.com
              </span>
            </div>
          </Link>

          <NavigationMenu>
            <NavigationMenuList className="flex gap-8 items-center">
              {/* Dropdown trigger */}
              <NavigationMenuItem className="relative">
                <NavigationMenuTrigger className="bg-white text-black hover:text-yellow-600 hover:underline px-2 py-1">
                  Danh mục
                </NavigationMenuTrigger>

                {/* Nội dung dropdown */}
                <NavigationMenuContent className="absolute left-0 mt-2 w-56 bg-white border shadow-md rounded-md p-3 z-50">
                  <ul className="space-y-2">
                    <li>
                      <Link href="/tat-ca" className="block hover:text-red-500">
                        Tất cả sản phẩm
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/binh-nuoc"
                        className="block hover:text-red-500"
                      >
                        Bình nước - Ly nước
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/hang-su"
                        className="block text-red-600 font-semibold"
                      >
                        Hàng sứ - Thủy tinh
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/khuyen-mai"
                        className="block text-red-600 font-semibold"
                      >
                        Khuyến mãi
                      </Link>
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              {/* Liên kết khác */}
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link href="/gioi-thieu" className="hover:underline">
                    Giới thiệu
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link href="/tin-tuc" className="hover:underline">
                    Tin tức
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link href="/lien-he" className="hover:underline">
                    Liên hệ
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          {/* Search */}
          <div className="relative w-56">
            <Input
              type="text"
              placeholder="Tìm kiếm ..."
              className="round-full pl-4 pr-10"
            />
            <Search className="absolute top-1.5 right-3 w-5 text-gray-500" />
          </div>
        </header>

        <main className="min-h-screen">{children}</main>
      </body>
    </html>
  );
}
