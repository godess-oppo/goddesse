tsx
// components/ui/BundleSuggestion.tsx
'use client';

import React from 'react';
import Image from 'next/image';

interface Product {
  id: string;
  title: string;
  price: number;
  image: string;
}

interface BundleSuggestionProps {
  bundle: {
    id: string;
    title: string;
    products: Product[];
    discount: number;
  };
  onClose: () => void;
  onAddToCart: () => void;
}

const BundleSuggestion: React.FC<BundleSuggestionProps> = ({ 
  bundle, 
  onClose, 
  onAddToCart 
}) => {
  const calculateBundlePrice = () => {
    const total = bundle.products.reduce((sum, product) => sum + product.price, 0);
    return total * (1 - bundle.discount / 100);
  };

  const totalOriginal = bundle.products.reduce((sum, p) => sum + p.price, 0);
  const bundlePrice = calculateBundlePrice();

  return (
    <div className="fixed bottom-6 right-6 z-50 bg-black/90 backdrop-blur-md border border-gold/30 rounded-lg p-4 max-w-sm animate-in slide-in-from-bottom-4">
      <div className="flex justify-between items-start mb-3">
        <h4 className="text-gold font-serif text-lg">{bundle.title}</h4>
        <button 
          onClick={onClose} 
          className="text-white/60 hover:text-white text-lg"
        >
          ×
        </button>
      </div>
      
      <div className="flex gap-3 mb-3">
        {bundle.products.map(product => (
          <div key={product.id} className="relative w-16 h-20 rounded overflow-hidden">
            <Image
              src={product.image}
              alt={product.title}
              fill
              className="object-cover"
            />
          </div>
        ))}
      </div>
      
      <div className="flex justify-between items-center mb-3">
        <div>
          <span className="text-white/60 line-through text-sm">${totalOriginal}</span>
          <span className="text-gold text-lg ml-2">${bundlePrice.toFixed(2)}</span>
        </div>
        <span className="text-green-400 text-sm">Save {bundle.discount}%</span>
      </div>
      
      <button 
        onClick={onAddToCart}
        className="w-full bg-gold text-black py-2 rounded hover:bg-gold/90 transition-colors font-medium"
      >
        Add Bundle to Cart
      </button>
    </div>
  );
};

export default BundleSuggestion;
