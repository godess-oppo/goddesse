# --------------------------------------------------------------
# 1️⃣ Create the folder
# --------------------------------------------------------------
mkdir -p luxury-grid/public/data
cd luxury-grid

# --------------------------------------------------------------
# 2️⃣ package.json (optional dev‑server)
# --------------------------------------------------------------
cat <<'EOF' > package.json
{
  "name": "luxury-grid",
  "version": "1.0.0",
  "description": "Luxury‑fashion category grid with AI tags, infinite scroll and bundle suggestion",
  "main": "server/server.js",
  "scripts": {
    "dev": "node server/server.js"
  },
  "author": "Your Name",
  "license": "MIT",
  "dependencies": {
    "express": "^4.19.2"
  }
}
EOF

# --------------------------------------------------------------
# 3️⃣ Tailwind config – defines the design‑system tokens
# --------------------------------------------------------------
cat <<'EOF' > tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./public/**/*.html', './public/**/*.js'],
  theme: {
    extend: {
      colors: {
        primary: '#0B6E4F',   // brand primary
        accent: '#F2C88B',    // warm paper tone
        neutral: {
          100: '#FFFFFF',
          900: '#111111',
        },
      },
      spacing: {
        base: '8px',
      },
      borderRadius: {
        DEFAULT: '8px',
      },
      boxShadow: {
        elev1: '0 2px 6px rgba(17,17,17,0.03)',
      },
      fontSize: {
        xs: ['12px', { lineHeight: '16px' }],
        sm: ['14px', { lineHeight: '20px' }],
        base: ['16px', { lineHeight: '24px' }],
        lg: ['20px', { lineHeight: '28px' }],
        xl: ['28px', { lineHeight: '36px' }],
      },
    },
  },
  plugins: [],
};
EOF

# --------------------------------------------------------------
# 4️⃣ public/style.css – custom CSS + Tailwind CDN utilities
# --------------------------------------------------------------
cat <<'EOF' > public/style.css
@tailwind base;
@tailwind components;
@tailwind utilities;

/* ------------------------------------------------------------------
   1️⃣ Design‑system custom properties (fallback for non‑Tailwind use)
   ------------------------------------------------------------------ */
:root {
  --color-primary: #0B6E4F;
  --color-accent: #F2C88B;
  --color-neutral-100: #FFFFFF;
  --color-neutral-900: #111111;
  --shadow-elev-1: rgba(17,17,17,0.03);
  --radius: 8px;
  --space: 8px;
}

/* ------------------------------------------------------------------
   2️⃣ Skeleton placeholder (respect reduced‑motion)
   ------------------------------------------------------------------ */
@media (prefers-reduced-motion: no-preference) {
  .skeleton {
    @apply animate-pulse bg-neutral-100;
  }
}

/* ------------------------------------------------------------------
   3️⃣ Hover overlay (desktop) – editorial flourish
   ------------------------------------------------------------------ */
.product-card {
  @apply relative overflow-hidden rounded-[var(--radius)] bg-neutral-100;
}
.product-card .overlay {
  @apply absolute inset-0 flex flex-col justify-end p-2 text-neutral-100 bg-black/45 opacity-0 transition-opacity duration-150;
}
.product-card:hover .overlay,
.product-card:focus-within .overlay {
  @apply opacity-100;
}
.product-card .curator {
  @apply text-sm italic;
}
.product-card .provenance {
  @apply inline-block mt-1 px-2 py-0.5 bg-primary/80 rounded-[var(--radius)] text-xs;
}

/* ------------------------------------------------------------------
   4️⃣ Sticky bundle‑suggestion micro‑card
   ------------------------------------------------------------------ */
#bundle-card {
  @apply hidden md:flex items-center gap-2 p-3 bg-neutral-100 rounded-[var(--radius)] shadow-elev1 fixed bottom-4 left-4 z-30;
}

/* ------------------------------------------------------------------
   5️⃣ Focus ring (accessible)
   ------------------------------------------------------------------ */
:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
}
EOF

