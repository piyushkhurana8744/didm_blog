'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { formatDate } from '@/utils/helpers';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';

interface BlogCardProps {
  blog: any;
  variant?: 'default' | 'hero-large' | 'hero-small' | 'list-horizontal' | 'compact-sidebar' | 'lifestyle';
}

const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1432888622747-4eb9a8f2c20a?auto=format&fit=crop&q=80&w=1000';

function RatingStars({ rating }: { rating: number }) {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div className="flex text-yellow-400 gap-0.5 text-[10px] mt-1">
      {[...Array(fullStars)].map((_, i) => <FaStar key={`full-${i}`} />)}
      {hasHalfStar && <FaStarHalfAlt />}
      {[...Array(emptyStars)].map((_, i) => <FaRegStar key={`empty-${i}`} className="text-gray-300" />)}
    </div>
  );
}

export default function BlogCard({ blog, variant = 'default' }: BlogCardProps) {
  const [imgSrc, setImgSrc] = useState(blog.image);
  const isReview = blog.tags?.some((t: string) => t.toLowerCase() === 'review');

  const handleError = () => {
    setImgSrc(FALLBACK_IMAGE);
  };

  if (variant === 'hero-large') {
    return (
      <div className="relative group overflow-hidden h-full min-h-[400px] md:min-h-[500px] border border-[var(--border)]">
        <Image
          src={imgSrc}
          alt={blog.title}
          fill
          onError={handleError}
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-white/90 via-white/40 to-transparent" />
        <div className="absolute bottom-0 left-0 p-6 md:p-10 w-full">
          <div className="bg-[var(--color-primary)] text-white text-[10px] font-bold px-3 py-1 inline-block uppercase tracking-wider mb-4 shadow-lg">
            {blog.tags?.[0] || 'Featured'}
          </div>
          <h2 className="text-2xl md:text-4xl font-extrabold text-[var(--foreground)] mb-4 line-clamp-3 leading-tight group-hover:text-[var(--color-primary)] transition-colors">
            {blog.title}
          </h2>
          <div className="flex items-center gap-4 text-[var(--foreground)] opacity-70 text-sm font-bold">
             <span className="text-[var(--color-primary)]">{blog.author}</span>
             <span>•</span>
             <span>{formatDate(blog.createdAt)}</span>
          </div>
        </div>
        <Link href={`/blog/${blog.slug}`} className="absolute inset-0 z-10" />
      </div>
    );
  }

  if (variant === 'hero-small') {
    return (
      <div className="relative group overflow-hidden h-full min-h-[190px] border border-[var(--border)]">
        <Image
          src={imgSrc}
          alt={blog.title}
          fill
          onError={handleError}
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-white/80 via-white/20 to-transparent" />
        <div className="absolute bottom-0 left-0 p-4 w-full">
          <div className="bg-[var(--color-primary)] text-white text-[8px] font-bold px-2 py-0.5 inline-block uppercase tracking-wider mb-2">
            {blog.tags?.[0] || 'Latest'}
          </div>
          <h3 className="text-sm md:text-base font-bold text-[var(--foreground)] line-clamp-2 leading-tight group-hover:text-[var(--color-primary)] transition-colors">
            {blog.title}
          </h3>
        </div>
        <Link href={`/blog/${blog.slug}`} className="absolute inset-0 z-10" />
      </div>
    );
  }

  if (variant === 'list-horizontal') {
    return (
      <div className="group flex gap-4 items-start py-4">
        <div className="relative w-24 h-24 shrink-0 overflow-hidden">
          <Image
            src={imgSrc}
            alt={blog.title}
            fill
            onError={handleError}
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
        </div>
        <div className="flex-grow">
          <div className="flex items-center justify-between gap-2 mb-1">
             <div className="text-[var(--color-primary)] text-[10px] font-bold uppercase tracking-wider">
               {blog.tags?.[0] || 'News'}
             </div>
             {isReview && <RatingStars rating={blog.rating || 5} />}
          </div>
          <h4 className="text-sm font-bold text-[var(--foreground)] line-clamp-2 leading-snug group-hover:text-[var(--color-primary)] transition-colors mb-2">
             {blog.title}
          </h4>
          <div className="flex items-center gap-2 text-[var(--foreground)] opacity-60 text-[10px] font-medium">
            <span>{formatDate(blog.createdAt)}</span>
            {blog.readTime && (
              <>
                <span>•</span>
                <span>{blog.readTime}</span>
              </>
            )}
          </div>
        </div>
        <Link href={`/blog/${blog.slug}`} className="absolute inset-x-0 h-24 z-10" />
      </div>
    );
  }

  if (variant === 'compact-sidebar') {
    return (
      <div className="group flex gap-3 items-center py-3 border-b border-[var(--border)] last:border-0 relative">
        <div className="relative w-16 h-16 shrink-0 rounded-full overflow-hidden border-2 border-[var(--border)] group-hover:border-[var(--color-primary)] transition-colors">
          <Image
            src={imgSrc}
            alt={blog.title}
            fill
            onError={handleError}
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
        </div>
        <div className="flex-grow">
          <h4 className="text-xs font-bold text-[var(--foreground)] line-clamp-2 leading-tight group-hover:text-[var(--color-primary)] transition-colors">
             {blog.title}
          </h4>
          <div className="text-[10px] text-[var(--foreground)] opacity-50 mt-1">
            {formatDate(blog.createdAt)}
          </div>
        </div>
        <Link href={`/blog/${blog.slug}`} className="absolute inset-0 z-10" />
      </div>
    );
  }

  if (variant === 'lifestyle') {
    return (
      <div className="group flex flex-col h-full bg-[var(--card)] border border-[var(--border)]">
        <div className="relative w-full h-48 overflow-hidden">
          <Image
            src={imgSrc}
            alt={blog.title}
            fill
            onError={handleError}
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />
        </div>
        <div className="p-4 flex flex-col flex-grow relative">
           <div className="text-[var(--color-primary)] text-[10px] font-bold uppercase tracking-wider mb-2">
            {blog.tags?.[0] || 'Lifestyle'}
          </div>
          <h3 className="text-lg font-extrabold text-[var(--foreground)] line-clamp-2 leading-tight group-hover:text-[var(--color-primary)] transition-colors mb-3">
             {blog.title}
          </h3>
          <div className="mt-auto text-[10px] text-[var(--foreground)] opacity-60">
             By <span className="font-bold">{blog.author}</span> • {formatDate(blog.createdAt)}
          </div>
          <Link href={`/blog/${blog.slug}`} className="absolute inset-0 z-10" />
        </div>
      </div>
    );
  }

  return (
    <div className="group bg-[var(--card)] border border-[var(--border)] overflow-hidden transition-all duration-300 flex flex-col h-full relative">
      <div className="relative w-full h-52 overflow-hidden">
        <Image
          src={imgSrc}
          alt={blog.title}
          fill
          onError={handleError}
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {blog.isFeatured && (
          <div className="absolute top-3 left-3 bg-[var(--color-primary)] text-white text-[10px] font-bold px-2 py-0.5 uppercase tracking-wider">
            Featured
          </div>
        )}
      </div>
      
      <div className="p-5 flex flex-col flex-grow">
        <div className="flex items-center justify-between gap-2 mb-2">
           <div className="text-[var(--color-primary)] text-[10px] font-bold uppercase tracking-wider">
             {blog.tags?.[0] || 'Update'}
           </div>
           {isReview && <RatingStars rating={blog.rating || 5} />}
        </div>
        
        <h3 className="text-lg font-bold mb-3 text-[var(--card-foreground)] line-clamp-2 leading-tight group-hover:text-[var(--color-primary)] transition-colors">
          {blog.title}
        </h3>
        
        <p className="text-[var(--foreground)] opacity-70 text-sm mb-4 line-clamp-3 flex-grow">
          {blog.description || 'No description available for this post.'}
        </p>
        
        <div className="flex justify-between items-center text-[10px] font-bold text-[var(--foreground)] opacity-60 mt-auto pt-4 border-t border-[var(--border)]">
          <div className="flex items-center gap-2">
             <span>{blog.author.toUpperCase()}</span>
             {blog.readTime && <span>• {blog.readTime.toUpperCase()}</span>}
          </div>
          <span>{formatDate(blog.createdAt || new Date()).toUpperCase()}</span>
        </div>
        
        <Link
          href={`/blog/${blog.slug}`}
          className="absolute inset-0 z-10"
        />
      </div>
    </div>
  );
}
