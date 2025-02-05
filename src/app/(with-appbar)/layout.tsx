import Appbar from '@/components/Appbar';
import Providers from '../Providers';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Providers>
      <Appbar />
      {children}
    </Providers>
  );
}
