'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { SensoryProfile, sensoryProducts } from '@/lib/sensory-schema';
import { useSensoryAudio } from '@/hooks/useSensoryAudio';

interface SensoryProductCardProps {
  product: {
    id: string;
    name: string;
    price: number;
    image: string;
    sensoryProfile: SensoryProfile;
  };
}

export default function SensoryProductCard({ product }: SensoryProductCardProps) {
  const [isHovering, setIsHovering] = useState(false);
  const [activeSense, setActiveSense] = useState<string | null>(null);
  const { playAmbientSound } = useSensoryAudio();

  const handleHover = () => {
    setIsHovering(true);
    playAmbientSound(product.id);
  };

  const handleSenseInteraction = (sense: string) => {
    setActiveSense(activeSense === sense ? null : sense);
  };

  const SenseIcon = ({ sense, emoji }: { sense: string; emoji: string }) => (
    <button
      onClick={() => handleSenseInteraction(sense)}
      className={`p-2 rounded-full transition-all duration-300 ${
        activeSense === sense 
          ? 'bg-amber-500/20 scale-110' 
          : 'bg-black/50 hover:bg-amber-500/10'
      }`}
      onMouseEnter={() => playAmbientSound(product.id)}
    >
      <span className="text-lg">{emoji}</span>
    </button>
  );

  return (
    <div 
      className="relative glass-morphism rounded-2xl p-6 hover-lift group"
      onMouseEnter={handleHover}
      onMouseLeave={() => {
        setIsHovering(false);
        setActiveSense(null);
      }}
      style={{
        borderColor: isHovering ? product.sensoryProfile.aura.color : 'rgba(255,255,255,0.1)',
        transition: 'all 0.5s ease'
      }}
    >
      {/* Aura Effect */}
      <div 
        className="absolute inset-0 rounded-2xl opacity-20 group-hover:opacity-40 transition-opacity duration-1000"
        style={{
          background: `radial-gradient(circle at center, ${product.sensoryProfile.aura.color}20, transparent)`,
          filter: 'blur(20px)'
        }}
      />

      {/* Product Image */}
      <div className="relative aspect-square mb-4 overflow-hidden rounded-xl bg-gradient-to-br from-gray-900 to-gray-800">
        <div className="w-full h-full flex items-center justify-center relative">
          <div 
            className="absolute inset-0 opacity-30 group-hover:opacity-60 transition-opacity duration-700"
            style={{
              background: `conic-gradient(from 0deg, ${product.sensoryProfile.aura.color}40, transparent, ${product.sensoryProfile.aura.color}40)`
            }}
          />
          <span className="text-gray-400 text-sm z-10">Product Image</span>
        </div>

        {/* Sensory Overlay */}
        {isHovering && (
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <div className="text-center space-y-2">
              <p className="text-amber-400 text-sm font-semibold">
                {product.sensoryProfile.aura.emotion}
              </p>
              <p className="text-gray-300 text-xs">
                {product.sensoryProfile.touch.description}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="relative z-10">
        <h3 className="text-xl font-semibold text-white mb-2">{product.name}</h3>
        <p className="text-2xl font-bold text-amber-400 mb-4">${product.price}</p>

        {/* Sensory Icons */}
        <div className="flex justify-between items-center mb-4">
          <SenseIcon sense="sound" emoji="🎵" />
          <SenseIcon sense="smell" emoji="👃" />
          <SenseIcon sense="taste" emoji="👅" />
          <SenseIcon sense="touch" emoji="✋" />
          <SenseIcon sense="aura" emoji="🌈" />
        </div>

        {/* Sensory Details */}
        {activeSense && (
          <div className="glass-morphism rounded-lg p-4 mb-4 animate-pulse">
            <p className="text-sm text-gray-300">
              {activeSense === 'sound' && product.sensoryProfile.sound.description}
              {activeSense === 'smell' && product.sensoryProfile.smell.description}
              {activeSense === 'taste' && product.sensoryProfile.taste.description}
              {activeSense === 'touch' && product.sensoryProfile.touch.description}
              {activeSense === 'aura' && `Aura: ${product.sensoryProfile.aura.color} - ${product.sensoryProfile.aura.emotion}`}
            </p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-3">
          <button className="flex-1 bg-amber-500 text-black py-3 rounded-full font-semibold hover:bg-amber-400 transition-colors text-sm">
            Feel This Piece
          </button>
          <Link 
            href={`/product/${product.id}`}
            className="flex-1 glass-morphism text-white py-3 rounded-full font-semibold hover:bg-white/10 transition-colors text-center text-sm"
          >
            Deep Dive
          </Link>
        </div>
      </div>
    </div>
  );
}
