import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { IoAdd, IoRemove } from 'react-icons/io5';
import { RxCross1 } from 'react-icons/rx';
import { CiSquareRemove } from 'react-icons/ci';
import { ICartItem } from '@/types/cart';
import { cn } from '@/lib/utils';
import { CartState } from '@/context/cartContext';

interface Props {
  item: ICartItem;
  addItem: CartState['addCartItem'];
  removeItem: CartState['removeOrDeleteCartItem'];
  deleteItem: CartState['deleteCartItem'];
}

export default function CartItem({ item, addItem, removeItem, deleteItem }: Props) {
  const [isLoading, setIsLoading] = useState(false);

  const handleAsyncAction = async (cb: () => Promise<void>) => {
    setIsLoading(true);
    await cb();
    setIsLoading(false);
  };

  const handleAddItem = async () => {
    await handleAsyncAction(() => addItem(item));
  };

  const handleRemoveItem = async () => {
    await handleAsyncAction(() =>
      removeItem({ itemId: item.itemId, code: item.size.code })
    );
  };

  const handleDeleteItem = async () => {
    await handleAsyncAction(() =>
      deleteItem({ itemId: item.itemId, code: item.size.code })
    );
  };

  return (
    <li className="shadow-lg min-[900px]:flex">
      <div className="flex grow border overflow-hidden">
        <Link
          href={`/sneakers/${item.itemId}`}
          className="shrink-0 flex items-center justify-center bg-muted"
        >
          <Image
            src={item.url}
            width={150}
            height={150}
            quality={100}
            className="object-cover h-[150px] w-[150px]"
            alt={`${item.name} sneaker`}
            priority
          />
        </Link>

        <div className="relative grow">
          <ul className="h-full flex flex-col justify-center gap-1 border-l pl-3 pr-7">
            <li>
              <Link
                href={`/sneakers/${item.itemId}`}
                className="text-lg leading-5 underline underline-offset-2 text-blue-500 hover:text-blue-700"
              >
                {item.name}
              </Link>
            </li>
            <li>
              <p className="text-sm text-muted-foreground">code {item.size.code}</p>
            </li>
            <li>
              <p>
                Size: <span className="font-bold text-lg">{item.size.value}</span>{' '}
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

          <button
            className="absolute right-0.5 top-0.5"
            onClick={handleDeleteItem}
            aria-label="Remove item from cart"
            title="Remove item from cart"
            disabled={isLoading}
          >
            <CiSquareRemove size={26} className="text-red-400" />
          </button>
        </div>
      </div>

      <div className="flex min-[900px]:flex-col justify-center border-r min-[900px]:border-t min-[900px]:border-l-0 border-l border-b">
        <div className="flex items-center justify-center p-2 min-[900px]:border-b">
          <div className="h-full flex flex-col items-center text-center px-3">
            <span className="text-lg">PRICE</span>
            <span className="font-bold text-xl">{item.price * item.count}</span>
          </div>
        </div>

        <div className="my-auto flex items-center justify-center gap-2 p-2 pb-2">
          <button
            disabled={item.count >= item.maxCount || isLoading}
            onClick={handleAddItem}
            className={cn(
              'transition-all',
              item.count >= item.maxCount && 'opacity-30 cursor-not-allowed'
            )}
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
      </div>
    </li>
  );
}
