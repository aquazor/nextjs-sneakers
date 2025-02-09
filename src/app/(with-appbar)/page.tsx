import { UrlFilterParams } from '@/constants/types';
import { LIMIT_STR } from '@/constants';
import { fetchItems } from '@/lib/api/sneakers';
import FilterProviders from './FilterProviders';
import Filters from './components/Filters';
import ItemsList from './components/ItemsList';

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<UrlFilterParams>;
}) {
  const { searchTerm, brands, sizes, minPrice, maxPrice, sort } = await searchParams;

  const { items, hasMore } = await fetchItems({
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
          <ItemsList data={items} hasMore={hasMore} />
        </FilterProviders>
      </div>
    </div>
  );
}
