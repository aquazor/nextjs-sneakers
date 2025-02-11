'use client';

import CartProvider from '@/context/cartContext';
import FavoritesProvider from '@/context/favoritesContext';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <CartProvider>
      <FavoritesProvider>{children}</FavoritesProvider>
    </CartProvider>
  );
}