# --------------------------------------------------------------
# 5️⃣ public/data/products.json – mock catalogue (30 items)
# --------------------------------------------------------------
cat <<'EOF' > public/data/products.json
[
  {
    "sku": "MVB-2025-BLZ-001",
    "name": "Midnight Velvet Blazer",
    "price": 2450,
    "currency": "USD",
    "image": "https://picsum.photos/seed/1/600/800",
    "materialComposition": [
      { "material": "Silk", "percentage": 70 },
      { "material": "Cashmere", "percentage": 30 }
    ],
    "curatorSentence": "A whisper of midnight silk, inspired by the Venetian canals.",
    "provenance": "Italian‑crafted • 2025",
    "aiTags": {
      "texture": ["velvet", "smooth"],
      "mood": ["elegant", "dramatic"],
      "sustainability": ["recycled"]
    },
    "sustainabilityMetrics": {
      "carbonFootprintKgCO2e": 12.4,
      "waterUsageLiters": 45,
      "recycledContentPct": 15
    }
  },
  {
    "sku": "MVB-2025-BLZ-002",
    "name": "Saffron Silk Scarf",
    "price": 720,
    "currency": "USD",
    "image": "https://picsum.photos/seed/2/600/800",
    "materialComposition": [
      { "material": "Silk", "percentage": 100 }
    ],
    "curatorSentence": "Sun‑kissed silk that drapes like a warm sunrise.",
    "provenance": "French‑woven • 2025",
    "aiTags": {
      "texture": ["silky", "light"],
      "mood": ["romantic", "playful"],
      "sustainability": ["organic"]
    },
    "sustainabilityMetrics": {
      "carbonFootprintKgCO2e": 5.2,
      "waterUsageLiters": 30,
      "recycledContentPct": 0
    }
  },
  {
    "sku": "MVB-2025-BLZ-003",
    "name": "Obsidian Leather Tote",
    "price": 1890,
    "currency": "USD",
    "image": "https://picsum.photos/seed/3/600/800",
    "materialComposition": [
      { "material": "Recycled Leather", "percentage": 100 }
    ],
    "curatorSentence": "Sleek, matte leather that tells a story of rebirth.",
    "provenance": "German‑crafted • 2025",
    "aiTags": {
      "texture": ["matte", "smooth"],
      "mood": ["minimalist", "sophisticated"],
      "sustainability": ["recycled", "low‑water"]
    },
    "sustainabilityMetrics": {
      "carbonFootprintKgCO2e": 8.1,
      "waterUsageLiters": 20,
      "recycledContentPct": 100
    }
  },

  /* ------------------------------------------------------------------
     Add more items up to 30 – you can copy‑paste the block above and
     just change the seed number, sku and name. For brevity only three
     are shown here. The UI works with any length of array.
     ------------------------------------------------------------------ */
  {
    "sku": "MVB-2025-BLZ-004",
    "name": "Ivory Cashmere Sweater",
    "price": 1320,
    "currency": "USD",
    "image": "https://picsum.photos/seed/4/600/800",
    "materialComposition": [
      { "material": "Cashmere", "percentage": 100 }
    ],
    "curatorSentence": "Cloud‑soft cashmere that feels like a gentle embrace.",
    "provenance": "Scottish‑knit • 2025",
    "aiTags": {
      "texture": ["soft", "knitted"],
      "mood": ["timeless", "luxurious"],
      "sustainability": ["organic"]
    },
    "sustainabilityMetrics": {
      "carbonFootprintKgCO2e": 9.5,
      "waterUsageLiters": 25,
      "recycledContentPct": 0
    }
  },

  {
    "sku": "MVB-2025-BLZ-005",
    "name": "Midnight Sapphire Heels",
    "price": 1580,
    "currency": "USD",
    "image": "https://picsum.photos/seed/5/600/800",
    "materialComposition": [
      { "material": "Vegan Leather", "percentage": 100 }
    ],
    "curatorSentence": "Stiletto silhouette in deep sapphire, cruelty‑free glamour.",
    "provenance": "Italian‑crafted • 2025",
    "aiTags": {
      "texture": ["glossy", "smooth"],
      "mood": ["edgy", "dramatic"],
      "sustainability": ["vegan", "recycled"]
    },
    "sustainabilityMetrics": {
      "carbonFootprintKgCO2e": 6.8,
      "waterUsageLiters": 15,
      "recycledContentPct": 40
    }
  },

  {
    "sku": "MVB-2025-BLZ-006",
    "name": "Gold‑Threaded Belt",
    "price": 420,
    "currency": "USD",
    "image": "https://picsum.photos/seed/6/600/800",
    "materialComposition": [
      { "material": "Leather", "percentage": 80 },
      { "material": "Gold Thread", "percentage": 20 }
    ],
    "curatorSentence": "A thin line of gold that cinches elegance.",
    "provenance": "French‑artisan • 2025",
    "aiTags": {
      "texture": ["smooth", "metallic"],
      "mood": ["luxurious", "sophisticated"],
      "sustainability": ["fair‑trade"]
    },
    "sustainabilityMetrics": {
      "carbonFootprintKgCO2e": 4.2,
      "waterUsageLiters": 10,
      "recycledContentPct": 0
    }
  },

  {
    "sku": "MVB-2025-BLZ-007",
    "name": "Emerald Velvet Dress",
    "price": 3890,
    "currency": "USD",
    "image": "https://picsum.photos/seed/7/600/800",
    "materialComposition": [
      { "material": "Velvet", "percentage": 100 }
    ],
    "curatorSentence": "Emerald depth that catches the light like a forest at dusk.",
    "provenance": "Italian‑couture • 2025",
    "aiTags": {
      "texture": ["velvet", "heavy‑weight"],
      "mood": ["dramatic", "romantic"],
      "sustainability": ["low‑water"]
    },
    "sustainabilityMetrics": {
      "carbonFootprintKgCO2e": 14.7,
      "waterUsageLiters": 55,
      "recycledContentPct": 0
    }
  },

  {
    "sku": "MVB-2025-BLZ-008",
    "name": "Pearl‑Laced Clutch",
    "price": 950,
    "currency": "USD",
    "image": "https://picsum.photos/seed/8/600/800",
    "materialComposition": [
      { "material": "Vegan Leather", "percentage": 90 },
      { "material": "Pearl", "percentage": 10 }
    ],
    "curatorSentence": "A whisper of pearls that glimmer on midnight skin.",
    "provenance": "Spanish‑artisan • 2025",
    "aiTags": {
      "texture": ["glossy", "smooth"],
      "mood": ["elegant", "playful"],
      "sustainability": ["vegan", "recycled"]
    },
    "sustainabilityMetrics": {
      "carbonFootprintKgCO2e": 5.9,
      "waterUsageLiters": 12,
      "recycledContentPct": 30
    }
  },

  {
    "sku": "MVB-2025-BLZ-009",
    "name": "Sable Fur Collar",
    "price": 1120,
    "currency": "USD",
    "image": "https://picsum.photos/seed/9/600/800",
    "materialComposition": [
      { "material": "Recycled Faux Fur", "percentage": 100 }
    ],
    "curatorSentence": "Luxurious faux fur that feels like a midnight whisper.",
    "provenance": "Polish‑crafted • 2025",
    "aiTags": {
      "texture": ["soft", "fluffy"],
      "mood": ["cozy", "sophisticated"],
      "sustainability": ["recycled", "vegan"]
    },
    "sustainabilityMetrics": {
      "carbonFootprintKgCO2e": 7.3,
      "waterUsageLiters": 18,
      "recycledContentPct": 100
    }
  },

  {
    "sku": "MVB-2025-BLZ-010",
    "name": "Obsidian Silk Tie",
    "price": 380,
    "currency": "USD",
    "image": "https://picsum.photos/seed/10/600/800",
    "materialComposition": [
      { "material": "Silk", "percentage": 100 }
    ],
    "curatorSentence": "A sleek silk tie that adds a dark edge to any suit.",
    "provenance": "Italian‑woven • 2025",
    "aiTags": {
      "texture": ["silky", "smooth"],
      "mood": ["edgy", "minimalist"],
      "sustainability": ["organic"]
    },
    "sustainabilityMetrics": {
      "carbonFootprintKgCO2e": 4.8,
      "waterUsageLiters": 22,
      "recycledContentPct": 0
    }
  },

  {
    "sku": "MVB-2025-BLZ-011",
    "name": "Cobalt Denim Jacket",
    "price": 1650,
    "currency": "USD",
    "image": "https://picsum.photos/seed/11/600/800",
    "materialComposition": [
      { "material": "Organic Denim", "percentage": 100 }
    ],
    "curatorSentence": "Denim reborn – sturdy, sustainable, and strikingly blue.",
    "provenance": "US‑crafted • 2025",
    "aiTags": {
      "texture": ["ribbed", "heavy‑weight"],
      "mood": ["edgy", "street‑wear"],
      "sustainability": ["organic", "low‑water"]
    },
    "sustainabilityMetrics": {
      "carbonFootprintKgCO2e": 10.2,
      "waterUsageLiters": 70,
      "recycledContentPct": 0
    }
  },

  {
    "sku": "MVB-2025-BLZ-012",
    "name": "Ivory Lace Gown",
    "price": 4890,
    "currency": "USD",
    "image": "https://picsum.photos/seed/12/600/800",
    "materialComposition": [
      { "material": "Lace", "percentage": 100 }
    ],
    "curatorSentence": "Delicate lace that drapes like moonlit clouds.",
    "provenance": "French‑couture • 2025",
    "aiTags": {
      "texture": ["delicate", "light"],
      "mood": ["romantic", "timeless"],
      "sustainability": ["fair‑trade"]
    },
    "sustainabilityMetrics": {
      "carbonFootprintKgCO2e": 13.5,
      "waterUsageLiters": 40,
      "recycledContentPct": 0
    }
  },

  {
    "sku": "MVB-2025-BLZ-013",
    "name": "Sable Suede Loafers",
    "price": 1240,
    "currency": "USD",
    "image": "https://picsum.photos/seed/13/600/800",
    "materialComposition": [
      { "material": "Recycled Suede", "percentage": 100 }
    ],
    "curatorSentence": "Suede that feels like a soft whisper underfoot.",
    "provenance": "Italian‑crafted • 2025",
    "aiTags": {
      "texture": ["suede", "soft"],
      "mood": ["minimalist", "sophisticated"],
      "sustainability": ["recycled", "vegan"]
    },
    "sustainabilityMetrics": {
      "carbonFootprintKgCO2e": 6.4,
      "waterUsageLiters": 14,
      "recycledContentPct": 100
    }
  },

  {
    "sku": "MVB-2025-BLZ-014",
    "name": "Gold‑Threaded Silk Shirt",
    "price": 1380,
    "currency": "USD",
    "image": "https://picsum.photos/seed/14/600/800",
    "materialComposition": [
      { "material": "Silk", "percentage": 90 },
      { "material": "Gold Thread", "percentage": 10 }
    ],
    "curatorSentence": "A silk shirt threaded with gold – understated opulence.",
    "provenance": "Japanese‑woven • 2025",
    "aiTags": {
      "texture": ["silky", "smooth"],
      "mood": ["elegant", "luxurious"],
      "sustainability": ["organic"]
    },
    "sustainabilityMetrics": {
      "carbonFootprintKgCO2e": 7.9,
      "waterUsageLiters": 28,
      "recycledContentPct": 0
    }
  },

  {
    "sku": "MVB-2025-BLZ-015",
    "name": "Obsidian Leather Boots",
    "price": 2190,
    "currency": "USD",
    "image": "https://picsum.photos/seed/15/600/800",
    "materialComposition": [
      { "material": "Recycled Leather", "percentage": 100 }
    ],
    "curatorSentence": "Boots that stride with confidence and conscience.",
    "provenance": "German‑crafted • 2025",
    "aiTags": {
      "texture": ["matte", "smooth"],
      "mood": ["edgy", "minimalist"],
      "sustainability": ["recycled", "low‑water"]
    },
    "sustainabilityMetrics": {
      "carbonFootprintKgCO2e": 9.1,
      "waterUsageLiters": 22,
      "recycledContentPct": 100
    }
  },

  {
    "sku": "MVB-2025-BLZ-016",
    "name": "Pearl‑Embellished Headband",
    "price": 310,
    "currency": "USD",
    "image": "https://picsum.photos/seed/16/600/800",
    "materialComposition": [
      { "material": "Vegan Leather", "percentage": 95 },
      { "material": "Pearl", "percentage": 5 }
    ],
    "curatorSentence": "A delicate crown of pearls for the modern muse.",
    "provenance": "Italian‑artisan • 2025",
    "aiTags": {
      "texture": ["glossy", "smooth"],
      "mood": ["playful", "elegant"],
      "sustainability": ["vegan", "recycled"]
    },
    "sustainabilityMetrics": {
      "carbonFootprintKgCO2e": 4.5,
      "waterUsageLiters": 9,
      "recycledContentPct": 30
    }
  },

  {
    "sku": "MVB-2025-BLZ-017",
    "name": "Saffron Cashmere Cardigan",
    "price": 1580,
    "currency": "USD",
    "image": "https://picsum.photos/seed/17/600/800",
    "materialComposition": [
      { "material": "Cashmere", "percentage": 100 }
    ],
    "curatorSentence": "Warmth that feels like a sunrise over a saffron field.",
    "provenance": "Scottish‑knit • 2025",
    "aiTags": {
      "texture": ["soft", "knitted"],
      "mood": ["cozy", "timeless"],
      "sustainability": ["organic"]
    },
    "sustainabilityMetrics": {
      "carbonFootprintKgCO2e": 9.8,
      "waterUsageLiters": 27,
      "recycledContentPct": 0
    }
  },

  {
    "sku": "MVB-2025-BLZ-018",
    "name": "Midnight Sapphire Ring",
    "price": 7200,
    "currency": "USD",
    "image": "https://picsum.photos/seed/18/600/800",
    "materialComposition": [
      { "material": "Recycled Gold", "percentage": 90 },
      { "material": "Sapphire", "percentage": 10 }
    ],
    "curatorSentence": "A deep‑blue sapphire set in responsibly sourced gold.",
    "provenance": "Swiss‑crafted • 2025",
    "aiTags": {
      "texture": ["metallic", "smooth"],
      "mood": ["luxurious", "dramatic"],
      "sustainability": ["recycled", "fair‑trade"]
    },
    "sustainabilityMetrics": {
      "carbonFootprintKgCO2e": 12.0,
      "waterUsageLiters": 5,
      "recycledContentPct": 90
    }
  },

  {
    "sku": "MVB-2025-BLZ-019",
    "name": "Obsidian Velvet Cap",
    "price": 340,
    "currency": "USD",
    "image": "https://picsum.photos/seed/19/600/800",
    "materialComposition": [
      { "material": "Velvet", "percentage": 100 }
    ],
    "curatorSentence": "A cap that adds a touch of night‑time mystery.",
    "provenance": "Italian‑crafted • 2025",
    "aiTags": {
      "texture": ["velvet", "soft"],
      "mood": ["edgy", "playful"],
      "sustainability": ["low‑water"]
    },
    "sustainabilityMetrics": {
      "carbonFootprintKgCO2e": 5.6,
      "waterUsageLiters": 12,
      "recycledContentPct": 0
    }
  },

  {
    "sku": "MVB-2025-BLZ-020",
    "name": "Gold‑Threaded Silk Pocket Square",
    "price": 210,
    "currency": "USD",
    "image": "https://picsum.photos/seed/20/600/800",
    "materialComposition": [
      { "material": "Silk", "percentage": 95 },
      { "material": "Gold Thread", "percentage": 5 }
    ],
    "curatorSentence": "A whisper of gold that catches the light in a pocket.",
    "provenance": "French‑woven • 2025",
    "aiTags": {
      "texture": ["silky", "smooth"],
      "mood": ["elegant", "playful"],
      "sustainability": ["organic"]
    },
    "sustainabilityMetrics": {
      "carbonFootprintKgCO2e": 3.9,
      "waterUsageLiters": 18,
      "recycledContentPct": 0
    }
  },

  {
    "sku": "MVB-2025-BLZ-021",
    "name": "Sable Fur Gloves",
    "price": 680,
    "currency": "USD",
    "image": "https://picsum.photos/seed/21/600/800",
    "materialComposition": [
      { "material": "Recycled Faux Fur", "percentage": 100 }
    ],
    "curatorSentence": "Gloves that feel like a soft, dark cloud on your hands.",
    "provenance": "Polish‑crafted • 2025",
    "aiTags": {
      "texture": ["fluffy", "soft"],
      "mood": ["cozy", "sophisticated"],
      "sustainability": ["vegan", "recycled"]
    },
    "sustainabilityMetrics": {
      "carbonFootprintKgCO2e": 6.2,
      "waterUsageLiters": 16,
      "recycledContentPct": 100
    }
  },

  {
    "sku": "MVB-2025-BLZ-022",
    "name": "Obsidian Leather Backpack",
    "price": 2740,
    "currency": "USD",
    "image": "https://picsum.photos/seed/22/600/800",
    "materialComposition": [
      { "material": "Recycled Leather", "percentage": 100 }
    ],
    "curatorSentence": "A sleek backpack that carries both style and conscience.",
    "provenance": "German‑crafted • 2025",
    "aiTags": {
      "texture": ["matte", "smooth"],
      "mood": ["minimalist", "edgy"],
      "sustainability": ["recycled", "low‑water"]
    },
    "sustainabilityMetrics": {
      "carbonFootprintKgCO2e": 11.3,
      "waterUsageLiters": 30,
      "recycledContentPct": 100
    }
  },

  {
    "sku": "MVB-2025-BLZ-023",
    "name": "Ivory Silk Slip Dress",
    "price": 3120,
    "currency": "USD",
    "image": "https://picsum.photos/seed/23/600/800",
    "materialComposition": [
      { "material": "Silk", "percentage": 100 }
    ],
    "curatorSentence": "A flowing silhouette that glides like a quiet tide.",
    "provenance": "Italian‑couture • 2025",
    "aiTags": {
      "texture": ["silky", "light"],
      "mood": ["romantic", "timeless"],
      "sustainability": ["organic"]
    },
    "sustainabilityMetrics": {
      "carbonFootprintKgCO2e": 8.9,
      "waterUsageLiters": 35,
      "recycledContentPct": 0
    }
  },

  {
    "sku": "MVB-2025-BLZ-024",
    "name": "Gold‑Threaded Velvet Headscarf",
    "price": 560,
    "currency": "USD",
    "image": "https://picsum.photos/seed/24/600/800",
    "materialComposition": [
      { "material": "Velvet", "percentage": 95 },
      { "material": "Gold Thread", "percentage": 5 }
    ],
    "curatorSentence": "A headscarf that drapes like liquid gold.",
    "provenance": "French‑couture • 2025",
    "aiTags": {
      "texture": ["velvet", "soft"],
      "mood": ["luxurious", "dramatic"],
      "sustainability": ["low‑water"]
    },
    "sustainabilityMetrics": {
      "carbonFootprintKgCO2e": 9.4,
      "waterUsageLiters": 40,
      "recycledContentPct": 0
    }
  },

  {
    "sku": "MVB-2025-BLZ-025",
    "name": "Saffron Silk Trousers",
    "price": 1380,
    "currency": "USD",
    "image": "https://picsum.photos/seed/25/600/800",
    "materialComposition": [
      { "material": "Silk", "percentage": 100 }
    ],
    "curatorSentence": "Tailored silk that moves like sunrise on water.",
    "provenance": "Italian‑woven • 2025",
    "aiTags": {
      "texture": ["silky", "smooth"],
      "mood": ["elegant", "minimalist"],
      "sustainability": ["organic"]
    },
    "sustainabilityMetrics": {
      "carbonFootprintKgCO2e": 6.7,
      "waterUsageLiters": 28,
      "recycledContentPct": 0
    }
  },

  {
    "sku": "MVB-2025-BLZ-026",
    "name": "Obsidian Suede Cap",
    "price": 290,
    "currency": "USD",
    "image": "https://picsum.photos/seed/26/600/800",
    "materialComposition": [
      { "material": "Recycled Suede", "percentage": 100 }
    ],
    "curatorSentence": "A cap that adds a subtle edge to any street look.",
    "provenance": "Italian‑crafted • 2025",
    "aiTags": {
      "texture": ["suede", "soft"],
      "mood": ["edgy", "street‑wear"],
      "sustainability": ["recycled", "vegan"]
    },
    "sustainabilityMetrics": {
      "carbonFootprintKgCO2e": 5.1,
      "waterUsageLiters": 13,
      "recycledContentPct": 100
    }
  },

  {
    "sku": "MVB-2025-BLZ-027",
    "name": "Pearl‑Laced Silk Belt",
    "price": 480,
    "currency": "USD",
    "image": "https://picsum.photos/seed/27/600/800",
    "materialComposition": [
      { "material": "Silk", "percentage": 95 },
      { "material": "Pearl", "percentage": 5 }
    ],
    "curatorSentence": "A belt that cinches with a whisper of pearls.",
    "provenance": "French‑artisan • 2025",
    "aiTags": {
      "texture": ["silky", "smooth"],
      "mood": ["elegant", "playful"],
      "sustainability": ["organic"]
    },
    "sustainabilityMetrics": {
      "carbonFootprintKgCO2e": 4.2,
      "waterUsageLiters": 20,
      "recycledContentPct": 0
    }
  },

  {
    "sku": "MVB-2025-BLZ-028",
    "name": "Midnight Velvet Evening Bag",
    "price": 2120,
    "currency": "USD",
    "image": "https://picsum.photos/seed/28/600/800",
    "materialComposition": [
      { "material": "Velvet", "percentage": 80 },
      { "material": "Recycled Leather", "percentage": 20 }
    ],
    "curatorSentence": "A bag that holds the night in its folds.",
    "provenance": "Italian‑crafted • 2025",
    "aiTags": {
      "texture": ["velvet", "soft"],
      "mood": ["dramatic", "luxurious"],
      "sustainability": ["recycled", "low‑water"]
    },
    "sustainabilityMetrics": {
      "carbonFootprintKgCO2e": 10.8,
      "waterUsageLiters": 32,
      "recycledContentPct": 20
    }
  },

  {
    "sku": "MVB-2025-BLZ-029",
    "name": "Gold‑Threaded Silk Tie",
    "price": 410,
    "currency": "USD",
    "image": "https://picsum.photos/seed/29/600/800",
    "materialComposition": [
      { "material": "Silk", "percentage": 92 },
      { "material": "Gold Thread", "percentage": 8 }
    ],
    "curatorSentence": "A tie that adds a golden thread of confidence.",
    "provenance": "Italian‑woven • 2025",
    "aiTags": {
      "texture": ["silky", "smooth"],
      "mood": ["elegant", "minimalist"],
      "sustainability": ["organic"]
    },
    "sustainabilityMetrics": {
      "carbonFootprintKgCO2e": 5.3,
      "waterUsageLiters": 24,
      "recycledContentPct": 0
    }
  },

  {
    "sku": "MVB-2025-BLZ-030",
    "name": "Obsidian Leather Slip‑On Shoes",
    "price": 1650,
    "currency": "USD",
    "image": "https://picsum.photos/seed/30/600/800",
    "materialComposition": [
      { "material": "Recycled Leather", "percentage": 100 }
    ],
    "curatorSentence": "Effortless slip‑ons that whisper luxury with every step.",
    "provenance": "German‑crafted • 2025",
    "aiTags": {
      "texture": ["matte", "smooth"],
      "mood": ["minimalist", "edgy"],
      "sustainability": ["recycled", "low‑water"]
    },
    "sustainabilityMetrics": {
      "carbonFootprintKgCO2e": 9.0,
      "waterUsageLiters": 18,
      "recycledContentPct": 100
    }
  }
]
EOF

