import './globals.css';
import type { Metadata } from 'next';
import { Suspense } from 'react';
import { Roboto } from 'next/font/google';
import { SessionProvider } from 'next-auth/react';
import Providers from './Providers';
import Spinner from '@/components/Spinner';

const roboto = Roboto({
  weight: ['400', '700'],
  variable: '--font-roboto',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: {
    default: 'NextSneaks – Premium Sneakers Marketplace',
    template: '%s | NextSneaks',
  },
  description:
    'Discover and shop the latest and most exclusive sneakers. NextSneaks offers premium kicks, limited editions, and the hottest releases for sneaker enthusiasts.',
  keywords:
    'sneakers, kicks, premium sneakers, limited edition shoes, sneaker marketplace, buy sneakers online',
  authors: [
    { name: 'Oleksandr Kornevskyi', url: 'https://oleksandr-kornevskyi.vercel.app/' },
  ],
  openGraph: {
    title: 'NextSneaks – Premium Sneakers Marketplace',
    description:
      'Find the freshest sneakers and exclusive releases. Shop the latest drops and elevate your sneaker game.',
    url: 'https://next-sneaks.vercel.app',
    siteName: 'NextSneaks',
    images: [
      {
        url: '/preview.png',
        width: 1200,
        height: 630,
        alt: 'NextSneaks – Premium Sneakers Marketplace',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NextSneaks – Premium Sneakers Marketplace',
    description:
      'Shop the latest and greatest sneakers. Get your hands on limited-edition kicks today!',
    images: ['/preview.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SessionProvider>
      <html lang="en">
        <body className={`${roboto.className} antialiased`}>
          <Suspense
            fallback={
              <div className="mt-20 flex items-center justify-center w-full">
                <Spinner />
              </div>
            }
          >
            <Providers>
              {children}
              <div id="modal-id-root" />
            </Providers>
          </Suspense>
        </body>
      </html>
    </SessionProvider>
  );
}
