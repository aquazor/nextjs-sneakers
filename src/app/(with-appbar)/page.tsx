import { LIMIT_STR } from '@/constants';
import { sneakersApi } from '@/lib/api/sneakers';
import { UrlFilterParams } from '@/types/filters';
import Container from '@/components/Container';
import Filters from './components/Filters';
import ItemsList from './components/ItemsList';
import FilterProviders from './FilterProviders';

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<UrlFilterParams>;
}) {
  const { searchTerm, brands, sizes, minPrice, maxPrice, sort } = await searchParams;

  const { items, hasMore } = await sneakersApi.getItems({
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
