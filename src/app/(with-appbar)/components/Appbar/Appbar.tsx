'use client';

import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { IoCartOutline, IoHeartOutline } from 'react-icons/io5';
import { useFavoriteContext } from '@/context/favoriteContext';
import { useCartContext } from '@/context/cartContext';
import UserMenu from './UserMenu';
import Logo from '@/components/Logo';

export default function Appbar() {
  const { data: session, status } = useSession();
  const { count: favCount } = useFavoriteContext();
  const { count: cartCount } = useCartContext();

  return (
    <header className="border-b border-neutral-500">
      <div className="px-4">
        <div className="flex items-center justify-between py-2">
          {status === 'loading' ? (
            <>
              <div className="flex gap-2 animate-pulse-fast">
                <div className="size-9 rounded-full bg-primary/35 border-primary border opacity-25" />
                <div className="h-6 my-1.5 w-32 bg-primary/35 border-primary border opacity-25" />
              </div>

              <div className="flex gap-6 items-center animate-pulse-fast">
                <div className="flex gap-2">
                  <div className="size-9 rounded-full bg-primary/35 border-primary border opacity-25" />
                  <div className="size-9 rounded-full bg-primary/35 border-primary border opacity-25" />
                </div>
                <div className="size-9 rounded-full bg-primary/35 border-primary border opacity-25" />
              </div>
            </>
          ) : (
            <>
              <nav>
                <ul className="flex gap-2">
                  <li>
                    <Link href="/" className="flex items-center gap-2">
                      <Logo width={36} height={36} />
                      <span className="font-bold text-lg">Nextjs-sneakers</span>
                    </Link>
                  </li>
                </ul>
              </nav>

              <div className="flex items-center gap-6">
                <nav>
                  <ul className="flex gap-2 items-center">
                    <li>
                      <div className="relative">
                        <Link href="/favorite">
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

                {!session ? (
                  <button className="px-3 py-1.5 bg-primary text-primary-foreground">
                    <Link href="/sign-in">Sign in</Link>
                  </button>
                ) : (
                  <UserMenu />
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
