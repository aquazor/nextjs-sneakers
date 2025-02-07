import { fetchProducts } from '@/lib/api/products';
import { LIMIT_STR } from '@/constants';
import { UrlFilterParams } from '@/constants/types';
import FilterProviders from './FilterProviders';
import ProductsList from './components/ProductsList';
import Filters from './components/Filters';

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<UrlFilterParams>;
}) {
  const { searchTerm, brands, sizes, minPrice, maxPrice, sort } = await searchParams;

  const { products, hasMore } = await fetchProducts({
    searchTerm,
    brands,
    sizes,
    minPrice: minPrice,
    maxPrice: maxPrice,
    sort,
    skip: '0',
    limit: LIMIT_STR,
  });

  return (
    <div className="p-4 max-w-[112.5rem] mx-auto">
      <div className="flex lg:gap-2">
        <FilterProviders>
          <Filters />
          <ProductsList data={products} hasMore={hasMore} />
        </FilterProviders>
      </div>
    </div>
  );
}
