import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';

const gTWalsheim = localFont({
  src: './fonts/GT-Walsheim.otf',
  variable: '--font-geist-mono',
  weight: '100 900',
});

export const metadata: Metadata = {
  title: 'Dimensions ticket app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={`${gTWalsheim.variable} antialiased`}>{children}</body>
    </html>
  );
}
