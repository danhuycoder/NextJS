"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Edit, Trash2, Plus, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

type User = {
  id: number;
  fullname: string;
  email: string;
  phone: string;
  password: string;
};

export default function UserAdminPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editUser, setEditUser] = useState<User | null>(null);
  const [newUser, setNewUser] = useState<User>({
    id: 0,
    fullname: "",
    email: "",
    phone: "",
    password: "",
  });

  useEffect(() => {
    async function fetchUsers() {
      const res = await fetch("/api/users");
      const data: User[] = await res.json();
      setUsers(data);
      setLoading(false);
    }
    fetchUsers();
  }, []);

  const filteredUsers = users.filter(
    (u) =>
      u.fullname.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddUser = () => {
    const userToAdd = {
      ...newUser,
      id: users.length > 0 ? Math.max(...users.map((u) => u.id)) + 1 : 1,
    };
    setUsers((prev) => [...prev, userToAdd]);
    setIsAddDialogOpen(false);
    setNewUser({ id: 0, fullname: "", email: "", phone: "", password: "" });
  };

  const handleEditUser = (user: User) => {
    setEditUser(user);
    setIsEditDialogOpen(true);
  };

  const handleSaveEdit = () => {
    if (editUser) {
      setUsers((prev) =>
        prev.map((u) => (u.id === editUser.id ? editUser : u))
      );
      setIsEditDialogOpen(false);
      setEditUser(null);
    }
  };

  const handleDeleteUser = (id: number) => {
    if (confirm("Bạn có chắc muốn xóa người dùng này?")) {
      setUsers((prev) => prev.filter((u) => u.id !== id));
    }
  };

  if (loading) return <p className="text-center p-4">Đang tải...</p>;

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Quản lý Người dùng</h1>

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="relative w-full md:w-1/3">
          <Search className="absolute left-2 top-2.5 text-gray-400" size={18} />
          <Input
            placeholder="Tìm kiếm người dùng..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button
          className="cursor-pointer"
          onClick={() => setIsAddDialogOpen(true)}
        >
          <Plus size={18} className="mr-2" /> Thêm người dùng
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Danh sách người dùng</CardTitle>
        </CardHeader>
        <CardContent>
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b">
                <th className="p-2 text-left">ID</th>
                <th className="p-2 text-left">Họ tên</th>
                <th className="p-2 text-left">Email</th>
                <th className="p-2 text-left">SĐT</th>
                <th className="p-2 text-left">Mật khẩu</th>
                <th className="p-2 text-center">Hành động</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((u) => (
                <tr key={u.id} className="border-b hover:bg-gray-50">
                  <td className="p-2">{u.id}</td>
                  <td className="p-2">{u.fullname}</td>
                  <td className="p-2">{u.email}</td>
                  <td className="p-2">{u.phone}</td>
                  <td className="p-2">{u.password}</td>
                  <td className="p-2 flex justify-center gap-2">
                    <Button
                      size="icon"
                      variant="outline"
                      className="cursor-pointer"
                      onClick={() => handleEditUser(u)}
                    >
                      <Edit size={16} />
                    </Button>
                    <Button
                      size="icon"
                      variant="destructive"
                      className="cursor-pointer"
                      onClick={() => handleDeleteUser(u.id)}
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

      {/* Dialog Sửa */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Sửa người dùng</DialogTitle>
          </DialogHeader>
          {editUser && (
            <div className="space-y-4">
              <div>
                <Label>Họ và tên</Label>
                <Input
                  value={editUser.fullname}
                  onChange={(e) =>
                    setEditUser({ ...editUser, fullname: e.target.value })
                  }
                />
              </div>
              <div>
                <Label>Email</Label>
                <Input
                  value={editUser.email}
                  onChange={(e) =>
                    setEditUser({ ...editUser, email: e.target.value })
                  }
                />
              </div>
              <div>
                <Label>SĐT</Label>
                <Input
                  value={editUser.phone}
                  onChange={(e) =>
                    setEditUser({ ...editUser, phone: e.target.value })
                  }
                />
              </div>
              <div>
                <Label>Mật khẩu</Label>
                <Input
                  value={editUser.password}
                  type="password"
                  onChange={(e) =>
                    setEditUser({ ...editUser, password: e.target.value })
                  }
                />
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

      {/* Dialog Thêm */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Thêm người dùng</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Họ và tên</Label>
              <Input
                value={newUser.fullname}
                onChange={(e) =>
                  setNewUser({ ...newUser, fullname: e.target.value })
                }
              />
            </div>
            <div>
              <Label>Email</Label>
              <Input
                value={newUser.email}
                onChange={(e) =>
                  setNewUser({ ...newUser, email: e.target.value })
                }
              />
            </div>
            <div>
              <Label>SĐT</Label>
              <Input
                value={newUser.phone}
                onChange={(e) =>
                  setNewUser({ ...newUser, phone: e.target.value })
                }
              />
            </div>
            <div>
              <Label>Mật khẩu</Label>
              <Input
                type="password"
                value={newUser.password}
                onChange={(e) =>
                  setNewUser({ ...newUser, password: e.target.value })
                }
              />
            </div>
          </div>
          <DialogFooter>
            <Button className="cursor-pointer" onClick={handleAddUser}>
              Thêm
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
