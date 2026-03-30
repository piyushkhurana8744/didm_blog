# BlogHub - Setup and Quick Start Guide

## Quick Setup (5 minutes)

### 1. Clone and Install
```bash
cd /Users/piyushkhurana/didm_blog_website
npm install
```

### 2. Set Up MongoDB

**Option A: MongoDB Atlas (Cloud - Recommended)**
1. Go to [mongodb.com/cloud/atlas](https://mongodb.com/cloud/atlas)
2. Create free account
3. Create a new cluster (free tier available)
4. Click "Connect" → Copy connection string
5. Update `.env.local`:
```env
MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/blog_db?retryWrites=true&w=majority
JWT_SECRET=your-random-secret-key-min-32-chars-12345678901234567890
NEXT_PUBLIC_API_URL=http://localhost:3000
```

**Option B: Local MongoDB**
```bash
# Install MongoDB locally (macOS with Homebrew)
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb-community

# Then use in .env.local:
MONGODB_URI=mongodb://localhost:27017/blog_db
JWT_SECRET=your-random-secret-key-min-32-chars
NEXT_PUBLIC_API_URL=http://localhost:3000
```

### 3. Start Development Server
```bash
npm run dev
```

### 4. Create Admin Account
1. Visit [http://localhost:3000/admin/login](http://localhost:3000/admin/login)
2. Click "Register"
3. Enter email & password
4. Click Register
5. Done! You're logged in

### 5. Create First Blog
1. Click "Dashboard" in header
2. Click "Create New Blog"
3. Fill in details:
   - **Title**: My First Blog Post
   - **Author**: Your Name
   - **Image URL**: https://via.placeholder.com/800x400
   - **Tags**: nextjs, mongodb, blogging
   - **Content**: Write your blog content here (HTML supported)
4. Click "Create Blog"

### 6. View Your Blog
- Visit [http://localhost:3000](http://localhost:3000) to see all blogs
- Click "Read More" on your blog card to view full post

---

## Project Running Already?

```bash
# Start development
npm run dev

# Open in browser
open http://localhost:3000
```

---

## File Structure Overview

```
didm_blog_website/
├── .env.local          # Environment variables (NOT in git)
├── .env.example        # Example env file
├── package.json        # Dependencies
├── next.config.ts      # Next.js config
├── tsconfig.json       # TypeScript config
├── tailwind.config.ts  # Tailwind config
├── src/
│   ├── app/           # App Router pages & layouts
│   ├── api/           # API routes
│   ├── components/    # React components
│   ├── models/        # MongoDB schemas
│   ├── lib/           # Utilities & DB connection
│   ├── types/         # TypeScript types
│   └── utils/         # Helper functions
└── public/            # Static files
```

---

## Key Files to Know

| File | Purpose |
|------|---------|
| `src/lib/db.ts` | MongoDB connection |
| `src/models/Blog.ts` | Blog schema & model |
| `src/models/User.ts` | User schema & model |
| `src/utils/auth.ts` | JWT & password utilities |
| `src/app/api/blogs/route.ts` | Blog API endpoints |
| `src/app/api/auth/login/route.ts` | Login endpoint |
| `src/app/admin/page.tsx` | Admin dashboard |
| `src/app/page-content.tsx` | Homepage |

---

## Common Commands

```bash
# Development
npm run dev              # Start dev server
npm run build           # Build for production
npm start               # Start production server
npm run lint            # Check code quality

# Database
npm run db:seed         # Seed database (if implemented)
npm run db:reset        # Reset database (if implemented)
```

---

## Connecting to MongoDB Atlas Step-by-Step

1. **Create Account**
   - Go to [mongodb.com](https://mongodb.com)
   - Click "Sign Up"
   - Fill in details

2. **Create Cluster**
   - Choose "Shared" (free)
   - Select region close to you
   - Click "Create Cluster"
   - Wait for cluster to deploy (2-3 minutes)

3. **Create Database User**
   - Go to "Database Access"
   - Click "Add New Database User"
   - Username: `blog_admin`
   - Password: Generate secure password
   - Click "Add User"

4. **Get Connection String**
   - Go to "Clusters" → Click "Connect"
   - Choose "Connect your application"
   - Copy connection string
   - Replace `<password>` with your database password
   - Replace `myFirstDatabase` with `blog_db`

5. **Update .env.local**
   ```env
   MONGODB_URI=mongodb+srv://blog_admin:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/blog_db?retryWrites=true&w=majority
   JWT_SECRET=use-a-random-string-here-at-least-32-characters-long
   NEXT_PUBLIC_API_URL=http://localhost:3000
   ```

6. **Whitelist Your IP**
   - Go to "Network Access"
   - Click "Add IP Address"
   - Click "Add Current IP Address"
   - Click "Confirm"

---

## Testing the API

### Using curl or Postman

**Register Admin**
```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@example.com",
    "password": "password123"
  }'
```

**Login**
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@example.com",
    "password": "password123"
  }'
```

**Create Blog (with token)**
```bash
curl -X POST http://localhost:3000/api/blogs \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "title": "My Blog Post",
    "content": "<p>Hello World</p>",
    "image": "https://via.placeholder.com/800x400",
    "author": "John Doe",
    "tags": ["tech", "nextjs"]
  }'
```

**Get All Blogs**
```bash
curl http://localhost:3000/api/blogs
```

**Get Single Blog**
```bash
curl http://localhost:3000/api/blogs/my-blog-post
```

---

## Deployment Checklist

- [ ] Create MongoDB Atlas cluster
- [ ] Set strong JWT_SECRET (32+ characters)
- [ ] Test all API endpoints locally
- [ ] Create test admin account
- [ ] Test blog creation, edit, delete
- [ ] Test blog viewing on homepage
- [ ] Check responsive design on mobile
- [ ] Update NEXT_PUBLIC_API_URL for production
- [ ] Push to GitHub
- [ ] Connect GitHub to Vercel
- [ ] Set environment variables in Vercel
- [ ] Deploy and test production site

---

## Environment Variables Reference

```env
# REQUIRED
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/blog_db?retryWrites=true&w=majority
JWT_SECRET=your-secret-key-at-least-32-characters-long-change-in-production
NEXT_PUBLIC_API_URL=http://localhost:3000

# OPTIONAL (for future features)
# CLOUDINARY_CLOUD_NAME=your_cloudinary_name
# CLOUDINARY_API_KEY=your_api_key
# CLOUDINARY_API_SECRET=your_api_secret
```

---

## Troubleshooting Quick Fixes

**Can't connect to MongoDB?**
- Check MONGODB_URI is correct
- Verify IP is whitelisted in MongoDB Atlas
- Ensure database user password is correct

**Login not working?**
- Check JWT_SECRET is set in .env.local
- Clear browser localStorage
- Check if database has users collection

**Blog not showing?**
- Ensure MongoDB is connected
- Check console for errors (F12)
- Try creating a new blog

**Build fails?**
```bash
# Clean cache and rebuild
rm -rf .next node_modules package-lock.json
npm install
npm run build
```

---

## Next Steps After Setup

1. ✅ Create a few test blogs
2. ✅ Customize colors in Tailwind config
3. ✅ Update site title/description in metadata
4. ✅ Add your logo/branding
5. ✅ Set up GitHub repository
6. ✅ Deploy to Vercel
7. ✅ Set up custom domain
8. ✅ Configure analytics

---

## Support Resources

- Next.js Docs: https://nextjs.org/docs
- MongoDB Docs: https://docs.mongodb.com
- Tailwind CSS: https://tailwindcss.com/docs
- TypeScript: https://www.typescriptlang.org/docs
- Vercel Deployment: https://vercel.com/docs

---

**You're all set! Start the dev server and create your first blog post! 🚀**
