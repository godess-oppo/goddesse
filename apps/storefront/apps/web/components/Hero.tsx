'use client';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const Hero = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.3 },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <section className="relative flex h-screen w-full flex-col items-center justify-center overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 z-0 bg-risn-dark">
        <div className="absolute bottom-0 left-[-20%] right-0 top-[-10%] h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle_farthest-side,rgba(58,141,255,0.15),rgba(255,255,255,0))]"></div>
        <div className="absolute bottom-[-10%] right-[-20%] top-0 h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle_farthest-side,rgba(58,141,255,0.1),rgba(255,255,255,0))]"></div>
      </div>
      
      <motion.div
        className="relative z-10 flex flex-col items-center text-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Abstract Waveform/Model Placeholder */}
        <motion.div variants={itemVariants} className="mb-8 h-48 w-full px-4">
           <div className="mx-auto h-full w-full max-w-3xl animate-subtle-breathing rounded-lg bg-contain bg-center bg-no-repeat" style={{backgroundImage: 'url(/hero-waveform.svg)', filter: 'invert(1) opacity(0.5)'}} />
        </motion.div>
        
        <motion.h1 
          variants={itemVariants} 
          className="text-4xl font-bold tracking-tighter text-risn-light md:text-6xl lg:text-7xl"
        >
          AI Fashion Genome™
        </motion.h1>
        <motion.p 
          variants={itemVariants} 
          className="mt-4 max-w-2xl text-lg text-risn-gray-200 md:text-xl"
        >
          Your style is unique. Your wardrobe should be intelligent.
        </motion.p>
        
        <motion.div variants={itemVariants} className="mt-10">
          <button className="group relative inline-flex h-12 items-center justify-center overflow-hidden rounded-full bg-risn-blue px-8 font-medium text-risn-dark transition-all duration-300 hover:scale-105 active:scale-100">
            <span className="relative z-10 flex items-center">
              Enter Your Fashion Intelligence
              <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </span>
          </button>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
