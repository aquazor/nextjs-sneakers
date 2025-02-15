import { IoCloseCircleOutline, IoResize } from 'react-icons/io5';
import { cn } from '@/lib/utils';
import { SIZES } from '@/constants';
import { useFilterParamsContext } from '@/context/filtersContext';

export default function SizesPanel() {
  const {
    filterParams: { sizes },
    setParamByKey,
  } = useFilterParamsContext();

  const selected = sizes.length ? sizes.split(',') : [];

  const selectSize = (size: string) => {
    const updatedSizes = selected.includes(size)
      ? selected.filter((value) => value !== size)
      : [...selected, size];

    setParamByKey('sizes', updatedSizes.join(','));
  };

  return (
    <div>
      <div className="flex items-center gap-2">
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
                  onClick={() => setParamByKey('sizes', '')}
                  className="flex items-center justify-center"
                  aria-label="Clear selected sizes"
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
                role="option"
                aria-selected={isSelected}
                key={size}
                onClick={() => selectSize(size)}
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
