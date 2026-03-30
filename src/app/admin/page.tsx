'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { Blog } from '@/types';
import { formatDate } from '@/utils/helpers';

export default function AdminDashboard() {
  const router = useRouter();
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      router.push('/admin/login');
      return;
    }

    fetchBlogs();
  }, [router]);

  const fetchBlogs = async () => {
    try {
      const response = await fetch('/api/blogs');
      const result = await response.json();

      if (result.success) {
        setBlogs(result.data);
      } else {
        toast.error('Failed to fetch blogs');
      }
    } catch (error) {
      toast.error('Error loading blogs');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (slug: string) => {
    if (!confirm('Are you sure you want to delete this blog?')) return;

    setDeleting(slug);
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`/api/blogs/${slug}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        toast.success('Blog deleted successfully');
        setBlogs(blogs.filter((b) => b.slug !== slug));
      } else {
        toast.error('Failed to delete blog');
      }
    } catch (error) {
      toast.error('Error deleting blog');
      console.error(error);
    } finally {
      setDeleting(null);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
        <div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-[var(--foreground)] tracking-tight">Admin <span className="text-[var(--color-primary)]">Dashboard</span></h1>
          <p className="text-[var(--foreground)] opacity-60 mt-1">Manage your blog content and featured posts.</p>
        </div>
        <Link 
          href="/admin/create" 
          className="inline-flex items-center justify-center bg-[var(--color-primary)] text-white px-6 py-3 rounded-full font-bold shadow-lg shadow-[var(--color-primary)]/20 hover:shadow-[var(--color-primary)]/40 hover:-translate-y-0.5 transition-all"
        >
          <span className="mr-2 text-xl">+</span> Create New Blog
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-[var(--card)] p-6 rounded-2xl shadow-sm border border-[var(--border)]">
          <p className="text-sm font-semibold text-[var(--foreground)] opacity-50 uppercase tracking-wider mb-1">Total Blogs</p>
          <p className="text-4xl font-black text-[var(--foreground)]">{blogs.length}</p>
        </div>
        <div className="bg-[var(--card)] p-6 rounded-2xl shadow-sm border border-[var(--border)]">
          <p className="text-sm font-semibold text-[var(--foreground)] opacity-50 uppercase tracking-wider mb-1">Featured</p>
          <p className="text-4xl font-black text-[var(--color-primary)]">{blogs.filter(b => b.isFeatured).length}</p>
        </div>
        <div className="bg-[var(--card)] p-6 rounded-2xl shadow-sm border border-[var(--border)]">
          <p className="text-sm font-semibold text-[var(--foreground)] opacity-50 uppercase tracking-wider mb-1">Admin User</p>
          <p className="text-xl font-bold text-[var(--foreground)] truncate">Active Session</p>
        </div>
      </div>

      <div className="bg-[var(--card)] rounded-2xl shadow-sm border border-[var(--border)] overflow-hidden">
        <div className="p-6 border-b border-[var(--border)] flex items-center justify-between">
          <h2 className="text-xl font-bold text-[var(--foreground)]">Recent Posts</h2>
          <button onClick={fetchBlogs} className="text-sm font-semibold text-[var(--color-primary)] hover:underline">Refresh</button>
        </div>

        {loading ? (
          <div className="text-center py-20">
            <div className="inline-block animate-spin rounded-full h-10 w-10 border-4 border-t-[var(--color-primary)] border-[var(--border)]"></div>
            <p className="mt-4 text-[var(--foreground)] opacity-70 font-medium">Loading content...</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[var(--background)]">
                  <th className="px-6 py-4 text-sm font-bold text-[var(--foreground)] opacity-60 uppercase tracking-wider">Blog Details</th>
                  <th className="px-6 py-4 text-sm font-bold text-[var(--foreground)] opacity-60 uppercase tracking-wider hidden sm:table-cell">Status</th>
                  <th className="px-6 py-4 text-sm font-bold text-[var(--foreground)] opacity-60 uppercase tracking-wider hidden md:table-cell">Date</th>
                  <th className="px-6 py-4 text-sm font-bold text-[var(--foreground)] opacity-60 uppercase tracking-wider text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border)]">
                {blogs.map((blog) => (
                  <tr key={blog._id} className="hover:bg-[var(--background)]/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <div className="relative w-12 h-12 rounded-lg overflow-hidden flex-shrink-0 bg-[var(--background)]">
                          <img src={blog.image} alt="" className="w-full h-full object-cover" />
                        </div>
                        <div className="min-w-0">
                          <p className="font-bold text-[var(--foreground)] truncate">{blog.title}</p>
                          <p className="text-xs text-[var(--foreground)] opacity-50 truncate">{blog.author}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 hidden sm:table-cell">
                      {blog.isFeatured ? (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-[var(--color-primary)]/10 text-[var(--color-primary)]">
                          Featured
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-gray-100 text-gray-600">
                          Standard
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-sm text-[var(--foreground)] opacity-60 hidden md:table-cell">
                      {formatDate(blog.createdAt || new Date())}
                    </td>
                    <td className="px-6 py-4 text-right space-x-3">
                      <Link href={`/blog/${blog.slug}`} target="_blank" className="text-[var(--foreground)] opacity-60 hover:opacity-100 font-bold text-sm">View</Link>
                      <Link href={`/admin/edit/${blog.slug}`} className="text-blue-600 hover:text-blue-700 font-bold text-sm">Edit</Link>
                      <button 
                        onClick={() => handleDelete(blog.slug)}
                        disabled={deleting === blog.slug}
                        className="text-[var(--color-primary)] hover:opacity-80 font-bold text-sm"
                      >
                        {deleting === blog.slug ? '...' : 'Delete'}
                      </button>
                    </td>
                  </tr>
                ))}
                {blogs.length === 0 && (
                  <tr>
                    <td colSpan={4} className="px-6 py-10 text-center text-[var(--foreground)] opacity-50 italic">
                      No blogs found. Create your first post!
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
