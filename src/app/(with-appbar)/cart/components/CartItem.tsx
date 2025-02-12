import Image from 'next/image';
import { useState } from 'react';
import { IoAdd, IoRemove } from 'react-icons/io5';
import { RxCross1 } from 'react-icons/rx';
import { CiSquareRemove } from 'react-icons/ci';
import { ICartItem } from '@/types/cart';
import { cn } from '@/lib/utils';
import { useCartContext } from '@/context/cartContext';
import Link from 'next/link';

export default function CartItem({ item }: { item: ICartItem }) {
  const [isLoading, setIsLoading] = useState(false);
  const { addCartItem, removeOrDeleteCartItem, deleteCartItem } = useCartContext();

  const handleAddItem = async () => {
    setIsLoading(true);
    await addCartItem(item);
    setIsLoading(false);
  };

  const handleRemoveItem = async () => {
    setIsLoading(true);
    await removeOrDeleteCartItem({ itemId: item.itemId, code: item.size.code });
    setIsLoading(false);
  };

  const handleDeleteItem = async () => {
    setIsLoading(true);
    await deleteCartItem({ itemId: item.itemId, code: item.size.code });
    setIsLoading(false);
  };

  return (
    <li className="shadow-lg border grid grid-cols-[auto,1fr,auto]">
      <Link
        href={`/sneakers/${item.itemId}`}
        className="flex items-center justify-center bg-muted"
      >
        <Image
          src={item.url}
          width={150}
          height={150}
          className="object-cover h-[150px] w-[150px]"
          alt="Sneakers image"
        />
      </Link>

      <div className="relative">
        <ul className="h-full flex flex-col justify-center gap-1 border-l pl-3 pr-7">
          <li>
            <h4 className="text-xl leading-6">{item.name}</h4>
          </li>
          <li>
            <p className="text-sm text-muted-foreground">code {item.size.code}</p>
          </li>
          <li>
            <p>
              Size: <span className="font-bold text-lg">{item.size.value} </span>
              {item.maxCount <= 2 && (
                <span className="text-sm leading-6 text-red-400 mt-0.5">
                  {item.maxCount === 1
                    ? 'Last pair!'
                    : item.maxCount === 2 && 'Two left!'}
                </span>
              )}
            </p>
            <p>
              Price: <span className="font-bold text-lg">{item.price}</span>
            </p>
          </li>
        </ul>

        <button className="absolute right-0.5 top-0.5" onClick={handleDeleteItem}>
          <CiSquareRemove size={26} className="text-red-400" />
        </button>
      </div>

      <div className="flex flex-col justify-evenly border-l">
        <div className="flex items-center justify-center gap-2 px-3">
          <button
            disabled={item.count >= item.maxCount || isLoading}
            onClick={handleAddItem}
            className={cn(item.count >= item.maxCount && 'disabled:opacity-30')}
          >
            <IoAdd size={24} />
          </button>

          <span className="border border-primary p-1 min-w-10 text-center select-none">
            {item.count}
          </span>

          <button disabled={isLoading} onClick={handleRemoveItem}>
            {item.count > 1 ? (
              <IoRemove size={24} />
            ) : (
              <RxCross1 size={20} className="text-red-400 m-0.5" />
            )}
          </button>
        </div>

        <div className="h-[1px] bg-border" />

        <div>
          <div className="h-full flex flex-col text-center px-3">
            <span>PRICE</span>
            <span className="font-bold text-lg">{item.price * item.count}</span>
          </div>
        </div>
      </div>
    </li>
  );
}
