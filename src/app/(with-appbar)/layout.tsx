import Appbar from './components/Appbar/Appbar';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Appbar />
      {children}
    </>
  );
}
