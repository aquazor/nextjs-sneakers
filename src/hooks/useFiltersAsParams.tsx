import { useMemo } from 'react';
import { UrlParams } from '@/lib/api/products';
import { useBrandStore } from '@/lib/store/filters/brands-store';
import { usePriceStore } from '@/lib/store/filters/price-store';
import { useSearchStore } from '@/lib/store/filters/search-store';
import { useSizeStore } from '@/lib/store/filters/sizes-store';

export default function useFiltersAsParams(): Required<
  Omit<UrlParams, 'skip' | 'limit'>
> {
  const { searchTerm } = useSearchStore();
  const { priceRange } = usePriceStore();
  const { brands: brandsArr } = useBrandStore();
  const { sizes: sizesArr } = useSizeStore();

  const brands = brandsArr.join(',');
  const sizes = sizesArr.join(',');
  const [minPrice, maxPrice] = priceRange;

  const params = useMemo(
    () => ({ searchTerm, brands, sizes, minPrice, maxPrice }),
    [searchTerm, brands, sizes, minPrice, maxPrice]
  );

  return params;
}
