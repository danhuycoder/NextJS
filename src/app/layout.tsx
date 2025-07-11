import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroBanner from "@/components/Banner";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Giadungnhanh.com",
  description: "Trang web bán đồ gia dụng",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi">
      <body className={inter.className}>
        <Header />
        <HeroBanner />
        {children}
        <Footer />
      </body>
    </html>
  );
}
