import { Metadata } from 'next';
import CartPage from './_page';

export const metadata: Metadata = {
  title: 'Shopping Cart',
  description:
    'Review your selected sneakers and proceed to checkout. Secure your favorite kicks before they sell out!',
  keywords:
    'sneakers cart, shopping cart, buy sneakers, checkout, sneaker store, NextSneaks',
};

export default function Page() {
  return <CartPage />;
}
