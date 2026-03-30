import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { formatDate } from '@/utils/helpers';
import dbConnect from '@/lib/db';
import Blog from '@/models/Blog';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  await dbConnect();
  const blog = await Blog.findOne({ slug });
  if (!blog) return { title: 'Blog Not Found' };
  return {
    title: `${blog.title} | BlogHub`,
    description: blog.description,
    openGraph: { title: blog.title, description: blog.description, images: [blog.image] },
  };
}

export default async function BlogDetailPage({ params }: Props) {
  const { slug } = await params;
  await dbConnect();
  const blog = await Blog.findOne({ slug });
  if (!blog) notFound();

  return (
    <div className="w-full">

      {/* ── Full-width Hero Banner ─────────────────────────────── */}
      <div className="relative w-full h-[55vw] max-h-[520px] min-h-[260px] overflow-hidden">
        <Image
          src={blog.image}
          alt={blog.title}
          fill
          priority
          className="object-cover object-center scale-[1.02] transition-transform duration-700"
          sizes="100vw"
        />
        {/* Dark gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

        {/* Text overlay on image */}
        <div className="absolute bottom-0 left-0 right-0 px-4 sm:px-8 md:px-16 pb-8 md:pb-12 max-w-4xl mx-auto w-full">
          {/* Tags */}
          {blog.tags?.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {blog.tags.map((tag: string) => (
                <span key={tag} className="bg-[var(--color-primary)] text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Title on the image */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight drop-shadow-xl [text-shadow:0_2px_16px_rgba(0,0,0,0.6)]">
            {blog.title}
          </h1>
        </div>
      </div>

      {/* ── Content Card ──────────────────────────────────────── */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 -mt-6 relative z-10">

        {/* White card that sits on top of the image */}
        <div className="bg-[var(--card)] rounded-2xl shadow-xl border border-[var(--border)] p-6 sm:p-10">

          {/* Author + Meta row */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8 pb-6 border-b border-[var(--border)]">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-full bg-[var(--color-primary)] flex items-center justify-center text-white font-extrabold text-lg shrink-0">
                {blog.author.charAt(0).toUpperCase()}
              </div>
              <div>
                <p className="font-bold text-[var(--foreground)] text-sm">{blog.author}</p>
                <p className="text-xs text-[var(--foreground)] opacity-60">{formatDate(blog.createdAt)}</p>
              </div>
            </div>
            <Link
              href="/blogs"
              className="text-sm font-semibold text-[var(--color-primary)] hover:underline flex items-center gap-1"
            >
              ← All Articles
            </Link>
          </div>

          {/* Description (subtitle) */}
          {blog.description && (
            <p className="text-base sm:text-lg text-[var(--foreground)] opacity-75 leading-relaxed mb-8 font-medium border-l-4 border-[var(--color-primary)] pl-4 italic">
              {blog.description}
            </p>
          )}

          {/* Rich Text Content */}
          <div
            className="blog-content"
            dangerouslySetInnerHTML={{ __html: blog.content }}
          />

          {/* Bottom nav */}
          <div className="mt-12 pt-8 border-t border-[var(--border)] flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <Link
              href="/blogs"
              className="inline-flex items-center gap-2 px-6 py-2.5 border border-[var(--border)] rounded-full text-[var(--foreground)] font-semibold hover:bg-[var(--border)] transition-all text-sm"
            >
              ← More Articles
            </Link>
            <div className="flex flex-wrap gap-2">
              {blog.tags?.map((tag: string) => (
                <span key={tag} className="bg-[var(--border)] text-[var(--foreground)] text-xs font-semibold px-3 py-1 rounded-full">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Spacing at bottom */}
        <div className="h-16" />
      </div>
    </div>
  );
}
