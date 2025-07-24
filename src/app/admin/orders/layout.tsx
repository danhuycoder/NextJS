import Link from "next/link";
import { Package, Users, ShoppingCart } from "lucide-react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex">
      <aside className="w-64 bg-gray-100 p-4">
        <h2 className="font-bold mb-4">Admin Panel</h2>
        <nav className="space-y-2">
          <Link
            href="/admin/homePage"
            className="flex items-center gap-2 p-2 hover:bg-gray-200 rounded"
          >
            <Package size={16} /> Quản lý sản phẩm
          </Link>
          <Link
            href="/admin/users"
            className="flex items-center gap-2 p-2 hover:bg-gray-200 rounded"
          >
            <Users size={16} /> Quản lý người dùng
          </Link>
          <Link
            href="/admin/orders"
            className="flex items-center gap-2 p-2 hover:bg-gray-200 rounded"
          >
            <ShoppingCart size={16} /> Quản lý đơn hàng
          </Link>
        </nav>
      </aside>
      <main className="flex-1 bg-gray-50 p-6">{children}</main>
    </div>
  );
}
