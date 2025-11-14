import HeroCarousel from '@/components/HeroCarousel';
import FeaturedCapsules from '@/components/FeaturedCapsules';
import SustainabilitySnapshot from '@/components/SustainabilitySnapshot';
import QuickCategories from '@/components/QuickCategories';
import SocialProof from '@/components/SocialProof';
import ConversionElements from '@/components/ConversionElements';

// Example product – replace with real data from your CMS / DB
const exampleProduct = {
  id: 'p-001',
  name: 'Hand‑loomed Linen Drape',
  stock: 4,
  limitedBatch: true,
};

export default function HomePage() {
  return (
    <main className="font-sans antialiased text-gray-900">
      {/* 1️⃣  Editorial hero */}
      <HeroCarousel />

      {/* 2️⃣  Curated capsules */}
      <FeaturedCapsules />

      {/* 3️⃣  Sustainability impact */}
      <SustainabilitySnapshot />

      {/* 4️⃣  Quick‑shop categories */}
      <QuickCategories />

      {/* 5️⃣  Artisan social proof */}
      <SocialProof />

      {/* 6️⃣  Conversion – placed wherever you want a CTA */}
      <section className="max-w-4xl mx-auto px-4 py-12">
        <ConversionElements product={exampleProduct} />
      </section>
    </main>
  );
}
