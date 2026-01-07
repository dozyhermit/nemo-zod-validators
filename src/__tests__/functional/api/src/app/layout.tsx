import type { Metadata } from 'next';
import { PropsWithChildren } from 'react';

export const metadata: Metadata = {
  title: `Nemo Zod Validator Tests`,
  description: '',
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <meta name="viewport" />
      <body>{children}</body>
    </html>
  );
}