# --------------------------------------------------------------
# 6️⃣ public/index.html – the page markup
# --------------------------------------------------------------
cat <<'EOF' > public/index.html
<!DOCTYPE html>
<html lang="en" class="bg-neutral-100 text-neutral-900 antialiased">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Luxury Fashion – Category Grid</title>
  <!-- Tailwind CDN (development) -->
  <script src="https://cdn.tailwindcss.com"></script>
  <script>
    // Inject our custom design‑system tokens into Tailwind at runtime
    tailwind.config = {
      theme: {
        extend: {
          colors: {
            primary: '#0B6E4F',
            accent: '#F2C88B',
            neutral: {
              100: '#FFFFFF',
              900: '#111111',
            },
          },
          spacing: { base: '8px' },
          borderRadius: { DEFAULT: '8px' },
          boxShadow: { elev1: '0 2px 6px rgba(17,17,17,0.03)' },
          fontSize: {
            xs: ['12px', { lineHeight: '16px' }],
            sm: ['14px', { lineHeight: '20px' }],
            base: ['16px', { lineHeight: '24px' }],
            lg: ['20px', { lineHeight: '28px' }],
            xl: ['28px', { lineHeight: '36px' }],
          },
        },
      },
    };
  </script>
  <link rel="stylesheet" href="style.css">
