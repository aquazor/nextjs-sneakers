import Spinner from '@/components/Spinner';

export default function SignInLoading() {
  return (
    <div className="flex items-center justify-center p-5">
      <Spinner />
    </div>
  );
}
