import { useSearchStore } from './search-store';
import { useBrandStore } from './brands-store';
import { useSizeStore } from './sizes-store';
import { usePriceStore } from './price-store';
import { MAX_PRICE, MIN_PRICE } from './constants';

export const clearAllFilters = () => {
  useSearchStore.setState({ term: '' });
  useBrandStore.setState({ brands: [] });
  useSizeStore.setState({ sizes: [] });
  usePriceStore.setState({ priceRange: [MIN_PRICE, MAX_PRICE] });
};
