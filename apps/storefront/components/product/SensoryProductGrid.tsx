'use client';

import SensoryProductCard from './SensoryProductCard';
import { sensoryProducts } from '@/lib/sensory-schema';

const products = [
  {
    id: 'quantum-shift-tee',
    name: 'Quantum Shift Tee',
    price: 89,
    image: '/images/quantum-tee.jpg',
    sensoryProfile: sensoryProducts['quantum-shift-tee']
  },
  {
    id: 'neo-classic-polo',
    name: 'Neo-Classic Polo',
    price: 119,
    image: '/images/neo-polo.jpg',
    sensoryProfile: sensoryProducts['neo-classic-polo']
  },
  {
    id: 'holographic-motion-shirt',
    name: 'Holographic Motion Shirt',
    price: 169,
    image: '/images/holographic.jpg',
    sensoryProfile: sensoryProducts['holographic-motion-shirt']
  }
];

export default function SensoryProductGrid() {
  return (
    <section className="py-20 px-4 bg-gradient-to-b from-black to-purple-900/10">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-amber-200 to-yellow-500 bg-clip-text text-transparent">
              Sensory Collection
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Experience fashion through all five senses. Each piece tells a multi-sensory story.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <SensoryProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Sensory Legend */}
        <div className="glass-morphism rounded-2xl p-6 mt-12 max-w-2xl mx-auto">
          <h3 className="text-lg font-semibold text-amber-400 mb-4 text-center">
            How to Experience Our Sensory Collection
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-center">
            <div>
              <div className="text-2xl mb-2">🎵</div>
              <div className="text-xs text-gray-400">Sound</div>
            </div>
            <div>
              <div className="text-2xl mb-2">👃</div>
              <div className="text-xs text-gray-400">Scent</div>
            </div>
            <div>
              <div className="text-2xl mb-2">👅</div>
              <div className="text-xs text-gray-400">Taste</div>
            </div>
            <div>
              <div className="text-2xl mb-2">✋</div>
              <div className="text-xs text-gray-400">Touch</div>
            </div>
            <div>
              <div className="text-2xl mb-2">🌈</div>
              <div className="text-xs text-gray-400">Aura</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
