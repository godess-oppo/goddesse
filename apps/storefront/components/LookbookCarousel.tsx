'use client'

import { useState, useEffect } from 'react'

interface LookbookSlide {
  id: string
  title: string
  description: string
  image: string
  theme: 'oppo' | 'goddess' | 'fusion'
  products: string[]
  mood: string
}

export const LookbookCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [autoPlay, setAutoPlay] = useState(true)
  const [slides, setSlides] = useState<LookbookSlide[]>([])

  useEffect(() => {
    const mockSlides: LookbookSlide[] = [
      {
        id: '1',
        title: 'Oppo Serenity',
        description: 'Asymmetric harmony meets minimalist elegance',
        image: '/lookbook/oppo-serenity.jpg',
        theme: 'oppo',
        products: ['Asymmetric Linen Dress', 'Wabi-Sabi Trousers'],
        mood: 'Calm & Grounded'
      },
      {
        id: '2',
        title: 'Goddess Radiance',
        description: 'Celestial beauty with empowered silhouettes',
        image: '/lookbook/goddess-radiance.jpg',
        theme: 'goddess',
        products: ['Divine Silk Gown', 'Empowerment Cape'],
        mood: 'Luminous & Powerful'
      },
      {
        id: '3',
        title: 'Sacred Fusion',
        description: 'Where Eastern philosophy meets Western grace',
        image: '/lookbook/sacred-fusion.jpg',
        theme: 'fusion',
        products: ['Fusion Kimono', 'Harmony Blazer'],
        mood: 'Balanced & Transformative'
      }
    ]
    
    setSlides(mockSlides)
  }, [])

  useEffect(() => {
    if (!autoPlay || slides.length === 0) return

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 6000)

    return () => clearInterval(interval)
  }, [autoPlay, slides.length])

  const getThemeGradient = (theme: string) => {
    switch (theme) {
      case 'oppo': return 'from-blue-500/20 to-cyan-400/20'
      case 'goddess': return 'from-purple-500/20 to-pink-400/20'
      case 'fusion': return 'from-orange-500/20 to-red-400/20'
      default: return 'from-gray-500/20 to-gray-400/20'
    }
  }

  const getThemeColor = (theme: string) => {
    switch (theme) {
      case 'oppo': return 'text-blue-600'
      case 'goddess': return 'text-purple-600'
      case 'fusion': return 'text-orange-600'
      default: return 'text-gray-600'
    }
  }

  if (slides.length === 0) {
    return (
      <div className="h-96 bg-gradient-to-br from-gray-100 to-gray-200 animate-pulse rounded-3xl" />
    )
  }

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#000_1px,transparent_1px)] bg-[size:50px_50px] animate-pulse" />
      </div>

      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-serif mb-4">
            Oppo × Goddess Lookbook
          </h2>
          <p className="text-gray-600">Discover your aesthetic energy through curated stories</p>
        </div>

        <div className="relative">
          {/* Main Carousel */}
          <div className="relative h-96 md:h-[600px] rounded-3xl overflow-hidden">
            {slides.map((slide, index) => (
              <div
                key={slide.id}
                className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
                  index === currentSlide
                    ? 'opacity-100 transform scale-100'
                    : 'opacity-0 transform scale-105'
                }`}
              >
                {/* Background Image Placeholder */}
                <div className={`absolute inset-0 bg-gradient-to-br ${getThemeGradient(slide.theme)}`}>
                  <div className="flex items-center justify-center h-full">
                    <div className="text-center text-white">
                      <div className="text-6xl mb-4">
                        {slide.theme === 'oppo' && '☯️'}
                        {slide.theme === 'goddess' && '✨'}
                        {slide.theme === 'fusion' && '⚡'}
                      </div>
                      <p className="text-2xl opacity-70">Lookbook Image: {slide.title}</p>
                    </div>
                  </div>
                </div>

                {/* Content Overlay */}
                <div className="absolute inset-0 bg-black/20" />
                
                <div className="relative z-10 flex items-end h-full p-8">
                  <div className="text-white max-w-md">
                    <span className={`inline-block px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm text-sm mb-4 ${getThemeColor(slide.theme)}`}>
                      {slide.mood}
                    </span>
                    <h3 className="text-3xl md:text-4xl font-serif mb-2">{slide.title}</h3>
                    <p className="text-lg opacity-90 mb-4">{slide.description}</p>
                    
                    <div className="flex items-center space-x-4">
                      <button className="bg-white text-black px-6 py-3 rounded-full hover:bg-gray-100 transition-colors font-medium">
                        Shop This Story
                      </button>
                      <button className="border border-white text-white px-6 py-3 rounded-full hover:bg-white/10 transition-colors">
                        Explore Mood
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-between mt-6">
            <div className="flex space-x-2">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentSlide
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500 w-8'
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                />
              ))}
            </div>

            <div className="flex space-x-4">
              <button
                onClick={() => setAutoPlay(!autoPlay)}
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-900"
              >
                <span>{autoPlay ? '⏸️' : '▶️'}</span>
                <span>{autoPlay ? 'Pause' : 'Play'}</span>
              </button>
              
              <div className="flex space-x-2">
                <button
                  onClick={() => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)}
                  className="w-10 h-10 rounded-full bg-white shadow-lg hover:shadow-xl transition-shadow flex items-center justify-center"
                >
                  ←
                </button>
                <button
                  onClick={() => setCurrentSlide((prev) => (prev + 1) % slides.length)}
                  className="w-10 h-10 rounded-full bg-white shadow-lg hover:shadow-xl transition-shadow flex items-center justify-center"
                >
                  →
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Mood Selector */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          {slides.map((slide, index) => (
            <div
              key={slide.id}
              onClick={() => setCurrentSlide(index)}
              className={`p-6 rounded-2xl cursor-pointer transition-all duration-300 ${
                currentSlide === index
                  ? 'ring-2 ring-opacity-50 transform scale-105'
                  : 'hover:scale-102'
              } ${getThemeGradient(slide.theme).replace('/20', '/10')}`}
            >
              <div className="flex items-center space-x-3">
                <div className="text-2xl">
                  {slide.theme === 'oppo' && '☯️'}
                  {slide.theme === 'goddess' && '✨'}
                  {slide.theme === 'fusion' && '⚡'}
                </div>
                <div>
                  <h4 className="font-serif text-lg">{slide.title}</h4>
                  <p className="text-sm text-gray-600">{slide.mood}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
