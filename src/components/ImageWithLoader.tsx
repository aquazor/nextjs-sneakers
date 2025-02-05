'use client';

import Image from 'next/image';
import { useState } from 'react';
import { cn } from '@/lib/utils';

interface Props {
  src: string;
  alt: string;
  width: number;
  height: number;
  quality?: number;
  className?: string;
}

export default function ImageWithLoader(props: Props) {
  const [loaded, setLoaded] = useState(false);
  const { className, src, alt, ...rest } = props;

  return (
    <div className="relative">
      <Image
        src={src}
        alt={alt}
        className={cn(
          'transition-opacity duration-700 bg-primary/10',
          className,
          !loaded ? 'opacity-0' : 'opacity-100'
        )}
        onLoad={() => setLoaded(true)}
        {...rest}
      />
      {!loaded && (
        <div className="inset-0 absolute bg-primary/10 flex items-center justify-center animate-pulse" />
      )}
    </div>
  );
}
