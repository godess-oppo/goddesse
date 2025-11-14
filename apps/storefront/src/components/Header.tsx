"use client";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { ShoppingCart } from "lucide-react";

export default function Header() {
  const { cart } = useCart();
  const count = cart.reduce((s, i) => s + i.quantity, 0);

  return (
    <header className="bg-white border-b sticky top-0 z-50">
      <div className="container mx-auto px-4 flex justify-between items-center h-16">
        <Link href="/" className="text-2xl font-bold text-blue-600">E-Shop</Link>
        <nav className="hidden md:flex gap-6">
          <Link href="/shop">Shop</Link>
          <Link href="/account">Account</Link>
          <Link href="/admin">Admin</Link>
        </nav>
        <Link href="/cart" className="relative">
          <ShoppingCart />
          {count > 0 && <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">{count}</span>}
        </Link>
      </div>
    </header>
  );
}
