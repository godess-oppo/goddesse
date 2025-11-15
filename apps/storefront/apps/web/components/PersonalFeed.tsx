'use client';
import { motion } from 'framer-motion';
import { Calendar, Cloud, Sun } from 'lucide-react';

const feedItems = [
  { type: 'outfit', title: 'Kyoto Tech-Kimono', context: 'For your upcoming trip' },
  { type: 'mood', title: 'Serene Focus', context: 'Minimalist pieces for deep work' },
  { type: 'outfit', title: 'Berlin Archive Blazer', context: 'A predicted style shift' },
  { type: 'event', title: 'Upcoming Wedding', context: 'Formalwear recommendations', icon: <Calendar /> },
  { type: 'event', title: 'Project Zenith Launch', context: 'Power-casual options', icon: <Cloud /> },
  { type: 'mood', title: 'Solarpunk Optimism', context: 'Vibrant & sustainable fabrics' },
];

const PersonalFeed = () => {
  const scrollContainer = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 50 },
    show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100 } },
  };

  return (
    <section className="w-full py-20 md:py-32">
      <div className="mx-auto max-w-7xl px-4 text-center">
        <h2 className="text-3xl font-bold tracking-tighter text-risn-light md:text-5xl">Your Dynamic Feed</h2>
        <p className="mt-4 text-lg text-risn-gray-200">Outfits and moods, predicted for your life.</p>
      </div>
      <motion.div 
        className="mt-16 flex gap-6 overflow-x-auto px-4 pb-8"
        style={{ scrollbarWidth: 'none', '-ms-overflow-style': 'none' }}
        variants={scrollContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
      >
        {feedItems.map((feedItem, index) => (
          <motion.div
            key={index}
            variants={item}
            className="flex h-80 w-64 flex-shrink-0 flex-col justify-end rounded-lg border border-risn-gray-800 bg-risn-gray-900/50 p-6 backdrop-blur-sm transition-colors hover:bg-risn-gray-800/70"
          >
            {feedItem.icon && <div className="mb-auto text-risn-blue">{feedItem.icon}</div>}
            <h3 className="text-xl font-bold text-risn-light">{feedItem.title}</h3>
            <p className="text-sm text-risn-gray-200">{feedItem.context}</p>
          </motion.div>
        ))}
        {/* Add a fade element at the end */}
        <div className="flex-shrink-0 w-24 h-80 bg-gradient-to-l from-risn-dark to-transparent" />
      </motion.div>
    </section>
  );
};

export default PersonalFeed;
