'use client';
import { motion } from 'framer-motion';
import { Zap, HeartPulse, Sparkles } from 'lucide-react';

const TelemetryCard = ({ icon, title, value, unit, description, color }) => (
    <motion.div 
      className="rounded-lg border border-risn-gray-800 bg-risn-gray-900/50 p-6"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.8 }}
      transition={{ duration: 0.6 }}
    >
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-risn-light">{title}</h3>
        <div className={`text-${color}`}>{icon}</div>
      </div>
      <p className="mt-2 font-mono text-4xl font-bold text-risn-light">
        {value}<span className="text-lg font-medium text-risn-gray-200">{unit}</span>
      </p>
      <p className="mt-1 text-sm text-risn-gray-200">{description}</p>
    </motion.div>
);

const Telemetry = () => {
  return (
    <section className="bg-risn-gray-900 py-20 md:py-32">
      <div className="mx-auto max-w-7xl px-4">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tighter text-risn-light md:text-5xl">AI Closet Telemetry</h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-risn-gray-200">
            Your wardrobe, analyzed. Understand wear cycles, style evolution, and unlock new combinations.
          </p>
        </div>
        <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-3">
          <TelemetryCard 
            icon={<Zap size={24}/>} 
            title="Wardrobe Efficiency" 
            value="87" 
            unit="%"
            description="Utilization rate of owned items."
            color="risn-blue"
          />
          <TelemetryCard 
            icon={<HeartPulse size={24}/>} 
            title="Style Health Score" 
            value="9.2" 
            unit="/10"
            description="Alignment with your evolving taste."
            color="risn-blue-light"
          />
          <TelemetryCard 
            icon={<Sparkles size={24}/>} 
            title="Suggested Fits" 
            value="18" 
            unit=" new"
            description="AI-discovered outfits from your closet."
            color="white"
          />
        </div>
      </div>
    </section>
  )
}

export default Telemetry;
