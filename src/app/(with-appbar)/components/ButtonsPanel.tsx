import { clearAllFilters } from '@/lib/store/filters/clear-filters';

export default function ButtonsPanel() {
  return (
    <div className="mx-4">
      <button
        onClick={clearAllFilters}
        className="w-full p-1 bg-primary text-primary-foreground"
      >
        Clear all
      </button>
    </div>
  );
}