</head>
<body class="p-4">

  <!-- --------------------------------------------------------------
       1️⃣ Header – brand + filter + sort
       -------------------------------------------------------------- -->
  <header class="mb-6">
    <h1 class="text-xl font-bold text-primary mb-4">Midnight Velvet Collection</h1>

    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

      <!-- Filters -->
      <div class="flex flex-wrap gap-2" id="filter-bar">
        <!-- chips will be injected by script.js -->
      </div>

      <!-- Sort -->
      <div>
        <label for="sort-select" class="sr-only">Sort by</label>
        <select id="sort-select" class="border border-neutral-300 rounded-[var(--radius)] p-2 focus-visible:ring-2 focus-visible:ring-primary">
          <option value="editorial">Editorial Picks</option>
          <option value="traced">Most‑Traced</option>
          <option value="newest">Newest</option>
        </select>
      </div>
    </div>
  </header>

  <!-- --------------------------------------------------------------
       2️⃣ Product grid (skeletons + real cards)
       -------------------------------------------------------------- -->
  <main>
    <section id="product-grid" class="grid grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-6">
      <!-- Cards (or skeletons) will be injected here -->
    </section>

    <!-- Infinite‑scroll sentinel -->
    <div id="infinite-sentinel" class="h-1"></div>

    <!-- Fallback Load More button (hidden by default) -->
    <button id="load-more"
            class="hidden mt-4 w-full py-2 bg-primary text-neutral-100 rounded-[var(--radius)] hover:bg-primary/90 focus-visible:ring-2 focus-visible:ring-primary">
      Load more
    </button>

    <!-- Accessible live region for loading status -->
    <div aria-live="polite" class="sr-only" id="loading-status"></div>
  </main>

  <!-- --------------------------------------------------------------
       3️⃣ Sticky bundle‑suggestion micro‑card
       -------------------------------------------------------------- -->
  <aside id="bundle-card" aria-hidden="true">
    <span class="text-sm font-medium">Complete the look</span>
    <button id="bundle-cta"
            class="bg-accent text-neutral-100 px-3 py-1 rounded-[var(--radius)] hover:bg-accent/90 focus-visible:ring-2 focus-visible:ring-primary">
      Add 2 more items →
    </button>
    <button id="bundle-close" class="ml-auto text-neutral-900 hover:text-primary focus-visible:ring-2 focus-visible:ring-primary">✕</button>
  </aside>

  <script src="script.js"></script>
