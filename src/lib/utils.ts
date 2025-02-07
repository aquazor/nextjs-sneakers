import { MAX_PRICE, MIN_PRICE } from '@/constants';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function parsePrice(price: string | null, defaultPrice: number): string {
  if (!price) return defaultPrice.toString();

  const parsedPrice = Number(price);

  return isNaN(parsedPrice) || parsedPrice < MIN_PRICE || parsedPrice > MAX_PRICE
    ? defaultPrice.toString()
    : parsedPrice.toString();
}
