import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';

// Load env vars
dotenv.config({ path: path.join(process.cwd(), '.env.local') });

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error('MONGODB_URI not found in .env.local');
  process.exit(1);
}

const blogSchema = new mongoose.Schema({
  title: String,
  slug: String,
  description: String,
  content: String,
  image: String,
  author: String,
  tags: [String],
  isFeatured: Boolean,
}, { timestamps: true });

const Blog = mongoose.models.Blog || mongoose.model('Blog', blogSchema);

const dummyBlogs = [
  {
    title: "Mastering SEO in 2026: The AI Revolution",
    slug: "mastering-seo-2026-ai",
    description: "Learn how Search Generative Experience (SGE) is changing the way we rank on Google.",
    content: "<p>Artificial intelligence is no longer just a tool; it's the core of search engine optimization. In this guide, we explore the new ranking factors for 2026...</p>",
    image: "https://images.unsplash.com/photo-1571721795195-a2ca2d3370a9?auto=format&fit=crop&q=80&w=1000",
    author: "DIDM Expert",
    tags: ["SEO", "AI", "Marketing"],
    isFeatured: true,
    readTime: "8 min read"
  },
  {
    title: "The Rise of Short-Form Video in Social Media Marketing",
    slug: "short-form-video-marketing-trends",
    description: "Why Reels and YouTube Shorts are now the highest ROI channels for small businesses.",
    content: "<p>Attention spans are shrinking, but engagement is at an all-time high for 60-second content...</p>",
    image: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&q=80&w=1000",
    author: "Social Media Team",
    tags: ["SMM", "Video", "Trends"],
    isFeatured: false,
    readTime: "5 min read"
  },
  {
    title: "SEMrush Review 2026: Still the King of SEO Tools?",
    slug: "semrush-review-2026",
    description: "An in-depth look at the latest AI features in SEMrush and whether it justifies the price tag.",
    content: "<p>SEMrush has long been the gold standard for SEO professionals. With the 2026 update, they've integrated deep learning into their keyword research module...</p>",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1000",
    author: "SEO Analyst",
    tags: ["Review", "SEO", "Tools"],
    isFeatured: true,
    rating: 4.8,
    readTime: "12 min read"
  },
  {
    title: "Canva Pro vs Adobe Express: The Ultimate Design Battle",
    slug: "canva-vs-adobe-express-review",
    description: "Which cloud-based design tool is better for social media managers in 2026?",
    content: "<p>Choosing between Canva and Adobe Express has never been harder. Both platforms have introduced incredible AI image generation tools...</p>",
    image: "https://images.unsplash.com/photo-1542744094-3a31f272c490?auto=format&fit=crop&q=80&w=1000",
    author: "Graphic Designer",
    tags: ["Review", "Design", "SMM"],
    isFeatured: false,
    rating: 4.5,
    readTime: "10 min read"
  },
  {
    title: "HubSpot CRM: Is it Overkill for Small Agencies?",
    slug: "hubspot-crm-agency-review",
    description: "We test HubSpot's latest starter suite to see if it delivers real value for growing marketing agencies.",
    content: "<p>HubSpot is powerful, but it can be expensive. In this review, we break down the features that actually matter for small agency owners...</p>",
    image: "https://images.unsplash.com/photo-1552581234-26160f608093?auto=format&fit=crop&q=80&w=1000",
    author: "Agency Owner",
    tags: ["Review", "CRM", "Business"],
    isFeatured: false,
    rating: 4.2,
    readTime: "15 min read"
  },
  {
    title: "Mailchimp AI: The New Era of Email Automation",
    slug: "mailchimp-ai-email-review",
    description: "Testing Mailchimp's new auto-copywriter and predictive analytics tools.",
    content: "<p>Email marketing hasn't died; it just got smarter. Mailchimp's new AI features promet to double open rates, but do they work?</p>",
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=1000",
    author: "Email Expert",
    tags: ["Review", "Email", "Automation"],
    isFeatured: false,
    rating: 4.0,
    readTime: "7 min read"
  },
  {
    title: "Google Analytics 4: Two Years Later",
    slug: "ga4-review-two-years-on",
    description: "Has GA4 finally become the tool we were promised? Our honest review after 24 months of daily use.",
    content: "<p>The transition to GA4 was rocky for everyone. Now that the dust has settled, we look at the powerful data modeling that classical GA lacked...</p>",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1000",
    author: "Data Scientist",
    tags: ["Review", "Analytics", "GA4"],
    isFeatured: false,
    rating: 3.8,
    readTime: "18 min read"
  },
  {
    title: "Google Ads vs Meta Ads: Which is Right for You?",
    slug: "google-ads-vs-meta-ads",
    description: "An unbiased comparison of the world's two largest advertising platforms.",
    content: "<p>The choice between search intent and social interest is a fundamental one for any digital marketer...</p>",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1000",
    author: "Performance Marketer",
    tags: ["Advertising", "GoogleAds", "MetaAds"],
    isFeatured: false,
    readTime: "10 min read"
  },
  {
    title: "The Power of Storytelling in Content Marketing",
    slug: "storytelling-content-marketing",
    description: "Move beyond features and benefits to create emotional connections with your audience.",
    content: "<p>People don't buy products; they buy better versions of themselves through stories...</p>",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=1000",
    author: "Content Strategist",
    tags: ["Content", "Storytelling", "Branding"],
    isFeatured: true,
    readTime: "9 min read"
  },
  {
     title: "Data Analytics: The Backbone of Digital Strategy",
     slug: "data-analytics-digital-strategy",
     description: "How to turn raw traffic numbers into actionable insights using GA4 and beyond.",
     content: "<p>Data without insight is just noise. Learn how to listen to what your users are telling you...</p>",
     image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1000",
     author: "Analytics Lead",
     tags: ["Data", "Analytics", "GA4"],
     isFeatured: false,
     readTime: "11 min read"
  },
  {
    title: "Influencer Marketing: Micro vs Macro Creators",
    slug: "micro-vs-macro-influencers",
    description: "Discover why niche audiences often provide far better engagement rates than huge follower counts.",
    content: "<p>The landscape of influence is changing. In 2026, authenticity is the new currency...</p>",
    image: "https://images.unsplash.com/photo-1647427060118-4911c9821b82?auto=format&fit=crop&q=80&w=1000",
    author: "PR Manager",
    tags: ["Influencer", "Social", "Brand"],
    isFeatured: false,
    readTime: "6 min read"
  },
  {
    title: "Mobile Optimization: Preparing for a Screen-First World",
    slug: "mobile-optimization-seo-2026",
    description: "Google's mobile-first indexing is now mobile-only. Is your site ready?",
    content: "<p>If your mobile experience is an afterthought, you're invisible to 70% of your potential customers...</p>",
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&q=80&w=1000",
    author: "Tech SEO Team",
    tags: ["Mobile", "SEO", "WebDesign"],
    isFeatured: false,
    readTime: "8 min read"
  },
  {
    title: "Local SEO: Dominating your Neighborhood Search",
    slug: "local-seo-guide-2026",
    description: "How to rank #1 in the Map Pack for Delhi-based businesses.",
    content: "<p>For local businesses, the battle for customers begins and ends on the map...</p>",
    image: "https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?auto=format&fit=crop&q=80&w=1000",
    author: "Local SEO Pro",
    tags: ["LocalSEO", "GoogleBusiness", "Delhi"],
    isFeatured: false,
    readTime: "12 min read"
  },
  {
    title: "UI/UX for Higher Ad Conversions",
    slug: "ui-ux-ad-conversion-guide",
    description: "Bridging the gap between click and conversion through thoughtful design.",
    content: "<p>A great ad with a poor landing page is just a waste of budget. Learn how to convert...</p>",
    image: "https://images.unsplash.com/photo-1602576666092-bf6447a729fc?auto=format&fit=crop&q=80&w=1000",
    author: "Design Team",
    tags: ["UIUX", "CRO", "Ads"],
    isFeatured: false,
    readTime: "10 min read"
  },
  {
    title: "TikTok Ads: Scaling Beyond Gen Z",
    slug: "tiktok-ads-scaling-guide",
    description: "How to effectively target 35-50 year olds on the world's most viral platform.",
    content: "<p>TikTok isn't just for viral dances anymore; it's a mature advertising juggernaut...</p>",
    image: "https://images.unsplash.com/photo-1611162618071-b39a2ec055fb?auto=format&fit=crop&q=80&w=1000",
    author: "Video Marketer",
    tags: ["TikTok", "Ads", "Scale"],
    isFeatured: false,
    readTime: "15 min read"
  }
];

async function seed() {
  try {
    const mongoUrl = process.env.MONGODB_URI;
    if (!mongoUrl) throw new Error('MONGODB_URI is not defined');
    
    await mongoose.connect(mongoUrl);
    console.log('Connected to MongoDB');

    // Clear existing blogs for a fresh DIDM look
    await Blog.deleteMany({});
    
    await Blog.insertMany([...dummyBlogs]);
    console.log('Successfully seeded DIDM dummy blogs!');
    
    process.exit(0);
  } catch (err) {
    console.error('Seeding error:', err);
    process.exit(1);
  }
}

seed();
