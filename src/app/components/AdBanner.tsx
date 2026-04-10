'use client';

import Image from 'next/image';

interface AdBannerProps {
  type: 'leaderboard' | 'square' | 'large-leaderboard';
  imageUrl?: string;
}

export default function AdBanner({ type, imageUrl }: AdBannerProps) {
  // Real-looking Digital Marketing Ad placeholders
  const defaultImages = {
    leaderboard: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=728',
    square: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=300',
    'large-leaderboard': 'https://images.unsplash.com/photo-1557838923-2985c318be48?auto=format&fit=crop&q=80&w=1200',
  };

  const adUrl = imageUrl || defaultImages[type];

  if (type === 'leaderboard') {
    return (
      <div className="w-full max-w-[728px] h-[90px] relative overflow-hidden group border border-[var(--border)]">
        <Image src={adUrl} alt="Advertisement" fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
        <div className="absolute top-0 right-0 bg-black/40 text-white text-[8px] px-1 font-bold">AD</div>
        <div className="absolute inset-0 bg-black/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
           <span className="bg-white text-black text-[10px] font-bold px-3 py-1 shadow-xl">Enroll Now</span>
        </div>
      </div>
    );
  }

  if (type === 'square') {
    return (
      <div className="w-full h-[300px] relative overflow-hidden group border border-[var(--border)]">
        <Image src={adUrl} alt="Advertisement" fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
        <div className="absolute top-0 right-0 bg-black/40 text-white text-[8px] px-1 font-bold">AD</div>
        <div className="absolute bottom-0 left-0 right-0 bg-white/90 p-3 translate-y-full group-hover:translate-y-0 transition-transform">
           <h5 className="text-[10px] font-bold text-black uppercase mb-1">Master Digital Marketing</h5>
           <button className="w-full bg-[var(--color-primary)] text-white text-[8px] font-bold py-1.5 uppercase">Join DIDM Today</button>
        </div>
      </div>
    );
  }

  if (type === 'large-leaderboard') {
    return (
      <div className="w-full max-w-7xl mx-auto h-[150px] md:h-[200px] relative overflow-hidden group mb-12 border border-[var(--border)]">
         <Image src={adUrl} alt="Advertisement" fill className="object-cover group-hover:scale-105 transition-transform duration-1000" />
         <div className="absolute inset-0 bg-black/30 flex flex-col items-center justify-center text-center p-6">
            <div className="text-[8px] font-bold text-white/60 mb-2 tracking-widest uppercase">SPONSORED ADVERTISEMENT</div>
            <h3 className="text-white text-2xl md:text-3xl font-black italic mb-4 tracking-tighter">BOOST YOUR CAREER WITH DIDM DELHI</h3>
            <button className="bg-white text-black font-bold text-xs px-8 py-2 hover:bg-[var(--color-primary)] hover:text-white transition-colors">EXPLORE COURSES</button>
         </div>
      </div>
    );
  }

  return null;
}
