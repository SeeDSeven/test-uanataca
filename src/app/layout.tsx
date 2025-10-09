// app/layout.tsx
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from './common/components/Header';
import Footer from './common/components/Footer';
import { Toaster } from 'react-hot-toast';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Tech Catalog',
  description: 'Un catálogo de tecnologías para desarrolladores.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${inter.className} bg-gray-800 flex flex-col min-h-screen`}>
        {/* Contenedor de notificaciones Toast */}
        <Toaster
          position="top-right"
          toastOptions={{
            className: '',
            style: {
              background: '#333',
              color: '#fff',
            },
          }}
        />
        <Header />
        <main className="container mx-auto px-6 py-8 flex-grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}