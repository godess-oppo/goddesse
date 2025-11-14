'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface AddToCartBarProps {
  productId: string
  productName: string
  price: number
  stock: number
  variants?: {
    size?: string[]
    color?: string[]
    material?: string[]
  }
  onAddToCart: (data: CartItemData) => void
}

export interface CartItemData {
  productId: string
  quantity: number
  selectedVariant?: {
    size?: string
    color?: string
    material?: string
  }
}

export const AddToCartBar: React.FC<AddToCartBarProps> = ({
  productId,
  productName,
  price,
  stock,
  variants = {},
  onAddToCart
}) => {
  const [quantity, setQuantity] = useState(1)
  const [selectedVariant, setSelectedVariant] = useState<Record<string, string>>({})
  const [isAdding, setIsAdding] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Variant selection handlers
  const handleVariantSelect = (type: string, value: string) => {
    setSelectedVariant(prev => ({
      ...prev,
      [type]: value
    }))
  }

  // Add to cart with elegant animations
  const handleAddToCart = async () => {
    if (stock === 0) {
      setError('This item is currently out of stock')
      return
    }

    setIsAdding(true)
    setError(null)

    try {
      // Simulate API call with Oppo-inspired delay (intentional pause for elegance)
      await new Promise(resolve => setTimeout(resolve, 800))

      const cartData: CartItemData = {
        productId,
        quantity,
        selectedVariant: Object.keys(selectedVariant).length > 0 ? selectedVariant : undefined
      }

      onAddToCart(cartData)
      
      // Success animation
      setShowSuccess(true)
      setTimeout(() => setShowSuccess(false), 2000)
      
    } catch (err) {
      setError('Failed to add item to cart. Please try again.')
    } finally {
      setIsAdding(false)
    }
  }

  // Stock urgency indicators
  const getStockStatus = () => {
    if (stock === 0) return { text: 'Out of Stock', color: 'text-red-500', bg: 'bg-red-50' }
    if (stock < 5) return { text: `Only ${stock} left`, color: 'text-orange-500', bg: 'bg-orange-50' }
    if (stock < 15) return { text: 'Low Stock', color: 'text-yellow-500', bg: 'bg-yellow-50' }
    return { text: 'In Stock', color: 'text-green-500', bg: 'bg-green-50' }
  }

  const stockStatus = getStockStatus()

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50">
      {/* Success Notification */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-4"
          >
            <div className="bg-green-500 text-white px-6 py-3 rounded-full shadow-lg flex items-center space-x-2">
              <span>✓</span>
              <span>Added to cart successfully!</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Bar */}
      <motion.div
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        className="bg-white border-t border-gray-100 shadow-2xl"
      >
        <div className="max-w-6xl mx-auto px-4 py-4">
          {/* Error Message */}
          {error && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4"
            >
              <p className="text-red-600 text-sm">{error}</p>
            </motion.div>
          )}

          <div className="flex flex-col lg:flex-row items-center justify-between space-y-4 lg:space-y-0">
            {/* Product Info */}
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center">
                <span className="text-2xl">👗</span>
              </div>
              <div>
                <h3 className="font-serif text-lg font-medium">{productName}</h3>
                <div className="flex items-center space-x-4">
                  <span className="text-2xl font-light">${price}</span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${stockStatus.bg} ${stockStatus.color}`}>
                    {stockStatus.text}
                  </span>
                </div>
              </div>
            </div>

            {/* Interactive Controls */}
            <div className="flex items-center space-x-4">
              {/* Variant Selector */}
              {Object.keys(variants).length > 0 && (
                <div className="flex items-center space-x-3">
                  {Object.entries(variants).map(([type, options]) => (
                    <div key={type} className="flex items-center space-x-2">
                      <span className="text-sm text-gray-600 capitalize">{type}:</span>
                      <select
                        className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black"
                        onChange={(e) => handleVariantSelect(type, e.target.value)}
                      >
                        <option value="">Select {type}</option>
                        {options.map(option => (
                          <option key={option} value={option}>{option}</option>
                        ))}
                      </select>
                    </div>
                  ))}
                </div>
              )}

              {/* Quantity Selector */}
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">Qty:</span>
                <div className="flex items-center border border-gray-200 rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1}
                    className="px-3 py-2 hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed"
                  >
                    −
                  </button>
                  <span className="px-4 py-2 min-w-[50px] text-center">{quantity}</span>
                  <button
                    onClick={() => setQuantity(Math.min(stock, quantity + 1))}
                    disabled={quantity >= stock}
                    className="px-3 py-2 hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center space-x-3">
                <button className="border border-black text-black px-6 py-3 rounded-full hover:bg-gray-50 transition-colors font-medium">
                  ♡ Wishlist
                </button>
                
                <button
                  onClick={handleAddToCart}
                  disabled={isAdding || stock === 0}
                  className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-3 rounded-full hover:from-purple-700 hover:to-pink-700 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed transition-all duration-300 font-medium relative overflow-hidden"
                >
                  <AnimatePresence mode="wait">
                    {isAdding ? (
                      <motion.span
                        key="loading"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex items-center space-x-2"
                      >
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                        />
                        <span>Adding...</span>
                      </motion.span>
                    ) : (
                      <motion.span
                        key="text"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      >
                        {stock === 0 ? 'Out of Stock' : 'Add to Cart'}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </button>

                <button className="bg-black text-white px-8 py-3 rounded-full hover:bg-gray-800 transition-colors font-medium">
                  Buy Now
                </button>
              </div>
            </div>
          </div>

          {/* Additional Info */}
          <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
            <div className="flex items-center space-x-6 text-sm text-gray-600">
              <span className="flex items-center space-x-2">
                <span>🚚</span>
                <span>Free shipping over $200</span>
              </span>
              <span className="flex items-center space-x-2">
                <span>↩️</span>
                <span>30-day returns</span>
              </span>
              <span className="flex items-center space-x-2">
                <span>🌱</span>
                <span>Sustainable materials</span>
              </span>
            </div>

            {/* Social Proof */}
            <div className="text-sm text-gray-500">
              <span>⭐ 4.9/5 • </span>
              <span>128 people added this today</span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
