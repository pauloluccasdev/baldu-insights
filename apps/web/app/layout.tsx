import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Baldú Insights',
  description: 'O copiloto operacional do treinador moderno.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
