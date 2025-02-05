import { useBrandStore } from './brands-store';
import { usePriceStore } from './price-store';
import { useSizeStore } from './sizes-store';
import { MAX_PRICE, MIN_PRICE } from './constants';

export const clearAllFilters = () => {
  useBrandStore.setState({ brands: [] });
  useSizeStore.setState({ sizes: [] });
  usePriceStore.setState({ priceRange: [MIN_PRICE, MAX_PRICE] });
};
