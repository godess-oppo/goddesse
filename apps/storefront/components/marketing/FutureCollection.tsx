tsx
import { SensoryProductCard } from "../product/SensoryProductCard"

export default function FutureCollection() {
  // Temporary data - replace with your CMS data
  const upcomingProducts = [
    { id: 1, name: "Upcoming Item 1", price: 99, image: "/products/coming-1.jpg" },
    { id: 2, name: "Upcoming Item 2", price: 129, image: "/products/coming-2.jpg" },
    { id: 3, name: "Upcoming Item 3", price: 79, image: "/products/coming-3.jpg" },
  ]

  return (
    <section className="py-16 container">
      <h2 className="text-3xl text-center mb-12">Coming Soon</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {upcomingProducts.map(product => (
          <SensoryProductCard 
            key={product.id}
            product={product}
            variant="future"
          />
        ))}
      </div>
    </section>
  )
}
