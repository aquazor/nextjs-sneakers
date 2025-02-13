'use client';

import CartProvider from '@/context/cartContext';
import FavoriteProvider from '@/context/favoriteContext';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <CartProvider>
      <FavoriteProvider>{children}</FavoriteProvider>
    </CartProvider>
  );
}
