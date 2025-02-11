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

export function getLocalStorage<T>(key: string) {
  if (typeof window === 'undefined') {
    return;
  }

  const value = localStorage.getItem(key);

  if (value === null) {
    return null;
  }

  return JSON.parse(value) as T;
}

export function setLocalStorage<T>(key: string, value: T) {
  if (typeof window === 'undefined') {
    return;
  }

  localStorage.setItem(key, JSON.stringify(value));
}
