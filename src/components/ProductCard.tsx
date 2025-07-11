"use client";

import { useState } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Eye, ShoppingCart } from "lucide-react";
import Link from "next/link";
import ProductQuickView from "@/components/ProductQuickView";
import { Product } from "@/types/Product";

interface ProductCardProps {
  id: number;
  code?: string;
  name: string;
  price: number;
  image: string;
  soldOut?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  id,
  name,
  price,
  image,
  soldOut = false,
}) => {
  const [showQuickView, setShowQuickView] = useState(false);
  const product: Product = {
    id,
    name,
    price,
    image: [image],
    soldOut,
    quantity: 100, // hoặc giá trị giả định cho quick view
  };

  return (
    <>
      <Card className="flex flex-col h-full rounded-2xl overflow-hidden shadow hover:shadow-lg transition">
        {/* Image */}
        <div className="relative w-full h-[350px] overflow-hidden">
          <Image
            src={image}
            alt={name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
          {soldOut && (
            <div className="absolute top-2 right-2">
              <Badge className="bg-red-600 text-white">Tạm hết</Badge>
            </div>
          )}
        </div>

        {/* Content */}
        <CardContent className="pt-3 pb-1 px-3">
          <p className="text-sm text-green-700 font-medium">
            [{id}] {name}
          </p>
          <p className="text-base font-semibold text-red-600">
            {price.toLocaleString()}₫
          </p>
        </CardContent>

        {/* Actions */}
        <CardFooter className="flex justify-between gap-2 px-3 pb-3">
          <Button
            className="w-1/2 text-sm cursor-pointer"
            variant="default"
            onClick={() => setShowQuickView(true)}
            disabled={soldOut}
          >
            <ShoppingCart className="w-4 h-4 mr-1" />
            Mua nhanh
          </Button>

          <Link href={`/products/${id}`} className="w-1/2">
            <Button
              className="w-full text-sm cursor-pointer"
              variant="secondary"
            >
              <Eye className="w-4 h-4 mr-2" />
              Xem chi tiết
            </Button>
          </Link>
        </CardFooter>
      </Card>

      {/* Modal */}
      {showQuickView && (
        <ProductQuickView
          product={product}
          onClose={() => setShowQuickView(false)}
        />
      )}
    </>
  );
};
