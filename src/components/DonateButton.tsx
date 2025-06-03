import { useState } from 'react';
import { products } from '../stripe-config';
import { createCheckoutSession } from '../lib/stripe';

export function DonateButton() {
  const [isLoading, setIsLoading] = useState(false);

  const handleDonate = async () => {
    try {
      setIsLoading(true);
      const url = await createCheckoutSession(
        products.donate.priceId,
        products.donate.mode,
        `${window.location.origin}/success`,
        `${window.location.origin}/cancel`,
      );
      window.location.href = url;
    } catch (error) {
      console.error('Failed to create checkout session:', error);
      alert('Failed to start checkout process. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleDonate}
      disabled={isLoading}
      className="btn btn-primary"
      style={{ minWidth: '120px' }}
    >
      {isLoading ? (
        <span>
          <i className="fas fa-spinner fa-spin" /> Carregando...
        </span>
      ) : (
        <span>
          <i className="fas fa-heart" /> Doar
        </span>
      )}
    </button>
  );
}