'use client';

import { useProductsContext } from '@/context/productsContext';
import useFetchProducts from '@/hooks/useFetchProducts';
import LoadMoreButton from './LoadMoreButton';
import ImageWithLoader from '@/components/ImageWithLoader';
import { useSortStore } from '@/lib/store/sort/sort-store';

export default function ProductsList() {
  useFetchProducts();
  const { products, isLoading } = useProductsContext();
  const { sortBy } = useSortStore();

  const sorted =
    sortBy !== 'none'
      ? products.toSorted((prod1, prod2) => {
          if (sortBy === 'name.asc') {
            return prod2.name.localeCompare(prod1.name);
          }
          if (sortBy === 'name.desc') {
            return prod1.name.localeCompare(prod2.name);
          }
          if (sortBy === 'price.asc') {
            return prod1.price - prod2.price;
          }
          if (sortBy === 'price.desc') {
            return prod2.price - prod1.price;
          }
          return 0;
        })
      : products;

  return (
    <div className="w-full">
      {sorted.length === 0 && !isLoading && (
        <div className="px-2 mt-20 flex items-center justify-center">
          <h5 className="text-3xl text-center">
            No results match your filters <span>¯\_(ツ)_/¯</span>
          </h5>
        </div>
      )}

      <ul className="flex flex-wrap justify-center min-[550px]:justify-stretch">
        {sorted.length === 0 && isLoading
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
          : sorted.map((item) => (
              <li
                key={item._id}
                className="p-2 w-full max-w-[300px] min-[550px]:max-w-full min-[550px]:w-1/2 md:w-1/3 xl:w-1/4 2xl:w-1/5 grid"
              >
                <div className="shadow-lg border border-border flex flex-col min-[550px]:w-full">
                  <div className="border-b border-border">
                    <ImageWithLoader
                      width={250}
                      height={300}
                      quality={100}
                      src={item.url}
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
