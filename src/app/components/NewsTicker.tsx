'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

export default function NewsTicker() {
  const [blogs, setBlogs] = useState<any[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    fetch('/api/blogs?limit=5')
      .then(res => res.json())
      .then(data => {
        if (data.success) setBlogs(data.data);
      });
  }, []);

  useEffect(() => {
    if (blogs.length === 0) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % blogs.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [blogs]);

  if (blogs.length === 0) return null;

  return (
    <div className="bg-[var(--background)] py-4 border-b border-[var(--border)]">
      <div className="max-w-7xl mx-auto px-4 flex items-center gap-4">
        <div className="bg-[var(--color-primary)] text-white text-[10px] font-bold px-3 py-1 shrink-0 uppercase tracking-widest">
           BREAKING NEWS
        </div>
        <div className="flex-grow overflow-hidden relative h-6">
           {blogs.map((blog, idx) => (
             <Link 
               key={blog._id} 
               href={`/blog/${blog.slug}`}
               className={`absolute inset-0 flex items-center transition-all duration-500 transform ${idx === currentIndex ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'}`}
             >
               <span className="text-xs font-bold text-[var(--foreground)] hover:text-[var(--color-primary)] transition-colors line-clamp-1">
                 {blog.title}
               </span>
             </Link>
           ))}
        </div>
        <div className="flex gap-1 shrink-0">
           <button 
             onClick={() => setCurrentIndex((prev) => (prev - 1 + blogs.length) % blogs.length)}
             className="p-1 text-[var(--foreground)] opacity-50 hover:opacity-100 transition-opacity"
            >
              <FaChevronLeft size={10} />
            </button>
           <button 
             onClick={() => setCurrentIndex((prev) => (prev + 1) % blogs.length)}
             className="p-1 text-[var(--foreground)] opacity-50 hover:opacity-100 transition-opacity"
            >
              <FaChevronRight size={10} />
            </button>
        </div>
      </div>
    </div>
  );
}
