'use client';

import Appbar from '@/components/Appbar';
import { ProductsProvider } from '../../context/productsContext';
import { FiltersProvider } from '@/context/filtersContext';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <FiltersProvider>
      <ProductsProvider>
        <Appbar />
        {children}
      </ProductsProvider>
    </FiltersProvider>
  );
}
