import { useBrandStore } from '@/store/filters/brands-store';
import { usePriceStore } from '@/store/filters/price-store';
import { useSizeStore } from '@/store/filters/sizes-store';

export default function useFiltersAsParams() {
  const { brands } = useBrandStore();
  const { sizes } = useSizeStore();
  const { priceRange } = usePriceStore();

  const brandsParam = brands.join(',');
  const sizesParam = sizes.join(',');
  const minPrice = priceRange[0];
  const maxPrice = priceRange[1];

  return {
    brands: brandsParam,
    sizes: sizesParam,
    minPrice,
    maxPrice,
  };
}
