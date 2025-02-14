'use client';

import { TbHeart } from 'react-icons/tb';
import { useFavoriteContext } from '@/context/favoriteContext';
import Container from '@/components/Container';
import SortPanel from './components/SortPanel';
import FavoriteItem from './components/FavoriteItem';

export default function FavoritePage() {
  const { favoriteItems, deleteFavorite } = useFavoriteContext();

  if (favoriteItems.length === 0) {
    return (
      <div className="w-full mt-10 flex flex-col items-center justify-center gap-6 text-center">
        <div>
          <h2 className="text-3xl">No favorite sneakers found</h2>
          <div className="text-xl text-nowrap">¯\_(ツ)_/¯</div>
        </div>
        <h5 className="text-xl">Add at least one pair of sneakers.</h5>
        <TbHeart size={30} className="[&_path]:fill-pink-300" />
      </div>
    );
  }

  return (
    <Container>
      <SortPanel />

      <ul className="flex flex-wrap justify-center min-[550px]:justify-start">
        {favoriteItems.map((item) => (
          <FavoriteItem key={item._id} item={item} deleteItem={deleteFavorite} />
        ))}
      </ul>
    </Container>
  );
}
