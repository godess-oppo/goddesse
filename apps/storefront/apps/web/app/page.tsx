import Hero from '@/components/Hero';
import PersonalFeed from '@/components/PersonalFeed';
import BodyTwin from '@/components/BodyTwin';
import TrendingDrops from '@/components/TrendingDrops';
import Telemetry from '@/components/Telemetry';
import DesignerSpotlight from '@/components/DesignerSpotlight';
import Footer from '@/components/Footer';

export default function HomePage() {
  return (
    <main className="w-full overflow-x-hidden">
      <Hero />
      <PersonalFeed />
      <BodyTwin />
      <TrendingDrops />
      <Telemetry />
      <DesignerSpotlight />
      <Footer />
    </main>
  );
}
