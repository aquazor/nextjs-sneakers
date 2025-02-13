import Container from '@/components/Container';
import Spinner from '@/components/Spinner';
import ItemsLoader from './components/ItemsLoader';

export default function ItemsLoading() {
  return (
    <Container>
      <div className="flex lg:gap-2">
        <div className="absolute lg:static z-[2] lg:mt-2 lg:ml-2 bg-muted shadow-xl p-3 w-36 lg:w-[17rem] lg:h-[32rem] shrink-0 flex items-center justify-center">
          <Spinner />
        </div>

        <ItemsLoader />
      </div>
    </Container>
  );
}
