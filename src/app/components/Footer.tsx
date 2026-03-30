'use client';

export default function Footer() {
  return (
    <footer className="bg-[var(--card)] border-t border-[var(--border)] mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 lg:gap-12">
          
          <div className="col-span-1 md:col-span-1">
            <h2 className="text-2xl font-extrabold text-[var(--color-primary)] tracking-tight mb-4">
              BlogHub.
            </h2>
            <p className="text-[var(--foreground)] opacity-80 text-sm leading-relaxed mb-6 max-w-xs">
              Discover amazing stories, expert tutorials, and insightful articles on modern web development, design, and technology.
            </p>
            <div className="flex gap-4">
              {/* Social Links placeholders */}
              <a href="#" className="w-8 h-8 rounded-full bg-[var(--border)] flex items-center justify-center hover:bg-[var(--color-primary)] hover:text-white transition-colors" aria-label="Twitter">
                𝕏
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-[var(--border)] flex items-center justify-center hover:bg-[var(--color-primary)] hover:text-white transition-colors" aria-label="GitHub">
                🐙
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-[var(--border)] flex items-center justify-center hover:bg-[var(--color-primary)] hover:text-white transition-colors" aria-label="LinkedIn">
                in
              </a>
            </div>
          </div>

          <div className="col-span-1 md:col-span-1 flex flex-col gap-3">
            <h3 className="font-bold text-[var(--card-foreground)] mb-3 text-lg">Quick Links</h3>
            <a href="/" className="text-sm text-[var(--foreground)] opacity-80 hover:text-[var(--color-primary)] transition-colors w-fit">Home</a>
            <a href="/blogs" className="text-sm text-[var(--foreground)] opacity-80 hover:text-[var(--color-primary)] transition-colors w-fit">All Blogs</a>
            <a href="/about" className="text-sm text-[var(--foreground)] opacity-80 hover:text-[var(--color-primary)] transition-colors w-fit">About Us</a>
            <a href="/admin" className="text-sm text-[var(--foreground)] opacity-80 hover:text-[var(--color-primary)] transition-colors w-fit">Author Dashboard</a>
          </div>

          <div className="col-span-1 md:col-span-1">
            <h3 className="font-bold text-[var(--card-foreground)] mb-4 text-lg">Subscribe to Newsletter</h3>
            <p className="text-[var(--foreground)] opacity-80 text-sm mb-4">
              Get the latest articles and resources delivered straight to your inbox. No spam, we promise.
            </p>
            <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="w-full px-4 py-2 border border-[var(--border)] rounded-lg bg-[var(--background)] text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent text-sm"
                required
              />
              <button 
                type="submit" 
                className="px-4 py-2 bg-[var(--color-primary)] text-white rounded-lg hover:bg-[var(--color-primary-hover)] transition-colors text-sm font-medium whitespace-nowrap shadow-sm"
              >
                Subscribe
              </button>
            </form>
          </div>
          
        </div>
        
        <div className="border-t border-[var(--border)] mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-[var(--foreground)] opacity-60">
          <p>&copy; {new Date().getFullYear()} BlogHub. All rights reserved.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-[var(--color-primary)]">Privacy Policy</a>
            <a href="#" className="hover:text-[var(--color-primary)]">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
