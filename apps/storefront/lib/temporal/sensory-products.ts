export interface SensoryProfile {
  sound: {
    description: string;
    frequency: number;
    waveform: 'sine' | 'square' | 'sawtooth' | 'triangle';
    duration: number;
  };
  smell: {
    description: string;
    intensity: number;
    notes: string[];
  };
  taste: {
    description: string;
    flavor: 'sweet' | 'savory' | 'umami' | 'bitter' | 'sour';
    intensity: number;
    aftertaste: string;
  };
  touch: {
    description: string;
    texture: 'smooth' | 'rough' | 'silky' | 'crisp' | 'velvety';
    temperature: number;
    weight: number;
  };
  aura: {
    color: string;
    emotion: string;
    energy: 'calm' | 'vibrant' | 'electric' | 'serene' | 'intense';
    pattern: string;
  };
}

export const sensoryProducts = {
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
