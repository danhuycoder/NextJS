"use client";

import { useEffect, useState } from "react";
import { ProductCard } from "@/components/ProductCard"; //
import { Product } from "@/types/Product";

export default function ProductList() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("/api/products");
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.error("Lỗi khi tải sản phẩm:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 p-6">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            id={product.id}
            name={product.name}
            price={product.price}
            image={product.image[0]}
            soldOut={product.soldOut}
          />
        ))}
      </div>
    </>
  );
}
