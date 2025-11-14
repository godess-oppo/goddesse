'use client'

import { useState } from 'react'
import { EnhancedAddToCartBar } from './EnhancedAddToCartBar'

export const AddToCartDemo = () => {
  const [showCartBar, setShowCartBar] = useState(false)

  const demoProduct = {
    id: 'goddess-001',
    name: 'Oppo Asymmetry Silk Dress',
    price: 349,
    stock: 8,
    theme: 'fusion' as const,
    sustainability: {
      score: 92,
      materials: ['Organic Silk', 'Natural Dyes'],
      impact: 'Saves 120L water'
    }
  }

  const variants = {
    size: ['XS', 'S', 'M', 'L', 'XL'],
    color: ['Moonlight White', 'Midnight Blue', 'Sakura Pink'],
    material: ['Organic Silk', 'Linen Blend']
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white p-8">
      <button
        onClick={() => setShowCartBar(!showCartBar)}
        className="bg-black text-white px-6 py-3 rounded-full mb-8"
      >
        {showCartBar ? 'Hide Cart Bar' : 'Show Divine Cart Bar'}
      </button>

      {showCartBar && (
        <EnhancedAddToCartBar 
          product={demoProduct}
          variants={variants}
        />
      )}

      {/* Demo Content */}
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-serif mb-4">Oppo × Goddess Collection</h1>
          <p className="text-gray-600">Experience the fusion of Eastern minimalism and Western empowerment</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white rounded-3xl p-8 shadow-lg">
            <h2 className="font-serif text-2xl mb-4">Sacred Features</h2>
            <ul className="space-y-2 text-gray-600">
              <li>• Asymmetric Oppo-inspired design</li>
              <li>• Goddess-energy enhancing fabrics</li>
              <li>• Sustainable artisan craftsmanship</li>
              <li>• Mindful consumption philosophy</li>
            </ul>
          </div>

          <div className="bg-white rounded-3xl p-8 shadow-lg">
            <h2 className="font-serif text-2xl mb-4">Divine Benefits</h2>
            <ul className="space-y-2 text-gray-600">
              <li>• 30-day mindful return policy</li>
              <li>• Carbon-neutral shipping</li>
              <li>• Artisan empowerment program</li>
              <li>• Lifetime craftsmanship guarantee</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
