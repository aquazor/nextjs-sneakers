import { Metadata } from 'next';
import { fetchItemById } from '@/lib/api/sneakers';
import Container from '@/components/Container';
import Swiper from './components/Swiper';
import ItemInfo from './components/ItemInfo';
import ItemDescription from './components/ItemDescription';

interface Params {
  itemId: string;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { itemId } = await params;
  const { item } = await fetchItemById({ itemId });

  return {
    title: `${item.name}`,
    description: `Discover ${item.name} - premium sneakers available now. Shop exclusive styles at NextSneaks.`,
    openGraph: {
      title: `NextSneaks | ${item.name}`,
      description: `Find ${item.name} and more at NextSneaks. Limited editions, hottest sneaker releases.`,
      url: `https://yourwebsite.com/item/${itemId}`,
      siteName: 'NextSneaks',
      images: [
        {
          url: item.url,
          width: 1200,
          height: 630,
          alt: item.name,
        },
      ],
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: `NextSneaks | ${item.name}`,
      description: `Get your hands on ${item.name} before it's gone! Shop now at NextSneaks.`,
      images: [item.url],
    },
  };
}

export default async function Page({ params }: { params: Promise<Params> }) {
  const { itemId } = await params;
  const { item } = await fetchItemById({ itemId });

  return (
    <Container>
      <div className="grid grid-cols-1 md:grid-cols-[auto,1fr] md:grid-rows-[auto,1fr] gap-6">
        <h2 className="block md:hidden text-4xl first-letter:text-5xl text-balance first-letter:font-bold">
          {item.name}
        </h2>

        <div className="lg:row-span-2 flex md:block justify-center">
          <Swiper images={Array(7).fill(item.url)} />
        </div>

        <div className="w-full max-w-[30rem] md:max-w-full mx-auto md:mx-0">
          <ItemInfo item={item} />
        </div>

        <div className="col-span-1 md:col-span-2 lg:col-span-1 flex max-w-[30rem] md:max-w-full mx-auto md:mx-0">
          <ItemDescription />
        </div>
      </div>
    </Container>
  );
}