</body>
</html>
EOF

# --------------------------------------------------------------
# 7️⃣ public/script.js – UI logic (filters, sort, infinite scroll, bundle)
# --------------------------------------------------------------
cat <<'EOF' > public/script.js
/* --------------------------------------------------------------
   Utility helpers
   -------------------------------------------------------------- */
const $ = (sel) => document.querySelector(sel);
const $ = (sel) => Array.from(document.querySelectorAll(sel));

/* --------------------------------------------------------------
   Global state
   -------------------------------------------------------------- */
let allProducts = [];          // full catalogue (loaded once)
let filteredProducts = [];     // after applying filters / sort
let pageSize = 12;             // how many items we render per batch
let pageIndex = 0;             // current batch index
let isLoading = false;

/* --------------------------------------------------------------
   1️⃣ Load product data (mock JSON)
   -------------------------------------------------------------- */
async function loadData() {
  const resp = await fetch('data/products.json');
  const data = await resp.json();
  allProducts = data;
  initFilters();
  applyFiltersAndSort(); // will render first batch
}

/* --------------------------------------------------------------
   2️⃣ Build filter chips (material, story, mood)
   -------------------------------------------------------------- */
function initFilters() {
  const filterBar = $('#filter-bar');

  // Helper to extract unique values from the catalogue
  const uniq = (arr) => [...new Set(arr)];

  // Material filter (from materialComposition)
  const materials = uniq(allProducts.flatMap(p => p.materialComposition.map(m => m.material)));
  const materialChip = createChipGroup('Material', 'material', materials);
  filterBar.appendChild(materialChip);

  // Story filter – we’ll fake a few story tags (e.g., “Heritage”, “Modern”, “Artisan”)
  const stories = ['Heritage', 'Modern', 'Artisan'];
  const storyChip = createChipGroup('Story', 'story', stories);
  filterBar.appendChild(storyChip);

  // Mood filter – from AI tags
  const moods = uniq(allProducts.flatMap(p => p.aiTags?.mood?.labels || []));
  const moodChip = createChipGroup('Mood', 'mood', moods);
  filterBar.appendChild(moodChip);
}

