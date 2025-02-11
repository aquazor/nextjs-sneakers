import Container from '@/components/Container';
import FavoritesList from './components/FavoritesList';

export default async function FavoritesPage() {
  await new Promise((res) => setTimeout(res, 500));

  return (
    <Container>
      <FavoritesList />
    </Container>
  );
}
