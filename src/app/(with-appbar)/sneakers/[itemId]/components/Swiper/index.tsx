'use client';

import 'swiper/css';
import { useState } from 'react';
import { Swiper as SwiperLib, SwiperSlide } from 'swiper/react';
import { SwiperButtonPrev } from './SwiperButtonPrev';
import { SwiperButtonNext } from './SwiperButtonNext';
import { SwiperFooter } from './SwiperFooter';
import Image from 'next/image';

interface Props {
  images: string[];
}

export default function Swiper({ images }: Props) {
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);

  return (
    <div className="w-full md:w-[440px] lg:w-[550px] xl:w-[660px] bg-background">
      <SwiperLib
        loop
        spaceBetween={50}
        onSlideChange={(swiper) => setActiveSlideIndex(swiper.realIndex)}
      >
        {images.map((url, index) => (
          <SwiperSlide key={index}>
            <div className="relative cursor-grab active:cursor-grabbing m-1">
              <Image
                width={660}
                height={580}
                quality={100}
                src={url}
                priority
                className="w-full h-[400px] lg:h-[500px] xl:h-[580px] object-cover bg-primary/10 shadow-md"
                alt="image"
              />
              <div className="absolute top-2 left-2 text-muted-foreground select-none">
                {index + 1}
              </div>
            </div>
          </SwiperSlide>
        ))}

        <SwiperButtonPrev />
        <SwiperButtonNext />

        <SwiperFooter maxImages={5} images={images} activeSlideIndex={activeSlideIndex} />
      </SwiperLib>
    </div>
  );
}
