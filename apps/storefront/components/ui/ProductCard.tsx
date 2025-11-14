tsx
// components/ProductGrid.tsx
'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface Product {
  id: string;
  title: string;
  price: number;
  description: string;
  image: string;
  material: string;
  story: string;
  mood: string;
  sustainability: string[];
  curatorQuote: string;
  provenance: string;
  tags: string[];
}

interface BundleSuggestion {
  id: string;
  title: string;
  products: Product[];
  discount: number;
}

const ProductGrid: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeFilters, setActiveFilters] = useState({
    material: '',
    story: '',
    mood: '',
    sustainability: [] as string[],
  });
  const [sortBy, setSortBy] = useState<'editorial' | 'traced' | 'newest'>('editorial');
  const [showBundle, setShowBundle] = useState<BundleSuggestion | null>(null);
  const [hoveredProduct, setHoveredProduct] = useState<string | null>(null);
  const hoverTimeoutRef = useRef<NodeJS.Timeout>();

  // Mock data - replace with actual API calls
  useEffect(() => {
    const mockProducts: Product[] = [
      {
        id: '1',
        title: 'Asymmetric Linen Blouse',
        price: 285,
        description: 'Organic linen, botanical dyes, limited edition',
        image: '/api/placeholder/400/500',
        material: 'Linen',
        story: 'Zero-Waste',
        mood: 'Avant-Garde',
        sustainability: ['eco', 'ethical'],
        curatorQuote: 'A masterful deconstruction of traditional tailoring with zero-waste pattern cutting.',
        provenance: 'Hand-printed in Kuala Lumpur',
        tags: ['Limited Edition', 'Botanical Dyes']
      },
      {
        id: '2',
        title: 'Deconstructed Trench',
        price: 420,
        description: 'Upcycled canvas, vegetable-tanned leather details',
        image: '/api/placeholder/400/500',
        material: 'Canvas',
        story: 'Upcycled',
        mood: 'Architectural',
        sustainability: ['recycled', 'ethical'],
        curatorQuote: 'Reimagining classic outerwear with upcycled military canvas.',
        provenance: 'Artisan-crafted in Lisbon',
        tags: ['Upcycled', 'Vegetable-Tanned']
      },
      // Add more products...
    ];

    setProducts(mockProducts);
    setFilteredProducts(mockProducts);
    setLoading(false);
  }, []);

  const sustainabilityTags = [
    { id: 'eco', label: 'Eco', icon: '🌱' },
    { id: 'recycled', label: 'Recycled', icon: '♻️' },
    { id: 'ethical', label: 'Ethical', icon: '🤝' }
  ];

  const materials = ['Linen', 'Silk', 'Cotton', 'Canvas', 'Tencel'];
  const stories = ['Zero-Waste', 'Upcycled', 'Artisanal', 'Limited'];
  const moods = ['Avant-Garde', 'Architectural', 'Futuristic', 'Organic'];

  const handleFilterChange = (type: keyof typeof activeFilters, value: string) => {
    setActiveFilters(prev => ({
      ...prev,
      [type]: type === 'sustainability' 
        ? prev.sustainability.includes(value)
          ? prev.sustainability.filter(v => v !== value)
          : [...prev.sustainability, value]
        : prev[type] === value ? '' : value
    }));
  };

  const handleProductHover = (productId: string) => {
    setHoveredProduct(productId);
    
    // Show bundle suggestion after 2 seconds of hovering
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
    
    hoverTimeoutRef.current = setTimeout(() => {
      const product = products.find(p => p.id === productId);
      if (product) {
        const relatedProducts = products.filter(p => 
          p.id !== productId && 
          (p.material === product.material || p.mood === product.mood)
        ).slice(0, 2);
        
        if (relatedProducts.length > 0) {
          setShowBundle({
            id: `bundle-${productId}`,
            title: `Style with ${product.title}`,
            products: [product, ...relatedProducts],
            discount: 15
          });
        }
      }
    }, 2000);
  };

  const handleProductLeave = () => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
    setHoveredProduct(null);
  };

  const calculateBundlePrice = (bundle: BundleSuggestion) => {
    const total = bundle.products.reduce((sum, product) => sum + product.price, 0);
    return total * (1 - bundle.discount / 100);
  };

  if (loading) {
    return <ProductGridSkeleton />;
  }

  return (
    <div className="min-h-screen bg-black">
      {/* Filters Section */}
      <div className="sticky top-0 z-40 bg-black/80 backdrop-blur-md border-b border-gold/20">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
            {/* Top Filters */}
            <div className="flex flex-wrap gap-2">
              <FilterButton
                label="Material"
                options={materials}
                activeValue={activeFilters.material}
                onChange={(value) => handleFilterChange('material', value)}
              />
              <FilterButton
                label="Story"
                options={stories}
                activeValue={activeFilters.story}
                onChange={(value) => handleFilterChange('story', value)}
              />
              <FilterButton
                label="Mood"
                options={moods}
                activeValue={activeFilters.mood}
                onChange={(value) => handleFilterChange('mood', value)}
              />
              
              {/* Sustainability Tags */}
              <div className="flex flex-wrap gap-2">
                {sustainabilityTags.map(tag => (
                  <button
                    key={tag.id}
                    onClick={() => handleFilterChange('sustainability', tag.id)}
                    className={`px-3 py-1.5 rounded-full text-sm border transition-all ${
                      activeFilters.sustainability.includes(tag.id)
                        ? 'bg-gold/20 border-gold text-gold'
                        : 'border-white/20 text-white/60 hover:border-white/40'
                    }`}
                  >
                    {tag.icon} {tag.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Sort Options */}
            <div className="flex items-center gap-3">
              <span className="text-white/60 text-sm">Sort by:</span>
              <select 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-black border border-gold/30 rounded px-3 py-1.5 text-gold text-sm"
              >
                <option value="editorial">Editorial Picks</option>
                <option value="traced">Most-Traced</option>
                <option value="newest">Newest</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Product Grid */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
          {filteredProducts.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              isHovered={hoveredProduct === product.id}
              onHover={() => handleProductHover(product.id)}
              onLeave={handleProductLeave}
            />
          ))}
        </div>

        {/* Load More */}
        <div className="flex justify-center mt-12">
          <button className="border border-gold/40 text-gold px-8 py-3 rounded-full hover:bg-gold/10 transition-all">
            Load More
          </button>
        </div>
      </div>

      {/* Bundle Suggestion */}
      {showBundle && (
        <BundleSuggestionCard
          bundle={showBundle}
          onClose={() => setShowBundle(null)}
          onAddToCart={() => {
            // Handle bundle add to cart
            console.log('Adding bundle to cart:', showBundle);
          }}
        />
      )}
    </div>
  );
};

