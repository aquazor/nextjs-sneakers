'use client';

import Image from 'next/image';
import { IoBagCheckOutline } from 'react-icons/io5';
import { useCartContext } from '@/context/cartContext';
import EmptyCart from '@/assets/cart-empty.png';
import Container from '@/components/Container';
import CartItemList from './components/CartItemList';
import Spinner from '@/components/Spinner';

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

  const { price, count } = cartItems.reduce(
    (acc, item) => {
      const price = acc.price + item.price * item.count;
      const count = acc.count + item.count;
      return { price, count };
    },
    { price: 0, count: 0 }
  );

  return (
    <Container>
      <div className="flex flex-col md:flex-row gap-4 relative">
        <CartItemList />

        <div className="md:sticky top-4 py-2 px-4 shrink-0 items-center md:items-start shadow-lg border bg-background flex flex-col justify-between max-h-[calc(304px+1rem)] gap-4 md:w-60 lg:w-72">
          <div className="space-y-2 text-center md:text-left">
            <p className="text-xl">
              TOTAL PRICE: <strong className="text-2xl">{price}</strong>
            </p>

            <p className="text-lg">
              Total items count: <strong className="text-xl">{count}</strong>
            </p>
          </div>

          <button className="px-3 w-3/4 md:w-full py-2 flex items-center justify-center gap-1 transition-colors bg-primary text-primary-foreground font-bold text-lg">
            CHECKOUT <IoBagCheckOutline size={20} />
          </button>
        </div>
      </div>
    </Container>
  );
}
