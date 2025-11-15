'use client';
import { motion } from 'framer-motion';
import { UploadCloud, ScanLine } from 'lucide-react';

const BodyTwin = () => {
  return (
    <section className="bg-risn-gray-900 py-20 md:py-32">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-16 px-4 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2 className="text-3xl font-bold tracking-tighter text-risn-light md:text-5xl">Meet Your Body-Twin™</h2>
          <p className="mt-6 text-lg text-risn-gray-200">
            A hyper-realistic digital avatar for perfect-fit virtual try-ons. We analyze your form, posture, and measurements to create a twin that is dimensionally exact. No more returns.
          </p>
          <div className="mt-10">
            <button className="group relative inline-flex h-12 items-center justify-center overflow-hidden rounded-md border border-risn-blue bg-transparent px-8 font-medium text-risn-blue transition-colors duration-300 hover:bg-risn-blue hover:text-risn-dark">
              <UploadCloud className="mr-3 h-5 w-5" />
              Upload Photos &rarr; Generate Twin
            </button>
          </div>
        </motion.div>
        <motion.div
          className="relative flex h-96 items-center justify-center rounded-lg border-2 border-dashed border-risn-gray-700 bg-black/20 lg:h-auto"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="absolute inset-0 bg-contain bg-center bg-no-repeat opacity-40" style={{backgroundImage: 'url(/body-twin-scan.png)'}} />
          <div className="z-10 flex flex-col items-center text-risn-gray-700">
            <ScanLine className="h-16 w-16" />
            <p className="mt-4 font-mono text-sm">AWAITING BIOMETRIC DATA</p>
          </div>
          {/* Animated Scan Line */}
          <div className="absolute top-0 left-0 h-1 w-full bg-risn-blue/80 shadow-[0_0_20px_theme(colors.risn-blue)] animate-[scan_4s_ease-in-out_infinite]" style={{ animationName: 'scan' }}/>
          <style jsx>{`
            @keyframes scan {
              0% { transform: translateY(0); }
              50% { transform: translateY(100%); }
              100% { transform: translateY(0); }
            }
            div[style*="animationName: 'scan'"] { animation: scan 4s cubic-bezier(0.4, 0, 0.2, 1) infinite; }
          `}</style>
        </motion.div>
      </div>
    </section>
  );
};

export default BodyTwin;
