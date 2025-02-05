import { create } from 'zustand';
import { MAX_PRICE, MIN_PRICE } from './constants';
import { NumbersRange } from './types';

interface PriceState {
  priceRange: NumbersRange;
  changePrice: ([min, max]: NumbersRange) => void;
  resetPrice: () => void;
}

export const usePriceStore = create<PriceState>()((set) => ({
  priceRange: [MIN_PRICE, MAX_PRICE],
  changePrice([min, max]) {
    set(() => ({ priceRange: [Math.min(min, max), Math.max(min, max)] }));
  },
  resetPrice() {
    set(() => ({ priceRange: [MIN_PRICE, MAX_PRICE] }));
  },
}));
