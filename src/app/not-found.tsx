import Link from 'next/link';
import Logo from '@/components/Logo';

export default function Page() {
  return (
    <div className="flex items-center justify-center flex-col mt-20 ">
      <div className="space-y-5 border p-4">
        <Link href="/" className="flex justify-center">
          <Logo width={80} height={80} />
        </Link>
        <h2 className="text-3xl inline-flex flex-col text-center">
          This page does not exist<span className="text-nowrap">¯\_(ツ)_/¯</span>
        </h2>
      </div>
    </div>
  );
}
