import { AurixProductCard } from './AurixProductCard';

export function AurixProductGrid({ products }) {
  return (
    <div className="aurix-section mb-12">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-2">🎨 AURIX AI Fashion</h2>
        <p className="text-gray-600">AI-generated fashion designs powered by RISN</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <AurixProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
