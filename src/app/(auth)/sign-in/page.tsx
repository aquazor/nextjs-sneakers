'use client';

import { useSearchParams } from 'next/navigation';
import { providerMap } from '@/auth';
import { socialSignIn } from '@/app/actions/authActions';
import Image from 'next/image';
import Logo from '@/assets/logo.svg';

export default function SignIn() {
  const searchParams = useSearchParams();

  return (
    <div className="flex items-center justify-center min-h-screen bg-secondary p-4">
      <div className="w-full max-w-md shadow-xl p-10 bg-background">
        <div className="flex items-center justify-center">
          <Image src={Logo} alt="Logo icon" width={64} height={64} />
        </div>

        <h2 className="text-3xl text-center mt-8">Welcome</h2>

        <div className="mt-8 space-y-2">
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
