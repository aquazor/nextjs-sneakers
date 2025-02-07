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
      <div className="flex w-full relative">
        <input
          value={searchTerm}
          onChange={(e) => setParamByKey('searchTerm', e.target.value)}
          autoComplete="off"
          id="searchTerm"
          name="searchTerm"
          type="text"
          placeholder="Search"
          className="pl-2 py-1 pr-7 border border-border w-full placeholder:text-sm bg-background"
        />

        {searchTerm.length > 0 && (
          <button
            onClick={() => setParamByKey('searchTerm', '')}
            className="absolute top-1/2 -translate-y-1/2 right-1 flex items-center justify-center"
          >
            <IoCloseCircleOutline size={20} className="text-red-300" />
          </button>
        )}
      </div>
    </div>
  );
}
