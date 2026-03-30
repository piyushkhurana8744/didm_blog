# Deployment Guide

This guide covers deploying the BlogHub website to production using Vercel and MongoDB Atlas.

## Prerequisites

- GitHub account
- Vercel account (free)
- MongoDB Atlas account (free)
- Domain name (optional)

## Step-by-Step Deployment

### Step 1: Prepare Your Repository

1. **Initialize Git** (if not already done)
   ```bash
   cd /Users/piyushkhurana/didm_blog_website
   git init
   git add .
   git commit -m "Initial commit: BlogHub project"
   ```

2. **Create GitHub Repository**
   - Go to [github.com/new](https://github.com/new)
   - Enter repository name: `didm-blog-website`
   - Click "Create repository"
   - Follow instructions to push local repository:
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/didm-blog-website.git
   git branch -M main
   git push -u origin main
   ```

### Step 2: Set Up MongoDB Atlas

1. **Create MongoDB Cloud Account**
   - Go to [mongodb.com/cloud/atlas](https://mongodb.com/cloud/atlas)
   - Click "Sign Up Free"
   - Complete registration

2. **Create a Cluster**
   - Click "Create a Deployment"
   - Select "Shared" (free tier)
   - Choose region closest to your users
   - Click "Create"
   - Wait 2-3 minutes for cluster creation

3. **Create Database User**
   - Go to "Database Access"
   - Click "Add New Database User"
   - Username: `blog_admin`
   - Password: Generate strong password (copy it!)
   - Click "Add User"

4. **Configure Network Access**
   - Go to "Network Access"
   - Click "Add IP Address"
   - For development: Select "Add Current IP"
   - For production: Select "Allow All From Anywhere" (0.0.0.0/0)
   - Click "Confirm"

5. **Get Connection String**
   - Go to "Clusters" → Click "Connect"
   - Choose "Connect your application"
   - Select "Node.js" and version
   - Copy connection string
   - Example: `mongodb+srv://blog_admin:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority`
   - Replace `<password>` with your database password
   - Replace `myFirstDatabase` with `blog_db`
   - Final URL: `mongodb+srv://blog_admin:password@cluster0.xxxxx.mongodb.net/blog_db?retryWrites=true&w=majority`

### Step 3: Deploy to Vercel

1. **Create Vercel Account**
   - Go to [vercel.com](https://vercel.com)
   - Click "Sign up"
   - Choose "GitHub" to continue with GitHub account
   - Authorize Vercel to access your GitHub account

2. **Import Project**
   - Click "Add New" → "Project"
   - Search for `didm-blog-website` repository
   - Click "Import"
   - Click "Continue" on configuration page

3. **Set Environment Variables**
   - Scroll to "Environment Variables" section
   - Add the following variables:
   
   ```
   MONGODB_URI = mongodb+srv://blog_admin:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/blog_db?retryWrites=true&w=majority
   JWT_SECRET = your-super-secret-random-string-at-least-32-characters-long
   NEXT_PUBLIC_API_URL = https://your-domain.com
   ```

   Important:
   - Replace `YOUR_PASSWORD` with your MongoDB user password
   - Generate a strong random JWT_SECRET (32+ characters)
   - Set `NEXT_PUBLIC_API_URL` to your production domain

4. **Deploy**
   - Click "Deploy"
   - Wait for deployment to complete (usually 2-5 minutes)
   - You'll get a URL like: `https://didm-blog-website.vercel.app`

5. **Verify Deployment**
   - Click the deployment URL
   - Homepage should load
   - Try accessing `/admin/login`
   - Register a new admin account
   - Create a test blog post

### Step 4: Set Up Custom Domain (Optional)

1. **Add Domain in Vercel**
   - Go to your project settings
   - Click "Domains"
   - Enter your domain name
   - Follow DNS configuration instructions
   - Wait 24 hours for DNS propagation

2. **Update Environment Variable**
   - Go to Settings → Environment Variables
   - Update `NEXT_PUBLIC_API_URL` with your custom domain
   - Redeploy project

### Step 5: Enable Auto-Deployments

Vercel automatically deploys when you push to the main branch:

```bash
# Make changes locally
git add .
git commit -m "Update blog features"
git push origin main

# Deployment starts automatically!
```

## Troubleshooting Deployment

### Build Fails
- Check that all environment variables are set
- Verify MongoDB connection string is correct
- Try rebuilding: Go to project → Deployments → click failing deployment → "Redeploy"

### Database Connection Errors
- Verify MongoDB IP whitelist includes Vercel's IP range
- Check connection string format
- Ensure database password doesn't contain special characters that need escaping

### Login Not Working
- Clear browser cache and cookies
- Verify JWT_SECRET is set and consistent
- Check MongoDB Atlas has the blog_db database

### Images Not Loading
- Ensure image URLs are using HTTPS (http images won't load on HTTPS site)
- Update image URLs in your blog posts

### CORS Issues
- API calls should work since they're same-origin
- Verify Authorization header is being sent correctly

## Database Maintenance

### Backup Your Database
```bash
# In MongoDB Atlas Dashboard:
# 1. Go to Clusters → More → Backup
# 2. Click "Configure" → Enable backup
# 3. Automatic backups will be created daily
```

### Monitor Database Usage
- Go to MongoDB Atlas dashboard
- Check "Metrics" tab for usage stats
- Free tier includes 512MB storage
- Upgrade plan if needed

### Clear Old Data (if needed)
```bash
# Access MongoDB Atlas → Collections
# Select collection → delete documents as needed
```

## Performance Optimization

### Vercel Functions
- Monitor function execution times in Vercel dashboard
- Use Analytics tab to see API response times

### Database Optimization
- MongoDB Atlas provides performance metrics
- Monitor query performance
- Add indexes if needed (done automatically for _id and unique fields)

### Caching
- Next.js automatically caches static pages
- API responses are dynamic (not cached) - can add Redis caching later

## Security Checklist

- [ ] JWT_SECRET is random and 32+ characters
- [ ] MongoDB password is strong (20+ characters with special chars)
- [ ] Vercel environment variables are set to private (default)
- [ ] No credentials in .gitignore files
- [ ] GitHub repository is private (recommended)
- [ ] Regular MongoDB backups are enabled
- [ ] HTTPS is enforced (Vercel does this automatically)

## Monitoring & Logging

### Vercel Analytics
- Go to your project → Analytics tab
- View page load times, error rates
- Monitor API performance

### MongoDB Atlas Monitoring
- Go to Cluster → Metrics
- Monitor connections, operations, storage
- Set up alerts for resource usage

### Error Reporting
Add to `next.config.ts` for better error tracking:

```typescript
// Optional: integrate Sentry for error tracking
// https://sentry.io
```

## Cost Breakdown (as of 2024)

### Free Tier
- **Vercel**: 5 projects, 100GB bandwidth
- **MongoDB Atlas**: 512MB storage, shared cluster
- **Total Cost**: **$0/month**

### Production Scale
- **Vercel**: Pro plan started at $20/month
- **MongoDB Atlas**: M2 cluster ~$57/month (4GB storage)
- **Domain**: $12-15/year
- **Total Cost**: ~$77-100/month (scales with traffic)

## Scaling Considerations

### When to Upgrade
- Vercel: If you exceed 5 projects or need more bandwidth
- MongoDB: If you exceed 512MB storage or need better performance
- Domain: Not affected by traffic

### Upgrade Process
1. **Vercel Pro**: Click "Upgrade" in project settings
2. **MongoDB Paid**: In Atlas dashboard, click "Upgrade cluster"
3. Both have seamless upgrades without downtime

## Rollback Deployment

If something goes wrong:

1. Go to Vercel dashboard
2. Click "Deployments"
3. Find previous working deployment
4. Click "..." → "Promote to Production"
5. Done! Previous version is live again

## CI/CD Pipeline

Current setup:
```
GitHub (push) → Vercel (auto-detects) → Build → Test → Deploy → Live
```

No additional configuration needed - works automatically!

## Next Steps After Deployment

1. ✅ Test all features on production
2. ✅ Set up MongoDB backups
3. ✅ Monitor Vercel analytics
4. ✅ Set up custom domain
5. ✅ Configure email notifications (optional)
6. ✅ Add analytics (Google Analytics)
7. ✅ Set up CDN for images (Cloudinary)
8. ✅ Configure SSL/TLS (auto-configured by Vercel)

## Useful Links

- Vercel Dashboard: https://vercel.com/dashboard
- MongoDB Atlas: https://cloud.mongodb.com
- GitHub Settings: https://github.com/settings
- Deployed Site: https://didm-blog-website.vercel.app (example)

## Support

For deployment issues:
1. Check Vercel build logs
2. Check Vercel function logs
3. Check MongoDB connection in MongoDB Atlas
4. Review error messages in browser console (F12)
5. Check GitHub repo for recent changes

---

**Your blog is now live! 🚀**

Share your deployment URL and start creating content!
