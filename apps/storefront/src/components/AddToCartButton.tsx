"use client";
import { useCart } from "@/context/CartContext";
import { ShoppingCart } from "lucide-react";
import { Product } from "@/types";

export default function AddToCartButton({ product, size = "default" }: { product: Product; size?: "sm" | "default" }) {
  const { addToCart } = useCart();
  return (
    <button onClick={() => addToCart(product)} className={`bg-blue-600 text-white rounded px-${size === "sm" ? "2" : "4"} py-1 text-${size === "sm" ? "xs" : "sm"} flex items-center gap-1`}>
      <ShoppingCart className={size === "sm" ? "w-3 h-3" : "w-4 h-4"} />
      {size === "default" && "Add"}
    </button>
  );
}
