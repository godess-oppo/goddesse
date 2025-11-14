'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface StoryChapter {
  id: string
  title: string
  subtitle: string
  content: string
  image: string
  theme: 'oppo' | 'goddess'
  products: string[]
  quote: string
  icon: string
}

export const StorytellingModule = () => {
  const [activeChapter, setActiveChapter] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  const chapters: StoryChapter[] = [
    {
      id: '1',
      title: 'The Oppo Philosophy',
      subtitle: 'Beauty in Imperfection',
      content: 'Discover the Japanese aesthetic of Wabi-Sabi, where asymmetry and natural imperfection create profound beauty. Our designs embrace intentional imbalance, allowing garments to flow with the body\'s authentic movement.',
      image: '/stories/oppo-philosophy.jpg',
      theme: 'oppo',
      products: ['Asymmetric Collection', 'Wabi-Sabi Essentials', 'Organic Linen Series'],
      quote: 'In the gentle curve of asymmetry, we find the poetry of movement.',
      icon: '☯️'
    },
    {
      id: '2',
      title: 'Goddess Energy',
      subtitle: 'Divine Empowerment',
      content: 'Channel the timeless energy of feminine power through silhouettes that honor both strength and grace. Each piece is crafted to make you feel connected to the divine feminine within.',
      image: '/stories/goddess-energy.jpg',
      theme: 'goddess',
      products: ['Celestial Collection', 'Empowerment Line', 'Sacred Silhouettes'],
      quote: 'When you wear your power, the world aligns with your rhythm.',
      icon: '✨'
    },
    {
      id: '3',
      title: 'Sacred Fusion',
      subtitle: 'Where Worlds Meet',
      content: 'Experience the harmonious blend of Eastern minimalism and Western expression. This collection represents the beautiful dialogue between structured philosophy and flowing emotion.',
      image: '/stories/sacred-fusion.jpg',
      theme: 'oppo',
      products: ['Fusion Collection', 'Harmony Pieces', 'Cultural Dialogue'],
      quote: 'In the space between cultures, we find universal beauty.',
      icon: '⚡'
    }
  ]

  // Auto-play chapters
  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setActiveChapter((prev) => (prev + 1) % chapters.length)
    }, 8000)

    return () => clearInterval(interval)
  }, [isAutoPlaying, chapters.length])

  const getThemeStyles = (theme: string) => {
    switch (theme) {
      case 'oppo': return {
        gradient: 'from-blue-500/10 to-cyan-400/10',
        darkGradient: 'from-blue-600 to-cyan-500',
        lightGradient: 'from-blue-50 to-cyan-50',
        color: 'text-blue-600',
        border: 'border-blue-200',
        icon: '☯️'
      }
      case 'goddess': return {
        gradient: 'from-purple-500/10 to-pink-400/10',
        darkGradient: 'from-purple-600 to-pink-500',
        lightGradient: 'from-purple-50 to-pink-50',
        color: 'text-purple-600',
        border: 'border-purple-200',
        icon: '✨'
      }
      default: return {
        gradient: 'from-gray-500/10 to-gray-400/10',
        darkGradient: 'from-gray-600 to-gray-500',
        lightGradient: 'from-gray-50 to-gray-50',
        color: 'text-gray-600',
        border: 'border-gray-200',
        icon: '⚡'
      }
    }
  }

  const currentChapter = chapters[activeChapter]
  const themeStyles = getThemeStyles(currentChapter.theme)

  const chapterVariants = {
    initial: { opacity: 0, x: 50 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -50 }
  }

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#000_1px,transparent_1px)] bg-[size:100px_100px] animate-pulse" />
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-4 h-4 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full opacity-20"
            animate={{
              y: [0, -30, 0],
              x: [0, Math.sin(i) * 20, 0],
            }}
            transition={{
              duration: 4 + i,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            style={{
              left: `${20 + i * 10}%`,
              top: `${10 + i * 12}%`,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-serif mb-4 bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
            The Oppo × Goddess Narrative
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Explore the sacred philosophy behind our conscious creations. Each story is a journey into mindful craftsmanship.
          </p>
        </motion.div>

        <div className="max-w-7xl mx-auto">
          {/* Enhanced Chapter Navigation */}
          <motion.div 
            className="flex flex-wrap justify-center gap-4 mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {chapters.map((chapter, index) => {
              const chapterTheme = getThemeStyles(chapter.theme)
              return (
                <motion.button
                  key={chapter.id}
                  onClick={() => {
                    setActiveChapter(index)
                    setIsAutoPlaying(false)
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`relative px-6 py-3 rounded-full transition-all duration-300 font-medium group ${
                    activeChapter === index
                      ? `${chapterTheme.color} bg-white shadow-lg shadow-blue-500/25`
                      : 'text-gray-400 hover:text-gray-600 bg-white/80 hover:bg-white'
                  }`}
                >
                  <span className="relative z-10 flex items-center space-x-2">
                    <span>{chapter.icon}</span>
                    <span>{chapter.title}</span>
                  </span>
                  
                  {activeChapter === index && (
                    <motion.div
                      layoutId="activeChapter"
                      className={`absolute inset-0 bg-gradient-to-r ${chapterTheme.lightGradient} rounded-full`}
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </motion.button>
              )
            })}
            
            {/* Auto-play Toggle */}
            <motion.button
              onClick={() => setIsAutoPlaying(!isAutoPlaying)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-4 py-3 rounded-full bg-black text-white text-sm font-medium"
            >
              {isAutoPlaying ? '⏸️ Pause Story' : '▶️ Play Story'}
            </motion.button>
          </motion.div>

          {/* Animated Story Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeChapter}
              variants={chapterVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
            >
              {/* Text Content */}
              <div className="space-y-8">
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <span className={`inline-block px-4 py-2 rounded-full ${themeStyles.border} ${themeStyles.color} text-sm font-medium mb-4`}>
                    {currentChapter.subtitle}
                  </span>
                  <h3 className="text-3xl md:text-4xl font-serif mb-6 bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                    {currentChapter.title}
                  </h3>
                  <p className="text-gray-700 leading-relaxed text-lg mb-6">
                    {currentChapter.content}
                  </p>
                </motion.div>

                {/* Featured Quote */}
                <motion.blockquote 
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                  className={`border-l-4 ${themeStyles.border} pl-6 py-4 italic text-gray-800 text-lg bg-white/50 rounded-r-2xl`}
                >
                  "{currentChapter.quote}"
                </motion.blockquote>

                {/* Products */}
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  <h4 className="font-serif text-xl mb-4 text-gray-800">Featured Collections:</h4>
                  <div className="flex flex-wrap gap-3">
                    {currentChapter.products.map((product, index) => (
                      <motion.span
                        key={product}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.8 + index * 0.1 }}
                        className="px-4 py-2 bg-white rounded-full text-sm text-gray-700 border border-gray-200 hover:border-gray-300 transition-colors cursor-pointer"
                      >
                        {product}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>

                {/* CTA */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1 }}
                  className="flex space-x-4"
                >
                  <button className={`bg-gradient-to-r ${themeStyles.darkGradient} text-white px-8 py-3 rounded-full hover:shadow-lg transition-all duration-300 font-medium`}>
                    Explore {currentChapter.title}
                  </button>
                  <button className="border border-gray-300 text-gray-700 px-8 py-3 rounded-full hover:bg-gray-50 transition-colors font-medium">
                    Read Full Story
                  </button>
                </motion.div>
              </div>

              {/* Visual Content */}
              <motion.div 
                className="relative"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
              >
                <div className={`rounded-3xl overflow-hidden ${themeStyles.gradient} p-8 relative`}>
                  {/* Main Visual */}
                  <div className="bg-gradient-to-br from-gray-100 to-gray-200 h-96 rounded-2xl flex items-center justify-center relative overflow-hidden">
                    {/* Animated Background Pattern */}
                    <div className="absolute inset-0 opacity-10">
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#000_1px,transparent_1px)] bg-[size:50px_50px]" />
                    </div>
                    
                    <div className="text-center relative z-10">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                        className="text-6xl mb-4"
                      >
                        {currentChapter.icon}
                      </motion.div>
                      <p className="text-gray-600 font-serif text-lg">Story Visual: {currentChapter.title}</p>
                    </div>
                  </div>
                  
                  {/* Floating Elements */}
                  <motion.div
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 3, repeat: Infinity }}
                    className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full"
                  />
                  <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 4, repeat: Infinity, delay: 1 }}
                    className="absolute -bottom-2 -left-2 w-8 h-8 bg-gradient-to-r from-green-400 to-teal-400 rounded-full"
                  />
                </div>

                {/* Decorative Orbital Elements */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                  className="absolute -top-8 -right-8 w-32 h-32 border-2 border-blue-200/30 rounded-full"
                />
                <motion.div
                  animate={{ rotate: -360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="absolute -bottom-8 -left-8 w-40 h-40 border-2 border-purple-200/30 rounded-full"
                />
              </motion.div>
            </motion.div>
          </AnimatePresence>

          {/* Enhanced Progress Indicator */}
          <motion.div 
            className="flex justify-center mt-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
          >
            <div className="flex items-center space-x-8">
              <div className="flex space-x-2">
                {chapters.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setActiveChapter(index)
                      setIsAutoPlaying(false)
                    }}
                    className={`relative w-3 h-3 rounded-full transition-all duration-300 ${
                      index === activeChapter
                        ? `bg-gradient-to-r ${themeStyles.darkGradient}`
                        : 'bg-gray-300 hover:bg-gray-400'
                    }`}
                  >
                    {index === activeChapter && (
                      <motion.div
                        layoutId="progressIndicator"
                        className="absolute inset-0 rounded-full bg-current"
                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                      />
                    )}
                  </button>
                ))}
              </div>
              
              <div className="text-sm text-gray-500">
                {activeChapter + 1} of {chapters.length} stories
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
