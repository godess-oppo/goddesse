export function AurixProductCard({ product }) {
  return (
    <div className="aurix-product-card border border-gray-200 rounded-lg p-4 hover:shadow-lg transition-shadow">
      <div className="bg-gradient-to-br from-purple-500 to-pink-500 h-48 rounded-md flex items-center justify-center mb-4">
        <span className="text-white text-lg font-bold">AURIX AI</span>
      </div>
      
      <h3 className="font-bold text-lg mb-2">{product.name}</h3>
      <p className="text-gray-600 text-sm mb-3">{product.description}</p>
      
      <div className="flex justify-between items-center">
        <span className="text-2xl font-bold text-purple-600">${product.price}</span>
        <button className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition-colors">
          Add to Cart
        </button>
      </div>
      
      <div className="mt-2 text-xs text-gray-500">
        🎨 AI-Generated Design
      </div>
    </div>
  );
}