// Product Card Component
const ProductCard: React.FC<{
  product: Product;
  isHovered: boolean;
  onHover: () => void;
  onLeave: () => void;
}> = ({ product, isHovered, onHover, onLeave }) => {
  return (
    <div 
      className="group relative bg-white/5 rounded-lg overflow-hidden border border-white/10 hover:border-gold/30 transition-all duration-500"
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
    >
      <div className="relative aspect-[3/4] overflow-hidden">
        <Image
          src={product.image}
          alt={product.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        
        {/* Sustainability Badge */}
        {product.sustainability.length > 0 && (
          <div className="absolute top-3 right-3 flex gap-1">
            {product.sustainability.map(tag => (
              <span key={tag} className="bg-green-500/90 text-white px-2 py-1 rounded-full text-xs">
                {tag === 'eco' ? '🌱' : tag === 'recycled' ? '♻️' : '🤝'}
              </span>
            ))}
          </div>
        )}

        {/* Editorial Hover Overlay */}
        <div className={`absolute inset-0 bg-black/90 p-4 flex flex-col justify-end transition-opacity duration-300 ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}>
          <p className="text-white/80 italic text-sm mb-3">{product.curatorQuote}</p>
          <span className="bg-gold/20 text-gold px-3 py-1 rounded-full text-xs self-start">
            {product.provenance}
          </span>
        </div>
      </div>

      <div className="p-4">
        <h3 className="text-white font-light text-lg mb-1">{product.title}</h3>
        <p className="text-gold text-xl font-serif mb-2">${product.price}</p>
        <p className="text-white/60 text-sm mb-3">{product.description}</p>
        
        <div className="flex flex-wrap gap-1">
          {product.tags.map(tag => (
            <span key={tag} className="bg-white/10 text-white/70 px-2 py-1 rounded text-xs">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

// Bundle Suggestion Component
const BundleSuggestionCard: React.FC<{
  bundle: BundleSuggestion;
  onClose: () => void;
  onAddToCart: () => void;
}> = ({ bundle, onClose, onAddToCart }) => {
  const totalOriginal = bundle.products.reduce((sum, p) => sum + p.price, 0);
  const bundlePrice = calculateBundlePrice(bundle);

  return (
    <div className="fixed bottom-6 right-6 z-50 bg-black/90 backdrop-blur-md border border-gold/30 rounded-lg p-4 max-w-sm animate-in slide-in-from-bottom-4">
      <div className="flex justify-between items-start mb-3">
        <h4 className="text-gold font-serif text-lg">{bundle.title}</h4>
        <button onClick={onClose} className="text-white/60 hover:text-white">
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

// Filter Button Component
const FilterButton: React.FC<{
  label: string;
  options: string[];
  activeValue: string;
  onChange: (value: string) => void;
}> = ({ label, options, activeValue, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`px-4 py-2 rounded-full border transition-all flex items-center gap-2 ${
          activeValue 
            ? 'border-gold text-gold bg-gold/10' 
            : 'border-white/20 text-white/60 hover:border-white/40'
        }`}
      >
        {label} {activeValue && `: ${activeValue}`}
        <span className={`transform transition-transform ${isOpen ? 'rotate-180' : ''}`}>
          ↓
        </span>
      </button>
      
      {isOpen && (
        <div className="absolute top-full left-0 mt-2 bg-black border border-gold/30 rounded-lg py-2 z-10 min-w-[200px]">
          {options.map(option => (
            <button
              key={option}
              onClick={() => {
                onChange(option);
                setIsOpen(false);
              }}
              className={`w-full text-left px-4 py-2 hover:bg-gold/10 transition-colors ${
                activeValue === option ? 'text-gold' : 'text-white'
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

// Skeleton Loading Component
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

export default ProductGrid;
