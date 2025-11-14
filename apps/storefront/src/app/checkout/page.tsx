"use client";
import { useCart } from "@/context/CartContext";
import { useRouter } from "next/navigation";

export default function Checkout() {
  const { getCartTotal, clearCart } = useCart();
  const router = useRouter();

  const handlePay = () => {
    alert("Payment successful!");
    clearCart();
    router.push("/");
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-md">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>
      <div className="border p-6 rounded">
        <p className="text-xl mb-4">Total: ${getCartTotal().toFixed(2)}</p>
        <button onClick={handlePay} className="w-full bg-green-600 text-white py-3 rounded">
          Pay Now
        </button>
      </div>
    </div>
  );
}
