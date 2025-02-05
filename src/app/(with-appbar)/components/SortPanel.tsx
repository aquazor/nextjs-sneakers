'use client';

import { useSortStore } from '@/lib/store/sort/sort-store';
import { SortMethod } from '@/lib/store/sort/types';
import { FaCaretDown, FaCaretUp } from 'react-icons/fa';
import { LiaSortSolid } from 'react-icons/lia';

const OPTIONS = [
  { value: 'none', name: 'None' },
  { value: 'price.desc', name: 'Price: High to Low' },
  { value: 'price.asc', name: 'Price: Low to High' },
  { value: 'name.desc', name: 'Name: A-Z' },
  { value: 'name.asc', name: 'Name: Z-A' },
];

export default function SortPanel() {
  const { sortBy, setSort } = useSortStore();

  const setPriceField = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value as SortMethod;
    setSort(value);
  };

  return (
    <div className="flex items-center gap-2">
      <LiaSortSolid size={24} className="shrink-0" />
      <div className="flex items-center gap-2 w-full">
        <label htmlFor="sortPrice" className="block shrink-0 text-sm">
          Sort by:
        </label>
        <div className="relative w-full">
          <select
            value={sortBy}
            onChange={setPriceField}
            id="sortPrice"
            className="block w-full pl-2 pr-7 py-1 border appearance-none bg-background text-sm"
          >
            {OPTIONS.map(({ name, value }) => (
              <option key={name} value={value}>
                {name}
              </option>
            ))}
          </select>

          {sortBy.split('.')[1] === 'asc' ? (
            <FaCaretUp
              size={16}
              className="absolute z-0 top-1/2 right-2 -translate-y-1/2"
            />
          ) : (
            <FaCaretDown
              size={16}
              className="absolute top-1/2 z-0 right-2 -translate-y-1/2"
            />
          )}
        </div>
      </div>
    </div>
  );
}
