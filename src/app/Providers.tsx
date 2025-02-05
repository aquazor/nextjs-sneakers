'use client';

import { ProductsProvider } from '@/context/productsContext';

export default function Providers({ children }: { children: React.ReactNode }) {
  return <ProductsProvider>{children}</ProductsProvider>;
}
