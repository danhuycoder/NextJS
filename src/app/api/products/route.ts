import { NextResponse } from "next/server";
import { Product } from "@/types/Product"; // Import kiểu Product

export async function GET() {
  // Dữ liệu sản phẩm bạn muốn hiển thị
  const products: Product[] = [
    {
      id: 1,
      name: "Cây lau nhà",
      image: [
        "/image/caylaunha.jpeg",
        "/image/caylaunha1.jpeg",
        "/image/caylaunha2.jpeg",
      ] ,
      price: 120000,
      soldOut: false,
      quantity: 200,
    },
    {
      id: 2,
      name: "Rồng kèm bình cắm hoa",
      image: [
        "/image/binhcamhoa.jpeg", 
        "/image/binhcamhoa1.jpeg",
        "/image/binhcamhoa2.jpeg",  
      ],// Đảm bảo đường dẫn ảnh đúng
      price: 90000,
      soldOut: true,
      quantity: 0,
    },
    {
      id: 3,
      name: "Tô sứ họa tiết ngẫu nhiên",
      image: [
        "/image/tosu.jpeg",
        "/image/tosu1.jpeg",
        "/image/tosu2.jpeg",
      ], // Đảm bảo đường dẫn ảnh đúng
      price: 47000,
      soldOut: false,
      quantity: 30,
    },
    {
      id: 4,
      name: "Set ly bia 520ml ZB01-280",
      image: [
        "/image/setly520ml.jpeg",
        "/image/setly520ml1.jpeg",
        "/image/setly520ml2.jpeg",
      ], 
      price: 55000,
      soldOut: false,
      quantity: 20,
    },
    {
      id: 5,
      name: "Set ly bia 225ml XM066A",
      image: [
        "/image/setly225ml.jpeg",
        "/image/setly225ml1.jpeg",
        "/image/setly225ml2.jpeg",
        "/image/setly225ml3.jpeg",
      ], // Thêm ảnh minh họa nếu có
      price: 25800,
      soldOut: false,
      quantity: 29,
    },
    {
      id: 6,
      name: "Muỗng canh sứ",
      image: [
        "/image/muongcanhsu.jpeg",
        "/image/muongcanhsu1.jpeg",
        "/image/muongcanhsu2.jpeg",
        "/image/muongcanhsu3.jpeg",
      ], // Thêm ảnh minh họa nếu có
      price: 6700,
      soldOut: false,
      quantity: 90,
    },
    {
      id: 7,
      name: "Nồi sứ có nắp đậy 10.5 inch",
      image: [
        "/image/noisu.jpeg",
        "/image/noisu1.jpeg",
        "/image/noisu2.jpeg",
        "/image/noisu3.jpeg"
      ], // Thêm ảnh minh họa nếu có
      price: 87000,
      soldOut: false,
      quantity: 70,
    },
    {
      id: 8,
      name: "Set 6 ly thuỷ tinh có quai 200ml DM254-3",
      image: [
        "/image/lythuytinhcoquai.jpeg",
        "/image/lythuytinhcoquai1.jpeg",
        "/image/lythuytinhcoquai2.jpeg",
        "/image/lythuytinhcoquai3.jpeg"
      ], // Thêm ảnh minh họa nếu có
      price: 46200,
      soldOut: false,
      quantity: 50,
    },
    {
      id: 9,
      name: "Thùng 20 khăn giấy nội địa Trung (Thùng Xanh) cao cấp, đa năng",
      image: [
        "/image/khangiay.jpeg",
        "/image/khangiay1.jpeg",
        "/image/khangiay2.jpeg",
        "/image/khangiay3.jpeg"
      ], // Thêm ảnh minh họa nếu có
      price: 127000,
      soldOut: false,
      quantity: 70,
    },
    {
      id: 10,
      name: "Set 5 gói giấy ăn LABUBU TO",
      image: [
        "/image/giayan.jpeg",
        "/image/giayan1.jpeg",
        "/image/giayan2.jpeg"
      ], // Thêm ảnh minh họa nếu có
      price: 63000,
      soldOut: false,
      quantity: 21,
    },
    {
      id: 11,
      name: "Túi 10 gói khăn ướt tự tan",
      image: [
        "/image/giayuottutan.jpeg",
        "/image/giayuottutan2.jpeg",
        "/image/giayuottutan3.jpeg"
      ], 
      price: 31000,
      soldOut: false,
      quantity: 12,
    },
    {
      id: 12,
      name: "Tựa lưng văn phòng hoạt hình",
      image: [
        "/image/tualung.jpeg",
        "/image/tualung1.jpeg",
        "/image/tualung2.jpeg"
      ], 
      price: 63000,
      soldOut: false,
      quantity: 23,
    },
    {
    id: 13,
    name: " Bàn học chân gập 3D",
    image: [
      "/image/banhoc.jpeg",
    ],
    price: 200000,
    soldOut: false,
    quantity: 23,
  },
  {
    id: 14,
    name: "Nồi cơm điện 2.2L GOSO",
    price: 332800,
    image: ["/image/noicomdien.jpeg"],
    soldOut: false,
    quantity: 23,
  },
  {
    id: 15,
    name: "Bình nấu nước GUGKDD 2.5L - ST29",
    price: 200000,
    image: ["/image/amdunsieutoc.jpeg"],
    soldOut: false,
    quantity: 13,
  },
  ];

  // Trả về dữ liệu JSON
  return NextResponse.json(products);
}