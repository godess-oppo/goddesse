import { useTemporalStore } from './store';
import type { Era } from './types';

interface TemporalCartItem {
  productId: string;
  basePrice: number;
  addedInEra: Era;
  eraSpecificData: Record<Era, {
    price: number;
    availability: 'archived' | 'available' | 'pre-order';
    description: string;
    estimatedDelivery: string;
  }>;
}

export class TemporalCart {
  // When viewing cart in different era, items transform
  getCartForEra(items: TemporalCartItem[], currentEra: Era) {
    return items.map(item => {
      const eraData = item.eraSpecificData[currentEra];
      
      return {
        ...item,
        displayPrice: this.calculateTemporalPrice(item, currentEra),
        status: eraData.availability,
        note: this.generateTemporalNote(item, currentEra),
      };
    });
  }

  calculateTemporalPrice(item: TemporalCartItem, era: Era): number {
    const multipliers = {
      '1920s': 0.15, // Historical prices (adjusted for inflation)
      '1990s': 1.0,  // Base price
      '2050s': 2.5,  // Future premium + AI optimization
    };
    
    return item.basePrice * multipliers[era];
  }

  generateTemporalNote(item: TemporalCartItem, currentEra: Era): string {
    if (item.addedInEra === currentEra) return '';
    
    const notes = {
      '1920s': `Originally reserved in ${item.addedInEra}. Now available as archived curiosity.`,
      '1990s': `Added from ${item.addedInEra} timeline. Price adjusted for current market.`,
      '2050s': `Temporal import from ${item.addedInEra}. Neural pricing applied.`,
    };
    
    return notes[currentEra];
  }
}
