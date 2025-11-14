tsx
// components/ui/ProductGridSkeleton.tsx
'use client';

import React from 'react';

const ProductGridSkeleton: React.FC = () => {
  return (
    <div className="min-h-screen bg-black">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="bg-white/10 aspect-[3/4] rounded-lg mb-3"></div>
              <div className="bg-white/10 h-4 rounded mb-2"></div>
              <div className="bg-white/10 h-6 rounded mb-2 w-3/4"></div>
              <div className="bg-white/10 h-3 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductGridSkeleton;
