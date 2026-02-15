import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Providers } from './providers';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'dscrd.wtf — Discord Identity Layer',
    template: '%s | dscrd.wtf',
  },
  description: 'Your Discord Identity Layer. Custom profiles, smart links, and server pages.',
  openGraph: {
    title: 'dscrd.wtf — Discord Identity Layer',
    description: 'Your Discord Identity Layer. Custom profiles, smart links, and server pages.',
    url: process.env.NEXT_PUBLIC_APP_URL,
    siteName: 'dscrd.wtf',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
