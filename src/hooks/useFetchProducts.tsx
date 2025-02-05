'use client';

import { useEffect } from 'react';
import { useProductsContext } from '@/context/productsContext';
import useFiltersAsParams from './useFiltersAsParams';

export default function useFetchProducts() {
  const { getProducts } = useProductsContext();
  const { searchTerm, brands, sizes, minPrice, maxPrice } = useFiltersAsParams();

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;

    const fetchData = () => {
      getProducts(
        {
          searchTerm,
          brands,
          sizes,
          minPrice,
          maxPrice,
        },
        signal
      );
    };

    const timeoutId = setTimeout(fetchData, 1000);

    return () => {
      clearTimeout(timeoutId);
      controller.abort();
    };
  }, [getProducts, searchTerm, brands, sizes, minPrice, maxPrice]);
}
