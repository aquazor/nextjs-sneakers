'use client';

import Appbar from '@/components/Appbar';
import { ProductsProvider } from './productsContext';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <ProductsProvider>
      <Appbar />
      {children}
    </ProductsProvider>
  );
}
