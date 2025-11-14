import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Era, TemporalContext } from './types';

interface TemporalStore {
  currentEra: Era;
  isTransitioning: boolean;
  transitionProgress: number;
  previousEra: Era | null;
  
  setEra: (era: Era) => Promise<void>;
  getContext: () => TemporalContext;
}

export const useTemporalStore = create<TemporalStore>()(
  persist(
    (set, get) => ({
      currentEra: '2050s',
      isTransitioning: false,
      transitionProgress: 0,
      previousEra: null,

      setEra: async (era: Era) => {
        const current = get().currentEra;
        if (current === era) return;

        set({ 
          isTransitioning: true, 
          previousEra: current,
          transitionProgress: 0 
        });

        // Animate transition
        for (let i = 0; i <= 100; i += 5) {
          await new Promise(resolve => setTimeout(resolve, 20));
          set({ transitionProgress: i });
        }

        set({ 
          currentEra: era, 
          isTransitioning: false,
          transitionProgress: 100
        });

        // Trigger page re-render with new theme
        if (typeof window !== 'undefined') {
          document.documentElement.setAttribute('data-era', era);
        }
      },

      getContext: (): TemporalContext => {
        const era = get().currentEra;
        
        const contexts: Record<Era, TemporalContext> = {
          '1920s': {
            era: '1920s',
            currency: 'USD',
            pricingModel: 'fixed',
            language: 'formal',
            availability: 'archived',
          },
          '1990s': {
            era: '1990s',
            currency: 'USD',
            pricingModel: 'auction',
            language: 'slang',
            availability: 'current',
          },
          '2050s': {
            era: '2050s',
            currency: 'Credits',
            pricingModel: 'dynamic-ai',
            language: 'neural',
            availability: 'pre-order',
          },
        };

        return contexts[era];
      },
    }),
    {
      name: 'temporal-storage',
      partialize: (state) => ({ 
        currentEra: state.currentEra,
        previousEra: state.previousEra 
      }),
    }
  )
);
