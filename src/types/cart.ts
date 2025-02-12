import { IBaseItem, IProductSize } from './product';

export interface ICartItem extends IBaseItem {
  itemId: string;
  count: number;
  maxCount: number;
  size: IProductSize;
}

export interface ICart {
  userId: string;
  items: ICartItem[];
}
