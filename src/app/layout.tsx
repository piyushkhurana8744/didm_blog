import { ReactNode } from 'react';
import TopBar from './components/TopBar';
import MainHeader from './components/MainHeader';
import Navbar from './components/Navbar';
import NewsTicker from './components/NewsTicker';
import Footer from './components/Footer';
import ToastProvider from './components/ToastProvider';
import './globals.css';

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-[var(--background)] text-[var(--foreground)] min-h-screen flex flex-col font-sans antialiased transition-colors duration-300">
        <TopBar />
        <MainHeader />
        <Navbar />
        <NewsTicker />
        <main className="flex-grow w-full">
          {children}
        </main>
        <Footer />
        <ToastProvider />
      </body>
    </html>
  );
}
