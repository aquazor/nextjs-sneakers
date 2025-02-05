import { useProductsContext } from '@/context/productsContext';
import { clearAllFilters } from '@/lib/store/filters/clear-filters';
import useFiltersAsParams from '@/app/hooks/useFiltersAsParams';
import LoadingButton from '@/components/LoadingButton';

export default function ButtonsPanel() {
  const { isLoading, getProducts } = useProductsContext();
  const params = useFiltersAsParams();

  return (
    <div className="flex gap-2 mx-4">
      <LoadingButton
        onClick={async () => await getProducts(params)}
        loading={isLoading}
        className="w-full p-1 bg-primary text-primary-foreground"
      >
        Apply
      </LoadingButton>
      <button
        onClick={clearAllFilters}
        className="w-full p-1 bg-primary text-primary-foreground"
      >
        Clear all
      </button>
    </div>
  );
}
