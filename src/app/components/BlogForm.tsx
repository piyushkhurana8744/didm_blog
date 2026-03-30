'use client';

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import toast from 'react-hot-toast';
import RichTextEditor from './RichTextEditor';

interface BlogFormProps {
  initialData?: any;
  isEditing?: boolean;
}

export default function BlogForm({ initialData, isEditing = false }: BlogFormProps) {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [imagePreview, setImagePreview] = useState<string>(initialData?.image || '');

  const [formData, setFormData] = useState({
    title: initialData?.title || '',
    description: initialData?.description || '',
    content: initialData?.content || '',
    image: initialData?.image || '',
    author: initialData?.author || '',
    tags: initialData?.tags?.join(', ') || '',
    isFeatured: initialData?.isFeatured || false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleImageUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const url = e.target.value;
    setFormData((prev) => ({ ...prev, image: url }));
    setImagePreview(url);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Show local preview immediately
    const localUrl = URL.createObjectURL(file);
    setImagePreview(localUrl);

    setUploading(true);
    try {
      const data = new FormData();
      data.append('file', file);

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: data,
      });

      const result = await response.json();
      if (result.success) {
        setFormData((prev) => ({ ...prev, image: result.url }));
        setImagePreview(result.url);
        toast.success('Image uploaded successfully!');
      } else {
        toast.error(result.message || 'Upload failed');
        setImagePreview('');
      }
    } catch (err) {
      toast.error('Image upload failed');
      setImagePreview('');
    } finally {
      setUploading(false);
    }
  };

  const handleContentChange = (content: string) => {
    setFormData((prev) => ({ ...prev, content }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.image) {
      toast.error('Please upload or provide an image URL');
      return;
    }

    setLoading(true);
    try {
      const token = localStorage.getItem('adminToken');
      const payload = {
        title: formData.title,
        description: formData.description,
        content: formData.content,
        image: formData.image,
        author: formData.author,
        isFeatured: formData.isFeatured,
        tags: formData.tags
          .split(',')
          .map((tag: string) => tag.trim())
          .filter((tag: string) => tag),
      };

      const url = isEditing ? `/api/blogs/${initialData?.slug}` : '/api/blogs';
      const method = isEditing ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (response.ok) {
        toast.success(isEditing ? 'Blog updated!' : 'Blog created!');
        router.push('/admin');
      } else {
        toast.error(result.message || 'Something went wrong');
      }
    } catch (error) {
      toast.error('Failed to save blog');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full bg-[var(--card)] p-8 rounded-2xl shadow-sm border border-[var(--border)] space-y-6">
      {/* Title + Author */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="block text-[var(--foreground)] font-semibold text-sm">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 bg-[var(--background)] border border-[var(--border)] text-[var(--foreground)] rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] transition-all"
            placeholder="Awesome Blog Post"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-[var(--foreground)] font-semibold text-sm">Author</label>
          <input
            type="text"
            name="author"
            value={formData.author}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 bg-[var(--background)] border border-[var(--border)] text-[var(--foreground)] rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] transition-all"
            placeholder="John Doe"
          />
        </div>
      </div>

      {/* Description */}
      <div className="space-y-2">
        <label className="block text-[var(--foreground)] font-semibold text-sm">Short Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
          rows={2}
          className="w-full px-4 py-3 bg-[var(--background)] border border-[var(--border)] text-[var(--foreground)] rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] transition-all"
          placeholder="A brief summary of what this post is about..."
        />
      </div>

      {/* Image Upload */}
      <div className="space-y-3">
        <label className="block text-[var(--foreground)] font-semibold text-sm">Featured Image</label>

        {/* Upload area */}
        <div
          onClick={() => fileInputRef.current?.click()}
          className={`relative border-2 border-dashed rounded-xl cursor-pointer transition-all hover:border-[var(--color-primary)] ${
            imagePreview ? 'border-[var(--color-primary)]/50' : 'border-[var(--border)]'
          } bg-[var(--background)] overflow-hidden`}
        >
          {imagePreview ? (
            <div className="relative w-full aspect-[16/6]">
              <img
                src={imagePreview}
                alt="Preview"
                className="w-full h-full object-cover"
              />
              {uploading && (
                <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center gap-2">
                  <div className="w-8 h-8 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span className="text-white text-sm font-medium">Uploading to Cloudinary...</span>
                </div>
              )}
              <div className="absolute bottom-3 right-3">
                <span className="bg-black/60 text-white text-xs px-3 py-1.5 rounded-full font-medium">
                  Click to change
                </span>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 gap-3">
              {uploading ? (
                <>
                  <div className="w-10 h-10 border-4 border-[var(--border)] border-t-[var(--color-primary)] rounded-full animate-spin"></div>
                  <p className="text-[var(--foreground)] font-medium">Uploading...</p>
                </>
              ) : (
                <>
                  <div className="text-4xl">🖼️</div>
                  <div className="text-center">
                    <p className="text-[var(--foreground)] font-semibold">Click to upload image</p>
                    <p className="text-[var(--foreground)] opacity-50 text-sm mt-1">PNG, JPG, WEBP up to 10MB</p>
                  </div>
                </>
              )}
            </div>
          )}
        </div>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileUpload}
        />

        {/* OR paste URL */}
        <div className="flex items-center gap-3">
          <div className="flex-1 h-px bg-[var(--border)]"></div>
          <span className="text-xs text-[var(--foreground)] opacity-50 font-medium">OR paste a URL</span>
          <div className="flex-1 h-px bg-[var(--border)]"></div>
        </div>

        <input
          type="url"
          value={formData.image}
          onChange={handleImageUrlChange}
          className="w-full px-4 py-3 bg-[var(--background)] border border-[var(--border)] text-[var(--foreground)] rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] transition-all"
          placeholder="https://images.unsplash.com/..."
        />
      </div>

      {/* Tags + Featured */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
        <div className="space-y-2">
          <label className="block text-[var(--foreground)] font-semibold text-sm">Tags (comma separated)</label>
          <input
            type="text"
            name="tags"
            value={formData.tags}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-[var(--background)] border border-[var(--border)] text-[var(--foreground)] rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] transition-all"
            placeholder="React, Next.js, Web Design"
          />
        </div>

        <div className="flex items-center gap-3 pt-7">
          <input
            type="checkbox"
            id="isFeatured"
            name="isFeatured"
            checked={formData.isFeatured}
            onChange={handleChange}
            className="w-5 h-5 text-[var(--color-primary)] bg-[var(--background)] border-[var(--border)] rounded focus:ring-[var(--color-primary)]"
          />
          <label htmlFor="isFeatured" className="text-[var(--foreground)] font-medium">
            Mark as Featured Post
          </label>
        </div>
      </div>

      {/* Rich Text Content */}
      <div className="space-y-2">
        <label className="block text-[var(--foreground)] font-semibold text-sm mb-2">Content</label>
        <RichTextEditor value={formData.content} onChange={handleContentChange} />
      </div>

      {/* Actions */}
      <div className="pt-4 flex justify-end gap-4">
        <button
          type="button"
          onClick={() => router.back()}
          className="px-6 py-3 font-semibold text-[var(--foreground)] border border-[var(--border)] rounded-full hover:bg-[var(--border)] transition-all"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={loading || uploading}
          className="px-8 py-3 bg-[var(--color-primary)] text-white font-semibold rounded-full hover:bg-[var(--color-primary-hover)] disabled:opacity-50 hover:-translate-y-0.5 shadow-md hover:shadow-lg transition-all"
        >
          {loading ? 'Saving...' : isEditing ? 'Update Blog' : 'Publish Blog'}
        </button>
      </div>
    </form>
  );
}
