'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FaSearch, FaHome } from 'react-icons/fa';

const NAV_LINKS = [
  { name: 'HOME', href: '/' },
  { name: 'TECH', href: '/blogs?tag=tech' },
  { name: 'HEALTH', href: '/blogs?tag=health' },
  { name: 'BUSINESS', href: '/blogs?tag=business' },
  { name: 'SPORTS', href: '/blogs?tag=sports' },
  { name: 'LIFESTYLE', href: '/blogs?tag=lifestyle' },
  { name: 'ABOUT', href: '/about' },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="sticky top-0 z-50 w-full bg-[var(--background)] border-y border-[var(--border)] shadow-sm">
      <div className="max-w-7xl mx-auto px-4 flex justify-between items-center h-14">
        <div className="flex items-center h-full">
           <Link href="/" className={`flex items-center justify-center w-14 h-full border-r border-[var(--border)] transition-colors ${pathname === '/' ? 'text-[var(--color-primary)]' : 'text-[var(--foreground)] hover:text-[var(--color-primary)]'}`}>
              <FaHome size={18} />
           </Link>
           <div className="hidden md:flex h-full items-center">
             {NAV_LINKS.map((link) => (
               <Link 
                 key={link.name} 
                 href={link.href}
                 className={`px-5 h-full flex items-center text-[11px] font-bold tracking-widest transition-colors border-r border-[var(--border)] last:border-r-0 ${pathname === link.href ? 'text-[var(--color-primary)] bg-[var(--border)]/10' : 'text-[var(--foreground)] hover:text-[var(--color-primary)]'}`}
               >
                 {link.name}
               </Link>
             ))}
           </div>
        </div>
        
        <div className="flex items-center h-full gap-4">
           <button className="text-[var(--foreground)] hover:text-[var(--color-primary)] transition-colors">
              <FaSearch size={16} />
           </button>
           <button className="md:hidden text-[var(--foreground)]">
              {/* Mobile menu toggle would go here */}
              <div className="w-6 h-0.5 bg-current mb-1"></div>
              <div className="w-6 h-0.5 bg-current mb-1"></div>
              <div className="w-6 h-0.5 bg-current"></div>
           </button>
        </div>
      </div>
    </nav>
  );
}
