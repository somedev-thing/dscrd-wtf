import type { Metadata } from 'next';
import { Outfit, Lexend, Jua } from 'next/font/google';
import { Providers } from './providers';
import './globals.css';

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
  display: 'swap',
});

const lexend = Lexend({
  subsets: ['latin'],
  variable: '--font-lexend',
  display: 'swap',
});

const jua = Jua({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-jua',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'dscrd.wtf — Discord Identity Layer',
    template: '%s | dscrd.wtf',
  },
  description: 'Your Discord Identity Layer. Custom profiles, smart links, and server pages.',
  icons: {
    icon: '/dscrd.wtf-logo-full.png', // User requested full logo as favicon
    shortcut: '/dscrd.wtf-logo-full.png',
  },
  openGraph: {
    title: 'dscrd.wtf — Discord Identity Layer',
    description: 'Your Discord Identity Layer. Custom profiles, smart links, and server pages.',
    url: process.env.NEXT_PUBLIC_APP_URL,
    siteName: 'dscrd.wtf',
    type: 'website',
    images: [
      {
        url: '/dscrd.wtf-logo-full.png',
        width: 1200,
        height: 630,
        alt: 'dscrd.wtf',
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${outfit.variable} ${lexend.variable} ${jua.variable}`}>
      <body className={lexend.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
