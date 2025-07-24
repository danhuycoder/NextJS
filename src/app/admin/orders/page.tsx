"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Edit, Trash2, Search, Eye, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type ProductItem = {
  name: string;
  quantity: number;
  price: number;
};

type Order = {
  id: number;
  fullname: string;
  phone: string;
  address: string;
  products: ProductItem[];
  total: number;
  status: string;
};

type StatusFilter = "all" | "Chờ xử lý" | "Đang giao" | "Đã giao";

export default function OrderAdminPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");

  const [editOrder, setEditOrder] = useState<Order | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState<boolean>(false);

  const [detailOrder, setDetailOrder] = useState<Order | null>(null);
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState<boolean>(false);

  // Fetch dữ liệu đơn hàng
  useEffect(() => {
    async function fetchOrders() {
      try {
        const res = await fetch("/api/orders", { cache: "no-store" });
        const data: Order[] = await res.json();
        setOrders(data);
      } catch (error) {
        console.error("Lỗi tải đơn hàng:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchOrders();
  }, []);

  // Lọc đơn hàng
  const filteredOrders = orders.filter((order) => {
    const matchesSearch = order.fullname
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Xóa đơn hàng
  const handleDeleteOrder = (id: number) => {
    if (confirm("Bạn có chắc muốn xóa đơn hàng này?")) {
      setOrders((prev) => prev.filter((o) => o.id !== id));
    }
  };

  // Chỉnh sửa đơn hàng
  const handleEditOrder = (order: Order) => {
    setEditOrder(order);
    setIsEditDialogOpen(true);
  };

  const handleSaveEdit = () => {
    if (editOrder) {
      setOrders((prev) =>
        prev.map((o) => (o.id === editOrder.id ? editOrder : o))
      );
      setIsEditDialogOpen(false);
      setEditOrder(null);
    }
  };

  // Xem chi tiết đơn hàng
  const handleViewDetail = (order: Order) => {
    setDetailOrder(order);
    setIsDetailDialogOpen(true);
  };

  if (loading) return <p className="p-4 text-center">Đang tải đơn hàng...</p>;

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">Quản lý đơn hàng</h1>

      {/* Thanh tìm kiếm + bộ lọc trạng thái */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="relative w-full md:w-1/3">
          <Search className="absolute left-2 top-2.5 text-gray-400" size={18} />
          <Input
            placeholder="Tìm kiếm đơn hàng..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter className="text-gray-500" size={18} />
          <Select
            value={statusFilter}
            onValueChange={(val: StatusFilter) => setStatusFilter(val)}
          >
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Lọc trạng thái" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tất cả</SelectItem>
              <SelectItem value="Chờ xử lý">Chờ xử lý</SelectItem>
              <SelectItem value="Đang giao">Đang giao</SelectItem>
              <SelectItem value="Đã giao">Đã giao</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Bảng đơn hàng */}
      <Card>
        <CardHeader>
          <CardTitle>Danh sách đơn hàng</CardTitle>
        </CardHeader>
        <CardContent className="p-4">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b text-left">
                <th className="p-2">ID</th>
                <th className="p-2">Khách hàng</th>
                <th className="p-2">SĐT</th>
                <th className="p-2">Địa chỉ</th>
                <th className="p-2">Tổng tiền</th>
                <th className="p-2">Trạng thái</th>
                <th className="p-2 text-center">Hành động</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order) => (
                <tr key={order.id} className="border-b hover:bg-gray-50">
                  <td className="p-2">{order.id}</td>
                  <td className="p-2">{order.fullname}</td>
                  <td className="p-2">{order.phone}</td>
                  <td className="p-2">{order.address}</td>
                  <td className="p-2 text-red-500 font-semibold">
                    {order.total.toLocaleString()}₫
                  </td>
                  <td className="p-2">{order.status}</td>
                  <td className="p-2 flex justify-center gap-2">
                    <Button
                      variant="secondary"
                      size="icon"
                      className="cursor-pointer"
                      onClick={() => handleViewDetail(order)}
                    >
                      <Eye size={16} />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      className="cursor-pointer"
                      onClick={() => handleEditOrder(order)}
                    >
                      <Edit size={16} />
                    </Button>
                    <Button
                      variant="destructive"
                      size="icon"
                      className="cursor-pointer"
                      onClick={() => handleDeleteOrder(order.id)}
                    >
                      <Trash2 size={16} />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>

      {/* Dialog chỉnh sửa */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Chỉnh sửa đơn hàng</DialogTitle>
          </DialogHeader>
          {editOrder && (
            <div className="space-y-4">
              <div>
                <Label>Khách hàng</Label>
                <Input value={editOrder.fullname} readOnly />
              </div>
              <div>
                <Label>Trạng thái</Label>
                <Select
                  value={editOrder.status}
                  onValueChange={(val) =>
                    setEditOrder({ ...editOrder, status: val })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn trạng thái" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Chờ xử lý">Chờ xử lý</SelectItem>
                    <SelectItem value="Đang giao">Đang giao</SelectItem>
                    <SelectItem value="Đã giao">Đã giao</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button className="cursor-pointer" onClick={handleSaveEdit}>
              Lưu
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialog chi tiết đơn hàng */}
      <Dialog open={isDetailDialogOpen} onOpenChange={setIsDetailDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Chi tiết đơn hàng</DialogTitle>
          </DialogHeader>
          {detailOrder && (
            <div className="space-y-4">
              <div>
                <p>
                  <strong>Khách hàng:</strong> {detailOrder.fullname}
                </p>
                <p>
                  <strong>Địa chỉ:</strong> {detailOrder.address}
                </p>
                <p>
                  <strong>SĐT:</strong> {detailOrder.phone}
                </p>
                <p>
                  <strong>Trạng thái:</strong> {detailOrder.status}
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Sản phẩm:</h3>
                <table className="w-full border-collapse text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="p-2">Tên</th>
                      <th className="p-2">SL</th>
                      <th className="p-2">Giá</th>
                    </tr>
                  </thead>
                  <tbody>
                    {detailOrder.products.map((prod, index) => (
                      <tr key={index} className="border-b">
                        <td className="p-2">{prod.name}</td>
                        <td className="p-2">{prod.quantity}</td>
                        <td className="p-2">{prod.price.toLocaleString()}₫</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="font-semibold text-right text-red-500">
                Tổng: {detailOrder.total.toLocaleString()}₫
              </p>
            </div>
          )}
          <DialogFooter>
            <Button
              className="cursor-pointer"
              onClick={() => setIsDetailDialogOpen(false)}
            >
              Đóng
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
