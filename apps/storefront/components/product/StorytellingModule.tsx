'use client';

import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface Story {
  id: string;
  type: 'video' | 'image';
  src: string;
  title: string;
  subtitle: string;
  cta: string;
}

const stories: Story[] = [
  {
    id: '1',
    type: 'video',
    src: '/atelier-process.mp4',
    title: 'In the Atelier',
    subtitle: 'Hand-finished garments crafted in Porto',
    cta: 'Watch Full Film',
  },
  {
    id: '2',
    type: 'image',
    src: '/fabric-closeup.webp',
    title: 'Material Studies',
    subtitle: 'Italian linen meets Japanese indigo',
    cta: 'Explore Fabrics',
  },
  {
    id: '3',
    type: 'video',
    src: '/designer-interview.mp4',
    title: 'Creative Director's Vision',
    subtitle: 'A conversation on temporal design',
    cta: 'Read Interview',
  },
];

export const StorytellingModule = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    // Horizontal scroll animation
    const scrollWidth = carousel.scrollWidth - window.innerWidth;

    gsap.to(carousel, {
      x: -scrollWidth,
      ease: 'none',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: () => `+=${scrollWidth}`,
        scrub: 1,
        pin: true,
        anticipatePin: 1,
      },
    });
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative bg-[#0A0A0A] overflow-hidden"
      style={{ height: '100vh' }}
    >
      {/* Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-[#1A1A2E] z-50">
        <motion.div
          className="h-full bg-[#D4AF37]"
          style={{
            scaleX: ScrollTrigger.getById('storytelling')?.progress || 0,
            transformOrigin: 'left',
          }}
        />
      </div>

      <div
        ref={carouselRef}
        className="flex items-center h-full"
        style={{ width: `${stories.length * 100}vw` }}
      >
        {stories.map((story, index) => (
          <div
            key={story.id}
            className="relative flex-shrink-0 w-screen h-full px-12 flex items-center justify-center"
          >
            {/* Media */}
            {story.type === 'video' ? (
              <video
                autoPlay
                muted
                loop
                playsInline
                className="w-full max-w-5xl h-[70vh] object-cover rounded-sm"
              >
                <source src={story.src} type="video/mp4" />
              </video>
            ) : (
              <img
                src={story.src}
                alt={story.title}
                className="w-full max-w-5xl h-[70vh] object-cover rounded-sm"
              />
            )}

            {/* Overlay Content */}
            <div className="absolute bottom-20 left-12 right-12 max-w-2xl">
              <h3 className="font-[Playfair_Display] text-5xl text-[#F8F7F4] mb-3">
                {story.title}
              </h3>
              <p className="text-[#F8F7F4]/70 text-lg mb-6">
                {story.subtitle}
              </p>
              <button className="text-[#D4AF37] text-sm tracking-widest uppercase border-b border-[#D4AF37] pb-1 hover:text-white hover:border-white transition-colors">
                {story.cta} →
              </button>
            </div>

            {/* Story Counter */}
            <div className="absolute top-12 right-12 text-[#F8F7F4]/50 font-[JetBrains_Mono] text-sm">
              {String(index + 1).padStart(2, '0')} / {String(stories.length).padStart(2, '0')}
            </div>
          </div>
        ))}
      </div>

      {/* Scroll Hint */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex items-center gap-3 text-[#F8F7F4]/60 text-xs tracking-widest">
        <span>DRAG TO EXPLORE</span>
        <svg className="w-5 h-5 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </div>
    </section>
  );
};
