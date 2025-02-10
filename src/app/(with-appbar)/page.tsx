import { UrlFilterParams } from '@/constants/types';
import { LIMIT_STR } from '@/constants';
import { fetchItems } from '@/lib/api/sneakers';
import FilterProviders from './FilterProviders';
import Container from '@/components/Container';
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
    <Container>
      <div className="flex lg:gap-2">
        <FilterProviders>
          <Filters />
          <ItemsList data={items} hasMore={hasMore} />
        </FilterProviders>
      </div>
    </Container>
  );
}
