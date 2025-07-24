"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Package, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils"; // Nếu chưa có utils, bạn có thể dùng template string

export default function SidebarAdmin() {
  const pathname = usePathname();

  const menu = [
    {
      label: "Quản lý sản phẩm",
      icon: <Package size={18} />,
      href: "/admin/homePage",
    },
    {
      label: "Quản lý người dùng",
      icon: <Users size={18} />,
      href: "/admin/users",
    },
  ];

  return (
    <aside className="w-64 bg-white border-r shadow-md p-4">
      <h2 className="text-xl font-bold mb-6">Admin Panel</h2>
      <nav className="flex flex-col gap-2">
        {menu.map((item) => (
          <Link key={item.href} href={item.href}>
            <Button
              variant={pathname === item.href ? "default" : "outline"}
              className={cn("flex items-center gap-2 justify-start w-full")}
            >
              {item.icon}
              {item.label}
            </Button>
          </Link>
        ))}
      </nav>
    </aside>
  );
}
