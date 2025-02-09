'use client';

import { useEffect } from 'react';

export default function useClickOutside(
  enabled: boolean,
  ref: React.RefObject<HTMLElement | null>,
  callback: () => void
) {
  useEffect(() => {
    if (!enabled || ref === null) {
      return;
    }

    const handler = (event: MouseEvent) => {
      if (!ref.current || ref.current.contains(event.target as Node)) {
        return;
      }

      callback();
    };

    document.addEventListener('click', handler, true);

    return () => {
      document.removeEventListener('click', handler, true);
    };
  }, [ref, enabled, callback]);
}
