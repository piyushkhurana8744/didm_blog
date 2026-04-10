'use client';

import { useEffect, useState } from 'react';
import HeroGrid from './components/HeroGrid';
import CategorySection from './components/CategorySection';
import SidebarWidget from './components/SidebarWidget';
import BlogSkeleton from './components/BlogSkeleton';
import AdBanner from './components/AdBanner';

export default function HomePage() {
  const [blogs, setBlogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch('/api/blogs?limit=30');
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

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3, 4, 5, 6].map((n) => (
            <div key={n} className="h-[400px]">
              <BlogSkeleton />
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Segmenting blogs by tags for sections
  const techBlogs = blogs.filter(b => b.tags?.some((t: string) => t.toLowerCase() === 'tech' || t.toLowerCase() === 'technology'));
  const sportsBlogs = blogs.filter(b => b.tags?.some((t: string) => t.toLowerCase() === 'sports'));
  const lifestyleBlogs = blogs.filter(b => b.tags?.some((t: string) => t.toLowerCase() === 'lifestyle'));
  const reviewBlogs = blogs.filter(b => b.tags?.some((t: string) => t.toLowerCase() === 'review'));
  const popularBlogs = blogs.slice(0, 5); // Fallback for popular
  const recentBlogs = blogs.slice(0, 10);

  return (
    <div className="bg-[var(--background)]">
      {/* Hero Grid Section */}
      <HeroGrid blogs={blogs.slice(0, 5)} />

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content Area (75%) */}
          <div className="lg:w-[70%]">
             <CategorySection 
               title="RECENT POSTS" 
               blogs={blogs.slice(5, 9)} 
               viewAllLink="/blogs" 
             />

             {/* Ad Spot 1 */}
             <div className="my-10">
                <AdBanner type="leaderboard" />
             </div>
             
             <CategorySection 
               title="SPORTS" 
               blogs={sportsBlogs.length > 0 ? sportsBlogs : blogs.slice(9, 13)} 
               viewAllLink="/blogs?tag=sports" 
             />

             {/* Latest Reviews Section */}
             {reviewBlogs.length > 0 && (
               <CategorySection 
                 title="LATEST REVIEWS" 
                 blogs={reviewBlogs.slice(0, 4)} 
                 viewAllLink="/blogs?tag=review"
               />
             )}

             <CategorySection 
               title="LIFESTYLE" 
               blogs={lifestyleBlogs.length > 0 ? lifestyleBlogs : blogs.slice(13, 17)} 
               viewAllLink="/blogs?tag=lifestyle"
               layout="lifestyle"
             />

             {/* Large Ad Spot */}
             <div className="my-10">
                <AdBanner type="large-leaderboard" />
             </div>

             <CategorySection 
               title="TECHNOLOGY" 
               blogs={techBlogs.length > 0 ? techBlogs : blogs.slice(17, 21)} 
               viewAllLink="/blogs?tag=tech" 
             />
          </div>

          {/* Sidebar Area (25%) */}
          <aside className="lg:w-[30%]">
             <SidebarWidget type="popular" data={popularBlogs} title="POPULAR POSTS" />
             <SidebarWidget type="newsletter" />
             <SidebarWidget type="social" />
             <SidebarWidget type="ads" />
             
             <div className="sticky top-20">
                <SidebarWidget type="popular" data={reviewBlogs.length > 0 ? reviewBlogs.slice(0, 5) : blogs.slice(21, 25)} title="CRITIC REVIEWS" />
             </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