/* --------------------------------------------------------------
   Helper: create a chip group (label + list of toggle buttons)
   -------------------------------------------------------------- */
function createChipGroup(groupLabel, dataKey, options) {
  const wrapper = document.createElement('div');
  wrapper.className = 'flex items-center gap-1';

  const label = document.createElement('span');
  label.className = 'text-sm font-medium text-neutral-900';
  label.textContent = `${groupLabel}:`;
  wrapper.appendChild(label);

  options.forEach(opt => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'px-2 py-1 text-xs rounded-[var(--radius)] border border-neutral-300 bg-neutral-100 hover:bg-primary/10 focus-visible:ring-2 focus-visible:ring-primary';
    btn.dataset.key = dataKey;
    btn.dataset.value = opt;
    btn.textContent = opt;
    btn.addEventListener('click', () => {
      btn.classList.toggle('bg-primary text-neutral-100 border-primary');
      applyFiltersAndSort();
    });
    wrapper.appendChild(btn);
  });

  return wrapper;
}

/* --------------------------------------------------------------
   3️⃣ Apply filters + sort → update filteredProducts array
   -------------------------------------------------------------- */
function applyFiltersAndSort() {
  // 1️⃣ Gather active filter values
  const active = {};
  $('#filter-bar button.bg-primary').forEach(btn => {
    const key = btn.dataset.key;
    const val = btn.dataset.value;
    if (!active[key]) active[key] = new Set();
    active[key].add(val);
  });

  // 2️⃣ Filter
  filteredProducts = allProducts.filter(p => {
    // Material filter
    if (active.material && !p.materialComposition.some(m => active.material.has(m.material))) return false;
    // Story filter – we’ll fake story based on provenance keyword
    if (active.story) {
      const story = p.provenance?.toLowerCase() || '';
      const matchesStory = Array.from(active.story).some(st => story.includes(st.toLowerCase()));
      if (!matchesStory) return false;
    }
    // Mood filter (AI tags)
    if (active.mood && !(p.aiTags?.mood?.labels?.some(l => active.mood.has(l)))) return false;
    return true;
  });

  // 3️⃣ Sort
  const sortVal = $('#sort-select').value;
  if (sortVal === 'newest') {
    filteredProducts.sort((a, b) => b.launchYear - a.launchYear);
  } else if (sortVal === 'traced') {
    // Mock “most‑traced” – we’ll sort by recycledContentPct descending
    filteredProducts.sort((a, b) => (b.sustainabilityMetrics?.recycledContentPct || 0) - (a.sustainabilityMetrics?.recycledContentPct || 0));
  } else {
    // editorial – keep original order (or you could add a manual rank field)
  }

  // 4️⃣ Reset pagination & render first batch
  pageIndex = 0;
  $('#product-grid').innerHTML = '';
  renderNextBatch();
}

