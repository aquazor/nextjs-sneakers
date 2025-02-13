import { IBaseItem, IProductSize } from './product';

export interface ICartItem extends IBaseItem {
  itemId: string;
  count: number;
  maxCount: number;
  size: IProductSize;
}

export interface ICartItemParams {
  itemId: ICartItem['itemId'];
  code: ICartItem['code'];
}

export interface ICart {
  userId: string;
  items: ICartItem[];
}
