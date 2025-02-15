import LoadingButton from '@/components/LoadingButton';

interface LoadMoreButtonProps {
  onLoadMore: () => Promise<void>;
  isLoading: boolean;
}

export default function LoadMoreButton({ onLoadMore, isLoading }: LoadMoreButtonProps) {
  return (
    <div className="mt-3 flex items-center justify-center">
      <LoadingButton
        loading={isLoading}
        onClick={onLoadMore}
        title="Load more"
        className="bg-primary min-w-28 h-8 flex items-center justify-center gap-2 text-white"
      >
        Load More
      </LoadingButton>
    </div>
  );
}
