'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { v4 as uuid } from 'uuid';
import { TbHeartCheck, TbHeart } from 'react-icons/tb';
import { IProduct } from '@/types/product';
import { fetchItems } from '@/lib/api/sneakers';
import { LIMIT_STR } from '@/constants';
import { useFilterParamsContext } from '@/context/filtersContext';
import { useFavoriteContext } from '@/context/favoriteContext';
import LoadMoreButton from './LoadMoreButton';

interface ItemsListProps {
  data: IProduct[];
  hasMore: boolean;
}

export default function ItemsList({ data, hasMore }: ItemsListProps) {
  const { filterParams } = useFilterParamsContext();
  const { addFavorite, deleteFavorite, favoriteItems } = useFavoriteContext();

  const [items, setItems] = useState(data || []);
  const [moreAvailable, setMoreAvailable] = useState(hasMore);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  useEffect(() => {
    setItems(data);
    setMoreAvailable(hasMore);
  }, [data, hasMore]);

  const handleLoadMore = async () => {
    setIsLoadingMore(true);
    try {
      const newItems = await fetchItems({
        ...filterParams,
        skip: items.length.toString(),
        limit: LIMIT_STR,
      });
      setItems((prev) => [...prev, ...newItems.items]);
      setMoreAvailable(newItems.hasMore);
    } catch (error) {
      console.error('Error fetching more items:', error);
    } finally {
      setIsLoadingMore(false);
    }
  };

  return (
    <div className="w-full">
      {items?.length === 0 && !isLoadingMore && (
        <div className="px-2 mt-20 flex items-center justify-center">
          <h5 className="text-3xl text-center">
            No results match your filters <span className="text-nowrap">¯\_(ツ)_/¯</span>
          </h5>
        </div>
      )}

      {items.length && (
        <ul className="flex flex-wrap justify-center min-[550px]:justify-start">
          {items.map((item) => {
            const itemInFavorite = favoriteItems.find(
              (favItem) => favItem.itemId === item._id
            );

            return (
              <li
                key={item._id}
                className="p-2 w-full max-w-[300px] min-[550px]:max-w-full min-[550px]:w-1/2 md:w-1/3 xl:w-1/4 2xl:w-1/5 grid"
              >
                <div className="shadow-lg border border-border flex flex-col min-[550px]:w-full">
                  <div className="border-b border-border">
                    <Link href={`/sneakers/${item._id}`} className="block">
                      <Image
                        width={250}
                        height={300}
                        quality={100}
                        src={item.url}
                        alt="Sneakers picture"
                        className="object-cover max-h-[300px] block w-full bg-primary/10"
                      />
                    </Link>
                  </div>

                  <div className="flex justify-between items-center gap-2 p-2 my-auto">
                    <div>
                      <h4
                        className="text-balance text-lg leading-6 mb-2"
                        title={item.name}
                      >
                        {item.name}
                      </h4>
                      <p className="text-sm">
                        Price: <span className="font-bold">{item.price}</span>
                      </p>
                    </div>

                    <div>
                      <button
                        onClick={async () => {
                          const { _id: itemId, ...rest } = item;
                          const currentItem = {
                            _id: uuid(),
                            itemId,
                            ...rest,
                          };

                          if (itemInFavorite) {
                            await deleteFavorite({ itemId });
                            return;
                          }
                          await addFavorite(currentItem);
                        }}
                        className="flex p-1 items-center border border-transparent transition-colors hover:border-primary"
                      >
                        {itemInFavorite ? (
                          <TbHeartCheck size={30} className="[&_path]:fill-pink-300" />
                        ) : (
                          <TbHeart size={30} />
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      )}

      {moreAvailable && (
        <LoadMoreButton isLoading={isLoadingMore} onLoadMore={handleLoadMore} />
      )}
    </div>
  );
}
