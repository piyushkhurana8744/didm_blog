# BlogHub - Full-Stack Blog Website

A modern, production-ready full-stack blog website built with Next.js 14, React, MongoDB, and Tailwind CSS.

## Features

### Public Blog Website
- 🏠 Homepage displaying all blog posts
- 📱 Responsive design (mobile & desktop)
- 📖 Full blog detail pages with rich content support
- 🎨 Modern UI with Tailwind CSS
- ⚡ Fast loading with Next.js optimization
- 🔍 SEO-friendly URLs using blog slugs

### Admin Panel
- 🔐 JWT-based authentication system
- 📝 Create, edit, and delete blog posts
- 📊 Admin dashboard with blog management table
- 🏷️ Support for tags and categories
- 🖼️ Image upload support
- 🔒 Protected admin routes

### Backend API
- RESTful API endpoints for complete blog management
- Secure authentication with JWT tokens
- MongoDB integration with Mongoose ORM
- Input validation and error handling
- CORS-ready for multiple frontend support

## Tech Stack

- **Frontend**: Next.js 14+ (App Router), React 18+, TypeScript
- **Styling**: Tailwind CSS
- **Backend**: Next.js API Routes
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT (jsonwebtoken)
- **Password Security**: bcryptjs
- **Notifications**: react-hot-toast

## Project Structure

```
src/
├── app/
│   ├── api/
│   │   ├── auth/
│   │   │   ├── login/route.ts
│   │   │   └── register/route.ts
│   │   └── blogs/
│   │       ├── route.ts
│   │       └── [slug]/route.ts
│   ├── admin/
│   │   ├── page.tsx (Dashboard)
│   │   ├── login/page.tsx (Login)
│   │   ├── create/page.tsx (Create Blog)
│   │   └── edit/[slug]/page.tsx (Edit Blog)
│   ├── blog/
│   │   └── [slug]/page.tsx (Blog Detail)
│   ├── components/
│   │   ├── Header.tsx
│   │   ├── BlogCard.tsx
│   │   ├── BlogForm.tsx
│   │   ├── LoginForm.tsx
│   │   └── ToastProvider.tsx
│   ├── layout.tsx
│   ├── page.tsx (Homepage)
│   └── page-content.tsx
├── lib/
│   └── db.ts (MongoDB connection)
├── models/
│   ├── Blog.ts (Blog schema)
│   └── User.ts (User schema)
├── types/
│   └── index.ts (TypeScript interfaces)
└── utils/
    ├── auth.ts (JWT & password utilities)
    └── helpers.ts (Helper functions)
```

## Database Schema

### Blog Model
```typescript
{
  title: String (required)
  slug: String (required, unique)
  content: String (required)
  image: String (required)
  author: String (required)
  tags: [String] (optional)
  createdAt: Date
  updatedAt: Date
}
```

### User Model
```typescript
{
  email: String (required, unique)
  password: String (required, hashed)
  createdAt: Date
}
```

## API Endpoints

### Authentication
- `POST /api/auth/login` - Admin login
- `POST /api/auth/register` - Admin registration

### Blogs
- `GET /api/blogs` - Get all blogs
- `GET /api/blogs/:slug` - Get single blog by slug
- `POST /api/blogs` - Create blog (requires auth)
- `PUT /api/blogs/:slug` - Update blog (requires auth)
- `DELETE /api/blogs/:slug` - Delete blog (requires auth)

## Getting Started

### Prerequisites
- Node.js 18+ or higher
- npm or yarn package manager
- MongoDB database (local or MongoDB Atlas)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd didm_blog_website
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   ```bash
   cp .env.example .env.local
   ```

   Edit `.env.local` with your actual values:
   ```env
   # MongoDB connection string
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/blog_db?retryWrites=true&w=majority
   
   # JWT secret key (use a strong random string in production)
   JWT_SECRET=your-secure-random-secret-key-here-min-32-chars
   
   # API base URL
   NEXT_PUBLIC_API_URL=http://localhost:3000
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Database Setup

#### Using MongoDB Atlas (Cloud)
1. Visit [mongodb.com/cloud/atlas](https://mongodb.com/cloud/atlas)
2. Create a free account and cluster
3. Get your connection string
4. Update `.env.local` with your MongoDB URI

#### Using Local MongoDB
1. Install MongoDB locally
2. Start MongoDB service
3. Use connection string: `mongodb://localhost:27017/blog_db`

### Create First Admin User

