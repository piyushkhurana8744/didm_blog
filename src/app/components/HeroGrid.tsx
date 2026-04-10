'use client';

import BlogCard from './BlogCard';

interface HeroGridProps {
  blogs: any[];
}

export default function HeroGrid({ blogs }: HeroGridProps) {
  if (!blogs || blogs.length === 0) return null;

  const mainPost = blogs[0];
  const sidePosts = blogs.slice(1, 5);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 h-auto lg:h-[500px]">
        {/* Main Featured Block */}
        <div className="lg:col-span-2 h-full">
           <BlogCard blog={mainPost} variant="hero-large" />
        </div>
        
        {/* Side Grid Block */}
        <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4 h-full">
           {sidePosts.map((blog) => (
             <div key={blog._id} className="h-full">
                <BlogCard blog={blog} variant="hero-small" />
             </div>
           ))}
           {/* Fallback blocks if less than 5 blogs */}
           {Array.from({ length: Math.max(0, 4 - sidePosts.length) }).map((_, i) => (
             <div key={`placeholder-${i}`} className="bg-[var(--border)]/30 rounded-lg flex items-center justify-center text-[var(--foreground)] opacity-20 font-bold italic">
               LATEST NEWS
             </div>
           ))}
        </div>
      </div>
    </div>
  );
}
