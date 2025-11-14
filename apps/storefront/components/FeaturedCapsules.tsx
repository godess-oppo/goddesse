'use client';

import Image from 'next/image';

type Capsule = {
  id: string;
  title: string;
  img: string;
  note: string; // curator note (≈ 40‑80 words)
};

const capsules: Capsule[] = [
  {
    id: 'c1',
    title: 'Linen Reverie',
    img: '/images/capsules/linen-reverie.jpg',
    note:
      'A three‑piece set hand‑loomed in the hills of Puno. The fabric is sourced from reclaimed flax, dyed with natural indigo harvested from the same river that once powered the local mills.',
  },
  {
    id: 'c2',
    title: 'Ceramic Whisper',
    img: '/images/capsules/ceramic-whisper.jpg',
    note:
      'Each vessel is fired once, never glazed, allowing the raw earth to speak. The subtle crackle is a signature of the open‑fire technique used by the Khandala collective.',
  },
  {
    id: 'c3',
    title: 'Silk Echo',
    img: '/images/capsules/silk-echo.jpg',
    note:
      'Re‑spun silk from discarded cocoons, woven into a fluid drape that catches light like a sigh. The process reduces textile waste by 78 % per garment.',
  },
];

export default function FeaturedCapsules() {
  return (
    <section className="py-16 bg-gray-50">
      <h2 className="text-4xl font-serif text-center mb-12">
        Curator Capsules
      </h2>
      <div className="grid md:grid-cols-3 gap-8 px-4">
        {capsules.map((c) => (
          <article
            key={c.id}
            className="bg-white rounded-lg shadow-lg overflow-hidden"
          >
            <Image
              src={c.img}
              alt={c.title}
              width={600}
              height={800}
              className="w-full object-cover"
            />
            <div className="p-6">
              <h3 className="text-2xl font-serif mb-3">{c.title}</h3>
              <p className="text-sm text-gray-700 leading-relaxed">{c.note}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
