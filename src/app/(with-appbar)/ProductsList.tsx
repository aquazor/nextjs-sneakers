'use client';

import Image from 'next/image';
import { useProductsContext } from './productsContext';
import Picture from '@/assets/photo-01.png';
import LoadingButton from '@/components/LoadingButton';

export default function ProductsList() {
  const { products, loadMore, moreAvailable, isLoading } = useProductsContext();

  return (
    <div className="w-full">
      <ul className="flex flex-wrap">
        {products.length === 0 && isLoading
          ? [...Array(5)].map((_, index) => (
              <li
                className="p-2 w-full min-[550px]:w-1/2 md:w-1/3 xl:w-1/4 2xl:w-1/5 grid"
                key={index}
              >
                <div className="shadow-lg border border-primary flex flex-col animate-pulse">
                  <div className="h-60 border-b border-primary" />
                  <div className="p-2 space-y-3">
                    <div className="h-6 border border-primary" />
                    <div className="h-4 border w-20 border-primary" />
                  </div>
                </div>
              </li>
            ))
          : products.map((item) => (
              <li
                key={item._id}
                className="p-2 w-full min-[550px]:w-1/2 md:w-1/3 xl:w-1/4 2xl:w-1/5 grid"
              >
                <div className="shadow-lg border border-primary flex flex-col">
                  <div className="border-b border-primary">
                    <Image
                      src={Picture}
                      alt="Picture"
                      className="object-cover max-h-60 lg:max-h-80 2xl:max-h-full"
                      priority
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

      {moreAvailable && (
        <div className="mt-5 flex items-center justify-center">
          <LoadingButton
            loading={isLoading}
            onClick={loadMore}
            className="bg-primary min-w-28 h-8 flex items-center justify-center gap-2 text-white"
          >
            Load More
          </LoadingButton>
        </div>
      )}
    </div>
  );
}
