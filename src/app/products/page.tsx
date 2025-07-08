// app/products/page.tsx
import { ProductCard } from "@/components/ProductCard";

const products = [
  { name: "Ấm siêu tốc", price: 290000, image: "/products/am.jpg" },
  { name: "Máy xay sinh tố", price: 490000, image: "/products/mayxay.jpg" },
  { name: "Bếp hồng ngoại", price: 720000, image: "/products/bep.jpg" },
];

export default function ProductPage() {
  return (
    <main className="p-6">
      <h1 className="text-3xl font-bold mb-6">Sản phẩm</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map((p, i) => (
          <ProductCard key={i} {...p} />
        ))}
      </div>
    </main>
  );
}
