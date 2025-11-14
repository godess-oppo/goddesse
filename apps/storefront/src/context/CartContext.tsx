"use client";
import { createContext, useContext, useState } from "react";
import { CartItem, Product } from "@/types";

type CartContextType = {
  cart: CartItem[];
  addToCart: (p: Product) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, qty: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (p: Product) => setCart(prev => {
    const exists = prev.find(i => i.id === p.id);
    return exists ? prev.map(i => i.id === p.id ? { ...i, quantity: i.quantity + 1 } : i) : [...prev, { ...p, quantity: 1 }];
  });

  const removeFromCart = (id: string) => setCart(prev => prev.filter(i => i.id !== id));
  const updateQuantity = (id: string, qty: number) => qty <= 0 ? removeFromCart(id) : setCart(prev => prev.map(i => i.id === id ? { ...i, quantity: qty } : i));
  const clearCart = () => setCart([]);
  const getCartTotal = () => cart.reduce((s, i) => s + i.price * i.quantity, 0);

  return <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart, getCartTotal }}>{children}</CartContext.Provider>;
}

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
};
