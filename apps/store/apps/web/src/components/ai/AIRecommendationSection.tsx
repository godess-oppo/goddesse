'use client';

import { ProductCard } from '@/components/product/ProductCard';
import { Product } from '@/types/product';

interface AIRecommendationSectionProps {
  recommendations: Product[];
}

export function AIRecommendationSection({ recommendations }: AIRecommendationSectionProps) {
  if (recommendations.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">No personalized recommendations yet. Start shopping to get AI-powered suggestions!</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {recommendations.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
