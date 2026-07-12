import './globals.css';
import { Lora, Noto_Sans_Devanagari } from 'next/font/google';
import type { Metadata, Viewport } from 'next';
import type { ReactNode } from 'react';

const lora = Lora({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-serif',
  display: 'swap',
});

const notoDevanagari = Noto_Sans_Devanagari({
  subsets: ['devanagari'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-devanagari',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'CivilianIQ',
  description: 'Real-time AI legal rights coach for citizen-police encounters',
  manifest: '/manifest.json',
};

export const viewport: Viewport = {
  themeColor: '#2b1a0f',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${lora.variable} ${notoDevanagari.variable}`}>
      <body className="font-serif">{children}</body>
    </html>
  );
}
