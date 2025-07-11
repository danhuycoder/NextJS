"use client";

import { Button } from "@/components/ui/button";
import { Minus, Plus } from "lucide-react";
import { useState } from "react";

export default function QuantitySelector() {
  const [quantity, setQuantity] = useState(1);

  const increase = () => setQuantity((q) => q + 1);
  const decrease = () => setQuantity((q) => (q > 1 ? q - 1 : 1));

  return (
    <div className="flex items-center gap-4">
      <Button variant="outline" onClick={decrease}>
        <Minus size={16} />
      </Button>
      <span className="min-w-[32px] text-center text-lg">{quantity}</span>
      <Button variant="outline" onClick={increase}>
        <Plus size={16} />
      </Button>
    </div>
  );
}
