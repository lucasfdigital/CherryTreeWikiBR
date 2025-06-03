import { products } from '../stripe-config';

export async function createCheckoutSession(
  priceId: string,
  mode: 'payment' | 'subscription',
  successUrl: string,
  cancelUrl: string,
) {
  const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/stripe-checkout`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
    },
    body: JSON.stringify({
      price_id: priceId,
      mode,
      success_url: successUrl,
      cancel_url: cancelUrl,
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message);
  }

  const { url } = await response.json();
  return url;
}

export function getProductByPriceId(priceId: string) {
  return Object.values(products).find((product) => product.priceId === priceId);
}