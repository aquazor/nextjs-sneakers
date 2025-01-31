'use client';

import Link from 'next/link';
import { Button } from './ui/button';
import { handleSignOut } from '@/app/actions/authActions';
import { useSession } from 'next-auth/react';
import Spinner from './Spinner';

export default function Appbar() {
  const { data: session, status } = useSession();

  return (
    <header className="border-b border-neutral-500 ">
      <div className="container">
        <div className="flex items-center justify-between py-2">
          {status === 'loading' ? (
            <>
              <div className="flex gap-2">
                <div className="px-4 py-2 w-20">
                  <Spinner />
                </div>

                <div className="px-4 py-2 w-20">
                  <Spinner />
                </div>
              </div>

              <div className="px-4 py-2 w-16">
                <Spinner />
              </div>
            </>
          ) : (
            <>
              <nav>
                <ul className="flex gap-2">
                  <li>
                    <Button variant={'link'} asChild>
                      <Link href={'/'}>Home</Link>
                    </Button>
                  </li>
                  <li>
                    <Button variant={'link'} asChild>
                      <Link href={'/dashboard'}>Dashboard</Link>
                    </Button>
                  </li>
                </ul>
              </nav>

              {session ? (
                <form action={handleSignOut}>
                  <Button variant={'default'} type="submit">
                    Sign out
                  </Button>
                </form>
              ) : (
                <Button asChild>
                  <Link href={'/sign-in'}>Sign in</Link>
                </Button>
              )}
            </>
          )}
        </div>
      </div>
    </header>
  );
}
