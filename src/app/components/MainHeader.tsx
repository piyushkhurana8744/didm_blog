'use client';

import Link from 'next/link';
import AdBanner from './AdBanner';

export default function MainHeader() {
  return (
    <div className="py-8 bg-[var(--background)]">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-8">
        <Link href="/" className="flex items-center">
            <h1 className="text-5xl md:text-6xl font-black italic tracking-tighter">
                <span className="text-[var(--foreground)]">DIDM</span>
                <span className="text-[var(--color-primary)]">BLOG</span>
            </h1>
        </Link>
        
        {/* Ad Banner */}
        <div className="hidden md:block">
           <AdBanner type="leaderboard" />
        </div>
      </div>
    </div>
  );
}
