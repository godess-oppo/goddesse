'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

interface Collection {
  id: string;
  title: string;
  image: string;
  span: 'small' | 'wide' | 'tall' | 'large';
  badge?: 'Bestseller' | 'Limited Edition' | 'Sustainable';
  price?: string;
}

const collections: Collection[] = [
  {
    id: '1',
    title: 'Nocturnal Tailoring',
    image: '/collection-1.webp',
    span: 'large',
    badge: 'Bestseller',
  },
  {
    id: '2',
    title: 'Liquid Silk Series',
    image: '/collection-2.webp',
    span: 'wide',
    badge: 'Limited Edition',
    price: 'From $890',
  },
  {
    id: '3',
    title: 'Archive 2019',
    image: '/collection-3.webp',
    span: 'tall',
  },
  {
    id: '4',
    title: 'Regenerative Wool',
    image: '/collection-4.webp',
    span: 'small',
    badge: 'Sustainable',
    price: '$340',
  },
  {
    id: '5',
    title: 'Draped Minimalism',
    image: '/collection-5.webp',
    span: 'wide',
  },
  {
    id: '6',
    title: 'Urban Shadows',
    image: '/collection-6.webp',
    span: 'small',
    price: '$560',
  },
];

const spanClasses = {
  small: 'col-span-1 row-span-1',
  wide: 'col-span-2 row-span-1',
  tall: 'col-span-1 row-span-2',
  large: 'col-span-2 row-span-2',
};

const badgeStyles = {
  'Bestseller': 'bg-[#D4AF37] text-[#0A0A0A]',
  'Limited Edition': 'bg-[#C7522A] text-white',
  'Sustainable': 'bg-[#7A9B76] text-white',
};

export const FeaturedGrid = () => {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <section className="bg-[#F8F7F4] py-24 px-6 lg:px-12">
      <div className="max-w-[1920px] mx-auto">
        {/* Section Header */}
        <div className="mb-16 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="font-[Playfair_Display] text-[clamp(2rem,5vw,4rem)] text-[#0A0A0A] mb-4"
          >
            Curated Collections
          </motion.h2>
          <p className="text-[#6B6B6B] text-sm tracking-widest uppercase">
            Season FW25
          </p>
        </div>

        {/* Masonry Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-[300px]">
          {collections.map((collection, index) => (
            <motion.article
              key={collection.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`${spanClasses[collection.span]} relative group cursor-pointer overflow-hidden rounded-sm`}
              onMouseEnter={() => setHoveredId(collection.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              {/* Image with Parallax */}
              <motion.img
                src={collection.image}
                alt={collection.title}
                className="w-full h-full object-cover"
                animate={{
                  scale: hoveredId === collection.id ? 1.1 : 1,
                }}
                transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
              />

              {/* Color Overlay on Hover */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{
                  opacity: hoveredId === collection.id ? 1 : 0,
                }}
                transition={{ duration: 0.4 }}
                className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/60 to-transparent"
              />

              {/* Badge */}
              {collection.badge && (
                <div
                  className={`absolute top-4 left-4 px-3 py-1.5 text-[10px] font-bold tracking-widest uppercase ${badgeStyles[collection.badge]}`}
                >
                  {collection.badge}
                </div>
              )}

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                <h3 className="font-[Playfair_Display] text-2xl text-white mb-2">
                  {collection.title}
                </h3>
                
                {collection.price && (
                  <p className="text-[#F8F7F4]/80 text-sm font-[JetBrains_Mono] mb-4">
                    {collection.price}
                  </p>
                )}

                {/* Hidden CTA (appears on hover) */}
                <motion.button
                  initial={{ opacity: 0, y: 10 }}
                  animate={{
                    opacity: hoveredId === collection.id ? 1 : 0,
                    y: hoveredId === collection.id ? 0 : 10,
                  }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                  className="text-white text-sm tracking-widest uppercase border-b border-white pb-1 hover:border-[#D4AF37] hover:text-[#D4AF37] transition-colors"
                >
                  View Collection →
                </motion.button>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};
