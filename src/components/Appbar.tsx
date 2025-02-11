'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { IoCartOutline, IoHeartOutline } from 'react-icons/io5';
import { logout } from '@/app/actions/authActions';
import { useFavoritesContext } from '@/context/favoritesContext';
import { useCartContext } from '@/context/cartContext';

export default function Appbar() {
  const { data: session, status } = useSession();
  const { count: favCount } = useFavoritesContext();
  const { count: cartCount } = useCartContext();

  return (
    <header className="border-b border-neutral-500">
      <div className="px-4">
        <div className="flex items-center justify-between py-2">
          {status === 'loading' ? (
            <>
              <div className="flex gap-2 animate-pulse-fast">
                <div className="h-6 my-1.5 w-20 bg-primary/35 border-primary border opacity-25" />
                <div className="h-6 my-1.5 w-20 bg-primary/35 border-primary border opacity-25" />
              </div>

              <div className="flex gap-2 items-center animate-pulse-fast">
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
                </ul>
              </nav>

              <div className="flex items-center gap-2">
                <nav>
                  <ul className="flex gap-2 items-center">
                    <li>
                      <div className="relative">
                        <Link href="/favorites">
                          <IoHeartOutline size={36} />
                        </Link>
                        <span className="select-none pointer-events-none absolute top-0 right-0 bg-primary rounded-full size-4 flex items-center justify-center text-xs text-primary-foreground leading-none">
                          {favCount}
                        </span>
                      </div>
                    </li>
                    <li>
                      <div className="relative">
                        <Link href="/cart">
                          <IoCartOutline size={36} />
                        </Link>
                        <span className="select-none pointer-events-none absolute top-0 right-0 bg-primary rounded-full size-4 flex items-center justify-center text-xs text-primary-foreground leading-none">
                          {cartCount}
                        </span>
                      </div>
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
                    <form id="logout" name="logout" action={logout}>
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
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
