'use client';

import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube, FaRss } from 'react-icons/fa';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-[var(--card)] text-[var(--foreground)] pt-16 pb-8 border-t border-[var(--border)]">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Column 1: Brand & About */}
          <div>
            <h2 className="text-3xl font-black italic tracking-tighter mb-6">
                <span className="text-[var(--foreground)]">DIDM</span>
                <span className="text-[var(--color-primary)]">BLOG</span>
            </h2>
            <p className="text-[13px] text-[var(--foreground)] opacity-60 leading-relaxed mb-6 font-medium">
              Delhi Institute of Digital Marketing (DIDM) is your premier destination for digital marketing education, insights, and career growth.
            </p>
            <div className="flex gap-3">
               <SocialIcon icon={<FaFacebookF />} color="bg-[#3b5998]" />
               <SocialIcon icon={<FaTwitter />} color="bg-[#1da1f2]" />
               <SocialIcon icon={<FaInstagram />} color="bg-[#e4405f]" />
               <SocialIcon icon={<FaYoutube />} color="bg-[#ff0000]" />
               <SocialIcon icon={<FaRss />} color="bg-[var(--color-primary)]" />
            </div>
          </div>

          {/* Column 2: Categories */}
          <div>
            <h4 className="text-xs font-black uppercase tracking-widest border-l-4 border-[var(--color-primary)] pl-3 mb-8 text-[var(--foreground)]">
              CATEGORIES
            </h4>
            <ul className="flex flex-col gap-3 text-[13px] text-[var(--foreground)] opacity-60 font-bold">
               <FooterLink href="/blogs?tag=business">BUSINESS</FooterLink>
               <FooterLink href="/blogs?tag=tech">TECHNOLOGY</FooterLink>
               <FooterLink href="/blogs?tag=lifestyle">LIFESTYLE</FooterLink>
               <FooterLink href="/blogs?tag=sports">SPORTS</FooterLink>
               <FooterLink href="/blogs?tag=health">HEALTH</FooterLink>
            </ul>
          </div>

          {/* Column 3: Useful Links */}
          <div>
            <h4 className="text-xs font-black uppercase tracking-widest border-l-4 border-[var(--color-primary)] pl-3 mb-8 text-[var(--foreground)]">
              USEFUL LINKS
            </h4>
            <ul className="flex flex-col gap-3 text-[13px] text-[var(--foreground)] opacity-60 font-bold">
               <FooterLink href="/about">ABOUT US</FooterLink>
               <FooterLink href="/blogs">ALL ARTICLES</FooterLink>
               <FooterLink href="/admin">AUTHOR PORTAL</FooterLink>
               <FooterLink href="#">PRIVACY POLICY</FooterLink>
               <FooterLink href="#">TERMS & CONDITIONS</FooterLink>
            </ul>
          </div>

          {/* Column 4: Newsletter */}
          <div>
            <h4 className="text-xs font-black uppercase tracking-widest border-l-4 border-[var(--color-primary)] pl-3 mb-8 text-[var(--foreground)]">
              NEWSLETTER
            </h4>
            <p className="text-[13px] text-[var(--foreground)] opacity-50 mb-6 italic font-medium">
              Subscribe to get the latest updates directly in your inbox.
            </p>
            <form className="flex flex-col gap-2" onSubmit={(e) => e.preventDefault()}>
               <input 
                 type="email" 
                 placeholder="Your Email" 
                 className="bg-[var(--background)] border border-[var(--border)] px-4 py-3 text-xs focus:border-[var(--color-primary)] outline-none text-[var(--foreground)]" 
               />
               <button className="bg-[var(--color-primary)] text-white text-[10px] font-bold py-3 uppercase tracking-widest hover:bg-[var(--color-primary-hover)] transition-colors">
                 SUBMIT
               </button>
            </form>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="border-t border-[var(--border)] pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-[11px] font-bold text-[var(--foreground)] opacity-40 uppercase tracking-widest">
           <p>© {new Date().getFullYear()} DIDM BLOG. ALL RIGHTS RESERVED.</p>
           <div className="flex gap-6">
              <a href="#" className="hover:text-[var(--foreground)] transition-colors">HELP</a>
              <a href="#" className="hover:text-[var(--foreground)] transition-colors">CONTACT</a>
              <a href="#" className="hover:text-[var(--foreground)] transition-colors">ADVERTISING</a>
           </div>
        </div>
      </div>
    </footer>
  );
}

function SocialIcon({ icon, color }: any) {
  return (
    <a href="#" className={`w-8 h-8 ${color} rounded-full flex items-center justify-center text-white text-xs hover:scale-110 transition-transform`}>
      {icon}
    </a>
  );
}

function FooterLink({ href, children }: any) {
  return (
    <li>
      <Link href={href} className="hover:text-white transition-colors">
        {children}
      </Link>
    </li>
  );
}
