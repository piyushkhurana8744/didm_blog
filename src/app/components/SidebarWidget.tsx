'use client';

import BlogCard from './BlogCard';
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube, FaRss } from 'react-icons/fa';
import AdBanner from './AdBanner';

interface SidebarWidgetProps {
  type: 'popular' | 'newsletter' | 'social' | 'ads';
  data?: any[];
  title?: string;
}

export default function SidebarWidget({ type, data, title }: SidebarWidgetProps) {
  if (type === 'popular') {
    return (
      <div className="mb-10">
        <div className="news-section-header">
           <h3 className="news-section-title">{title || 'POPULAR POST'}</h3>
        </div>
        <div className="flex flex-col">
          {data?.map((blog, idx) => (
            <div key={blog._id} className="flex gap-4 py-4 border-b border-[var(--border)] last:border-0 group relative">
               <div className="text-2xl font-black text-[var(--border)] group-hover:text-[var(--color-primary)] transition-colors italic shrink-0">
                  {idx + 1}
               </div>
               <div className="flex-grow">
                  <div className="bg-[var(--color-primary)] text-white text-[8px] font-bold px-1.5 py-0.5 inline-block uppercase mb-1">
                      {blog.tags?.[0] || 'Viral'}
                  </div>
                  <h4 className="text-xs font-bold text-[var(--foreground)] line-clamp-2 leading-tight group-hover:text-[var(--color-primary)] transition-colors">
                     {blog.title}
                  </h4>
               </div>
               <a href={`/blog/${blog.slug}`} className="absolute inset-0 z-10" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (type === 'social') {
    return (
      <div className="mb-10">
        <div className="news-section-header">
           <h3 className="news-section-title">STAY CONNECTED</h3>
        </div>
        <div className="grid grid-cols-2 gap-2">
           <SocialButton icon={<FaFacebookF />} name="Facebook" color="bg-[#3b5998]" count="12k" />
           <SocialButton icon={<FaTwitter />} name="Twitter" color="bg-[#1da1f2]" count="8k" />
           <SocialButton icon={<FaInstagram />} name="Instagram" color="bg-[#e4405f]" count="15k" />
           <SocialButton icon={<FaYoutube />} name="Youtube" color="bg-[#ff0000]" count="5k" />
        </div>
      </div>
    );
  }

  if (type === 'newsletter') {
    return (
      <div className="mb-10 bg-[var(--card)] border border-[var(--border)] p-6">
        <div className="news-section-header !border-0 !mb-4">
           <h3 className="news-section-title !static">NEWSLETTER</h3>
        </div>
        <p className="text-xs text-[var(--foreground)] opacity-70 mb-6 italic">
           Get the best stories from around the world delivered to your inbox weekly.
        </p>
        <form className="flex flex-col gap-3" onSubmit={(e) => e.preventDefault()}>
           <input 
             type="email" 
             placeholder="Your Email Address" 
             className="bg-transparent border border-[var(--border)] px-4 py-2.5 text-xs text-[var(--foreground)] focus:border-[var(--color-primary)] outline-none" 
           />
           <button className="bg-[var(--color-primary)] text-white text-[10px] font-bold py-2.5 uppercase tracking-widest hover:bg-[var(--color-primary-hover)] transition-colors">
             SUBSCRIBE
           </button>
        </form>
      </div>
    );
  }

  if (type === 'ads') {
    return (
      <div className="mb-10 w-full">
          <AdBanner type="square" />
      </div>
    );
  }

  return null;
}

function SocialButton({ icon, name, color, count }: any) {
  return (
    <div className={`${color} text-white flex items-center justify-between p-2.5 transition-transform hover:-translate-y-1 cursor-pointer`}>
       <div className="flex items-center gap-2">
         {icon}
         <span className="text-[10px] font-bold uppercase">{name}</span>
       </div>
       <span className="text-[10px] opacity-70 font-medium">{count}</span>
    </div>
  );
}
