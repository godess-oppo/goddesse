export interface SensoryProfile {
  sound: {
    description: string;
    frequency: number; // Hz
    waveform: 'sine' | 'square' | 'sawtooth' | 'triangle';
    duration: number; // ms
  };
  smell: {
    description: string;
    intensity: number; // 1-10
    notes: string[]; // scent notes
  };
  taste: {
    description: string;
    flavor: 'sweet' | 'savory' | 'umami' | 'bitter' | 'sour';
    intensity: number; // 1-10
    aftertaste: string;
  };
  touch: {
    description: string;
    texture: 'smooth' | 'rough' | 'silky' | 'crisp' | 'velvety';
    temperature: number; // Celsius perception
    weight: number; // perceived weight 1-10
  };
  aura: {
    color: string;
    emotion: string;
    energy: 'calm' | 'vibrant' | 'electric' | 'serene' | 'intense';
    pattern: string;
  };
}

export const sensoryProducts: Record<string, SensoryProfile> = {
  'quantum-shift-tee': {
    sound: {
      description: "Digital rain meeting silk wind chimes",
      frequency: 432,
      waveform: 'sine',
      duration: 2000
    },
    smell: {
      description: "Ozone after lightning storm with hint of bergamot",
      intensity: 7,
      notes: ["ozone", "bergamot", "petrichor", "static"]
    },
    taste: {
      description: "Cool mint with electric undertones",
      flavor: "sweet",
      intensity: 6,
      aftertaste: "lingering crispness like morning dew"
    },
    touch: {
      description: "Liquid silk flowing over smooth marble",
      texture: "silky",
      temperature: 18,
      weight: 3
    },
    aura: {
      color: "#4f46e5",
      emotion: "focused tranquility",
      energy: "electric",
      pattern: "swirling quantum patterns"
    }
  },
  'neo-classic-polo': {
    sound: {
      description: "Vintage vinyl crackle meets future bass",
      frequency: 256,
      waveform: 'sawtooth',
      duration: 1500
    },
    smell: {
      description: "Leather-bound books in a digital library",
      intensity: 6,
      notes: ["sandalwood", "digital ink", "aged paper", "innovation"]
    },
    taste: {
      description: "Dark chocolate with raspberry notes",
      flavor: "umami",
      intensity: 7,
      aftertaste: "rich and complex like a fine wine"
    },
    touch: {
      description: "Structured cotton with memory foam softness",
      texture: "velvety",
      temperature: 22,
      weight: 5
    },
    aura: {
      color: "#dc2626",
      emotion: "confident elegance",
      energy: "vibrant",
      pattern: "geometric precision"
    }
  },
  'holographic-motion-shirt': {
    sound: {
      description: "Crystalline frequencies shifting through dimensions",
      frequency: 528,
      waveform: 'triangle',
      duration: 3000
    },
    smell: {
      description: "Rainbow refraction in morning mist",
      intensity: 8,
      notes: ["rainwater", "prism", "clean air", "light"]
    },
    taste: {
      description: "Bubblegum clouds with electric sparkles",
      flavor: "sweet",
      intensity: 8,
      aftertaste: "fizzy rainbow dissolution"
    },
    touch: {
      description: "Butterfly wings brushing against liquid light",
      texture: "smooth",
      temperature: 20,
      weight: 2
    },
    aura: {
      color: "#7c3aed",
      emotion: "playful wonder",
      energy: "electric",
      pattern: "shifting iridescent waves"
    }
  }
};
