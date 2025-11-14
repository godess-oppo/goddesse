'use client';
import Link from 'next/link';
import { useState } from 'react';
import { sensoryProducts } from '@/lib/temporal/sensory-products';
import TemporalNavigator from '@/components/temporal/TemporalNavigator';

export default function TemporalProductPage({ 
  params 
}: { 
  params: { period: string; id: string } 
}) {
  const [activeSense, setActiveSense] = useState<string | null>(null);
  const product = sensoryProducts[params.id as keyof typeof sensoryProducts];
  
  if (!product) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl mb-4">Product Not Found</h1>
          <Link href="/" className="text-amber-400 hover:text-amber-300">
            ← Back to Time Portal
          </Link>
        </div>
      </div>
    );
  }

  const eraStyles = {
    '1920s': { 
      bg: 'bg-gradient-to-br from-yellow-900 to-amber-900',
      border: 'border-yellow-500',
      text: 'text-yellow-300'
    },
    '1990s': { 
      bg: 'bg-gradient-to-br from-green-900 to-blue-900',
      border: 'border-green-500', 
      text: 'text-green-300'
    },
    '2050s': { 
      bg: 'bg-gradient-to-br from-cyan-900 to-purple-900',
      border: 'border-cyan-500',
      text: 'text-cyan-300'
    }
  };

  const eraStyle = eraStyles[params.period as keyof typeof eraStyles] || eraStyles['2050s'];

  const SenseButton = ({ sense, emoji, description }: { sense: string; emoji: string; description: string }) => (
    <button
      onClick={() => setActiveSense(activeSense === sense ? null : sense)}
      className={`p-4 rounded-full transition-all duration-300 hover:scale-110 ${
        activeSense === sense ? 'bg-amber-500 text-black scale-110' : 'bg-white/10 text-white'
      }`}
      title={description}
    >
      <span className="text-2xl">{emoji}</span>
    </button>
  );

  return (
    <>
      <TemporalNavigator />
      <div className={`min-h-screen text-white p-8 ${eraStyle.bg}`}>
        <div className="max-w-6xl mx-auto">
          <Link href="/" className="text-amber-400 hover:text-amber-300 mb-8 inline-block">
            ← Back to Time Portal
          </Link>
          
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Product Visual & Senses */}
            <div className="space-y-8">
              <div className={`rounded-2xl p-8 border-2 ${eraStyle.border} backdrop-blur-sm`}>
                <h1 className="text-4xl font-bold mb-2 capitalize">{params.id.replace(/-/g, ' ')}</h1>
                <div className={`text-xl mb-4 ${eraStyle.text}`}>
                  {params.period} Era Experience
                </div>
                
                <div className="aspect-square bg-gradient-to-br from-gray-800 to-black rounded-xl flex items-center justify-center mb-6">
                  <div className="text-center">
                    <div className="text-3xl mb-2">👕</div>
                    <div className="text-gray-400">3D Product Visual</div>
                    <div className="text-sm text-amber-400 mt-2">Hover to feel texture</div>
                  </div>
                </div>

                {/* Sensory Interface */}
                <div className="text-center">
                  <h3 className="text-lg font-semibold mb-4">Experience Through Senses</h3>
                  <div className="flex justify-center gap-4">
                    <SenseButton sense="sound" emoji="🎵" description={product.sound.description} />
                    <SenseButton sense="smell" emoji="👃" description={product.smell.description} />
                    <SenseButton sense="taste" emoji="👅" description={product.taste.description} />
                    <SenseButton sense="touch" emoji="✋" description={product.touch.description} />
                    <SenseButton sense="aura" emoji="🌈" description={`Aura: ${product.aura.color}`} />
                  </div>
                </div>
              </div>

              {/* Active Sense Display */}
              {activeSense && (
                <div className={`rounded-2xl p-6 border ${eraStyle.border} backdrop-blur-sm`}>
                  <div className="text-lg font-semibold mb-2 capitalize">{activeSense}</div>
                  <div className="text-gray-200">
                    {activeSense === 'sound' && product.sound.description}
                    {activeSense === 'smell' && product.smell.description}
                    {activeSense === 'taste' && product.taste.description}
                    {activeSense === 'touch' && product.touch.description}
                    {activeSense === 'aura' && (
                      <div>
                        <div>Color: <span style={{ color: product.aura.color }}>{product.aura.color}</span></div>
                        <div>Emotion: {product.aura.emotion}</div>
                        <div>Energy: {product.aura.energy}</div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Product Story & Purchase */}
            <div className="space-y-8">
              <div className={`rounded-2xl p-8 border ${eraStyle.border} backdrop-blur-sm`}>
                <h2 className="text-2xl font-semibold mb-4">Temporal Story</h2>
                <div className="space-y-4 text-gray-200">
                  <p>
                    This piece exists simultaneously across all time periods, adapting its essence 
                    to each era while maintaining its core sensory identity.
                  </p>
                  
                  {params.period === '1920s' && (
                    <p>
                      In the Art Deco era, this garment represents the modern spirit - geometric precision 
                      meets liberated elegance. Each thread contains the optimism of a world rebuilding.
                    </p>
                  )}
                  
                  {params.period === '1990s' && (
                    <p>
                      During the digital revolution, this piece became a cybernetic interface - 
                      bridging the gap between analog past and digital future in the dawn of the internet age.
                    </p>
                  )}
                  
                  {params.period === '2050s' && (
                    <p>
                      In the quantum future, this garment evolves into a neural-adaptive interface - 
                      learning your biometric patterns and optimizing comfort through AI integration.
                    </p>
                  )}
                </div>
              </div>

              {/* Era-Specific Purchase */}
              <div className={`rounded-2xl p-8 border-2 ${eraStyle.border} backdrop-blur-sm`}>
                <div className="text-center space-y-6">
                  <div>
                    <div className="text-2xl font-bold mb-2">$89</div>
                    <div className="text-sm text-gray-300">
                      {params.period === '1920s' && 'Investment in timeless elegance'}
                      {params.period === '1990s' && 'CREDITS: 89.00'}
                      {params.period === '2050s' && 'Energy Credits: 89.00'}
                    </div>
                  </div>
                  
                  <button className={`w-full py-4 px-8 rounded-full text-lg font-semibold transition-all duration-300 hover:scale-105 bg-amber-500 text-black`}>
                    {params.period === '1920s' && '📞 Place Order via Telegram'}
                    {params.period === '1990s' && '💾 ADD TO CART [ENTER]'}
                    {params.period === '2050s' && '🌌 Initiate Neural Purchase'}
                  </button>
                  
                  <div className="text-sm text-gray-400">
                    {params.period === '1920s' && 'Delivery via pneumatic tube within 48 hours'}
                    {params.period === '1990s' && 'FREE SHIPPING on orders over 50 credits'}
                    {params.period === '2050s' && 'Quantum delivery: Instant materialization'}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
