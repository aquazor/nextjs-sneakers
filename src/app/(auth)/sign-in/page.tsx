'use client';

import { useSearchParams } from 'next/navigation';
import { providerMap } from '@/auth';
import { socialSignIn } from '@/app/actions/authActions';
import { MdKeyboardDoubleArrowLeft } from 'react-icons/md';
import Logo from '@/components/Logo';
import Link from 'next/link';

export default function SignIn() {
  const searchParams = useSearchParams();

  return (
    <div className="flex items-center justify-center min-h-screen bg-secondary p-4">
      <div className="w-full flex flex-col items-center justify-center gap-6 max-w-md shadow-xl p-8 bg-background">
        <div className="self-start flex items-center text-blue-500 group text-lg">
          <MdKeyboardDoubleArrowLeft className="group-hover:-translate-x-1 group-hover:scale-125 transition-transform" />
          <Link href="/">Home</Link>
        </div>

        <Link href="/">
          <Logo width={64} height={64} />
        </Link>

        <h2 className="text-3xl text-center">Welcome</h2>

        <div className="space-y-2 w-full">
          {Object.values(providerMap).map((provider) => (
            <form
              key={provider.id}
              action={async () =>
                socialSignIn(provider.id, searchParams.get('callbackUrl'))
              }
            >
              <button
                className="w-full bg-primary text-primary-foreground p-2 hover:bg-primary/90 transition-colors"
                type="submit"
                name="action"
                value={provider.id}
              >
                Sign in with {provider.name}
              </button>
            </form>
          ))}
        </div>
      </div>
    </div>
  );
}
