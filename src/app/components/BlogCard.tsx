'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Blog } from '@/types';
import { formatDate } from '@/utils/helpers';

interface BlogCardProps {
  blog: any; // Using any for simplicity as Blog type might not have description yet in types
}

export default function BlogCard({ blog }: BlogCardProps) {
  return (
    <div className="group bg-[var(--card)] rounded-2xl shadow-sm hover:shadow-xl border border-[var(--border)] overflow-hidden transition-all duration-300 transform hover:-translate-y-1 flex flex-col h-full">
      <div className="relative w-full h-56 overflow-hidden">
        <Image
          src={blog.image}
          alt={blog.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        {blog.isFeatured && (
          <div className="absolute top-4 left-4 bg-[var(--color-primary)] text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider backdrop-blur-md">
            Featured
          </div>
        )}
      </div>
      
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex gap-2 mb-3 max-w-full overflow-x-auto no-scrollbar">
          {blog.tags && blog.tags.slice(0, 2).map((tag: string) => (
            <span key={tag} className="bg-[var(--border)] text-[var(--foreground)] text-[10px] font-semibold px-2.5 py-1 rounded-full uppercase tracking-wider whitespace-nowrap">
              {tag}
            </span>
          ))}
        </div>
        
        <h3 className="text-xl font-bold mb-3 text-[var(--card-foreground)] line-clamp-2 leading-tight group-hover:text-[var(--color-primary)] transition-colors">
          {blog.title}
        </h3>
        
        <p className="text-[var(--foreground)] opacity-80 text-sm mb-6 line-clamp-3 flex-grow">
          {blog.description || 'No description available for this post.'}
        </p>
        
        <div className="flex justify-between items-center text-xs font-medium text-[var(--foreground)] opacity-70 mt-auto pt-4 border-t border-[var(--border)]">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-[var(--border)] flex items-center justify-center text-[10px]">
              {blog.author.charAt(0).toUpperCase()}
            </div>
            <span>{blog.author}</span>
          </div>
          <span>{formatDate(blog.createdAt || new Date())}</span>
        </div>
        
        <Link
          href={`/blog/${blog.slug}`}
          className="absolute inset-0 z-10"
          aria-label={`Read more about ${blog.title}`}
        >
          <span className="sr-only">Read more block</span>
        </Link>
      </div>
    </div>
  );
}