/* --------------------------------------------------------------
   4️⃣ Render a batch of cards (or skeletons while loading)
   -------------------------------------------------------------- */
function renderNextBatch() {
  if (isLoading) return;
  isLoading = true;
  $('#loading-status').textContent = 'Loading…';

  // Simulate async fetch (e.g., server pagination)
  setTimeout(() => {
    const start = pageIndex * pageSize;
    const slice = filteredProducts.slice(start, start + pageSize);
    const grid = $('#product-grid');

    slice.forEach(product => {
      const card = createProductCard(product);
      grid.appendChild(card);
    });

    // If we have rendered fewer than pageSize, we reached the end → hide sentinel
    if (slice.length < pageSize) {
      $('#infinite-sentinel').style.display = 'none';
    }

    pageIndex++;
    isLoading = false;
    $('#loading-status').textContent = '';
  }, 300); // tiny delay to show skeletons
}

/* --------------------------------------------------------------
   5️⃣ Create a product card (with hover overlay)
   -------------------------------------------------------------- */
function createProductCard(p) {
  const card = document.createElement('article');
  card.className = 'product-card';
  card.tabIndex = 0; // make focusable

  // Image (lazy‑loaded)
  const img = document.createElement('img');
  img.src = p.image;
  img.alt = `${p.name} – ${p.curatorSentence}`;
  img.loading = 'lazy';
  img.className = 'w-full h-auto object-cover';
  card.appendChild(img);

  // Price overlay (bottom)
  const price = document.createElement('div');
  price.className = 'absolute bottom-0 left-0 right-0 bg-black/60 text-neutral-100 text-sm p-1';
  price.textContent = `${p.currency} ${p.price.toLocaleString()}`;
  card.appendChild(price);

  // Hover overlay (desktop)
  const overlay = document.createElement('div');
  overlay.className = 'overlay';
  const curator = document.createElement('p');
  curator.className = 'curator';
  curator.textContent = p.curatorSentence;
  overlay.appendChild(curator);
  const prov = document.createElement('span');
  prov.className = 'provenance';
  prov.textContent = p.provenance;
  overlay.appendChild(prov);
  card.appendChild(overlay);

  // Linger detection for bundle suggestion
  let lingerTimer;
  card.addEventListener('mouseenter', () => {
    lingerTimer = setTimeout(() => showBundleCard(p), 2000);
  });
  card.addEventListener('mouseleave', () => {
    clearTimeout(lingerTimer);
  });

  return card;
}

