import styles from './styles.module.css';
import { useEffect, useRef, useCallback } from 'react';
import { cn } from '@/lib/utils';
import { useFilterParamsContext } from '@/context/filtersContext';

interface Props {
  min: number;
  max: number;
  step: number;
}

export default function MultiRangeSlider({ min, max, step }: Props) {
  const {
    filterParams: { minPrice, maxPrice },
    setParamByKey,
  } = useFilterParamsContext();

  const minValRef = useRef<HTMLInputElement>(null);
  const maxValRef = useRef<HTMLInputElement>(null);
  const range = useRef<HTMLDivElement>(null);

  const getPercent = useCallback(
    (value: number) => Math.round(((value - min) / (max - min)) * 100),
    [min, max]
  );

  useEffect(() => {
    if (range.current && minValRef.current && maxValRef.current) {
      const minPercent = getPercent(Number(minPrice));
      const maxPercent = getPercent(Number(maxPrice));

      range.current.style.left = `${minPercent}%`;
      range.current.style.width = `${maxPercent - minPercent}%`;
    }
  }, [minPrice, maxPrice, getPercent]);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    let stepValue = step;
    if (event.shiftKey) {
      stepValue = step;
    }

    if (event.key === 'ArrowUp' || event.key === 'ArrowRight') {
      event.preventDefault();
      setParamByKey('minPrice', String(Math.min(Number(minPrice) + stepValue, max - 1)));
    }

    if (event.key === 'ArrowDown' || event.key === 'ArrowLeft') {
      event.preventDefault();
      setParamByKey('minPrice', String(Math.max(Number(minPrice) - stepValue, min)));
    }
  };

  return (
    <div className={styles.container}>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={minPrice}
        ref={minValRef}
        onChange={(event) => {
          const value = Math.min(+event.target.value, Number(maxPrice) - 1);
          setParamByKey('minPrice', value.toString());
        }}
        onKeyDown={handleKeyDown}
        aria-label="Minimum price"
        aria-valuenow={Number(minPrice)}
        aria-valuemin={min}
        aria-valuemax={max}
        className={cn(
          `${styles.thumb} ${styles.thumb__zIndex3}`,
          Number(minPrice) > max - 100 && styles.thumb__zIndex5
        )}
      />

      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={maxPrice}
        ref={maxValRef}
        onChange={(event) => {
          const value = Math.max(+event.target.value, Number(minPrice) + 1);
          setParamByKey('maxPrice', value.toString());
        }}
        onKeyDown={handleKeyDown}
        aria-label="Maximum price"
        aria-valuenow={Number(maxPrice)}
        aria-valuemin={min}
        aria-valuemax={max}
        className={`${styles.thumb} ${styles.thumb__zIndex4}`}
      />

      <div className={styles.slider}>
        <div className={styles.slider__track}></div>
        <div ref={range} className={styles.slider__range}></div>
        <div className="absolute left-0 top-3.5 w-16 border-b text-center text-sm">
          {minPrice}
        </div>
        <div className="absolute right-0 top-3.5 w-16 border-b text-center text-sm">
          {maxPrice}
        </div>
      </div>
    </div>
  );
}
