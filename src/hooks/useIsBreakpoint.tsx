import { useEffect, useState } from 'react';

type Breakpoint = number;

const getIsBreakpoint = (breakpoint: Breakpoint) => {
  if (typeof window !== 'undefined') {
    return window.innerWidth <= breakpoint - 1;
  }
};

export default function useIsBreakpoint(breakpoint: Breakpoint) {
  const [isBreakpoint, setIsBreakpoint] = useState(getIsBreakpoint(breakpoint));

  useEffect(() => {
    const onResize = () => {
      setIsBreakpoint(getIsBreakpoint(breakpoint));
    };

    window.addEventListener('resize', onResize);

    return () => {
      window.removeEventListener('resize', onResize);
    };
  }, [breakpoint]);

  return isBreakpoint;
}
