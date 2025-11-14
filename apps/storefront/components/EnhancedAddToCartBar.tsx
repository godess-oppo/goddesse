'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface EnhancedAddToCartBarProps {
  product: {
    id: string
    name: string
    price: number
    stock: number
    theme: 'oppo' | 'goddess' | 'fusion'
    sustainability: {
      score: number
      materials: string[]
      impact: string
    }
  }
  variants?: {
    size?: string[]
    color?: string[]
    material?: string[]
  }
}

export const EnhancedAddToCartBar: React.FC<EnhancedAddToCartBarProps> = ({ product, variants }) => {
  const [quantity, setQuantity] = useState(1)
  const [selectedVariant, setSelectedVariant] = useState<Record<string, string>>({})
  const [isAdding, setIsAdding] = useState(false)
  const [showEnergy, setShowEnergy] = useState(false)

  const getThemeConfig = () => {
    switch (product.theme) {
      case 'oppo':
        return {
          gradient: 'from-blue-500 to-cyan-400',
          lightGradient: 'from-blue-50 to-cyan-50',
          color: 'text-blue-600',
          icon: '☯️'
        }
      case 'goddess':
        return {
          gradient: 'from-purple-500 to-pink-400',
          lightGradient: 'from-purple-50 to-pink-50',
          color: 'text-purple-600',
          icon: '✨'
        }
      case 'fusion':
        return {
          gradient: 'from-orange-500 to-red-400',
          lightGradient: 'from-orange-50 to-red-50',
          color: 'text-orange-600',
          icon: '⚡'
        }
    }
  }

  const theme = getThemeConfig()

  const handleAddToCart = async () => {
    setIsAdding(true)
    setShowEnergy(true)
    
    // Oppo-inspired intentional delay for mindfulness
    await new Promise(resolve => setTimeout(resolve, 1200))
    
    // Simulate API call
    console.log('Adding to cart:', { product, quantity, selectedVariant })
    
    setTimeout(() => {
      setIsAdding(false)
      setShowEnergy(false)
    }, 2000)
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50">
      {/* Energy Effect */}
      <AnimatePresence>
        {showEnergy && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.2 }}
            className="absolute inset-0 pointer-events-none"
          >
            <div className={`absolute inset-0 bg-gradient-to-r ${theme.gradient} opacity-10`} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Bar */}
      <motion.div
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        className={`bg-gradient-to-r ${theme.lightGradient} border-t border-white/20 backdrop-blur-md`}
      >
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex flex-col lg:flex-row items-center justify-between space-y-6 lg:space-y-0">
            
            {/* Product Essence */}
            <div className="flex items-center space-x-6">
              <div className={`w-20 h-20 bg-gradient-to-r ${theme.gradient} rounded-2xl flex items-center justify-center text-2xl`}>
                {theme.icon}
              </div>
              <div>
                <h3 className="font-serif text-xl font-medium">{product.name}</h3>
                <div className="flex items-center space-x-4 mt-2">
                  <span className="text-3xl font-light">${product.price}</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                    <span className="text-sm text-gray-600">{product.stock} in stock</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Sacred Selection */}
            <div className="flex items-center space-x-8">
              
              {/* Variant Selection with Oppo Asymmetry */}
              {variants && Object.keys(variants).length > 0 && (
                <div className="flex items-center space-x-6">
                  {Object.entries(variants).map(([type, options], index) => (
                    <motion.div
                      key={type}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center space-x-3"
                    >
                      <span className="font-serif text-sm capitalize text-gray-600">{type}</span>
                      <div className="flex space-x-2">
                        {options.map(option => (
                          <button
                            key={option}
                            onClick={() => setSelectedVariant(prev => ({
                              ...prev,
                              [type]: option
                            }))}
                            className={`px-4 py-2 rounded-full text-sm transition-all duration-300 ${
                              selectedVariant[type] === option
                                ? `bg-gradient-to-r ${theme.gradient} text-white shadow-lg`
                                : 'bg-white/80 text-gray-600 hover:bg-white'
                            }`}
                          >
                            {option}
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}

              {/* Mindful Quantity */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex items-center space-x-4"
              >
                <span className="font-serif text-sm text-gray-600">Quantity</span>
                <div className="flex items-center bg-white/80 rounded-full p-1">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 rounded-full hover:bg-gray-100 flex items-center justify-center transition-colors"
                  >
                    −
                  </button>
                  <span className="px-4 min-w-[60px] text-center font-medium">{quantity}</span>
                  <button
                    onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                    className="w-10 h-10 rounded-full hover:bg-gray-100 flex items-center justify-center transition-colors"
                  >
                    +
                  </button>
                </div>
              </motion.div>

              {/* Divine Actions */}
              <div className="flex items-center space-x-4">
                {/* Wishlist with Heartbeat */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-3 rounded-full bg-white/80 hover:bg-white transition-colors"
                >
                  <motion.span
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    💫
                  </motion.span>
                </motion.button>

                {/* Add to Cart with Energy Flow */}
                <motion.button
                  onClick={handleAddToCart}
                  disabled={isAdding}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`relative bg-gradient-to-r ${theme.gradient} text-white px-8 py-4 rounded-full font-medium overflow-hidden group`}
                >
                  <AnimatePresence mode="wait">
                    {isAdding ? (
                      <motion.span
                        key="adding"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex items-center space-x-2"
                      >
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                          className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                        />
                        <span>Adding Sacred Energy...</span>
                      </motion.span>
                    ) : (
                      <motion.span
                        key="ready"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      >
                        Add to Sacred Cart
                      </motion.span>
                    )}
                  </AnimatePresence>
                  
                  {/* Energy Pulse Effect */}
                  <motion.div
                    animate={{ scale: [1, 1.5, 1], opacity: [0, 1, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute inset-0 border-2 border-white rounded-full"
                  />
                </motion.button>

                {/* Instant Purchase */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-black text-white px-8 py-4 rounded-full font-medium hover:bg-gray-800 transition-colors"
                >
                  Instant Divine Purchase
                </motion.button>
              </div>
            </div>
          </div>

          {/* Sustainability & Social Proof */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex items-center justify-between mt-6 pt-6 border-t border-white/20"
          >
            {/* Sustainability Score */}
            <div className="flex items-center space-x-6">
              <div className="text-center">
                <div className="text-2xl font-serif">{product.sustainability.score}%</div>
                <div className="text-sm text-gray-600">Eco Score</div>
              </div>
              <div className="text-sm text-gray-600">
                <div>Materials: {product.sustainability.materials.join(', ')}</div>
                <div>Impact: {product.sustainability.impact}</div>
              </div>
            </div>

            {/* Social Validation */}
            <div className="text-sm text-gray-600">
              <div className="flex items-center space-x-2">
                <span>⭐ 4.9 • 42 divine experiences today</span>
              </div>
              <div className="text-xs mt-1">
                Last purchased 2 hours ago by Isabella
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
}
