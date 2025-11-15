'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { ProductGrid } from '@/components/product/ProductGrid';
import { AIRecommendationSection } from '@/components/ai/AIRecommendationSection';
import { useProducts } from '@/hooks/useProducts';
import { useAI } from '@/hooks/useAI';

export default function Home() {
  const { products, loading: productsLoading } = useProducts({ limit: 8 });
  const { recommendations, loading: aiLoading } = useAI();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    
   
setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="hero-gradient py-20 md:py-32">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Fashion Reinvented with <span className="text-pink-200">AI</span>
          </h1>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Discover personalized fashion recommendations, virtual try-ons, and smart styling with our AI-powered platform
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-pink-600 hover:bg-pink-50">
              Shop Now
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
              Try Virtual Fitting
            </Button>
          </div>
        </div>
      </section>

      {/* AI Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">AI-Powered Fashion Experience</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="ai-feature-card">
              <h3 className="text-xl font-bold mb-2">Personalized Recommendations</h3>
              <p>Get fashion suggestions tailored to your style, body type, and preferences</p>
            </div>
            <div className="ai-feature-card">
              <h3 className="text-xl font-bold mb-2">Virtual Try-On</h3>
              <p>See how clothes look on you before buying with our AR technology</p>
            </div>
            <div className="ai-feature-card">
              <h3 className="text-xl font-bold mb-2">Smart Styling</h3>
              <p>Create perfect outfits with AI-powered styling assistance</p>
            </div>
          </div>
        </div>
      </section {/* Featured Products */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">Featured Products</h2>
            <Link href="/shop" className="text-pink-600 hover:underline">
              View All
            </Link>
          </div>
          {productsLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="bg-gray-200 rounded-xl h-80 loading-pulse"></div>
              ))}
            </div>
          ) : (
            <ProductGrid products={products} />
          )}
        </div>
      </section>

      {/* AI Recommendations */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Recommended For You</h2>
          {aiLoading ? (
            <div className="text-center">Loading AI recommendations...</div>
          ) : (
            <AIRecommendationSection recommendations={recommendations} />
          )}
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">What Our Customers Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="testimonial-card">
              <p className="mb-4">"FashionPod's virtual try-on saved me so much time and money

    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="hero-gradient py-20 md:py-32">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Fashion Reinvented with <span className="text-pink-200">AI</span>
          </h1>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Discover personalized fashion recommendations, virtual try-ons, and smart styling with our AI-powered platform
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-pink-600 hover:bg-pink-50">
              Shop Now
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
              Try Virtual Fitting
            </Button>
          </div>
        </div>
      </section>

      {/* AI Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">AI-Powered Fashion Experience</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="ai-feature-card">
              <h3 className="text-xl font-bold mb-2">Personalized Recommendations</h3>
              <p>Get fashion suggestions tailored to your style, body type, and preferences</p>
            </div>
            <div className="ai-feature-card">
              <h3 className="text-xl font-bold mb-2">Virtual Try-On</h3>
              <p>See how clothes look on you before buying with our AR technology</p>
            </div>
            <div className="ai-feature-card">
              <h3 className="text-xl font-bold mb-2">Smart Styling</h3>
              <p>Create perfect outfits with AI-powered styling assistance</p>
            </div>
          </div>
        </div>
      </section {/* Featured Products */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">Featured Products</h2>
            <Link href="/shop" className

    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="hero-gradient py-20 md:py-32">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Fashion Reinvented with <span className="text-pink-200">AI</span>
          </h1>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Discover personalized fashion recommendations, virtual try-ons, and smart styling with our AI-powered platform
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-pink-600 hover:bg-pink-50">
              Shop Now
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
              Try Virtual Fitting
            </Button>
          </div>
        </div>
      </section>

      {/* AI Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">AI-Powered Fashion Experience</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="ai-feature-card">
              <h3 className="text-xl font-bold mb-2">Personalized Recommendations</h3>
              <p>Get fashion suggestions tailored to your style, body type, and preferences</p>
            </div>
            <div className="ai-feature-card">
              <h3 className="text-xl font-bold mb-2">Virtual Try-On</h3>
              <p>See how clothes look

    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="hero-gradient py-20 md:py-32">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Fashion Reinvented with <span className="text-pink-200">AI</span>
          </h1>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Discover personalized fashion recommendations, virtual try-ons, and smart styling with our AI-powered platform
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-pink-600 hover:bg-pink-50">
              Shop Now
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
              Try Virtual Fitting
            </Button>
          </div>
        </div>
      </section>

      {/* AI Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">AI-Powered Fashion Experience</h2>
          <div className="grid grid-cols-1

    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="hero-gradient py-20 md:py-32">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Fashion Reinvented with <span className="text-pink-200">AI</span>
          </h1>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Discover personalized fashion recommendations, virtual try-ons, and smart styling with our AI-powered platform
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-pink-600 hover:bg-pink-50">
              Shop Now
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
              Try Virtual Fitting
            </Button>
          </div>
        </div>
      </section>

      {/* AI Features Section */}
      <section className="py-16 bg

    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="hero-gradient py-20 md:py-32">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Fashion Reinvented with <span className="text-pink-200">AI</span>
          </h1>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Discover personalized fashion recommendations, virtual try-ons, and smart styling with our AI-powered platform
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg

    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="hero-gradient py-20 md:py-32">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Fashion Reinvented with <span className="text-pink-200">AI</span>
          </h1>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Discover personalized fashion recommendations, virtual try-ons, and smart styling with our AI-powered platform
          </p>
          <div className="flex flex-col sm:flex-row

    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="hero-gradient py-20 md:py-32">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Fashion Reinvented with <span className="text-pink-200">AI</span>
          </h1>
          <p className="text-xl text-white/

    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="hero-gradient py-20 md:py-32">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold
<div className="min-h-screen">
      {/* Hero Section */}
      <section className="hero-gradient py-20 md:py-32">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Fashion Reinvented with <span className="text-pink-200">AI</span>
          </h1>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Discover personalized fashion recommendations, virtual try-ons, and smart styling with our AI-powered platform
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-pink-600 hover:bg-pink-50">
              Shop Now
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
              Try Virtual Fitting
            </Button>
          </div>
        </div>
      </section>

      {/* AI Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">AI-Powered Fashion Experience</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="ai-feature-card">
              <h3 className="text-xl font-bold mb-2">Personalized Recommendations</h3>
              <p>Get fashion suggestions tailored to your style, body type, and preferences</p>
            </div>
            <div className="ai-feature-card">
              <h3 className="text-xl font-bold mb-2">Virtual Try-On</h3>
              <p>See how clothes look on you before buying with our AR technology</p>
            </div>
            <div className="ai-feature-card">
              <h3 className="text-xl font-bold mb-2">Smart Styling</h3>
              <p>Create perfect outfits with AI-powered styling assistance</p>
            </div>
          </div>
        </div>
      </section {/* Featured Products */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">Featured Products</h2>
            <Link href="/shop" className="text-pink-600 hover:underline">
              View All
            </Link>
          </div>
          {productsLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="bg-gray-200 rounded-xl h-80 loading-pulse"></div>
              ))}
            </div>
          ) : (
            <ProductGrid products={products} />
          )}
        </div>
      </section>

      {/* AI Recommendations */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Recommended For You</h2>
          {aiLoading ? (
            <div className="text-center">Loading AI recommendations...</div>
          ) : (
            <AIRecommendationSection recommendations={recommendations} />
          )}
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">What Our Customers Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="testimonial-card">
              <p className="mb-4">"FashionPod's virtual try-on saved me so much time and money. I found the perfect dress for my wedding!"</p>
              <p className="font-semibold">- Sarah M.</p>
            </div>
            <div className="testimonial-card">
              <p className="mb-4">"The AI recommendations are incredibly accurate. It's like having a personal stylist 24/7!"</p>
              <p className="font-semibold">- James T.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-pink-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Fashion Experience?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join thousands of fashion enthusiasts who have discovered their perfect style with FashionPod
          </p>
          <Button size="lg" className="bg-white text-pink-600 hover:bg-pink-50">
            Get Started Today
          </Button>
        </div>
      </section>
    </div>
  );
}
