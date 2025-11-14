export interface ProductDescriptions {
  '1920s': string;
  '1990s': string;
  '2050s': string;
}

export const generateTemporalDescription = (
  productName: string,
  baseFeatures: string[]
): ProductDescriptions => {
  return {
    '1920s': generate1920sDescription(productName, baseFeatures),
    '1990s': generate1990sDescription(productName, baseFeatures),
    '2050s': generate2050sDescription(productName, baseFeatures),
  };
};

function generate1920sDescription(name: string, features: string[]): string {
  return `
◆ ${name.toUpperCase()} ◆

A most distinguished article of exceptional quality, crafted with the utmost 
attention to detail befitting the modern gentleman or lady of refined taste.

PARTICULARS:
${features.map(f => `• ${f} - Of the finest manufacture`).join('\n')}

This exquisite piece represents the pinnacle of contemporary craftsmanship, 
suitable for the most discerning patron. Available for immediate acquisition 
through our establishment.

Price: As marked (inquire within for special arrangements)

◆ SATISFACTION GUARANTEED ◆
  `.trim();
}

function generate1990sDescription(name: string, features: string[]): string {
  return `
>> ${name.toUpperCase()} <<
[PRODUCT_ID: ${Math.random().toString(36).substr(2, 9).toUpperCase()}]

SPECS:
${features.map(f => `[✓] ${f}`).join('\n')}

STATUS: IN_STOCK
CONDITION: NEW_IN_BOX
SHIPPING: 2-3 DAYS (OR OVERNIGHT IF U GOT THE $$)

>> REAL TALK: This is the gear you NEED. Not the stuff they're pushing 
on MTV. This is underground. This is authentic. This is YOU.

Price shown is FIRM. No haggling. No BS. Add to cart or bounce.

[SECURE_CHECKOUT] [256-BIT_ENCRYPTION] [NO_SPAM_GUARANTEE]
  `.trim();
}

function generate2050sDescription(name: string, features: string[]): string {
  return `
${name}

Neural compatibility: 98.7%
Sustainability index: Carbon-negative
Consciousness rating: Ethically sourced

Key attributes:
${features.map(f => `  ${f}`).join('\n')}

AI recommendation confidence: High
Predicted satisfaction: 94% (based on your neural profile)

This item aligns with your values and aesthetic preferences. Our predictive 
model suggests a 3-year ownership cycle with 87% daily usage probability.

Dynamic pricing: Optimized for your purchase timing
Delivery: Instant molecular assembly or traditional shipping

Add to consciousness stream →
  `.trim();
}

// Example usage
export const sampleProduct = {
  name: "Leather Messenger Bag",
  baseFeatures: [
    "Full-grain leather construction",
    "Adjustable shoulder strap",
    "Multiple interior compartments",
    "Brass hardware accents"
  ]
};

export const temporalDescriptions = generateTemporalDescription(
  sampleProduct.name,
  sampleProduct.baseFeatures
);
