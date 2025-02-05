import { MAX_PRICE, MIN_PRICE } from './constants';
import { useSearchStore } from './search-store';
import { useBrandStore } from './brands-store';
import { useSizeStore } from './sizes-store';
import { usePriceStore } from './price-store';
import { useSortStore } from '../sort/sort-store';

export const clearAllFilters = () => {
  useSearchStore.setState({ searchTerm: '' });
  useBrandStore.setState({ brands: [] });
  useSizeStore.setState({ sizes: [] });
  usePriceStore.setState({ priceRange: [MIN_PRICE, MAX_PRICE] });
  useSortStore.setState({ sortBy: 'none' });
};
