import Spinner from './Spinner';

interface Props extends React.ComponentProps<'button'> {
  loading: boolean;
  children: React.ReactNode;
}

export default function LoadingButton({ loading, children, ...rest }: Props) {
  return (
    <button disabled={loading} {...rest}>
      {loading ? <Spinner /> : children}
    </button>
  );
}
