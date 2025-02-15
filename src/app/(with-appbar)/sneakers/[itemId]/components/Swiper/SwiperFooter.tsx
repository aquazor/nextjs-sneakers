import { useSwiper } from 'swiper/react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

interface Props {
  images: string[];
  activeSlideIndex: number;
  maxImages?: number;
}

export function SwiperFooter({ images, activeSlideIndex, maxImages = 0 }: Props) {
  const swiper = useSwiper();
  const content = maxImages > 0 ? images.slice(0, maxImages) : images;
  const lengthDiff = images.length - content.length;

  return (
    <div className="hidden sm:flex justify-between mt-3 h-[90px] md:h-[62px] lg:h-[84px] xl:h-[100px] *:size-[90px] *:md:size-[62px] *:lg:size-[84px] *:xl:size-[100px]">
      {content.map((url, index) => (
        <Image
          key={index}
          onClick={() => {
            swiper.loopDestroy();
            swiper.slideTo(index);
            swiper.loopCreate();
          }}
          className={cn(
            'cursor-pointer border object-cover',
            activeSlideIndex === index ? 'border-primary' : 'border-transparent'
          )}
          width={100}
          height={100}
          src={url}
          alt="Sneakers image"
        />
      ))}

      {lengthDiff > 0 && (
        <div
          className={cn(
            'flex h-full select-none items-center justify-center border text-5xl xl:text-6xl',
            activeSlideIndex + 1 > maxImages ? 'border-primary' : 'border-transparent'
          )}
        >
          <span>+{lengthDiff}</span>
        </div>
      )}
    </div>
  );
}
