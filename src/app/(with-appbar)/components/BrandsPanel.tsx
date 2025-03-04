import { useState } from 'react';
import { CiViewList } from 'react-icons/ci';
import { IoCloseCircleOutline } from 'react-icons/io5';
import { cn } from '@/lib/utils';
import { BRANDS } from '@/constants';
import { useFilterParamsContext } from '@/context/filtersContext';

export default function BrandsPanel() {
  const {
    filterParams: { brands },
    setParamByKey,
  } = useFilterParamsContext();

  const selected = brands.length ? brands.split(',') : [];
  const [searchValue, setSearchValue] = useState('');
  const filteredBrands = BRANDS.filter((brand) =>
    brand.toLowerCase().includes(searchValue.toLowerCase())
  );

  const selectBrand = (size: string) => {
    const updatedSizes = selected.includes(size)
      ? selected.filter((value) => value !== size)
      : [...selected, size];

    setParamByKey('brands', updatedSizes.join(','));
  };

  return (
    <div className="mt-4">
      <div className="flex items-center gap-2">
        <CiViewList size={24} className="shrink-0" />
        <div className="relative w-full">
          <div className="flex">
            {searchValue.length > 0 && (
              <button
                onClick={() => setSearchValue('')}
                className="flex items-center justify-center"
                aria-label="Clear search"
              >
                <IoCloseCircleOutline size={20} className="text-red-300" />
              </button>
            )}

            <input
              onChange={(e) => setSearchValue(e.target.value)}
              value={searchValue}
              autoComplete="off"
              id="searchBrands"
              name="searchBrands"
              type="text"
              placeholder="Brands"
              className="pl-1 py-0.5 border-b border-border w-full placeholder:text-sm"
            />
          </div>

          {selected.length > 0 && (
            <div className="absolute right-0 top-1/2 leading-6 -translate-y-1/2 bg-background text-nowrap text-right">
              <div className="flex gap-1">
                <span className="text-muted-foreground text-sm">
                  Selected:{' '}
                  <span className="text-base text-foreground">{selected.length}</span>
                </span>
                <button
                  onClick={() => setParamByKey('brands', '')}
                  className="flex items-center justify-center"
                  aria-label="Clear all selected brands"
                >
                  <IoCloseCircleOutline size={20} className="text-red-300" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="mt-1 ml-7">
        <ul
          className="overflow-auto scrollbar-thin h-[calc(1.75rem*5)] p-1 scroll-contain"
          role="listbox"
          aria-label="Brands"
        >
          {filteredBrands.map((brand) => {
            const isSelected = selected.some((value) => value === brand);

            return (
              <li
                key={brand}
                onClick={() => selectBrand(brand)}
                role="option"
                aria-selected={isSelected}
                className="flex gap-1 items-center cursor-pointer group focus-within:outline focus-within:outline-2 focus-within:outline-foreground"
              >
                <input
                  type="checkbox"
                  checked={isSelected}
                  className="sr-only"
                  readOnly
                  id={`brand-${brand}`}
                />
                <div
                  aria-hidden="true"
                  className={cn(
                    'size-4 shrink-0 border border-border transition-colors',
                    isSelected ? 'bg-foreground' : 'bg-transparent'
                  )}
                />
                <span
                  className={cn(
                    'block group-hover:bg-accent w-full mr-1 py-0.5 pl-1',
                    isSelected && 'bg-accent'
                  )}
                >
                  {brand}
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
