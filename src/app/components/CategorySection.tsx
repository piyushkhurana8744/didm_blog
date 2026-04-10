'use client';

import BlogCard from './BlogCard';
import Link from 'next/link';
import { FaChevronRight } from 'react-icons/fa';

interface CategorySectionProps {
  title: string;
  blogs: any[];
  viewAllLink?: string;
  layout?: 'grid' | 'lifestyle';
}

export default function CategorySection({ 
  title, 
  blogs, 
  viewAllLink = '#', 
  layout = 'grid' 
}: CategorySectionProps) {
  if (!blogs || blogs.length === 0) return null;

  return (
    <div className="mb-12">
      <div className="news-section-header">
        <h2 className="news-section-title">{title}</h2>
        <div className="flex-grow"></div>
        <Link href={viewAllLink} className="text-[10px] font-bold text-[var(--foreground)] opacity-50 hover:text-[var(--color-primary)] hover:opacity-100 flex items-center gap-1 transition-all">
          VIEW ALL <FaChevronRight size={8} />
        </Link>
      </div>

      {layout === 'lifestyle' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
           {blogs.slice(0, 4).map((blog) => (
             <BlogCard key={blog._id} blog={blog} variant="lifestyle" />
           ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {blogs.slice(0, 4).map((blog) => (
            <BlogCard key={blog._id} blog={blog} />
          ))}
        </div>
      )}
    </div>
  );
}
