"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

type User = {
  id: number;
  fullname: string;
  email: string;
  phone: string;
  password: string;
};

export default function AccountPage() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const [editData, setEditData] = useState<User | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  // Đổi mật khẩu
  const [isPasswordDialogOpen, setIsPasswordDialogOpen] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    const localUser = localStorage.getItem("user");
    if (localUser) {
      const parsed = JSON.parse(localUser);
      setUser(parsed);
      setEditData(parsed);
    }
    setLoading(false);
  }, []);

  const handleSave = () => {
    if (!editData) return;
    setUser(editData);
    localStorage.setItem("user", JSON.stringify(editData));
    setIsEditing(false);
    alert("✅ Cập nhật thông tin thành công!");
  };

  const handleChangePassword = () => {
    if (!user) return;
    if (oldPassword !== user.password) {
      alert("❌ Mật khẩu cũ không đúng!");
      return;
    }
    if (newPassword !== confirmPassword) {
      alert("❌ Mật khẩu mới không khớp!");
      return;
    }
    const updatedUser = { ...user, password: newPassword };
    setUser(updatedUser);
    localStorage.setItem("user", JSON.stringify(updatedUser));
    setIsPasswordDialogOpen(false);
    setOldPassword("");
    setNewPassword("");
    setConfirmPassword("");
    alert("✅ Đổi mật khẩu thành công!");
  };

  if (loading) return <p className="text-center p-4">Đang tải...</p>;

  if (!user) return <p className="text-center p-4">Bạn chưa đăng nhập!</p>;

  return (
    <div className="max-w-2xl mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">
            Thông tin tài khoản
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label>Họ và tên</Label>
            <Input
              value={editData?.fullname || ""}
              disabled={!isEditing}
              onChange={(e) =>
                setEditData((prev) =>
                  prev ? { ...prev, fullname: e.target.value } : prev
                )
              }
            />
          </div>
          <div>
            <Label>Email</Label>
            <Input
              type="email"
              value={editData?.email || ""}
              disabled={!isEditing}
              onChange={(e) =>
                setEditData((prev) =>
                  prev ? { ...prev, email: e.target.value } : prev
                )
              }
            />
          </div>
          <div>
            <Label>Số điện thoại</Label>
            <Input
              value={editData?.phone || ""}
              disabled={!isEditing}
              onChange={(e) =>
                setEditData((prev) =>
                  prev ? { ...prev, phone: e.target.value } : prev
                )
              }
            />
          </div>

          {/* Action Buttons */}
          {isEditing ? (
            <div className="flex gap-2">
              <Button className="cursor-pointer" onClick={handleSave}>
                Lưu thay đổi
              </Button>
              <Button
                variant="secondary"
                className="cursor-pointer"
                onClick={() => {
                  setEditData(user);
                  setIsEditing(false);
                }}
              >
                Hủy
              </Button>
            </div>
          ) : (
            <div className="flex gap-2">
              <Button
                className="cursor-pointer"
                onClick={() => setIsEditing(true)}
              >
                Chỉnh sửa
              </Button>
              <Button
                variant="outline"
                className="cursor-pointer"
                onClick={() => setIsPasswordDialogOpen(true)}
              >
                Đổi mật khẩu
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Dialog đổi mật khẩu */}
      <Dialog
        open={isPasswordDialogOpen}
        onOpenChange={setIsPasswordDialogOpen}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Đổi mật khẩu</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Mật khẩu cũ</Label>
              <Input
                type="password"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
              />
            </div>
            <div>
              <Label>Mật khẩu mới</Label>
              <Input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>
            <div>
              <Label>Nhập lại mật khẩu</Label>
              <Input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button className="cursor-pointer" onClick={handleChangePassword}>
              Lưu
            </Button>
            <Button
              variant="secondary"
              className="cursor-pointer"
              onClick={() => setIsPasswordDialogOpen(false)}
            >
              Hủy
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
