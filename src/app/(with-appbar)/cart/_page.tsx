'use client';

import Image from 'next/image';
import { useCartContext } from '@/context/cartContext';
import EmptyCart from '@/assets/cart-empty.png';
import Container from '@/components/Container';
import Spinner from '@/components/Spinner';
import CartItemList from './components/CartItemList';
import CheckoutPanel from './components/CheckoutPanel';

export default function CartPage() {
  const { cartItems, isLoading } = useCartContext();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-5">
        <Spinner />
      </div>
    );
  }

  if (cartItems.length === 0 && !isLoading) {
    return (
      <div className="w-full mt-10 flex flex-col items-center justify-center gap-6 text-center">
        <div>
          <h2 className="text-3xl">Your cart is empty</h2>
          <div className="text-xl text-nowrap">¯\_(ツ)_/¯</div>
        </div>
        <h5 className="text-xl">Add at least one pair of sneakers to create an order.</h5>
        <Image priority src={EmptyCart} quality={100} alt="Empty cart" />
      </div>
    );
  }

  return (
    <Container>
      <div className="flex flex-col md:flex-row gap-4 relative">
        <CartItemList />
        <CheckoutPanel />
      </div>
    </Container>
  );
}
