// LookbookCarousel.tsx
import React, { useState } from "react";

export interface Lookbook {
  id: string;
  title: string;
  subtitle?: string;
  imageUrl: string;
  link?: string;
  products?: { id: string; name: string; price: number; imageUrl: string }[];
}

interface LookbookCarouselProps {
  lookbooks: Lookbook[];
}

export const LookbookCarousel: React.FC<LookbookCarouselProps> = ({
  lookbooks,
}) => {
  const [index, setIndex] = useState(0);
  const next = () =>
    setIndex((i) => (i === lookbooks.length - 1 ? 0 : i + 1));
  const prev = () =>
    setIndex((i) => (i === 0 ? lookbooks.length - 1 : i - 1));
  const goTo = (i: number) => setIndex(i);

  const current = lookbooks[index];

  return (
    <div className="relative w-full max-w-6xl mx-auto">
      {/* Slides */}
      <div className="overflow-hidden rounded-xl">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {lookbooks.map((lb) => (
            <div key={lb.id} className="min-w-full flex-shrink-0 relative">
              <img
                src={lb.imageUrl}
                alt={lb.title}
                className="w-full h-80 md:h-96 object-cover"
              />
              <div className="absolute inset-0 bg-black/30 flex items-end">
                <div className="p-6 text-white">
                  <h3 className="text-2xl md:text-3xl font-bold mb-2">
                    {lb.title}
                  </h3>
                  {lb.subtitle && (
                    <p className="text-lg md:text-xl">{lb.subtitle}</p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Arrows */}
      <button
        onClick={prev}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow"
        aria-label="Previous"
      >
        <svg className="h-6 w-6 text-neutral-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button
        onClick={next}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow"
        aria-label="Next"
      >
        <svg className="h-6 w-6 text-neutral-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Dots */}
      <div className="flex justify-center mt-4 space-x-2">
        {lookbooks.map((_, i) => (
          <button
            key={i}
            className={`h-3 w-3 rounded-full ${
              i === index ? "bg-brand-600" : "bg-neutral-300"
            }`}
            aria-label={`Go to slide ${i + 1}`}
            onClick={() => goTo(i)}
          />
        ))}
      </div>

      {/* CTA */}
      {current?.link && (
        <a
          href={current.link}
          className="inline-block mt-6 bg-brand-600 hover:bg-brand-700 text-white px-6 py-3 rounded-md font-semibold"
        >
          Shop This Look
        </a>
      )}
    </div>
  );
};
