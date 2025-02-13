import { IProduct } from './product';
import { ISortMethod } from './filters';

export type FavoriteSortMethod = 'createdAt:asc' | 'createdAt:desc' | ISortMethod;

export interface IFavoriteItem extends IProduct {
  itemId: string;
  createdAt: Date;
}

export interface IFavoriteItemParams {
  itemId: IFavoriteItem['itemId'];
}
