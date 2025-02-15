import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { TbHeartCheck } from 'react-icons/tb';
import { IFavoriteItem } from '@/types/favorite';
import { FavoriteState } from '@/context/favoriteContext';

interface Props {
  item: IFavoriteItem;
  deleteItem: FavoriteState['deleteFavorite'];
}

export default function FavoriteItem({ item, deleteItem }: Props) {
  const [isLoading, setIsLoading] = useState(false);

  const handleDeleteItem = async () => {
    setIsLoading(true);
    await deleteItem({ itemId: item.itemId });
    setIsLoading(false);
  };

  return (
    <li className="p-2 w-full max-w-[300px] min-[550px]:max-w-full min-[550px]:w-1/2 md:w-1/3 xl:w-1/4 2xl:w-1/5 grid">
      <div className="shadow-lg border border-border flex flex-col min-[550px]:w-full">
        <div className="border-b border-border">
          <Link
            href={`/sneakers/${item.itemId}`}
            aria-label={`View details for ${item.name}`}
          >
            <Image
              width={250}
              height={300}
              quality={100}
              src={item.url}
              alt={item.name || 'Sneakers picture'}
              className="object-cover max-h-[300px] block w-full bg-primary/10"
            />
          </Link>
        </div>

        <div className="flex justify-between items-center gap-2 p-2 my-auto">
          <div>
            <h4 className="text-balance text-lg" title={item.name}>
              {item.name}
            </h4>
            <p className="text-sm">
              Price: <span className="font-bold">{item.price}</span>
            </p>
          </div>

          <div>
            <button
              disabled={isLoading}
              onClick={handleDeleteItem}
              aria-label="Remove from favorites"
              className="flex p-1 items-center border border-transparent transition-colors hover:border-primary disabled:opacity-50"
            >
              <TbHeartCheck size={30} className="[&_path]:fill-pink-300" />
            </button>
          </div>
        </div>
      </div>
    </li>
  );
}
