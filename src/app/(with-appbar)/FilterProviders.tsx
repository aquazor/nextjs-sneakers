'use client';

import FilterParamsProvider from '@/context/filtersContext';

export default function FilterProviders({ children }: { children: React.ReactNode }) {
  return <FilterParamsProvider>{children}</FilterParamsProvider>;
}
