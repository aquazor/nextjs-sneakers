import Spinner from './Spinner';
import { Button } from './ui/button';

interface Props {
  loading: boolean;
  children: React.ReactNode;
}

export default function LoadingButton({ loading, children }: Props) {
  return (
    <Button className="w-full" type="submit" disabled={loading}>
      {loading ? <Spinner /> : children}
    </Button>
  );
}
