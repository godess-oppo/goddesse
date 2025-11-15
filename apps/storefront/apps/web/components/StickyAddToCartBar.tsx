// StickyAddToCartBar.tsx
import React, { useState } from "react";

export interface ProductInfo {
  id: string;
  name: string;
  price: number;
  imageUrl?: string;
}

interface StickyAddToCartBarProps {
  product: ProductInfo;
  initialQuantity?: number;
  // Placeholder GraphQL mutation – replace with your client hook.
  addToCartMutation: (productId: string, quantity: number) => Promise<void>;
}

/**
 * Bottom‑fixed bar that shows product summary, quantity selector,
 * and triggers a GraphQL add‑to‑cart mutation. Updates in real time.
 */
export const StickyAddToCartBar: React.FC<StickyAddToCartBarProps> = ({
  product,
  initialQuantity = 1,
  addToCartMutation,
}) => {
  const [qty, setQty] = useState<number>(initialQuantity);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const inc = () => setQty((q) => Math.min(q + 1, 99));
  const dec = () => setQty((q) => Math.max(q - 1, 1));

  const handleAdd = async () => {
    try {
      setLoading(true);
      setSuccess(false);
      await addToCartMutation(product.id, qty);
      setSuccess(true);
      // auto‑clear success state after 2 s
      setTimeout(() => setSuccess(false), 2000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-neutral-200 shadow-lg z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Product snapshot */}
        <div className="flex items-center space-x-4">
          {product.imageUrl && (
            <img
              src={product.imageUrl}
              alt={product.name}
              className="h-16 w-16 rounded object-cover"
            />
          )}
          <div>
            <h4 className="font-semibold text-neutral-900">{product.name}</h4>
            <p className="text-brand-600 font-bold">${product.price.toFixed(2)}</p>
          </div>
        </div>

        {/* Qty controls */}
        <div className="flex items-center space-x-2">
          <button
            onClick={dec}
            className="h-9 w-9 flex items-center justify-center rounded-full border border-neutral-300 hover:bg-neutral-100"
            aria-label="Decrease quantity"
          >
            <svg className="h-5 w-5 text-neutral-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
            </svg>
          </button>
          <input
            type="number"
            min={1}
            max={99}
            value={qty}
            onChange={(e) => {
              const val = parseInt(e.target.value || "1", 10);
              setQty(Number.isNaN(val) ? 1 : Math.min(99, Math.max(1, val)));
            }}
            className="h-9 w-16 text-center border border-neutral-300 rounded focus:outline-none focus:ring-2 focus:ring-brand-400"
          />
          <button
            onClick={inc}
            className="h-9 w-9 flex items-center justify-center rounded-full border border-neutral-300 hover:bg-neutral-100"
            aria-label="Increase quantity"
          >
            <svg className="h-5 w-5 text-neutral-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          </button>
        </div>

        {/* Add to Cart button */}
        <button
          onClick={handleAdd}
          disabled={loading}
          className={`bg-brand-600 hover:bg-brand-700 disabled:opacity-50 text-white px-6 py-3 rounded-md font-semibold flex items-center space-x-2`}
        >
          {loading ? (
            <>
              <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
              </svg>
              <span>Adding...</span>
            </>
          ) : success ? (
            <>
              <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-7.071 7.071a1 1 0 01-1.414 0L3.293 9.95a1 1 0 011.414-1.414l3.101 3.1L14.95 4.879a1 1 0 011.757.414z" clipRule="evenodd" />
              </svg>
              <span>Added!</span>
            </>
          ) : (
            <>
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l3-8H6.4M7 13L5.4 5M7 13l-2 9m12-9l2 9M9 22a1 1 0 100-2 1 1 0 000 2zm8 0a1 1 0 100-2 1 1 0 000 2z" />
              </svg>
              <span>Add to Cart</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
