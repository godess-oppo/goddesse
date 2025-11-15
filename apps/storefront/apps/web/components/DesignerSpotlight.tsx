'use client';
import { motion } from 'framer-motion';

const DesignerSpotlight = () => {
    return (
        <section className="py-20 md:py-32">
            <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-4 lg:grid-cols-2">
                <motion.div
                    className="order-2 lg:order-1"
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                >
                    <p className="font-mono text-sm text-risn-blue">COLLABORATION_001</p>
                    <h2 className="mt-2 text-3xl font-bold tracking-tighter text-risn-light md:text-5xl">
                        Anya Volkov x RISN
                    </h2>
                    <p className="mt-6 text-lg text-risn-gray-200">
                        Explore the "Bio-Luminescent" micro-collection, a fusion of organic patterns and generative design. Anya used RISN's proprietary pattern synthesizer to create fabrics that react to ambient light.
                    </p>
                    <button className="mt-8 text-risn-blue font-semibold hover:text-risn-light transition-colors">
                        Discover the Collection &rarr;
                    </button>
                </motion.div>
                <motion.div
                    className="order-1 lg:order-2 aspect-[4/3] w-full rounded-lg bg-cover bg-center"
                    style={{ backgroundImage: 'url(/designer-collab.png)', backgroundColor: '#111' }}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInVew={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                />
            </div>
        </section>
    );
};

export default DesignerSpotlight;
