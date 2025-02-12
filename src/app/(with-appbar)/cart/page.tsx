'use client';

import { useCartContext } from '@/context/cartContext';
import Container from '@/components/Container';
import CartItem from './components/CartItem';
import { IoBagCheckOutline } from 'react-icons/io5';

export default function CartPage() {
  const { cartItems } = useCartContext();
  const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.count, 0);

  return (
    <Container>
      <div className="flex gap-4 relative">
        <ul className="w-full flex flex-wrap gap-4 *:w-full xl:*:w-[calc(50%-1rem/2)] bg-background">
          {cartItems.map((item) => (
            <CartItem key={item._id} item={item} />
          ))}
        </ul>

        <div className="sticky top-4 p-4 shrink-0 shadow-lg bg-background flex flex-col items-center justify-between mah-h-[50vh] gap-2 w-72">
          <p className="text-xl">
            TOTAL PRICE: <strong className="text-2xl">{totalPrice}</strong>{' '}
          </p>

          <button className="px-3 w-full py-2 flex items-center justify-center gap-1 transition-colors bg-primary text-primary-foreground font-bold text-lg">
            CHECKOUT <IoBagCheckOutline size={20} />
          </button>
        </div>
      </div>
    </Container>
  );
}
