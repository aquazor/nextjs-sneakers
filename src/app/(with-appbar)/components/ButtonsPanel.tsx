import { useFilterParamsContext } from '@/context/filtersContext';

export default function ButtonsPanel() {
  const { clearParams } = useFilterParamsContext();

  return (
    <div className="mx-4">
      <button
        onClick={clearParams}
        className="w-full p-1 bg-primary text-primary-foreground"
        aria-label="Clear all filters"
      >
        Clear all
      </button>
    </div>
  );
}
