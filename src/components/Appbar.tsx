'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { logout } from '@/app/actions/authActions';

export default function Appbar() {
  const { data: session, status } = useSession();

  return (
    <header className="border-b border-neutral-500">
      <div className="px-8">
        <div className="flex items-center justify-between py-2">
          {status === 'loading' ? (
            <>
              <div className="flex gap-2 animate-pulse">
                <div className="h-6 my-1.5 w-20 bg-primary/35 border-primary border opacity-25" />
                <div className="h-6 my-1.5 w-20 bg-primary/35 border-primary border opacity-25" />
              </div>

              <div className="flex gap-2 items-center animate-pulse">
                <div className="size-[34px] bg-primary/35 border-primary border rounded-full opacity-25" />
                <div className="h-8 w-20 bg-primary/35 border-primary border opacity-25" />
              </div>
            </>
          ) : (
            <>
              <nav>
                <ul className="flex gap-2">
                  <li>
                    <Link
                      className="px-3 py-1.5 hover:underline underline-offset-2"
                      href={'/'}
                    >
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="px-3 py-1.5 hover:underline underline-offset-2"
                      href={'/dashboard'}
                    >
                      Dashboard
                    </Link>
                  </li>
                </ul>
              </nav>

              {session ? (
                <div className="flex items-center gap-2">
                  <Image
                    src={session.user?.image ?? ''}
                    alt="Avatar"
                    width={34}
                    height={34}
                    className="rounded-full"
                  />
                  <form action={logout}>
                    <button
                      className="px-3 py-1.5 bg-primary text-primary-foreground"
                      type="submit"
                    >
                      Sign out
                    </button>
                  </form>
                </div>
              ) : (
                <button className="px-3 py-1.5 bg-primary text-primary-foreground">
                  <Link href={'/sign-in'}>Sign in</Link>
                </button>
              )}
            </>
          )}
        </div>
      </div>
    </header>
  );
}
