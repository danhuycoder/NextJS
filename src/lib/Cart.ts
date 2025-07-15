import { Product } from "@/types/Product";

// ✅ Cho phép truyền quantity linh hoạt
export function addToCart(product: Omit<Product, "quantity"> & { quantity: number }) {
  const cart: Product[] = JSON.parse(localStorage.getItem("cart") || "[]");

  const existing = cart.find((item) => item.id === product.id);

  if (existing) {
    existing.quantity += product.quantity; // ✅ tăng theo số lượng truyền vào
  } else {
    cart.push({ ...product });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  window.dispatchEvent(new Event("cart-update"));
}

// ✅ Lấy tổng số lượng trong giỏ
export function getCartCount(): number {
  const cart: Product[] = JSON.parse(localStorage.getItem("cart") || "[]");
  return cart.reduce((total, item) => total + item.quantity, 0);
}
