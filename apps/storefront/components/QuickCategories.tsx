'use client';

import Link from 'next/link';
import Image from 'next/image';

type Category = {
  id: string;
  title: string;
  img: string;
  href: string;
};

const categories: Category[] = [
  {
    id: 'm1',
    title: 'Material',
    img: '/images/categories/material.jpg',
    href: '/shop/material',
  },
  {
    id: 'c2',
    title: 'Craft Technique',
    img: '/images/categories/craft.jpg',
    href: '/shop/craft',
  },
  {
    id: 's3',
    title: 'Story Theme',
    img: '/images/categories/story.jpg',
    href: '/shop/story',
  },
];

export default function QuickCategories() {
  return (
    <section className="py-16 bg-gray-100">
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6">
        {categories.map((cat) => (
          <Link
            key={cat.id}
            href={cat.href}
            className="group relative block h-64 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300"
          >
            <Image
              src={cat.img}
              alt={cat.title}
              fill
              className="object-cover transform group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
              <h3 className="text-2xl font-serif text-white uppercase">
                {cat.title}
              </h3>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
