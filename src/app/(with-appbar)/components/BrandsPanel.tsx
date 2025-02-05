import { useState } from 'react';
import { CiViewList } from 'react-icons/ci';
import { IoCloseCircleOutline } from 'react-icons/io5';
import { cn } from '@/lib/utils';
import { useBrandStore } from '@/lib/store/filters/brands-store';
import { BRANDS } from '@/lib/store/filters/constants';

export default function BrandsPanel() {
  const { brands: selected, selectBrand, clearBrands } = useBrandStore();
  const [value, setValue] = useState('');

  const brands = BRANDS.filter((brand) =>
    brand.toLowerCase().includes(value.toLowerCase())
  );

  return (
    <div className="mt-4">
      <div className="flex items-center gap-2 group">
        <CiViewList size={24} className="shrink-0" />
        <div className="relative w-full">
          <div className="flex">
            {value.length > 0 && (
              <button
                onClick={() => setValue('')}
                className="flex items-center justify-center"
              >
                <IoCloseCircleOutline size={20} className="text-red-300" />
              </button>
            )}

            <input
              onChange={(e) => setValue(e.target.value)}
              value={value}
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
                  onClick={clearBrands}
                  className="flex items-center justify-center"
                >
                  <IoCloseCircleOutline size={20} className="text-red-300" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="mt-1 ml-7">
        <ul className="overflow-auto scrollbar-thin max-h-[calc(1.75rem*5)] p-1">
          {brands.map((brand) => {
            const isSelected = selected.some((value) => value === brand);

            return (
              <li
                key={brand}
                onClick={() => selectBrand(brand)}
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
