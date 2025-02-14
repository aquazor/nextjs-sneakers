'use client';

import Link from 'next/link';
import { useRef, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { IoBagCheckOutline } from 'react-icons/io5';
import { TbHeart, TbHeartCheck } from 'react-icons/tb';
import { BsCart, BsCartCheckFill } from 'react-icons/bs';
import { GoChevronDown } from 'react-icons/go';
import { v4 as uuid } from 'uuid';
import { cn } from '@/lib/utils';
import { IProduct } from '@/types/product';
import { useFavoriteContext } from '@/context/favoriteContext';
import { useCartContext } from '@/context/cartContext';
import useClickOutside from '@/hooks/useClickOuside';

export default function ItemInfo({ item }: { item: IProduct }) {
  const router = useRouter();
  const params = useSearchParams();
  const sizeParam = params.get('size');

  const { addCartItem, removeOrDeleteCartItem, cartItems } = useCartContext();
  const { addFavorite, deleteFavorite, favoriteItems } = useFavoriteContext();

  const [isLoading, setIsLoading] = useState(false);

  const { sizes } = item;
  const size = sizes.find((size) => size.value === sizeParam);
  const code = sizes.find((sizeObj) => sizeObj.code === size?.code)?.code || item.code;

  const itemInFavorite = favoriteItems.find((favItem) => favItem.itemId === item._id);
  const isInCart = cartItems.some(
    (cartItem) => cartItem.itemId === item._id && cartItem.size.code === size?.code
  );

  const [isOpen, setIsOpen] = useState(false);
  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);

  const menuRef = useRef<HTMLDivElement>(null);
  useClickOutside(isOpen, menuRef, close);

  const onSelect = (size: string) => {
    if (!size) {
      return;
    }
    router.replace(`/sneakers/${item._id}?size=${size}`, { scroll: false });
    setIsOpen(false);
  };

  const handleToggleToCart = async () => {
    if (!size || !size.value || size.count === 0) {
      open();
      return;
    }

    const currentItem = {
      _id: uuid(),
      itemId: item._id,
      code,
      size,
      count: 1,
      maxCount: size.count,
      name: item.name,
      price: item.price,
      url: item.url,
    };

    setIsLoading(true);

    if (isInCart) {
      await removeOrDeleteCartItem({ itemId: currentItem.itemId, code });
      setIsLoading(false);
      return;
    }

    await addCartItem(currentItem);
    setIsLoading(false);
  };

  const handleToggleToFavorites = async () => {
    setIsLoading(true);

    if (itemInFavorite) {
      await deleteFavorite({ itemId: itemInFavorite.itemId });
      setIsLoading(false);
      return;
    }

    const { _id: itemId, ...rest } = item;
    const currentItem = {
      _id: uuid(),
      itemId,
      createdAt: new Date().toISOString(),
      ...rest,
    };

    await addFavorite(currentItem);
    setIsLoading(false);
  };

  return (
    <div className="h-full flex flex-col md:justify-center lg:justify-start gap-6">
      <div>
        <h2 className="hidden md:block mb-1 text-4xl first-letter:text-5xl text-balance first-letter:font-bold">
          {item.name}
        </h2>

        <p className="mb-3 text-muted-foreground">
          code: <span className="font-bold">{code}</span>
        </p>

        <p className="text-2xl font-bold">
          Price: <span>{item.price}</span>
        </p>
      </div>

      <div className="flex flex-col w-full gap-3">
        <div className="flex gap-3">
          <button
            disabled={isLoading}
            onClick={handleToggleToFavorites}
            className="flex p-1 items-center border border-border hover:border-primary"
          >
            {itemInFavorite ? (
              <TbHeartCheck size={36} className="[&_path]:fill-pink-300" />
            ) : (
              <TbHeart size={36} />
            )}
          </button>

          <button
            disabled={isLoading}
            onClick={handleToggleToCart}
            className={cn(
              'flex gap-2 p-1 items-center border border-border hover:border-primary',
              !size?.value || size?.count === 0 ? 'opacity-50' : 'opacity-100'
            )}
          >
            {isInCart ? (
              <BsCartCheckFill size={36} className="[&_path]:fill-green-300" />
            ) : (
              <BsCart size={36} />
            )}
          </button>
        </div>

        <div className="flex justify-between gap-3 flex-wrap">
          <div ref={menuRef} className="relative text-xl">
            <div
              onClick={() => setIsOpen((prev) => !prev)}
              className="p-2 flex gap-2 items-center border cursor-pointer hover:border-primary"
            >
              <span className="text-nowrap">Select a size</span>
              <span className="font-bold">{size?.value || '...'}</span>
              <GoChevronDown className="shrink-0" />
            </div>
            {isOpen && (
              <ul className="absolute grid grid-cols-2 gap-1 mt-1 top-full w-full bg-background text-center">
                {sizes.map(({ code, value, count }) => (
                  <li key={code}>
                    <button
                      disabled={count === 0}
                      onClick={() => onSelect(value)}
                      className="relative p-1 cursor-pointer w-full border hover:border-primary disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      {value}
                      {count > 0 && count <= 2 && (
                        <span className="text-xs top-0 right-0.5 text-red-400 absolute text-nowrap">
                          {count === 1 ? 'last!' : count === 2 && '2 left!'}
                        </span>
                      )}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="flex justify-end">
            <Link
              href="/cart"
              className="px-3 py-2 flex items-center gap-1 transition-colors border border-primary bg-background text-foreground hover:bg-primary hover:text-primary-foreground font-bold text-lg"
            >
              Proceed to checkout <IoBagCheckOutline size={20} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
