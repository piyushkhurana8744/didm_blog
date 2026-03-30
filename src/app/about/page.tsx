import Image from 'next/image';
import Link from 'next/link';

export const metadata = {
  title: 'About Us | BlogHub',
  description: 'Learn more about the team behind BlogHub.',
};

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6">
      <div className="text-center mb-16 space-y-4">
        <h1 className="text-4xl md:text-5xl font-extrabold text-[var(--foreground)] tracking-tight">
          About <span className="text-[var(--color-primary)]">BlogHub</span>
        </h1>
        <p className="text-xl text-[var(--foreground)] opacity-70 max-w-2xl mx-auto">
          We are passionate about sharing knowledge and building a community of lifelong learners.
        </p>
      </div>

      <div className="bg-[var(--card)] p-8 md:p-12 rounded-3xl shadow-xl border border-[var(--border)] space-y-8 mb-16">
        <div>
          <h2 className="text-2xl font-bold text-[var(--color-primary)] mb-4">Our Mission</h2>
          <p className="text-[var(--foreground)] opacity-80 leading-relaxed text-lg">
            Our mission is to empower developers, designers, and creators by providing high-quality, actionable, and engaging content. We believe that technology should be accessible to everyone, and learning should be an enjoyable journey.
          </p>
        </div>
        
        <div>
          <h2 className="text-2xl font-bold text-[var(--color-primary)] mb-4">What We Do</h2>
          <p className="text-[var(--foreground)] opacity-80 leading-relaxed text-lg">
            We cover a wide range of topics including web development, UI/UX design, software engineering best practices, and the latest trends in the tech industry. Whether you're a beginner just starting out or an experienced professional looking to level up, we've got something for you.
          </p>
        </div>
      </div>

      <div className="text-center bg-[var(--color-primary)] rounded-3xl p-10 md:p-16 text-white shadow-lg relative overflow-hidden">
        <div className="relative z-10 space-y-6 max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-extrabold">Ready to start reading?</h2>
          <p className="text-white/80 text-lg">Join thousands of readers who receive our daily insights and tips directly.</p>
          <Link href="/blogs" className="inline-block px-8 py-4 bg-white text-[var(--color-primary)] font-bold rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all mt-4">
            Explore Articles
          </Link>
        </div>
      </div>
    </div>
  );
}
