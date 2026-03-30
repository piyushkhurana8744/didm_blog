'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import BlogForm from '@/app/components/BlogForm';
import { Blog } from '@/types';
import toast from 'react-hot-toast';

export default function EditBlogPage() {
  const router = useRouter();
  const params = useParams();
  const slug = Array.isArray(params.slug) ? params.slug[0] : params.slug;
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      router.push('/admin/login');
      return;
    }

    if (slug) {
      fetchBlog();
    }
  }, [slug, router]);

  const fetchBlog = async () => {
    try {
      const response = await fetch(`/api/blogs/${slug}`);
      const result = await response.json();

      if (result.success) {
        setBlog(result.data);
      } else {
        toast.error('Blog not found');
        router.push('/admin');
      }
    } catch (error) {
      toast.error('Error loading blog');
      console.error(error);
      router.push('/admin');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="text-center py-20 bg-[var(--card)] rounded-2xl border border-[var(--border)] max-w-4xl mx-auto mt-8">
        <div className="inline-block animate-spin rounded-full h-10 w-10 border-4 border-t-[var(--color-primary)] border-[var(--border)]"></div>
        <p className="mt-4 text-[var(--foreground)] opacity-70 font-medium">Loading blog...</p>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="text-center py-20 bg-[var(--card)] rounded-2xl border border-[var(--border)] border-dashed max-w-4xl mx-auto mt-8">
        <h3 className="text-xl font-medium text-[var(--foreground)] mb-2">Blog not found</h3>
        <button onClick={() => router.push('/admin')} className="text-[var(--color-primary)] hover:underline font-medium">
          Return to Dashboard
        </button>
      </div>
    );
  }

  return (
    <div className="py-8 px-4 max-w-4xl mx-auto w-full">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-extrabold text-[var(--foreground)] tracking-tight">Edit Blog</h1>
        <p className="text-[var(--foreground)] opacity-70 mt-2">Update your existing article.</p>
      </div>
      <BlogForm initialData={blog} isEditing={true} />
    </div>
  );
}
