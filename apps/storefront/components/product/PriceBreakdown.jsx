// components/PriceBreakdown.jsx
import { useState } from 'react';
import { Info, TrendingDown, AlertTriangle } from 'lucide-react';

export default function PriceBreakdown({ product }) {
  const [showDetails, setShowDetails] = useState(false);
  
  const breakdown = {
    manufacturingCost: product.cost,
    shipping: product.shipping || product.cost * 0.08,
    platformFees: product.price * 0.029 + 0.30, // Stripe fees
    packaging: 2.50,
    marketing: product.price * 0.15, // CAC allocation
    operations: product.price * 0.08, // Support, returns, etc.
    profit: 0 // Calculate below
  };
  
  breakdown.profit = product.price - Object.values(breakdown)
    .filter((_, i) => i !== Object.keys(breakdown).length - 1)
    .reduce((a, b) => a + b, 0);
  
  const profitMargin = ((breakdown.profit / product.price) * 100).toFixed(1);
  
  // Honesty triggers
  const isHighMargin = profitMargin > 40;
  const isFairMargin = profitMargin >= 20 && profitMargin <= 40;
  
  return (
    <div className="border-2 border-gray-800 p-4 bg-yellow-50">
      <button 
        onClick={() => setShowDetails(!showDetails)}
        className="flex items-center gap-2 font-bold text-lg mb-2"
      >
        <Info size={20} />
        Real Price Breakdown (We're making {profitMargin}% profit)
      </button>
      
      {showDetails && (
        <div className="space-y-2 text-sm">
          <div className="grid grid-cols-2 gap-2">
            <span>Manufacturing cost:</span>
            <span className="font-mono">RM {breakdown.manufacturingCost.toFixed(2)}</span>
            
            <span>Shipping to us:</span>
            <span className="font-mono">RM {breakdown.shipping.toFixed(2)}</span>
            
            <span>Payment processing:</span>
            <span className="font-mono">RM {breakdown.platformFees.toFixed(2)}</span>
            
            <span>Packaging:</span>
            <span className="font-mono">RM {breakdown.packaging.toFixed(2)}</span>
            
            <span>Marketing (finding you):</span>
            <span className="font-mono">RM {breakdown.marketing.toFixed(2)}</span>
            
            <span>Operations (support, returns):</span>
            <span className="font-mono">RM {breakdown.operations.toFixed(2)}</span>
            
            <span className="font-bold border-t pt-2">Our profit:</span>
            <span className="font-mono font-bold border-t pt-2">
              RM {breakdown.profit.toFixed(2)}
            </span>
          </div>
          
          {isHighMargin && (
            <div className="bg-red-100 border-2 border-red-600 p-3 mt-3">
              <AlertTriangle className="inline mr-2" size={16} />
              <strong>Honest warning:</strong> Our margin is high on this. 
              You're paying for convenience and curation, not just the product. 
              <a href={product.aliexpressLink} className="underline ml-1">
                Find it cheaper here
              </a> if you're willing to wait 3 weeks.
            </div>
          )}
          
          {isFairMargin && (
            <p className="text-green-800 mt-3">
              ✓ This is a fair margin. We need this to stay in business and 
              provide good customer service.
            </p>
          )}
          
          <details className="mt-3 text-xs text-gray-600">
            <summary className="cursor-pointer">Why we show this</summary>
            <p className="mt-2">
              Most stores mark up 200-400%. We believe you deserve to know 
              what you're paying for. If our margin seems high, it's because 
              we're covering real costs—not hiding them.
            </p>
          </details>
        </div>
      )}
    </div>
  );
}
