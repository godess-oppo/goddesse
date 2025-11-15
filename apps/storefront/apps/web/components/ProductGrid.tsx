// ProductGrid.tsx
import React, { useState } from "react";

export interface Product {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  description?: string;
  rating?: number; // 0‑5 stars
}

interface ProductGridProps {
  products: Product[];
}

const QuickViewModal: React.FC<{
  product: Product;
  onClose: () => void;
}> = ({ product, onClose }) => (
  <div
    className="fixed inset-0 bg-black/60 flex items-center justify-center z-50"
    onClick={onClose}
  >
    <div
      className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 p-6 flex flex-col md:flex-row gap-6"
      onClick={(e) => e.stopPropagation()}
    >
      <img
        src={product.imageUrl}
        alt={product.name}
        className="w-full md:w-1/2 h-64 object-cover rounded"
      />
      <div className="flex-1">
        <h3 className="text-2xl font-bold mb-2">{product.name}</h3>
        {product.rating && (
          <div className="flex items-center mb-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <svg
                key={i}
                className={`h-5 w-5 ${
                  i < product.rating! ? "text-yellow-400" : "text-gray-300"
                }`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c..." />
              </svg>
            ))}
          </div>
        )}
        <p className="text-lg font-semibold mb-4">${product.price.toFixed(2)}</p>
        {product.description && (
          <p className="text-gray-600 mb-4">{product.description}</p>
        )}
        <button
          className="bg-brand-600 hover:bg-brand-700 text-white px-6 py-3 rounded-md font-semibold"
          onClick={onClose}
        >
          Add to Cart (demo)
        </button>
      </div>
    </div>
  </div>
);

export const ProductGrid: React.FC<ProductGridProps> = ({ products }) => {
  const [selected, setSelected] = useState<Product | null>(null);
  const [open, setOpen] = useState(false);

  const openQuickView = (p: Product) => {
    setSelected(p);
    setOpen(true);
  };

  const closeQuickView = () => {
    setOpen(false);
    setSelected(null);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {products.map((p) => (
        <div
          key={p.id}
          className="bg-white rounded-lg overflow-hidden shadow hover:shadow-lg transition-shadow"
        >
          <img src={p.imageUrl} alt={p.name} className="w-full h-64 object-cover" />
          <div className="p-4">
            <h4 className="text-lg font-semibold mb-1">{p.name}</h4>
            <p className="text-brand-600 font-bold mb-2">${p.price.toFixed(2)}</p>
            <button
              className="w-full bg-neutral-100 hover:bg-neutral-200 text-neutral-900 px-4 py-2 rounded-md font-medium"
              onClick={() => openQuickView(p)}
            >
              Quick View
            </button>
          </div>
        </div>
      ))}
      {open && selected && (
        <QuickViewModal product={selected} onClose={closeQuickView} />
      )}
    </div>
  );
};
