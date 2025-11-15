'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { useCart } from '@/hooks/useCart';
import { Heart, ShoppingCart } from 'lucide-react';
import { Product } from '@/types/product';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0],
      quantity: 1,
    });
  };

  const handleWishlist = () => {
    setIsWishlisted(!isWishlisted);
    // In a real app, you would call an API to update wishlist
  };

  return (
    <div className="product-card bg-white rounded-xl shadow-md overflow-hidden group">
      <div className="relative">
        <Link href={`/product/${product.id}`}>
          {imageError ? (
            <div className="bg-gray-200 border-2 border-dashed rounded-xl w-full h-64 flex items-center justify-center">
              <span className="text-gray-500">Image not available</span>
            </div>
          ) : (
            <img
              src={product.images[0] || '/placeholder-product.jpg'}
              alt={product.name}
              className="w-full h-64 object-cover"
              onError={() => setImageError(true)}
            />
          )}
        </Link>
        
        <button
          onClick={handleWishlist}
          className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:bg-pink-50 transition-colors"
          aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
        >
          <Heart 
            className={`h-4 w-4 ${isWishlisted ? 'fill-pink-500 text-pink-500' : 'text-gray-600'}`} 
          />
        </button>
        
        {product.discount && (
          <div className="absolute top-2 left-2 bg-pink-600 text-white px-2 py-1 rounded text-sm font-medium">
            {product.discount}% OFF
          </div>
        )}
      </div>
      
      <div className="p-4">
        <Link href={`/product/${product.id}`}>
          <h3 className="font-semibold text-lg mb-1 line-clamp-2">{product.name}</h3>
        </Link>
        
        <p className="text-gray-600 text-sm mb-2 line-clamp-2">{product.description}</p>
        
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <span className="font-bold text-lg">${product.price.toFixed(2)}</span>
            {product.originalPrice && (
              <span className="text-gray-500 line-through text-sm">
                ${product.originalPrice.toFixed(2)}
              </span>
            )}
          </div>
          
          <div className="flex items-center">
            <span className="text-yellow-500">★</span>
            <span className="text-sm text-gray-600 ml-1">
              {product.rating} ({product.reviewCount})
            </span>
          </div>
        </div>
        
        <div className="flex space-x-2">
          <Button 
            onClick={handleAddToCart}
            className="flex-1"
            size="sm"
          >
            <ShoppingCart className="h-4 w-4 mr-2" />
            Add to Cart
          </Button>
          
          <Button 
            variant="outline" 
            size="sm"
            onClick={handleWishlist}
          >
            <Heart className={`h-4 w-4 ${isWishlisted ? 'fill-pink-500 text-pink-500' : ''}`} />
          </Button>
        </div>
      </div>
    </div>
  );
}
