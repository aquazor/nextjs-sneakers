'use client';

import { FaCaretDown, FaCaretUp } from 'react-icons/fa';
import { LiaSortSolid } from 'react-icons/lia';
import { ISortMethod } from '@/types/filters';
import { useFilterParamsContext } from '@/context/filtersContext';

const OPTIONS: { value: ISortMethod; name: string }[] = [
  { value: '', name: 'None' },
  { value: 'price:desc', name: 'Price: High to Low' },
  { value: 'price:asc', name: 'Price: Low to High' },
  { value: 'name:asc', name: 'Name: A-Z' },
  { value: 'nameDesc', name: 'Name: Z-A' },
];

export default function SortPanel() {
  const {
    filterParams: { sort },
    setParamByKey,
  } = useFilterParamsContext();

  const setSort = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value as ISortMethod;
    setParamByKey('sort', value);
  };

  return (
    <div className="flex items-center gap-2">
      <LiaSortSolid size={24} className="shrink-0" />
      <div className="flex items-center gap-1 w-full">
        <label htmlFor="sortPrice" className="block shrink-0 text-sm">
          Sort by:
        </label>
        <div className="relative w-full">
          <select
            value={sort}
            onChange={setSort}
            id="sortPrice"
            className="block w-full pl-2 pr-7 py-0.5 border appearance-none bg-background"
          >
            {OPTIONS.map(({ name, value }) => (
              <option key={name} value={value}>
                {name}
              </option>
            ))}
          </select>

          {sort.split(':')[1] === 'asc' ? (
            <FaCaretUp
              size={16}
              className="absolute z-0 top-1/2 right-2 -translate-y-1/2 pointer-events-none"
            />
          ) : (
            <FaCaretDown
              size={16}
              className="absolute top-1/2 z-0 right-2 -translate-y-1/2 pointer-events-none"
            />
          )}
        </div>
      </div>
    </div>
  );
}
