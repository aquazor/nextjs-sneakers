import './globals.css';
import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';
import { SessionProvider } from 'next-auth/react';

const roboto = Roboto({
  weight: ['400', '700'],
  variable: '--font-roboto',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Next-Sneakers',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SessionProvider>
      <html lang="en">
        <body className={`${roboto.className} antialiased`}>{children}</body>
      </html>
    </SessionProvider>
  );
}
