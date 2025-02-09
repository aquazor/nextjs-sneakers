'use client';

import { useRef, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { IoBagCheckOutline, IoCartOutline, IoHeartOutline } from 'react-icons/io5';
import { GoChevronDown } from 'react-icons/go';
import { IProduct } from '@/lib/mongoose/models/ItemSchema';
import useClickOutside from '@/hooks/useClickOuside';

export default function ItemInfo({ item }: { item: IProduct }) {
  const router = useRouter();
  const params = useSearchParams();

  const [isOpen, setIsOpen] = useState(false);
  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);

  const menuRef = useRef<HTMLDivElement>(null);
  useClickOutside(isOpen, menuRef, close);

  const sizeParam = params.get('size');
  const sizes = item.sizes;
  const size = sizes.find((size) => size.value === sizeParam) || {
    code: '',
    value: '',
  };
  const code = sizes.find((sizeObj) => sizeObj.code === size.code)?.code || item.code;

  const onSelect = (size: string) => {
    router.replace(`/sneakers/${item._id}?size=${size}`, { scroll: false });
    setIsOpen(false);
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
            onClick={() => {
              if (!size.value) {
                open();
              }
            }}
            className="flex p-0.5 items-center border border-border hover:border-primary group"
          >
            <IoHeartOutline size={40} className="group-hover:[&_path]:fill-pink-300" />
          </button>

          <button
            onClick={() => {
              if (!size.value) {
                open();
              }
            }}
            className="flex p-0.5 items-center border border-border hover:border-primary group"
          >
            <IoCartOutline size={40} className="group-hover:[&_path]:fill-green-300" />
          </button>
        </div>

        <div className="flex justify-between gap-3 flex-wrap">
          <div ref={menuRef} className="relative text-xl">
            <div
              onClick={() => setIsOpen((prev) => !prev)}
              className="p-2 flex gap-2 items-center border cursor-pointer hover:border-primary"
            >
              <span className="text-nowrap">Select a size</span>
              <span className="font-bold">{size.value || '...'}</span>
              <GoChevronDown className="shrink-0" />
            </div>
            {isOpen && (
              <ul className="absolute grid grid-cols-2 gap-1 mt-1 top-full w-full bg-background text-center">
                {sizes.map((size) => (
                  <li
                    className="p-1 cursor-pointer border hover:border-primary"
                    onClick={() => onSelect(size.value)}
                    key={size._id}
                  >
                    {size.value}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="flex justify-end">
            <button className="px-3 py-2 flex items-center gap-1 transition-colors border border-primary bg-background text-foreground hover:bg-primary hover:text-primary-foreground font-bold text-lg">
              Proceed to checkout <IoBagCheckOutline size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
