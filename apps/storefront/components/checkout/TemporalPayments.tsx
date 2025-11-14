'use client';

import { useTemporalStore } from '@/lib/temporal/store';

export default function TemporalPayments() {
  const { currentEra } = useTemporalStore();

  const paymentMethods = {
    '1920s': [
      { id: 'bank-draft', label: 'Bank Draft', icon: '📜', processingTime: '5-7 business days' },
      { id: 'money-order', label: 'Money Order', icon: '💰', processingTime: '3-5 business days' },
      { id: 'cash-on-delivery', label: 'Cash on Delivery', icon: '🤝', processingTime: 'Upon receipt' },
    ],
    '1990s': [
      { id: 'credit-card', label: 'Credit Card', icon: '💳', processingTime: 'Instant' },
      { id: 'paypal', label: 'PayPal', icon: '🌐', processingTime: 'Instant' },
      { id: 'check', label: 'Personal Check', icon: '✍️', processingTime: '7-10 days' },
    ],
    '2050s': [
      { id: 'neural-wallet', label: 'Neural Wallet', icon: '🧠', processingTime: 'Instant' },
      { id: 'crypto', label: 'Quantum Credits', icon: '⚛️', processingTime: 'Instant' },
      { id: 'biometric', label: 'Biometric Auth', icon: '👁️', processingTime: 'Instant' },
    ],
  };

  const methods = paymentMethods[currentEra];

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Payment Method</h3>
      {methods.map(method => (
        <label
          key={method.id}
          className="flex items-center gap-4 p-4 border rounded-lg cursor-pointer hover:bg-gray-50"
        >
          <input type="radio" name="payment" value={method.id} />
          <span className="text-2xl">{method.icon}</span>
          <div className="flex-1">
            <div className="font-medium">{method.label}</div>
            <div className="text-sm text-gray-500">Processing: {method.processingTime}</div>
          </div>
        </label>
      ))}
    </div>
  );
}
