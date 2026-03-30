'use client';

import { useEffect, useState, Suspense } from 'react';
import BlogCard from '../components/BlogCard';
import BlogSkeleton from '../components/BlogSkeleton';
import { useSearchParams } from 'next/navigation';

function BlogsContent() {
  const [blogs, setBlogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [tag, setTag] = useState('');
  const searchParams = useSearchParams();

  useEffect(() => {
    const qSearch = searchParams.get('search');
    const qTag = searchParams.get('tag');
    if (qSearch) setSearch(qSearch);
    if (qTag) setTag(qTag);
  }, [searchParams]);

  useEffect(() => {
    const fetchBlogs = async () => {
      setLoading(true);
      try {
        let url = '/api/blogs?limit=50';
        if (search) url += `&search=${encodeURIComponent(search)}`;
        if (tag) url += `&tag=${encodeURIComponent(tag)}`;
        
        const response = await fetch(url);
        const result = await response.json();
        if (result.success) {
          setBlogs(result.data);
        }
      } catch (err) {
        console.error('Failed to fetch blogs', err);
      } finally {
        setLoading(false);
      }
    };

    // Debounce search slightly
    const timer = setTimeout(() => {
      fetchBlogs();
    }, 300);

    return () => clearTimeout(timer);
  }, [search, tag]);

  const allTags = ['Technology', 'Design', 'Development', 'Tutorial', 'React', 'Next.js', 'Tailwind', 'Startup'];

  return (
    <>
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <h1 className="text-4xl md:text-5xl font-extrabold text-[var(--foreground)] tracking-tight">
          Explore <span className="text-[var(--color-primary)]">Articles</span>
        </h1>
        <p className="text-lg text-[var(--foreground)] opacity-70">
          Search through our collection of premium articles and tutorials.
        </p>
      </div>

      {/* Filters */}
      <div className="bg-[var(--card)] p-6 rounded-2xl shadow-sm border border-[var(--border)] max-w-4xl mx-auto w-full space-y-6">
        <div className="relative">
          <input
            type="text"
            placeholder="Search by title or description..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-12 pr-4 py-4 bg-[var(--background)] border border-[var(--border)] rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] text-[var(--foreground)]"
          />
          <span className="absolute left-4 top-1/2 transform -translate-y-1/2 opacity-50 text-xl">
            🔍
          </span>
        </div>
        
        <div>
          <h3 className="text-sm font-semibold text-[var(--foreground)] mb-3 opacity-80">Popular Tags</h3>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setTag('')}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${tag === '' ? 'bg-[var(--color-primary)] text-white' : 'bg-[var(--background)] border border-[var(--border)] text-[var(--foreground)] hover:border-[var(--color-primary)]'}`}
            >
              All
            </button>
            {allTags.map(t => (
              <button
                key={t}
                onClick={() => setTag(t)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${tag === t ? 'bg-[var(--color-primary)] text-white' : 'bg-[var(--background)] border border-[var(--border)] text-[var(--foreground)] hover:border-[var(--color-primary)]'}`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3, 4, 5, 6].map(n => (
            <div key={n} className="h-[450px]">
              <BlogSkeleton />
            </div>
          ))}
        </div>
      ) : blogs.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map(blog => (
            <BlogCard key={blog._id} blog={blog} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-[var(--card)] rounded-2xl border border-dashed border-[var(--border)]">
          <p className="text-xl font-medium text-[var(--card-foreground)] mb-2">No results found for your search.</p>
          <button onClick={() => {setSearch(''); setTag('');}} className="text-[var(--color-primary)] font-medium hover:underline mt-4">
            Clear filters
          </button>
        </div>
      )}
    </>
  );
}

export default function BlogsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col gap-12">
      <Suspense fallback={<div className="text-center py-20">Loading blogs...</div>}>
        <BlogsContent />
      </Suspense>
    </div>
  );
}
