'use client';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

const drops = [
  { name: 'Chrono-Weave Parka', price: 0.87, image: '/drop1.png' },
  { name: 'Static-Field Trousers', price: 0.42, image: '/drop2.png' },
  { name: 'Reflexive Data-Visor', price: 1.15, image: '/drop3.png' },
  { name: 'Graphene Utility Vest', price: 0.65, image: '/drop4.png' },
];

const DropCard = ({ name, price, image }: typeof drops[0]) => {
  const [currentPrice, setCurrentPrice] = useState(price);
  const [priceKey, setPriceKey] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const change = (Math.random() - 0.5) * 0.02;
      setCurrentPrice(p => Math.max(0.1, p + change));
      setPriceKey(k => k + 1); // Remount component to trigger animation
    }, 2000 + Math.random() * 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div 
      className="group relative overflow-hidden rounded-lg border border-risn-gray-800 bg-risn-gray-900"
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <div className="aspect-square w-full bg-cover bg-center transition-transform duration-500 group-hover:scale-105" style={{ backgroundImage: `url(${image})`, backgroundColor: '#111' }}></div>
      <div className="p-4">
        <h3 className="font-semibold text-risn-light">{name}</h3>
        <div className="mt-2 flex items-center justify-between font-mono text-sm text-risn-gray-200">
          <span>Current Price</span>
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-risn-blue animate-pulse" />
            <span key={priceKey} className="animate-price-update">{currentPrice.toFixed(2)} ETH</span>
          </div>
        </div>
      </div>
      <div className="absolute inset-0 bg-black/20 opacity-0 transition-opacity group-hover:opacity-100 flex items-center justify-center">
        <span className="border border-white/50 px-4 py-2 rounded-full text-sm font-semibold backdrop-blur-sm">View Details</span>
      </div>
    </motion.div>
  );
}

const TrendingDrops = () => {
  return (
    <section className="py-20 md:py-32">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold tracking-tighter text-risn-light md:text-5xl">Trending Drops & Capsules</h2>
          <p className="mt-4 text-lg text-risn-gray-200">Curated by our Smart Merchandising AI.</p>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {drops.map(drop => (
            <DropCard key={drop.name} {...drop} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrendingDrops;