1. Go to [http://localhost:3000/admin/login](http://localhost:3000/admin/login)
2. Click "Register" tab
3. Enter email and password
4. Click Register
5. You'll be logged in automatically

Now you can create, edit, and delete blog posts!

## Usage Guide

### Creating a Blog

1. Login to admin panel at `/admin/login`
2. Click "Create New Blog" on the dashboard
3. Fill in the blog details:
   - **Title**: Blog post title (slug auto-generated)
   - **Author**: Your name or pen name
   - **Featured Image URL**: Link to blog cover image
   - **Tags**: Comma-separated tags (optional)
   - **Content**: Blog content (supports HTML)
4. Click "Create Blog"

### Editing a Blog

1. Go to Admin Dashboard (`/admin`)
2. Find the blog in the table
3. Click "Edit" button
4. Update the content
5. Click "Update Blog"

### Deleting a Blog

1. Go to Admin Dashboard (`/admin`)
2. Find the blog in the table
3. Click "Delete" button
4. Confirm deletion

### Viewing Blogs

1. Visit homepage (`/`) to see all blogs
2. Click "Read More" on any blog card
3. View full blog content
4. Click "Back to all blogs" to return

## Development

### Available Scripts

```bash
# Run development server with hot reload
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run ESLint
npm run lint
```

### Making Changes

- Frontend components are in `src/app/components`
- API routes are in `src/app/api`
- Database models are in `src/models`
- Utilities are in `src/utils`
- Types are in `src/types`

### Adding Custom Styling

The project uses Tailwind CSS. Edit `src/app/globals.css` for global styles or add inline Tailwind classes to components.

## Authentication Flow

1. User registers/logs in with email and password
2. Password is hashed with bcryptjs (10 salt rounds)
3. JWT token is generated and stored in browser localStorage
4. Token is sent in `Authorization: Bearer <token>` header for protected routes
5. Server verifies token before allowing blog creation/editing/deletion

## Image Hosting

Currently, the project uses external image URLs. You can:

- **Option 1**: Use image URLs from any CDN (recommended for quick start)
- **Option 2**: Integrate Cloudinary for image uploads (update BlogForm component)
- **Option 3**: Implement local file upload to `public/` folder

For production, implement proper image upload handling in the BlogForm component.

## Deployment

### Deploy to Vercel

1. Push code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Connect your GitHub repository
4. Add environment variables:
   - `MONGODB_URI`
   - `JWT_SECRET`
   - `NEXT_PUBLIC_API_URL`
5. Deploy

### Deploy MongoDB

Use MongoDB Atlas (cloud) for database:
1. Create free/ paid cluster at [mongodb.com/cloud/atlas](https://mongodb.com/cloud/atlas)
2. Set up network access (IP whitelist)
3. Get connection string
4. Update `MONGODB_URI` in Vercel environment variables

## Environment Variables

```env
# Required
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key_at_least_32_characters_long
NEXT_PUBLIC_API_URL=http://localhost:3000
```

**Security Tips:**
- Keep `.env.local` in `.gitignore` (already configured)
- Use strong, random JWT_SECRET (32+ characters)
- Never commit sensitive data to git
- Use different secrets for development and production
- Rotate JWT_SECRET periodically

## Troubleshooting

### MongoDB Connection Issues
- Check connection string format
- Verify IP whitelist in MongoDB Atlas
- Check database credentials
- Ensure MongoDB network access is enabled

### Authentication Not Working
- Check if JWT_SECRET is set
- Clear browser localStorage and try again
- Check token expiration (currently 7 days)
- Verify email/password combination

### Build Errors
- Delete `.next` folder and rebuild: `rm -rf .next && npm run build`
- Clear node_modules and reinstall: `rm -rf node_modules package-lock.json && npm install`
- Check all environment variables are set

### Styling Issues
- Ensure Tailwind CSS build is running
- Check if globals.css is imported in layout.tsx
- Clear browser cache (Ctrl+Shift+Delete or Cmd+Shift+Delete)

## Performance Optimization

The project includes several optimization features:

- **Image Optimization**: Next.js Image component with lazy loading
- **Code Splitting**: Automatic with Next.js App Router
- **CSS**: Tailwind CSS with PurgeCSS for minimal bundle
- **API Routes**: Server-side rendering where appropriate
- **Caching**: Browser and server-side caching implemented

## Security Features

- ✅ JWT-based authentication
- ✅ Password hashing with bcryptjs
- ✅ Protected API routes
- ✅ Input validation
- ✅ Protected admin routes (client-side + server-side)
- ✅ Secure headers with Next.js

## SEO Features

- 📱 Meta tags for page titles and descriptions
- 📚 Semantic HTML structure
- 🔗 SEO-friendly URLs using slugs
- 📄 Sitemap ready (can be added)
- ⚡ Fast page load times

## Future Enhancements

- [ ] Comments system
- [ ] Blog search and filtering
- [ ] Category/Archive pages
- [ ] Social sharing buttons
- [ ] Email newsletter subscription
- [ ] Reading time estimation
- [ ] Related posts section
- [ ] Dark mode support
- [ ] Analytics integration
- [ ] Image upload to cloud storage
- [ ] Rich text editor (TinyMCE/Quill)
- [ ] Blog series support

## Support & Contributing

For issues or suggestions, please:
1. Check existing documentation
2. Review the troubleshooting section
3. Check environment variables are correctly set
4. Review browser console for errors

## License

This project is provided as-is for educational and commercial use.

## Credits

Built with Next.js, React, MongoDB, and Tailwind CSS.

---

**Happy blogging! 🚀**

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
