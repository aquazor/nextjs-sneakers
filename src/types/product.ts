export interface IBaseItem {
  _id: string;
  name: string;
  price: number;
  url: string;
  code: string;
}

export interface IProductSize {
  count: number;
  value: string;
  code: string;
}

export interface IProduct extends IBaseItem {
  sizes: IProductSize[];
}
