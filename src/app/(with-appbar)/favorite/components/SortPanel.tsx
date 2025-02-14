import { useRouter } from 'next/navigation';
import { useFavoriteContext } from '@/context/favoriteContext';
import { FavoriteSortMethod } from '@/types/favorite';
import Select from '@/components/Select';

const OPTIONS: { value: FavoriteSortMethod; name: string }[] = [
  { value: '', name: 'None' },
  { value: 'createdAt:desc', name: 'Date: Newest first' },
  { value: 'createdAt:asc', name: 'Date: Oldest first' },
  { value: 'price:desc', name: 'Price: High to Low' },
  { value: 'price:asc', name: 'Price: Low to High' },
  { value: 'name:asc', name: 'Name: A-Z' },
  { value: 'name:desc', name: 'Name: Z-A' },
];

export default function SortPanel() {
  const router = useRouter();
  const {
    filterParams: { sort },
    setParamByKey,
  } = useFavoriteContext();

  const handleChange = (value: string) => {
    setParamByKey('sort', value as FavoriteSortMethod);
    const currentParams = new URLSearchParams();
    currentParams.append('sort', value);
    router.replace(`/favorite/?${currentParams.toString()}`, { scroll: false });
  };

  return (
    <div className="mb-4">
      <div className="flex items-center gap-1">
        <label htmlFor="sort" className="block shrink-0 text-lg">
          Sort by:
        </label>

        <Select
          id="sort"
          name="sort"
          options={OPTIONS}
          value={sort}
          onChange={handleChange}
          className="text-lg"
        />
      </div>
    </div>
  );
}
