'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import BlogCard from './components/BlogCard';
import BlogSkeleton from './components/BlogSkeleton';
import { Blog } from '@/types';

export default function HomePage() {
  const [blogs, setBlogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch('/api/blogs?limit=6');
        const result = await response.json();

        if (result.success) {
          setBlogs(result.data);
        } else {
          setError('Failed to load blogs');
        }
      } catch (err) {
        setError('Error loading blogs');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  const featuredBlog = blogs.find(b => b.isFeatured) || blogs[0];
  const recentBlogs = blogs.slice(0, 6); // show all blogs in the grid

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-16 py-8">
        {/* Hero Section */}
        <section className="text-center md:text-left flex flex-col md:flex-row items-center gap-8 md:gap-16 pt-8 pb-12 border-b border-[var(--border)]">
          <div className="flex-1 space-y-6">
            <h1 className="text-5xl md:text-7xl font-extrabold text-[var(--foreground)] tracking-tight leading-tight text-balance">
              Design. Build. <span className="text-[var(--color-primary)]">Innovate.</span>
            </h1>
            <p className="text-lg md:text-xl text-[var(--foreground)] opacity-80 max-w-2xl text-balance">
              Dive into the latest insights on modern web development, UI/UX design, and technology from leading industry experts.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start pt-4">
              <Link href="/blogs" className="px-8 py-3.5 bg-[var(--color-primary)] text-white font-medium rounded-full shadow-lg shadow-[var(--color-primary)]/30 hover:shadow-[var(--color-primary)]/50 hover:-translate-y-0.5 transition-all w-full sm:w-auto text-center">
                Explore Articles
              </Link>
              <Link href="/about" className="px-8 py-3.5 bg-transparent border border-[var(--border)] text-[var(--foreground)] font-medium rounded-full hover:bg-[var(--border)] hover:-translate-y-0.5 transition-all w-full sm:w-auto text-center">
                Learn More
              </Link>
            </div>
          </div>
          
          {/* Featured Card (optional placement in hero) */}
          {!loading && featuredBlog && (
            <div className="flex-1 w-full max-w-lg shadow-2xl rounded-2xl overflow-hidden transform hover:-translate-y-2 transition-transform duration-500">
               <BlogCard blog={featuredBlog} />
            </div>
          )}
          {loading && (
            <div className="flex-1 w-full max-w-lg shadow-2xl rounded-2xl overflow-hidden">
               <div className="h-[400px]"><BlogSkeleton /></div>
            </div>
          )}
        </section>

        {/* Latest Blogs Section */}
        <section>
          <div className="flex justify-between items-end mb-8">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-[var(--foreground)] mb-2">Latest Insights</h2>
              <p className="text-[var(--foreground)] opacity-70">Read the most recent articles from our team.</p>
            </div>
            <Link href="/blogs" className="hidden sm:flex text-[var(--color-primary)] font-medium hover:opacity-80 items-center gap-1">
              View all <span>→</span>
            </Link>
          </div>

          {error && (
            <div className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 p-4 rounded-xl border border-red-200 dark:border-red-800 mb-8 font-medium">
              {error}
            </div>
          )}

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((n) => (
                 <div key={n} className="h-[450px]">
                   <BlogSkeleton />
                 </div>
              ))}
            </div>
          ) : recentBlogs.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {recentBlogs.map((blog) => (
                <BlogCard key={blog._id} blog={blog} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-[var(--card)] rounded-2xl border border-dashed border-[var(--border)]">
              <h3 className="text-xl font-medium text-[var(--card-foreground)] mb-2">No articles found</h3>
              <p className="text-[var(--foreground)] opacity-60 mb-6">We're working on publishing some great content soon.</p>
              <Link href="/admin/login" className="text-[var(--color-primary)] font-medium hover:underline">
                Are you an author? Login here
              </Link>
            </div>
          )}
          
          <div className="mt-8 sm:hidden text-center">
            <Link href="/blogs" className="inline-flex text-[var(--color-primary)] font-medium hover:opacity-80 items-center gap-1 border border-[var(--color-primary)] px-6 py-2 rounded-full">
              View all articles
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
