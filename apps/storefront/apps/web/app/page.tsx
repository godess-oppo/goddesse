import Link from 'next/link';

export default function HomePage() {
  return (
    <div>
      <section className="hero bg-gradient-to-r from-purple-400 to-indigo-600 text-white p-8 text-center rounded-lg mb-8">
        <h1 className="text-4xl font-bold mb-4">Welcome to Storefront</h1>
        <p className="text-xl mb-6">
          Discover amazing products at unbeatable prices
        </p>
        <Link 
          href="/products" 
          className="bg-white text-indigo-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
        >
          Shop Now
        </Link>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Featured Categories</h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {['Electronics', 'Clothing', 'Books', 'Home', 'Sports'].map((category) => (
            <div key={category} className="bg-white rounded-lg shadow-md p-4 text-center">
              <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16 mx-auto mb-2" />
              <h3 className="font-semibold">{category}</h3>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">Featured Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="bg-gray-200 border-2 border-dashed w-full h-48" />
              <div className="p-4">
                <h3 className="text-lg font-semibold">Product {i}</h3>
                <p className="text-gray-600">${(Math.random() * 100 + 20).toFixed(2)}</p>
                <button className="mt-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
