'use client';

import { cn } from '@/lib/utils';

interface Props {
  className?: string;
}

export default function Skeleton({ className }: Props) {
  const finalClassName = cn(
    'animate-shimmer bg-gradient-to-r from-transparent via-primary to-transparent bg-no-repeat [background-size:50%_100%]',
    className
  );

  return <div className={finalClassName} />;
}
