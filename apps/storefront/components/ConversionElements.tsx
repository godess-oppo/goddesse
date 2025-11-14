'use client';

import { useState } from 'react';

type Product = {
  id: string;
  name: string;
  stock: number;          // integer
  limitedBatch: boolean; // true only for truly low‑stock editorial capsules
};

type Props = {
  product: Product;
};

export default function ConversionElements({ product }: Props) {
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    // TODO: integrate with your cart context / API
    setAdded(true);
  };

  return (
    <div className="border-t pt-6 mt-6 max-w-2xl mx-auto">
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-serif">{product.name}</h3>
        {product.limitedBatch && product.stock <= 5 && (
          <span className="bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-sm font-medium">
            Limited Batch – only {product.stock} left
          </span>
        )}
      </div>

      <button
        onClick={handleAdd}
        disabled={added || product.stock === 0}
        className="mt-4 w-full bg-black text-white py-3 rounded hover:bg-gray-800 disabled:opacity-50 transition"
      >
        {added
          ? 'Added to Cart'
          : product.stock === 0
          ? 'Sold Out'
          : 'Add to Cart'}
      </button>
    </div>
  );
}
