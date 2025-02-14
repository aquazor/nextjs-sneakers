import { Metadata } from 'next';
import FavoritePage from './_page';

export const metadata: Metadata = {
  title: 'Favorites',
  description:
    'Browse and manage your favorite sneakers. Keep track of your top picks and shop when you’re ready!',
  keywords: 'favorite sneakers, wishlist, sneaker collection, saved shoes, NextSneaks',
};

export default function Page() {
  return <FavoritePage />;
}
