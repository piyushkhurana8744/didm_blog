'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import Link from 'next/link';

export default function LoginForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const endpoint = showRegister ? '/api/auth/register' : '/api/auth/login';

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok && result.token) {
        localStorage.setItem('adminToken', result.token);
        toast.success(result.message || 'Success!');
        router.push('/admin');
      } else {
        toast.error(result.message || 'Authentication failed');
      }
    } catch (error) {
      toast.error('An error occurred');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto bg-[var(--card)] p-8 sm:p-10 rounded-3xl shadow-xl border border-[var(--border)] relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-2 bg-[var(--color-primary)]"></div>
      
      <div className="text-center mb-10">
        <h2 className="text-3xl font-extrabold text-[var(--foreground)] tracking-tight mb-2">
          {showRegister ? 'Create Account' : 'Welcome Back'}
        </h2>
        <p className="text-[var(--foreground)] opacity-70 text-sm">
          {showRegister ? 'Sign up to start publishing blogs.' : 'Enter your credentials to access the dashboard.'}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <label className="block text-[var(--foreground)] font-semibold text-sm">Email Address</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 bg-[var(--background)] border border-[var(--border)] text-[var(--foreground)] rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] transition-all"
            placeholder="admin@example.com"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-[var(--foreground)] font-semibold text-sm">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 bg-[var(--background)] border border-[var(--border)] text-[var(--foreground)] rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] transition-all"
            placeholder="••••••••"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3.5 bg-[var(--color-primary)] text-white font-bold rounded-xl hover:bg-[var(--color-primary-hover)] disabled:opacity-50 transition-all shadow-md hover:shadow-lg mt-4 hover:-translate-y-0.5"
        >
          {loading ? 'Processing...' : showRegister ? 'Register Now' : 'Sign In'}
        </button>
      </form>

      <div className="mt-8 pt-6 border-t border-[var(--border)] text-center space-y-4">
        <p className="text-[var(--foreground)] opacity-70 text-sm">
          {showRegister ? 'Already have an account?' : "Don't have an account?"}
          <button
            onClick={() => setShowRegister(!showRegister)}
            className="text-[var(--color-primary)] font-semibold hover:underline ml-2"
          >
            {showRegister ? 'Sign In' : 'Register'}
          </button>
        </p>
        
        <div>
          <Link href="/" className="text-[var(--foreground)] opacity-60 hover:opacity-100 text-sm font-medium transition-opacity">
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
