"use client";
import Image from "next/image";
import Link from "next/link";

interface Product {
  id: number;
  name: string;
  price: string;
  discountPrice: string;
  image: string;
  quantity?: number;
}

const promotions: Product[] = [
  {
    id: 1,
    name: "Bàn học chân gập 3D",
    price: "200.000đ",
    discountPrice: "190.000đ",
    image: "/image/banhoc.jpeg",
  },
  {
    id: 2,
    name: "Nồi cơm điện 2.2L GOSO",
    price: "332.800đ",
    discountPrice: "290.000đ",
    image: "/image/noicomdien.jpeg",
  },
  {
    id: 3,
    name: "Bình nấu nước GUGKDD 2.5L - ST29",
    price: "200.000đ",
    discountPrice: "160.000đ",
    image: "/image/amdunsieutoc.jpeg",
  },
];

export default function Promotions() {
  const addToCart = (product: Product) => {
    console.log("Thêm vào giỏ:", product);
    alert("🛒 Đã thêm vào giỏ hàng!");
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Banner */}
      <section className="bg-gradient-to-r from-red-500 to-yellow-400 text-white py-12 text-center">
        <h1 className="text-4xl font-bold mb-2">Siêu Khuyến Mãi Đồ Gia Dụng</h1>
        <p className="text-lg">Giảm giá lên tới 40% - Số lượng có hạn!</p>
        <Link href="#product-list">
          <button className="mt-6 px-6 py-3 bg-white text-red-600 rounded-full font-semibold shadow hover:bg-gray-100 transition">
            Mua ngay
          </button>
        </Link>
      </section>

      {/* Danh sách sản phẩm */}
      <section id="product-list" className="max-w-6xl mx-auto py-12 px-4">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Sản phẩm giảm giá
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {promotions.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl shadow hover:shadow-lg transition p-4"
            >
              <div className="relative w-full h-48">
                <Image
                  src={item.image}
                  alt={item.name}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-xl"
                />
              </div>
              <h3 className="mt-4 font-semibold text-gray-700">{item.name}</h3>
              <p className="line-through text-gray-400 text-sm">{item.price}</p>
              <p className="text-xl font-bold text-red-500">
                {item.discountPrice}
              </p>
              <button
                onClick={() => addToCart({ ...item, quantity: 1 })}
                className="mt-4 w-full bg-red-500 text-white py-2 rounded-xl font-medium hover:bg-red-600 transition"
              >
                Thêm vào giỏ
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
