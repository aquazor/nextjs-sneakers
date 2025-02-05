'use client';

import Image from 'next/image';
import { useProductsContext } from '@/context/productsContext';
import LoadMoreButton from './LoadMoreButton';

export default function ProductsList() {
  const { products, isLoading } = useProductsContext();

  return (
    <div className="w-full">
      {products.length === 0 && !isLoading && (
        <div className="px-2 mt-20 flex items-center justify-center">
          <h5 className="text-3xl text-center">
            No results match your filters <span>¯\_(ツ)_/¯</span>
          </h5>
        </div>
      )}

      <ul className="flex flex-wrap justify-center min-[550px]:justify-stretch">
        {products.length === 0 && isLoading
          ? [...Array(5)].map((_, index) => (
              <li
                className="p-2 w-full min-[550px]:w-1/2 md:w-1/3 xl:w-1/4 2xl:w-1/5 grid"
                key={index}
              >
                <div className="shadow-lg border border-border flex flex-col animate-pulse">
                  <div className="h-72 border-b border-border bg-primary/10" />
                  <div className="px-2 py-4 space-y-3">
                    <div className="h-6 border border-border" />
                    <div className="h-4 border w-20 border-border" />
                  </div>
                </div>
              </li>
            ))
          : products.map((item) => (
              <li
                key={item._id}
                className="p-2 w-full max-w-[300px] min-[550px]:max-w-full min-[550px]:w-1/2 md:w-1/3 xl:w-1/4 2xl:w-1/5 grid"
              >
                <div className="shadow-lg border border-border flex flex-col min-[550px]:w-full">
                  <div className="border-b border-border">
                    <Image
                      width={250}
                      height={300}
                      priority
                      quality={100}
                      src={'/' + item.url}
                      alt="Sneakers picture"
                      className="object-cover max-h-[300px] block w-full bg-primary/10"
                    />
                  </div>
                  <div className="p-2 my-auto">
                    <h4 className="text-balance text" title={item.name}>
                      {item.name}
                    </h4>
                    <p className="text-sm">
                      Price: <span className="font-bold">{item.price}</span>
                    </p>
                  </div>
                </div>
              </li>
            ))}
      </ul>

      <LoadMoreButton />
    </div>
  );
}
