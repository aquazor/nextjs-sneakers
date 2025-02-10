import { fetchItemById } from '@/lib/api/sneakers';
import Container from '@/components/Container';
import Swiper from './components/Swiper';
import ItemInfo from './components/ItemInfo';
import ItemDescription from './components/ItemDescription';

export default async function ItemPage({
  params,
}: {
  params: Promise<{ itemId: string }>;
}) {
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