/* --------------------------------------------------------------
   6️⃣ Bundle suggestion micro‑card logic
   -------------------------------------------------------------- */
function showBundleCard(product) {
  const bundle = $('#bundle-card');
  bundle.setAttribute('aria-hidden', 'false');
  bundle.classList.remove('hidden');

  // You could customise the CTA based on the hovered product.
  // For demo we just keep a static text.
}
$('#bundle-close').addEventListener('click', () => {
  const bundle = $('#bundle-card');
  bundle.setAttribute('aria-hidden', 'true');
  bundle.classList.add('hidden');
});
$('#bundle-cta').addEventListener('click', () => {
  alert('Bundle added! (demo)');
  // In a real shop you would push the suggested SKUs to the cart.
});

/* --------------------------------------------------------------
   7️⃣ Infinite scroll + fallback button
   -------------------------------------------------------------- */
function initInfiniteScroll() {
  const sentinel = $('#infinite-sentinel');
  const loadBtn = $('#load-more');

  // IntersectionObserver for auto‑load
  const observer = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting && !isLoading) {
      renderNextBatch();
    }
  }, { rootMargin: '200px' });

  // If the browser supports it, use the observer
  if ('IntersectionObserver' in window) {
    observer.observe(sentinel);
    loadBtn.classList.add('hidden');
  } else {
    // Fallback – show button
    loadBtn.classList.remove('hidden');
    loadBtn.addEventListener('click', renderNextBatch);
  }
}

/* --------------------------------------------------------------
   8️⃣ Sort change handler
   -------------------------------------------------------------- */
$('#sort-select').addEventListener('change', applyFiltersAndSort);

/* --------------------------------------------------------------
   9️⃣ Init everything
   -------------------------------------------------------------- */
document.addEventListener('DOMContentLoaded', async () => {
  await loadData();
  initInfiniteScroll();
});
EOF

# --------------------------------------------------------------
# 8️⃣ server/server.js – tiny Express dev server (optional)
# --------------------------------------------------------------
cat <<'EOF' > server/server.js
const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from /public
app.use(express.static(path.join(__dirname, '..', 'public')));

app.get('*', (req, res) => {
  // For any unknown route, just serve index.html (SPA‑style)
  res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`🚀 Luxury‑grid dev server listening at http://localhost:${PORT}`);
});
EOF

# --------------------------------------------------------------
# 9️⃣ README – quick start instructions
# --------------------------------------------------------------
cat <<'EOF' > README.md
# Luxury‑Fashion Category Grid

A **static** (or optionally Express‑served) demo that showcases:

* **Top filters** – material, story, mood (AI‑generated sustainability tags are shown on the chips).  
* **Sort** – editorial picks, most‑traced, newest.  
* **Responsive grid** – 3‑up mobile, 4‑up tablet, 6‑up desktop.  
* **Skeleton placeholders** while data loads.  
* **Infinite scroll** with a graceful “Load more” fallback.  
* **Conversion hack** – a sticky “bundle suggestion” micro‑card appears when the user lingers on a product thumbnail.  
* **Editorial flourish** – hover overlay reveals a curator sentence and a provenance chip.  

## 📁 Project structure
