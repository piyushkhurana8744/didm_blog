'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Header() {
  const router = useRouter();
  const [isAdmin, setIsAdmin] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    // Note: HttpOnly cookies can't be read from localStorage, but if client sets a flag, we can use it.
    // For now, if we use cookies, we might just check an API or decode on server.
    // Let's assume we check api/auth/me later, or keep the token logic if login also sets localStorage.
    setIsAdmin(!!token);

    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setIsDarkMode(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    document.cookie = 'token=; Max-Age=0; path=/;';
    setIsAdmin(false);
    router.push('/');
  };

  const toggleDarkMode = () => {
    // In a real app we'd save this preference and apply a 'dark' class to html.
    // Since we used system preference in CSS, we can toggle a class on the HTML element.
    const root = document.documentElement;
    if (isDarkMode) {
      root.style.setProperty('--background', '#ffffff');
      root.style.setProperty('--foreground', '#171717');
      root.style.setProperty('--card', '#ffffff');
      root.style.setProperty('--card-foreground', '#171717');
      root.style.setProperty('--border', '#e2e8f0');
    } else {
      root.style.setProperty('--background', '#0a0a0a');
      root.style.setProperty('--foreground', '#f8fafc');
      root.style.setProperty('--card', '#121212');
      root.style.setProperty('--card-foreground', '#f8fafc');
      root.style.setProperty('--border', '#27272a');
    }
    setIsDarkMode(!isDarkMode);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[var(--border)] bg-[var(--background)]/80 backdrop-blur-md transition-colors duration-300">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <div className="flex items-center gap-8">
          <Link href="/" className="text-2xl font-extrabold text-[var(--color-primary)] tracking-tight hover:opacity-80 transition-opacity">
            BlogHub.
          </Link>
          <div className="hidden md:flex gap-6 font-medium text-sm">
            <Link href="/" className="text-[var(--foreground)] hover:text-[var(--color-primary)] transition-colors">
              Home
            </Link>
            <Link href="/blogs" className="text-[var(--foreground)] hover:text-[var(--color-primary)] transition-colors">
              Blogs
            </Link>
            <Link href="/about" className="text-[var(--foreground)] hover:text-[var(--color-primary)] transition-colors">
              About
            </Link>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <button onClick={toggleDarkMode} className="p-2 rounded-full hover:bg-[var(--border)] transition-colors" aria-label="Toggle Dark Mode">
            {isDarkMode ? '☀️' : '🌙'}
          </button>
          
          {isAdmin ? (
            <div className="hidden md:flex items-center gap-4">
              <Link href="/admin" className="text-sm font-medium text-[var(--foreground)] hover:text-[var(--color-primary)] transition-colors">
                Dashboard
              </Link>
              <button
                onClick={handleLogout}
                className="text-sm font-medium px-4 py-2 border border-[var(--color-primary)] text-[var(--color-primary)] rounded-full hover:bg-[var(--color-primary)] hover:text-white transition-all"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link href="/admin/login" className="text-sm hidden md:block font-medium px-4 py-2 bg-[var(--color-primary)] text-white rounded-full hover:bg-[var(--color-primary-hover)] transition-all shadow-md hover:shadow-lg">
              Admin Login
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
}
