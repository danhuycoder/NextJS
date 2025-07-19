// app/news/page.tsx
import Image from "next/image";
import Link from "next/link";

interface News {
  id: number;
  title: string;
  summary: string;
  date: string;
  image: string;
}

const newsList: News[] = [
  {
    id: 1,
    title: "Khuyến mãi lớn mùa hè",
    summary:
      "Chương trình giảm giá lên đến 50% cho các sản phẩm gia dụng trong tháng 7.",
    date: "2025-07-10",
    image: "/image/new1.jpg",
  },
  {
    id: 2,
    title: "Mẹo sử dụng nồi chiên không dầu",
    summary:
      "Những mẹo hay giúp bạn sử dụng nồi chiên không dầu hiệu quả và tiết kiệm thời gian.",
    date: "2025-07-15",
    image: "/image/new2.jpg",
  },
  {
    id: 3,
    title: "Top 5 máy xay sinh tố bán chạy",
    summary:
      "Danh sách 5 mẫu máy xay được ưa chuộng nhất hiện nay với giá tốt.",
    date: "2025-07-18",
    image: "/image/new3.jpg",
  },
];

export default function NewsPage() {
  return (
    <div className="bg-gray-50 min-h-screen py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Tin Tức Mới Nhất
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {newsList.map((news) => (
            <div
              key={news.id}
              className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden"
            >
              <div className="relative w-full h-48">
                <Image
                  src={news.image}
                  alt={news.title}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-t-xl"
                />
              </div>
              <div className="p-4">
                <p className="text-sm text-gray-400 mb-2">
                  {new Date(news.date).toLocaleDateString("vi-VN")}
                </p>
                <h2 className="text-lg font-semibold text-gray-800 mb-2">
                  {news.title}
                </h2>
                <p className="text-gray-600 text-sm mb-4">{news.summary}</p>
                <Link href={`/news/${news.id}`}>
                  <button className="text-white bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-lg text-sm transition">
                    Đọc thêm
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
