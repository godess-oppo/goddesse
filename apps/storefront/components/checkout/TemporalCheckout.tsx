'use client';

import { useTemporalStore } from '@/lib/temporal/store';
import ArtDecoCheckout from './eras/ArtDecoCheckout';
import CyberpunkCheckout from './eras/CyberpunkCheckout';
import AIMinimalCheckout from './eras/AIMinimalCheckout';

export default function TemporalCheckout() {
  const { currentEra } = useTemporalStore();

  const checkoutComponents = {
    '1920s': ArtDecoCheckout,
    '1990s': CyberpunkCheckout,
    '2050s': AIMinimalCheckout,
  };

  const CheckoutComponent = checkoutComponents[currentEra];

  return <CheckoutComponent />;
}
