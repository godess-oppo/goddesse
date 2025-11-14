import { useEffect, useRef, useState } from 'react';

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  stock: number;
}

export const ProductGrid: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const observerRef = useRef<IntersectionObserver>();

  useEffect(() => {
    // Simulate API delay
    const timer = setTimeout(() => {
      setProducts(mockProducts);
      setLoading(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  const trackImpression = (productId: string) => {
    // Analytics implementation
    console.log(`Product impression: ${productId}`);
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="animate-pulse">
            <div className="bg-gray-200 h-80 rounded"></div>
            <div className="mt-4 space-y-2">
              <div className="bg-gray-200 h-4 rounded"></div>
              <div className="bg-gray-200 h-4 w-3/4 rounded"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div 
      className="grid grid-cols-1 md:grid-cols-3 gap-8"
      data-ga="product-grid"
    >
      {products.map((product) => (
        <div
          key={product.id}
          className="product-card group"
          data-ga="product-impression"
          data-product-id={product.id}
        >
          <div className="relative overflow-hidden">
            <img
              src={product.image}
              alt={product.name}
              loading="lazy"
              className="w-full h-80 object-cover transition-transform duration-300 group-hover:scale-105"
            />
            {product.stock < 10 && (
              <span className="absolute top-4 right-4 bg-red-500 text-white px-2 py-1 text-xs">
                Only {product.stock} left
              </span>
            )}
          </div>
          <div className="mt-4">
            <h3 className="font-serif text-lg">{product.name}</h3>
            <p className="text-gray-600">${product.price}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Organic Linen Blazer',
    price: 349,
    image: '/images/blazer.jpg',
    stock: 3
  },
  // ... more products
];
