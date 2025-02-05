import styles from './styles.module.css';
import { useEffect, useRef, useCallback } from 'react';
import { cn } from '@/lib/utils';
import { usePriceStore } from '@/store/filters/price-store';

interface Props {
  min: number;
  max: number;
}

export default function MultiRangeSlider({ min, max }: Props) {
  const {
    priceRange: [minVal, maxVal],
    changePrice,
  } = usePriceStore();

  const minValRef = useRef<HTMLInputElement>(null);
  const maxValRef = useRef<HTMLInputElement>(null);
  const range = useRef<HTMLDivElement>(null);

  const getPercent = useCallback(
    (value: number) => Math.round(((value - min) / (max - min)) * 100),
    [min, max]
  );

  useEffect(() => {
    if (maxValRef.current) {
      const maxPercent = getPercent(+maxValRef.current.value);
      const minPercent = getPercent(minVal);
      if (range.current) {
        range.current.style.left = `${minPercent}%`;
        range.current.style.width = `${maxPercent - minPercent}%`;
      }
    }
  }, [minVal, getPercent]);

  useEffect(() => {
    if (minValRef.current) {
      const minPercent = getPercent(+minValRef.current.value);
      const maxPercent = getPercent(maxVal);
      if (range.current) {
        range.current.style.width = `${maxPercent - minPercent}%`;
      }
    }
  }, [maxVal, getPercent]);

  return (
    <div className={styles.container}>
      <input
        type="range"
        min={min}
        max={max}
        value={minVal}
        ref={minValRef}
        onChange={(event) => {
          const value = Math.min(+event.target.value, maxVal - 1);
          changePrice([value, maxVal]);
        }}
        className={cn(
          `${styles.thumb} ${styles.thumb__zIndex3}`,
          minVal > max - 100 && styles.thumb__zIndex5
        )}
      />
      <input
        type="range"
        min={min}
        max={max}
        value={maxVal}
        ref={maxValRef}
        onChange={(event) => {
          const value = Math.max(+event.target.value, minVal + 1);
          changePrice([minVal, value]);
        }}
        className={`${styles.thumb} ${styles.thumb__zIndex4}`}
      />

      <div className={styles.slider}>
        <div className={styles.slider__track}></div>
        <div ref={range} className={styles.slider__range}></div>
        <div className="absolute left-0 top-3.5 w-16 border-b text-center text-sm">
          {minVal}
        </div>
        <div className="absolute right-0 top-3.5 w-16 border-b text-center text-sm">
          {maxVal}
        </div>
      </div>
    </div>
  );
}

{
  /* <input
min={min}
max={max}
className="w-16 border text-center text-sm"
onChange={(e) => {
  const value = Number(e.target.value);
  const notValid = isNaN(value) || value < min || value > max;

  if (notValid) {
    return;
  }
  changePrice([value, maxVal]);
}}
type="text"
value={minVal}
/> */
}

// <input
//   min={min}
//   max={max}
//   className="w-16 border text-center text-sm"
//   onChange={(e) => {
//     const value = Number(e.target.value);
//     const notValid = isNaN(value) || value < min || value > max;

//     if (notValid) {
//       return;
//     }
//     changePrice([minVal, value]);
//   }}
//   type="text"
//   value={maxVal}
// />;
