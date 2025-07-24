"use client";

import { useEffect, useState, ChangeEvent } from "react";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Edit,
  Trash2,
  Plus,
  Package,
  AlertTriangle,
  Boxes,
  X,
  Search,
  Filter,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Product = {
  id: number;
  name: string;
  image: string[];
  price: number;
  soldOut: boolean;
  quantity: number;
};

type FilterType = "all" | "inStock" | "outOfStock";

export default function AdminPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const [searchTerm, setSearchTerm] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<FilterType>("all");

  const [editProduct, setEditProduct] = useState<Product | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState<boolean>(false);

  const [isAddDialogOpen, setIsAddDialogOpen] = useState<boolean>(false);
  const [newProduct, setNewProduct] = useState<Product>({
    id: 0,
    name: "",
    image: [],
    price: 0,
    soldOut: false,
    quantity: 0,
  });

  // Fetch dữ liệu từ API
  useEffect(() => {
    async function fetchProducts() {
      const res = await fetch("/api/products");
      const data: Product[] = await res.json();
      setProducts(data);
      setLoading(false);
    }
    fetchProducts();
  }, []);

  const handleDelete = (id: number) => {
    if (confirm("Bạn có chắc muốn xóa sản phẩm này?")) {
      setProducts((prev) => prev.filter((p) => p.id !== id));
    }
  };

  const handleEdit = (product: Product) => {
    setEditProduct(product);
    setIsEditDialogOpen(true);
  };

  const handleSaveEdit = () => {
    if (editProduct) {
      const updatedProduct: Product = {
        ...editProduct,
        soldOut: editProduct.quantity === 0,
      };
      setProducts((prev) =>
        prev.map((p) => (p.id === updatedProduct.id ? updatedProduct : p))
      );
      setIsEditDialogOpen(false);
      setEditProduct(null);
    }
  };

  const handleAddProduct = () => {
    const productToAdd: Product = {
      ...newProduct,
      id: products.length > 0 ? Math.max(...products.map((p) => p.id)) + 1 : 1,
      soldOut: newProduct.quantity === 0,
    };
    setProducts((prev) => [...prev, productToAdd]);
    setIsAddDialogOpen(false);
    setNewProduct({
      id: 0,
      name: "",
      image: [],
      price: 0,
      soldOut: false,
      quantity: 0,
    });
  };

  // Upload ảnh cho sản phẩm mới
  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      const newImages = filesArray.map((file) => URL.createObjectURL(file));
      setNewProduct((prev) => ({
        ...prev,
        image: [...prev.image, ...newImages],
      }));
    }
  };

  const removeNewProductImage = (index: number) => {
    setNewProduct((prev) => {
      const updatedImages = [...prev.image];
      updatedImages.splice(index, 1);
      return { ...prev, image: updatedImages };
    });
  };

  // Upload ảnh cho sản phẩm chỉnh sửa
  const handleEditImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && editProduct) {
      const filesArray = Array.from(e.target.files);
      const newImages = filesArray.map((file) => URL.createObjectURL(file));
      setEditProduct({
        ...editProduct,
        image: [...editProduct.image, ...newImages],
      });
    }
  };

  const removeEditProductImage = (index: number) => {
    if (!editProduct) return;
    const updatedImages = [...editProduct.image];
    updatedImages.splice(index, 1);
    setEditProduct({ ...editProduct, image: updatedImages });
  };

  // Lọc sản phẩm theo tên và trạng thái
  const filteredProducts = products.filter((p) => {
    const matchesSearch = p.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" ||
      (statusFilter === "inStock" && !p.soldOut) ||
      (statusFilter === "outOfStock" && p.soldOut);
    return matchesSearch && matchesStatus;
  });

  if (loading) return <p className="p-4 text-center">Đang tải sản phẩm...</p>;

  const totalProducts = filteredProducts.length;
  const outOfStock = filteredProducts.filter((p) => p.soldOut).length;
  const totalStock = filteredProducts.reduce((sum, p) => sum + p.quantity, 0);

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">Admin Dashboard</h1>

      {/* Search và Filter */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="relative w-full md:w-1/3">
          <Search className="absolute left-2 top-2.5 text-gray-400" size={18} />
          <Input
            placeholder="Tìm kiếm sản phẩm..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter className="text-gray-500" size={18} />
          <Select
            value={statusFilter}
            onValueChange={(val: FilterType) => setStatusFilter(val)}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Lọc trạng thái" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tất cả</SelectItem>
              <SelectItem value="inStock">Còn hàng</SelectItem>
              <SelectItem value="outOfStock">Hết hàng</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="shadow">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg">Tổng sản phẩm</CardTitle>
            <Package className="text-blue-500" />
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{totalProducts}</p>
          </CardContent>
        </Card>
        <Card className="shadow">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg">Hết hàng</CardTitle>
            <AlertTriangle className="text-red-500" />
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{outOfStock}</p>
          </CardContent>
        </Card>
        <Card className="shadow">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg">Tổng tồn kho</CardTitle>
            <Boxes className="text-green-500" />
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{totalStock}</p>
          </CardContent>
        </Card>
      </div>

      {/* Bảng sản phẩm */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Danh sách sản phẩm</h2>
            <Button
              className="flex items-center gap-2 cursor-pointer"
              onClick={() => setIsAddDialogOpen(true)}
            >
              <Plus size={18} /> Thêm sản phẩm
            </Button>
          </div>
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b text-left">
                <th className="p-2">ID</th>
                <th className="p-2">Tên</th>
                <th className="p-2">Ảnh</th>
                <th className="p-2">Giá</th>
                <th className="p-2">Tồn kho</th>
                <th className="p-2">Trạng thái</th>
                <th className="p-2 text-center">Hành động</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((p) => (
                <tr key={p.id} className="border-b hover:bg-gray-50">
                  <td className="p-2">{p.id}</td>
                  <td className="p-2">{p.name}</td>
                  <td className="p-2">
                    {p.image && p.image[0] && (
                      <Image
                        src={p.image[0]}
                        alt={p.name}
                        width={48}
                        height={48}
                        className="object-cover rounded"
                      />
                    )}
                  </td>
                  <td className="p-2">{p.price.toLocaleString()}₫</td>
                  <td className="p-2">{p.quantity}</td>
                  <td className="p-2">
                    {p.soldOut ? (
                      <span className="text-red-500 font-medium">Hết hàng</span>
                    ) : (
                      <span className="text-green-500 font-medium">
                        Còn hàng
                      </span>
                    )}
                  </td>
                  <td className="p-2 flex justify-center gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      className="cursor-pointer"
                      onClick={() => handleEdit(p)}
                    >
                      <Edit size={16} />
                    </Button>
                    <Button
                      variant="destructive"
                      size="icon"
                      className="cursor-pointer"
                      onClick={() => handleDelete(p.id)}
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

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Chỉnh sửa sản phẩm</DialogTitle>
          </DialogHeader>
          {editProduct && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Tên sản phẩm</Label>
                <Input
                  id="name"
                  value={editProduct.name}
                  onChange={(e) =>
                    setEditProduct({ ...editProduct, name: e.target.value })
                  }
                />
              </div>
              <div>
                <Label htmlFor="price">Giá</Label>
                <Input
                  id="price"
                  type="number"
                  value={editProduct.price}
                  onChange={(e) =>
                    setEditProduct({
                      ...editProduct,
                      price: parseInt(e.target.value) || 0,
                    })
                  }
                />
              </div>
              <div>
                <Label htmlFor="quantity">Tồn kho</Label>
                <Input
                  id="quantity"
                  type="number"
                  value={editProduct.quantity}
                  onChange={(e) => {
                    const newQuantity = parseInt(e.target.value) || 0;
                    setEditProduct({
                      ...editProduct,
                      quantity: newQuantity,
                      soldOut: newQuantity === 0,
                    });
                  }}
                />
              </div>
              <div>
                <Label>Hình ảnh sản phẩm</Label>
                <Input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleEditImageUpload}
                />
                <div className="flex flex-wrap gap-2 mt-2">
                  {editProduct.image.map((img, index) => (
                    <div key={index} className="relative w-16 h-16">
                      <Image
                        src={img}
                        alt="Preview"
                        width={64}
                        height={64}
                        className="object-cover rounded"
                      />
                      <button
                        type="button"
                        className="absolute top-0 right-0 bg-red-600 text-white p-0.5 rounded-full cursor-pointer"
                        onClick={() => removeEditProductImage(index)}
                      >
                        <X size={12} />
                      </button>
                    </div>
                  ))}
                </div>
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

      {/* Add Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Thêm sản phẩm</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="new-name">Tên sản phẩm</Label>
              <Input
                id="new-name"
                value={newProduct.name}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, name: e.target.value })
                }
              />
            </div>
            <div>
              <Label htmlFor="new-price">Giá</Label>
              <Input
                id="new-price"
                type="number"
                value={newProduct.price}
                onChange={(e) =>
                  setNewProduct({
                    ...newProduct,
                    price: parseInt(e.target.value) || 0,
                  })
                }
              />
            </div>
            <div>
              <Label htmlFor="new-quantity">Tồn kho</Label>
              <Input
                id="new-quantity"
                type="number"
                value={newProduct.quantity}
                onChange={(e) => {
                  const qty = parseInt(e.target.value) || 0;
                  setNewProduct({
                    ...newProduct,
                    quantity: qty,
                    soldOut: qty === 0,
                  });
                }}
              />
            </div>
            <div>
              <Label>Hình ảnh sản phẩm</Label>
              <Input
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageUpload}
              />
              <div className="flex flex-wrap gap-2 mt-2">
                {newProduct.image.map((img, index) => (
                  <div key={index} className="relative w-16 h-16">
                    <Image
                      src={img}
                      alt="Preview"
                      width={64}
                      height={64}
                      className="object-cover rounded"
                    />
                    <button
                      type="button"
                      className="absolute top-0 right-0 bg-red-600 text-white p-0.5 rounded-full cursor-pointer"
                      onClick={() => removeNewProductImage(index)}
                    >
                      <X size={12} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button className="cursor-pointer" onClick={handleAddProduct}>
              Thêm
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
