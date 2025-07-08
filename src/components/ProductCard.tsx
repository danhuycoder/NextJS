// components/ProductCard.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";

type Product = {
  name: string;
  price: number;
  image: string;
};

export function ProductCard({ name, price, image }: Product) {
  return (
    <Card className="w-full max-w-xs shadow-lg hover:scale-105 transition-transform">
      <CardHeader className="p-0">
        <Image
          src={image}
          alt={name}
          width={400}
          height={300}
          className="rounded-t-md object-cover"
        />
      </CardHeader>
      <CardContent className="p-4 space-y-2">
        <CardTitle className="text-lg">{name}</CardTitle>
        <p className="text-blue-600 font-semibold">{price.toLocaleString()}₫</p>
        <Button className="w-full">Thêm vào giỏ</Button>
      </CardContent>
    </Card>
  );
}
