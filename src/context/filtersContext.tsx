import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  BRANDS,
  MAX_PRICE,
  MAX_PRICE_STR,
  MIN_PRICE,
  MIN_PRICE_STR,
  SIZES,
} from '../constants';
import { parsePrice } from '@/lib/utils';
import { IFilterParamsState, ISortMethod } from '@/types/filters';

interface Context {
  filterParams: IFilterParamsState;
  setParamByKey: (key: keyof IFilterParamsState, value: string) => void;
  clearParams: () => void;
}

const initialParams: IFilterParamsState = {
  searchTerm: '',
  minPrice: MIN_PRICE_STR,
  maxPrice: MAX_PRICE_STR,
  brands: '',
  sizes: '',
  sort: '',
};

const Context = createContext<Context>({
  filterParams: { ...initialParams },
  setParamByKey: () => {},
  clearParams: () => {},
});

export default function FilterParamsProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const params = useSearchParams();

  const [filterParams, setFilters] = useState<IFilterParamsState>(() => {
    const searchTerm = params.get('searchTerm') || '';

    const minPrice = parsePrice(params.get('minPrice'), MIN_PRICE);
    const maxPrice = parsePrice(params.get('maxPrice'), MAX_PRICE);

    const brandsParam = params.get('brands')?.split(',') || [];
    const brands = brandsParam.filter((brand) => BRANDS.includes(brand)).join(',');

    const sizesParam = params.get('sizes')?.split(',') || [];
    const sizes = sizesParam.filter((brand) => SIZES.includes(brand)).join(',');

    const sort = (params.get('sort') as ISortMethod) || '';

    return { searchTerm, minPrice, maxPrice, brands, sizes, sort };
  });

  const setParamByKey = useCallback((key: keyof IFilterParamsState, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  }, []);

  const clearParams = useCallback(() => {
    setFilters({ ...initialParams });
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      const currentParams = new URLSearchParams();

      if (filterParams.minPrice) currentParams.set('minPrice', filterParams.minPrice);
      if (filterParams.maxPrice) currentParams.set('maxPrice', filterParams.maxPrice);
      if (filterParams.searchTerm)
        currentParams.set('searchTerm', filterParams.searchTerm);
      if (filterParams.brands.length) currentParams.set('brands', filterParams.brands);
      if (filterParams.sizes.length) currentParams.set('sizes', filterParams.sizes);
      if (filterParams.sort) currentParams.set('sort', filterParams.sort);

      router.push(`?${currentParams.toString()}`, { scroll: false });
    }, 500);

    return () => {
      clearTimeout(timeout);
    };
  }, [
    filterParams.brands,
    filterParams.searchTerm,
    filterParams.sizes,
    filterParams.maxPrice,
    filterParams.minPrice,
    filterParams.sort,
    router,
  ]);

  return (
    <Context value={{ filterParams, setParamByKey, clearParams }}>{children}</Context>
  );
}

export function useFilterParamsContext() {
  const context = useContext(Context);

  if (!context) {
    throw new Error('useFilterParamsContext must be used within FilterParamsProvider');
  }

  return context;
}
