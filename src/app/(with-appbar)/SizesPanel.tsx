'use client';

import { IoCloseCircleOutline, IoResize } from 'react-icons/io5';
import { cn } from '@/lib/utils';
import { useFiltersContext } from '@/context/filtersContext';

const SIZES = ['39', '40', '41', '42', '43', '44', '45', '46'];

export default function SizesPanel() {
  const { sizes: selected, onSelectSize, clearField } = useFiltersContext();

  return (
    <div>
      <div className="flex items-center gap-2 group">
        <IoResize size={24} className="shrink-0" />
        <div className="relative w-full">
          <div className="px-1 py-0.5 w-full text-sm">Sizes</div>
          {selected.length > 0 && (
            <div className="absolute right-0 top-1/2 leading-6 -translate-y-1/2 bg-background text-nowrap text-right">
              <div className="flex gap-1">
                <span className="text-muted-foreground text-sm">
                  Selected:{' '}
                  <span className="text-base text-foreground">{selected.length}</span>
                </span>
                <button
                  onClick={() => clearField('sizes')}
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
        <ul className="grid grid-cols-2 gap-x-2 p-1">
          {SIZES.map((size) => {
            const isSelected = selected.some((value) => value === size);
            return (
              <li
                key={size}
                onClick={() => onSelectSize(size)}
                className="flex gap-1 items-center group cursor-pointer focus-within:outline focus-within:outline-2 focus-within:outline-foreground"
              >
                <input
                  type="checkbox"
                  checked={isSelected}
                  className="sr-only"
                  readOnly
                  id={`size-${size}`}
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
                  {size}
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
