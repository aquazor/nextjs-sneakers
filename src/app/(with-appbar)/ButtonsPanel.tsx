import LoadingButton from '@/components/LoadingButton';
import { useFiltersContext } from '@/context/filtersContext';
import { useProductsContext } from '@/context/productsContext';

export default function ButtonsPanel() {
  const { clearField } = useFiltersContext();
  const { isLoading } = useProductsContext();

  return (
    <div className="flex gap-2 mx-4">
      <LoadingButton
        loading={isLoading}
        className="w-full p-1 bg-primary text-primary-foreground"
      >
        Apply
      </LoadingButton>
      <button
        onClick={() => clearField('all')}
        className="w-full p-1 bg-primary text-primary-foreground"
      >
        Clear all
      </button>
    </div>
  );
}
