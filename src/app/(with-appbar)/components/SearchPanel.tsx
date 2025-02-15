'use client';

import { GoSearch } from 'react-icons/go';
import { IoCloseCircleOutline } from 'react-icons/io5';
import { useFilterParamsContext } from '@/context/filtersContext';

export default function SearchPanel() {
  const {
    filterParams: { searchTerm },
    setParamByKey,
  } = useFilterParamsContext();

  return (
    <div className="flex items-center gap-2">
      <GoSearch size={24} className="shrink-0" />

      <div className="flex w-full relative" aria-live="polite">
        <label htmlFor="searchTerm" className="sr-only">
          Search products
        </label>

        <input
          id="searchTerm"
          name="searchTerm"
          type="text"
          placeholder="Search"
          autoComplete="off"
          value={searchTerm}
          onChange={(e) => setParamByKey('searchTerm', e.target.value)}
          className="pl-2 py-1 pr-7 border border-border w-full placeholder:text-sm bg-background"
        />

        {searchTerm.length > 0 && (
          <button
            onClick={() => setParamByKey('searchTerm', '')}
            aria-label="Clear search"
            className="absolute top-1/2 -translate-y-1/2 right-1 flex items-center justify-center"
          >
            <IoCloseCircleOutline size={20} className="text-red-300" />
          </button>
        )}
      </div>
    </div>
  );
}
