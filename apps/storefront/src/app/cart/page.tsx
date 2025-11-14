"use client";
import { useCart } from "@/context/CartContext";
import Link from "next/link";

export default function Cart() {
  const { cart, removeFromCart, updateQuantity, getCartTotal } = useCart();

  if (cart.length === 0) {
    return (
      <div className="text-center py-16">
        <h1 className="text-3xl font-bold mb-4">Cart Empty</h1>
        <Link href="/shop" className="bg-blue-600 text-white px-6 py-3 rounded">Shop Now</Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Your Cart</h1>
      {cart.map(item => (
        <div key={item.id} className="border p-4 mb-4 flex justify-between items-center">
          <div>
            <h3 className="font-semibold">{item.name}</h3>
            <p>${item.price} × {item.quantity}</p>
          </div>
          <div className="flex gap-2">
            <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
            <span>{item.quantity}</span>
            <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
            <button onClick={() => removeFromCart(item.id)} className="text-red-500">Remove</button>
          </div>
        </div>
      ))}
      <p className="text-xl font-bold">Total: ${getCartTotal().toFixed(2)}</p>
      <Link href="/checkout" className="block mt-4 bg-green-600 text-white text-center py-3 rounded">Checkout</Link>
    </div>
  );
}
