'use client';

import { LiaSortSolid } from 'react-icons/lia';
import { ISortMethod } from '@/types/filters';
import { useFilterParamsContext } from '@/context/filtersContext';
import Select from '@/components/Select';

const OPTIONS: { value: ISortMethod; name: string }[] = [
  { value: '', name: 'None' },
  { value: 'price:desc', name: 'Price: High to Low' },
  { value: 'price:asc', name: 'Price: Low to High' },
  { value: 'name:asc', name: 'Name: A-Z' },
  { value: 'name:desc', name: 'Name: Z-A' },
];

export default function SortPanel() {
  const {
    filterParams: { sort },
    setParamByKey,
  } = useFilterParamsContext();

  const handleChange = (value: ISortMethod | string) => {
    setParamByKey('sort', value);
  };

  return (
    <div className="flex items-center gap-2">
      <LiaSortSolid size={24} className="shrink-0" />
      <div className="flex items-center gap-1 w-full">
        <label htmlFor="sort" className="block shrink-0 text-sm">
          Sort by:
        </label>

        <Select
          id="sort"
          name="sort"
          options={OPTIONS}
          value={sort}
          onChange={handleChange}
        />
      </div>
    </div>
  );
}
