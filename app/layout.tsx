import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Sidebar } from '@/components/layout/sidebar';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'TCL Interview Coach',
  description: 'AI-powered pageant interview practice platform',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex h-screen">
          <div className="w-64 flex-none">
            <Sidebar />
          </div>
          <div className="flex-1 overflow-auto bg-gray-50">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}