import { useMemo } from 'react';
import { useCartContext } from '@/context/cartContext';
import { IoBagCheckOutline } from 'react-icons/io5';

export default function CheckoutPanel() {
  const { cartItems } = useCartContext();

  const { price, count } = useMemo(
    () =>
      cartItems.reduce(
        (acc, item) => ({
          price: acc.price + item.price * item.count,
          count: acc.count + item.count,
        }),
        { price: 0, count: 0 }
      ),
    [cartItems]
  );

  return (
    <div className="md:sticky top-4 py-2 px-4 shrink-0 items-center md:items-start shadow-lg border bg-background flex flex-col justify-between max-h-[calc(304px+1rem)] gap-4 md:w-60 lg:w-72">
      <div className="space-y-2 text-center md:text-left">
        <p className="text-xl">
          TOTAL PRICE: <strong className="text-2xl">{price}</strong>
        </p>

        <p className="text-lg">
          Total items count: <strong className="text-xl">{count}</strong>
        </p>
      </div>

      <button
        className="px-3 w-3/4 md:w-full py-2 flex items-center justify-center gap-1 transition-colors bg-primary text-primary-foreground font-bold text-lg disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={count === 0}
        aria-label="Proceed to checkout"
      >
        CHECKOUT <IoBagCheckOutline size={20} />
      </button>
    </div>
  );
}
