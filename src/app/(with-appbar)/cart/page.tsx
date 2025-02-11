'use client';

import { useCartContext } from '@/context/cartContext';
import { IoAdd, IoRemove } from 'react-icons/io5';
import { RxCross1 } from 'react-icons/rx';
import Container from '@/components/Container';
import Image from 'next/image';

export default function CartPage() {
  const { cartItems, incCount, decCount, removeCartItem } = useCartContext();

  return (
    <Container>
      <div className="flex gap-3">
        <ul className="w-full flex flex-wrap gap-3 *:w-[calc(50%-0.75rem/2)]">
          {cartItems.map((item) => (
            <li
              key={item.size.code}
              className="shadow-lg border grid grid-cols-[150px,1fr,auto]"
            >
              <div className="flex items-center justify-center bg-muted">
                <Image
                  src={item.url}
                  width={150}
                  height={150}
                  className="object-cover h-[150px] w-[150px]"
                  alt="Sneakers image"
                />
              </div>

              <ul className="flex flex-col justify-center gap-1 border-l px-3">
                <li>
                  <h4 className="text-xl leading-6">{item.name}</h4>
                </li>
                <li>
                  <p className="text-sm text-muted-foreground">code {item.size.code}</p>
                </li>
                <li>
                  <p>
                    Size: <span className="font-bold text-lg">{item.size.value}</span>
                  </p>
                  <p>
                    Price: <span className="font-bold text-lg">{item.price}</span>
                  </p>
                </li>
              </ul>

              <div className="flex flex-col justify-evenly border-l">
                <div className="relative flex items-center justify-center gap-2 px-3">
                  <button
                    disabled={item.count >= item.size.count}
                    onClick={() => incCount(item.size.code)}
                    className="disabled:opacity-30"
                  >
                    <IoAdd size={24} />
                  </button>

                  <span className="border border-primary p-1 min-w-10 text-center select-none">
                    {item.count}
                  </span>

                  <button
                    onClick={() => {
                      if (item.count > 1) {
                        decCount(item.size.code);
                        return;
                      }
                      removeCartItem(item.size.code);
                    }}
                    className="disabled:opacity-30"
                  >
                    {item.count > 1 ? (
                      <IoRemove size={24} />
                    ) : (
                      <RxCross1 size={20} className="text-red-300 m-0.5" />
                    )}
                  </button>

                  {item.size.count <= 2 && (
                    <span className="absolute top-full leading-none text-xs text-red-300 mt-0.5">
                      {item.size.count === 1
                        ? 'last pair!'
                        : item.size.count === 2 && 'two left!'}
                    </span>
                  )}
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
          ))}
        </ul>

        <div className="p-2 shrink-0 w-96 shadow-lg h-fit">123</div>
      </div>
    </Container>
  );
}
