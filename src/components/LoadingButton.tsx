import Spinner from './Spinner';

interface Props extends React.ComponentProps<'button'> {
  loading: boolean;
  children: React.ReactNode;
}

export default function LoadingButton({ loading, children, ...rest }: Props) {
  return (
    <button aria-label="Load more" disabled={loading} {...rest}>
      {loading ? <Spinner /> : children}
    </button>
  );
}
