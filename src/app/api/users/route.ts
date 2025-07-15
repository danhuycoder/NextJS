import { NextResponse } from "next/server";

const user: {
  id: number;
  fullname: string;
  email: string;
  phone: string;
  password: string;
}[] = [
  {
    id: 1,
    fullname: "Nguyễn Tuấn Anh",
    email: "tuananh2392@gmail.com",
    phone: "0354697243",
    password: "123456",
  },
  {
    id: 2,
    fullname: "Trần Thị Mai",
    email: "maitran@example.com",
    phone: "0987654321",
    password: "password123",
  },
  {
    id: 3,
    fullname: "Lê Văn Hùng",
    email: "hunglv@example.com",
    phone: "0912345678",
    password: "12345678",
  },
  {
    id: 4,
    fullname: "Phạm Ngọc Lan",
    email: "lanpham@example.com",
    phone: "0909123456",
    password: "lan123456",
  },
  {
    id: 5,
    fullname: "Đỗ Minh Tuấn",
    email: "tuanminh@example.com",
    phone: "0938123456",
    password: "pass123",
  },
  {
    id: 6,
    fullname: "Hoàng Thị Thúy",
    email: "thuyhoang@example.com",
    phone: "0966123456",
    password: "hoangthuy",
  },
  {
    id: 7,
    fullname: "Bùi Văn An",
    email: "anbui@example.com",
    phone: "0977456123",
    password: "anpassword",
  },
  {
    id: 8,
    fullname: "Ngô Thanh Hằng",
    email: "hangngo@example.com",
    phone: "0988012345",
    password: "hang0988",
  },
  {
    id: 9,
    fullname: "Trịnh Quốc Bảo",
    email: "baoquoc@example.com",
    phone: "0911234567",
    password: "baosecure",
  },
  {
    id: 10,
    fullname: "Vũ Đức Mạnh",
    email: "manhvuduc@example.com",
    phone: "0321234567",
    password: "manhvu",
  },
];
export async function GET() {
  return NextResponse.json(user);
}
