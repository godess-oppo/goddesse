'use client';

import Image from 'next/image';

type Artisan = {
  id: string;
  name: string;
  role: string;
  img: string;
  quote: string; // ≤ 15 words
};

const artisans: Artisan[] = [
  {
    id: 'a1',
    name: 'Lila Mendoza',
    role: 'Weaver – Puno, Peru',
    img: '/images/artisans/lila.jpg',
    quote: 'Every thread carries a story.',
  },
  {
    id: 'a2',
    name: 'Arjun Patel',
    role: 'Ceramist – Khandala, India',
    img: '/images/artisans/arjun.jpg',
    quote: 'Fire remembers the hands that shape it.',
  },
  {
    id: 'a3',
    name: 'Mei Lin',
    role: 'Silk Re‑spinner – Suzhou, China',
    img: '/images/artisans/mei.jpg',
    quote: 'Waste is a silent luxury.',
  },
];

export default function SocialProof() {
  return (
    <section className="py-12 bg-white">
      <h2 className="text-3xl font-serif text-center mb-8">Artisan Voices</h2>
      <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-6">
        {artisans.map((a) => (
          <figure
            key={a.id}
            className="flex flex-col items-center text-center p-4"
          >
            <Image
              src={a.img}
              alt={a.name}
              width={96}
              height={96}
              className="rounded-full mb-3 object-cover"
            />
            <blockquote className="italic text-sm text-gray-700">
              “{a.quote}”
            </blockquote>
            <figcaption className="mt-2 text-xs text-gray-500">
              {a.name}, {a.role}
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
