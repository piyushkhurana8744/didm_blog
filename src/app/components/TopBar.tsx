'use client';

import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube, FaRss } from 'react-icons/fa';
import { formatDate } from '@/utils/helpers';
import { useEffect, useState } from 'react';

export default function TopBar() {
  const [date, setDate] = useState('');

  useEffect(() => {
    setDate(new Date().toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    }));
  }, []);

  return (
    <div className="bg-[var(--background)] text-[var(--foreground)] text-[10px] font-bold py-2 border-b border-[var(--border)]">
      <div className="max-w-7xl mx-auto px-4 flex justify-between items-center capitalize tracking-wider">
        <div className="flex items-center gap-4">
          <span>{date}</span>
          <span className="hidden sm:inline border-l border-[var(--border)] pl-4">Delhi Institute Of Digital Marketing Blog</span>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3 border-r border-[var(--border)] pr-4">
             <a href="#" className="hover:text-[var(--color-primary)] transition-colors"><FaFacebookF /></a>
             <a href="#" className="hover:text-[var(--color-primary)] transition-colors"><FaTwitter /></a>
             <a href="#" className="hover:text-[var(--color-primary)] transition-colors"><FaInstagram /></a>
             <a href="#" className="hover:text-[var(--color-primary)] transition-colors"><FaYoutube /></a>
             <a href="#" className="hover:text-[var(--color-primary)] transition-colors"><FaRss /></a>
          </div>
          <div className="flex items-center gap-3">
             <button className="hover:text-[var(--color-primary)] transition-colors uppercase">LOGIN</button>
             <button className="hover:text-[var(--color-primary)] transition-colors uppercase">REGISTER</button>
          </div>
        </div>
      </div>
    </div>
  );
}
