'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

type Slide = {
  id: number;
  img: string;
  title: string;
  essay: string;          // 40‑80 words
  portrait: string;
  campaignSlug: string;   // link to /campaigns/[slug]
};

const slides: Slide[] = [
  {
    id: 1,
    img: '/images/hero/linen-drape.jpg',
    title: 'The Quiet Elegance of Hand‑loomed Linen',
    essay:
      "In the hush of a sun‑lit atelier, master weaver Lila Mendoza coaxed a single thread into a breath‑taking drape. The linen’s weight carries the memory of the river that fed the flax fields, a reminder that luxury is patience.",
    portrait: '/images/curators/lila-mendoza.jpg',
    campaignSlug: 'linen-quiet',
  },
  {
    id: 2,
    img: '/images/hero/ceramic-glow.jpg',
    title: 'Fire‑kissed Ceramics from Khandala',
    essay:
      "Artisan Arjun Patel fires each vessel in a kiln that has never been turned on before a new batch. The resulting glaze is a living surface, shifting with the light of each sunrise.",
    portrait: '/images/curators/arjun-patel.jpg',
    campaignSlug: 'ceramic-fire',
  },
  {
    id: 3,
    img: '/images/hero/silk-cascade.jpg',
    title: 'Silk Cascades – a Tale of Re‑spun Threads',
    essay:
      "When the last silk cocoon is harvested, the leftover fibers are woven into a cascade that feels like water on skin. It is a quiet rebellion against waste.",
    portrait: '/images/curators/mei-lin.jpg',
    campaignSlug: 'silk-cascade',
  },
  {
    id: 4,
    img: '/images/hero/leather-patina.jpg',
    title: 'Patina‑kissed Leather from the Andes',
    essay:
      "Each hide is tanned using native quinoa oil, a technique passed down through five generations. The resulting patina tells a story of altitude, wind, and time.",
    portrait: '/images/curators/juan-carlos.jpg',
    campaignSlug: 'leather-patina',
  },
];

export default function HeroCarousel() {
  const [active, setActive] = useState(0);

  // Auto‑advance every 9 seconds (8‑10 s window)
  useEffect(() => {
    const timer = setInterval(() => {
      setActive((prev) => (prev + 1) % slides.length);
    }, 9000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative h-screen overflow-hidden">
      {slides.map((slide, i) => (
        <Link
          key={slide.id}
          href={`/campaigns/${slide.campaignSlug}`}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            i === active ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <Image
            src={slide.img}
            alt={slide.title}
            fill
            className="object-cover"
            priority={i === 0}
          />
          {/* Editorial overlay */}
          <div className="absolute inset-0 bg-black bg-opacity-30 flex items-end p-8">
            <div className="max-w-xl text-white">
              <h2 className="text-3xl md:text-5xl font-serif mb-4">
                {slide.title}
              </h2>
              <p className="text-base md:text-lg leading-relaxed max-w-prose">
                {slide.essay}
              </p>
              <div className="flex items-center mt-4">
                <Image
                  src={slide.portrait}
                  alt="Curator portrait"
                  width={48}
                  height={48}
                  className="rounded-full mr-3 object-cover"
                />
                <span className="text-sm italic">
                  Curated by{' '}
                  {slide.portrait
                    .split('/')
                    .pop()
                    ?.replace(/[-.]/g, ' ')
                    .replace(/\b\w/g, (c) => c.toUpperCase())}
                </span>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </section>
  );
}
