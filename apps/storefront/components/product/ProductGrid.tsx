import React, { useState, useEffect, useRef } from 'react';
import { useInView } from 'react-intersection-observer';

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  stock: number;
  sustainabilityScore: number;
}

interface ProductGridProps {
  initialProducts?: Product[];
  apiEndpoint?: string;
}

const SkeletonCard: React.FC = () => (
  <div className="animate-pulse bg-gray-200 rounded-sm aspect-[3/4]">
    <div className="h-full flex flex-col justify-end p-4 space-y-2">
      <div className="h-4 bg-gray-300 rounded w-3/4"></div>
      <div className="h-3 bg-gray-300 rounded w-1/2"></div>
    </div>
  </div>
);

const ProductCard: React.FC<{ product: Product; index: number }> = ({ product, index }) => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    if (inView) {
      // Analytics tracking
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'view_item', {
          event_category: 'engagement',
          event_label: product.name,
          value: product.price,
          item_id: product.id,
          item_name: product.name,
          index: index
        });
      }
    }
  }, [inView, product, index]);

  return (
    <article
      ref={ref}
      className="group relative cursor-pointer"
      data-ga="product-impression"
      data-product-id={product.id}
    >
      <div className="relative overflow-hidden bg-gray-100 aspect-[3/4] rounded-sm">
        {!imageLoaded && <SkeletonCard />}
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          decoding="async"
          className={`w-full h-full object-cover transition-opacity duration-300 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          } group-hover:scale-105 transition-transform duration-500`}
          onLoad={() => setImageLoaded(true)}
        />
        
        {/* Conversion Hack: Limited Stock Badge */}
        {product.stock < 10 && product.stock > 0 && (
          <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1 text-xs font-medium tracking-wide">
            Only {product.stock} left
          </div>
        )}
        
        {/* Editorial Flourish: Sustainability Score */}
        {product.sustainabilityScore >= 80 && (
          <div className="absolute top-3 right-3 w-8 h-8 bg-[#7A9B76] rounded-full flex items-center justify-center text-white text-xs font-bold">
            {product.sustainabilityScore}
          </div>
        )}

        {/* Quick Add (appears on hover) */}
        <button
          className="absolute bottom-4 left-4 right-4 bg-[#2C2C2C] text-white py-3 text-sm font-medium tracking-wide opacity-0 group-hover:opacity-100 transition-opacity duration-300 focus:opacity-100 focus:outline-none focus:ring-3 focus:ring-[#7A9B76]"
          aria-label={`Quick add ${product.name} to cart`}
        >
          Quick Add
        </button>
      </div>

      <div className="mt-4 space-y-1">
        <h3 className="text-base font-medium text-[#2C2C2C] line-clamp-2">
          {product.name}
        </h3>
        <p className="text-sm text-gray-600">${product.price}</p>
      </div>
    </article>
  );
};

export const ProductGrid: React.FC<ProductGridProps> = ({ 
  initialProducts = [], 
  apiEndpoint = '/api/products' 
}) => {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [loading, setLoading] = useState(!initialProducts.length);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const { ref: loadMoreRef, inView } = useInView({ threshold: 0.5 });
  const loadingRef = useRef(false);

  const fetchProducts = async (pageNum: number) => {
    if (loadingRef.current) return;
    
    loadingRef.current = true;
    setLoading(true);

    try {
      // Mock API delay (2.5s to simulate real-world conditions)
      await new Promise(resolve => setTimeout(resolve, 2500));
      
      const response = await fetch(`${apiEndpoint}?page=${pageNum}&limit=12`);
      const data = await response.json();
      
      if (data.products.length < 12) setHasMore(false);
      
      setProducts(prev => [...prev, ...data.products]);
    } catch (error) {
      console.error('Failed to fetch products:', error);
    } finally {
      setLoading(false);
      loadingRef.current = false;
    }
  };

  useEffect(() => {
    if (!initialProducts.length) {
      fetchProducts(1);
    }
  }, []);

  useEffect(() => {
    if (inView && hasMore && !loading) {
      setPage(prev => prev + 1);
      fetchProducts(page + 1);
    }
  }, [inView, hasMore, loading]);

  return (
    <section className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12">
        {products.map((product, index) => (
          <ProductCard key={product.id} product={product} index={index} />
        ))}
        
        {loading && Array.from({ length: 6 }).map((_, i) => (
          <SkeletonCard key={`skeleton-${i}`} />
        ))}
      </div>

      {/* Infinite Scroll Trigger */}
      {hasMore && <div ref={loadMoreRef} className="h-20" />}
      
      {!hasMore && products.length > 0 && (
        <p className="text-center text-gray-500 mt-12 text-sm tracking-wide">
          You've reached the end of our curated collection
        </p>
      )}
    </section>
  );
};
