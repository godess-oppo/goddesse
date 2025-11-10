import { useState, useEffect } from 'react'
import ProductPreview from '../components/ProductPreview'
import SlackWidget from '../components/SlackWidget'
import AnimatedLoader from '../components/AnimatedLoader'

export default function Home() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setProducts([
        { id: 1, name: 'Product 1', price: '$29.99', image: '/product1.jpg' },
        { id: 2, name: 'Product 2', price: '$39.99', image: '/product2.jpg' },
        { id: 3, name: 'Product 3', price: '$49.99', image: '/product3.jpg' }
      ])
      setLoading(false)
    }, 2000)
  }, [])

  if (loading) {
    return <AnimatedLoader />
  }

  return (
    <div className="container">
      <header>
        <h1>Welcome to Our Store</h1>
      </header>
      
      <main>
        <div className="products-grid">
          {products.map(product => (
            <ProductPreview key={product.id} product={product} />
          ))}
        </div>
      </main>

      <SlackWidget />
    </div>
  )
}
