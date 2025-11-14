import React, { useState, useEffect } from 'react';
import { useMutation, gql } from '@apollo/client';

const ADD_TO_CART_MUTATION = gql`
  mutation AddToCart($productId: ID!, $quantity: Int!, $size: String!) {
    addToCart(input: { productId: $productId, quantity: $quantity, size: $size }) {
      cart {
        id
        itemCount
        subtotal
      }
      errors {
        field
        message
      }
    }
  }
`;

interface AddToCartBarProps {
  productId: string;
  productName: string;
  price: number;
  availableSizes: string[];
  stock: number;
}

type ErrorState = {
  type: 'network' | 'validation' | 'stock' | 'offline' | null;
  message: string;
};

export const AddToCartBar: React.FC<AddToCartBarProps> = ({
  productId,
  productName,
  price,
  availableSizes,
  stock
}) => {
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [quantity, setQuantity] = useState(1);
  const [isSticky, setIsSticky] = useState(false);
  const [error, setError] = useState<ErrorState>({ type: null, message: '' });
  const [isOffline, setIsOffline] = useState(!navigator.onLine);
  const [localCart, setLocalCart] = useState<any[]>([]);

  const [addToCart, { loading }] = useMutation(ADD_TO_CART_MUTATION, {
    onCompleted: (data) => {
      if (data.addToCart.errors?.length > 0) {
        const err = data.addToCart.errors[0];
        setError({
          type: 'validation',
          message: err.message
        });
      } else {
        // Success feedback
        showSuccessToast();
      }
    },
    onError: (err) => {
      setError({
        type: 'network',
        message: 'Connection lost. Item saved locally—we'll sync when you're back online.'
      });
      // Fallback: Save to localStorage
      saveToLocalCart({ productId, productName, price, size: selectedSize, quantity });
    }
  });

  // Offline detection
  useEffect(() => {
    const handleOnline = () => {
      setIsOffline(false);
      syncLocalCart();
    };
    const handleOffline = () => setIsOffline(true);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Sticky scroll behavior
  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const saveToLocalCart = (item: any) => {
    const cart = JSON.parse(localStorage.getItem('offlineCart') || '[]');
    cart.push({ ...item, timestamp: Date.now() });
    localStorage.setItem('offlineCart', JSON.stringify(cart));
    setLocalCart(cart);
  };

  const syncLocalCart = async () => {
    const cart = JSON.parse(localStorage.getItem('offlineCart') || '[]');
    if (cart.length === 0) return;

    // Batch sync (simplified - production would use batch mutation)
    for (const item of cart) {
      try {
        await addToCart({
          variables: {
            productId: item.productId,
            quantity: item.quantity,
            size: item.size
          }
        });
      } catch (err) {
        console.error('Sync failed for item:', item);
      }
    }

    localStorage.removeItem('offlineCart');
    setLocalCart([]);
  };

  const handleAddToCart = async () => {
    setError({ type: null, message: '' });

    // Validation
    if (!selectedSize) {
      setError({ type: 'validation', message: 'Please select a size' });
      return;
    }

    if (quantity > stock) {
      setError({ type: 'stock', message: `Only ${stock} items available` });
      return;
    }

    // Offline fallback
    if (isOffline) {
      setError({
        type: 'offline',
        message: 'You're offline. Item saved—we'll add it when connection returns.'
      });
      saveToLocalCart({ productId, productName, price, size: selectedSize, quantity });
      return;
    }

    // GraphQL mutation
    await addToCart({
      variables: { productId, quantity, size: selectedSize }
    });
  };

  const showSuccessToast = () => {
    // Simplified - production would use toast library
    alert(`✓ ${productName} added to cart`);
  };

  return (
    <>
      {/* Mobile Sticky Bar */}
      <div
        className={`fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 z-50 transform transition-transform duration-300 lg:hidden ${
          isSticky ? 'translate-y-0' : 'translate-y-full'
        }`}
        style={{
          // Performance: Force GPU acceleration
          willChange: 'transform'
        }}
      >
        <button
          onClick={handleAddToCart}
          disabled={loading || !selectedSize}
          className="w-full bg-[#2C2C2C] text-white py-4 text-sm font-medium tracking-wide disabled:bg-gray-300 disabled:cursor-not-allowed hover:bg-[#1a1a1a] transition-colors focus:outline-none focus:ring-3 focus:ring-[#7A9B76]"
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Adding...
            </span>
          ) : (
            `Add to Cart — $${(price * quantity).toFixed(2)}`
          )}
        </button>
      </div>

      {/* Desktop Version */}
      <div className="hidden lg:block space-y-6">
        {/* Size Selector */}
        <div>
          <label className="block text-sm font-medium mb-3 tracking-wide">
            Select Size
          </label>
          <div className="flex gap-2">
            {availableSizes.map((size) => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`px-6 py-3 text-sm font-medium border-2 transition-colors focus:outline-none focus:ring-3 focus:ring-[#7A9B76] ${
                  selectedSize === size
                    ? 'border-[#2C2C2C] bg-[#2C2C2C] text-white'
                    : 'border-gray-300 hover:border-[#2C2C2C]'
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        {/* Quantity Selector */}
        <div>
          <label className="block text-sm font-medium mb-3 tracking-wide">
            Quantity
          </label>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="w-10 h-10 border-2 border-gray-300 hover:border-[#2C2C2C] transition-colors focus:outline-none focus:ring-3 focus:ring-[#7A9B76]"
              aria-label="Decrease quantity"
            >
              −
            </button>
            <span className="text-lg font-medium w-8 text-center">{quantity}</span>
            <button
              onClick={() => setQuantity(Math.min(stock, quantity + 1))}
              className="w-10 h-10 border-2 border-gray-300 hover:border-[#2C2C2C] transition-colors focus:outline-none focus:ring-3 focus:ring-[#7A9B76]"
              aria-label="Increase quantity"
            >
              +
            </button>
          </div>
        </div>

        {/* Error State */}
        {error.type && (
          <div
            className={`p-4 text-sm rounded-sm ${
              error.type === 'offline'
                ? 'bg-yellow-50 border border-yellow-200 text-yellow-800'
                : 'bg-red-50 border border-red-200 text-[#C7522A]'
            }`}
            role="alert"
          >
            {error.message}
          </div>
        )}

        {/* CTA Button */}
        <button
          onClick={handleAddToCart}
          disabled={loading || !selectedSize}
          className="w-full bg-[#2C2C2C] text-white py-4 text-sm font-medium tracking-wide disabled:bg-gray-300 disabled:cursor-not-allowed hover:bg-[#1a1a1a] transition-colors focus:outline-none focus:ring-3 focus:ring-[#7A9B76]"
>
{loading ? (
<span className="flex items-center justify-center gap-2">
<svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
<circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
<path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
</svg>
Adding to Cart...
</span>
) : (
Add to Cart — $${(price * quantity).toFixed(2)}
)}
</button>{/* Offline Cart Indicator */}
    {localCart.length > 0 && (
      <div className="p-3 bg-[#7A9B76]/10 border border-[#7A9B76]/30 rounded-sm text-xs text-gray-700">
        <strong className="block mb-1">📦 {localCart.length} item(s) saved offline</strong>
        <span className="text-gray-600">
          We'll sync these to your cart automatically when you're back online
        </span>
      </div>
    )}

    {/* Editorial Flourish: Value Props */}
    <div className="pt-6 border-t border-gray-200 space-y-3 text-sm text-gray-600">
      <div className="flex items-start gap-3">
        <svg className="w-5 h-5 text-[#7A9B76] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
        <span>Free carbon-neutral shipping on orders over $150</span>
      </div>
      <div className="flex items-start gap-3">
        <svg className="w-5 h-5 text-[#7A9B76] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
        <span>60-day returns with free repair service</span>
      </div>
      <div className="flex items-start gap-3">
        <svg className="w-5 h-5 text-[#7A9B76] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span>Expected delivery: 4-6 business days</span>
      </div>
    </div>
  </div>
</>
};
};
