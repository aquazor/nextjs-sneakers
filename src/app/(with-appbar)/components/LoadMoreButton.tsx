import useFiltersAsParams from '@/app/hooks/useFiltersAsParams';
import LoadingButton from '@/components/LoadingButton';
import { useProductsContext } from '@/context/productsContext';

export default function LoadMoreButton() {
  const { loadMore, moreAvailable, isLoading } = useProductsContext();
  const params = useFiltersAsParams();

  return (
    moreAvailable && (
      <div className="mt-5 flex items-center justify-center">
        <LoadingButton
          loading={isLoading}
          onClick={async () => await loadMore({ ...params, skip: 0 })}
          className="bg-primary min-w-28 h-8 flex items-center justify-center gap-2 text-white"
        >
          Load More
        </LoadingButton>
      </div>
    )
  );
}
