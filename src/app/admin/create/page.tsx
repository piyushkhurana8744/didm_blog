import { Metadata } from 'next';
import BlogForm from '@/app/components/BlogForm';

export const metadata: Metadata = {
  title: 'Create New Blog - BlogHub Admin',
  description: 'Create a new blog post',
};

export default function CreateBlogPage() {
  return (
    <div className="py-8 px-4 max-w-4xl mx-auto w-full">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-extrabold text-[var(--foreground)] tracking-tight">Create New Blog</h1>
        <p className="text-[var(--foreground)] opacity-70 mt-2">Draft and publish a new article to your blog.</p>
      </div>
      <BlogForm />
    </div>
  );
}
