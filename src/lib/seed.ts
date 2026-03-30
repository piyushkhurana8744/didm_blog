import dbConnect from '@/lib/db';
import Blog from '@/models/Blog';
import User from '@/models/User';
import { hashPassword } from '@/utils/auth';

// Sample blogs data
const sampleBlogs = [
  {
    title: 'Getting Started with Next.js 14',
    content: `
      <h2>Introduction to Next.js 14</h2>
      <p>Next.js 14 is a powerful React framework that makes it easy to build fast, modern web applications.</p>
      <h3>Key Features</h3>
      <ul>
        <li>App Router for simplified routing</li>
        <li>Server Components for better performance</li>
        <li>API Routes for backend functionality</li>
        <li>Built-in image optimization</li>
      </ul>
      <p>Let's dive into building amazing applications with Next.js!</p>
    `,
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&q=80',
    author: 'Sarah Johnson',
    tags: ['nextjs', 'react', 'web-development'],
  },
  {
    title: 'MongoDB for Modern Applications',
    content: `
      <h2>Why MongoDB?</h2>
      <p>MongoDB is a popular NoSQL database that provides flexibility and scalability.</p>
      <h3>Advantages</h3>
      <ul>
        <li>Flexible document structure</li>
        <li>Easy to scale horizontally</li>
        <li>Great for rapid development</li>
        <li>Excellent ecosystem</li>
      </ul>
      <p>Learn how to leverage MongoDB for your next project.</p>
    `,
    image: 'https://images.unsplash.com/photo-1516321318423-f06f70a504f0?w=800&q=80',
    author: 'Michael Chen',
    tags: ['mongodb', 'database', 'backend'],
  },
  {
    title: 'Tailwind CSS: Utility-First Styling',
    content: `
      <h2>What is Tailwind CSS?</h2>
      <p>Tailwind CSS is a utility-first CSS framework that helps you build modern designs without leaving your HTML.</p>
      <h3>Benefits</h3>
      <ul>
        <li>Rapid UI development</li>
        <li>Consistent design system</li>
        <li>Responsive design made easy</li>
        <li>Small bundle size with PurgeCSS</li>
      </ul>
      <p>Master Tailwind CSS and build beautiful interfaces quickly!</p>
    `,
    image: 'https://images.unsplash.com/photo-1516321318423-f06f70a504f0?w=800&q=80',
    author: 'Emma Davis',
    tags: ['css', 'tailwind', 'frontend'],
  },
];

// Sample admin user
const sampleAdmin = {
  email: 'admin@example.com',
  password: 'admin123', // Will be hashed
};

async function seedDatabase() {
  try {
    console.log('Connecting to database...');
    await dbConnect();
    console.log('Database connected!');

    // Check if data already exists
    const blogCount = await Blog.countDocuments();
    if (blogCount > 0) {
      console.log(`Database already has ${blogCount} blogs. Skipping seed.`);
      return;
    }

    // Create blogs
    console.log('Creating sample blogs...');
    for (const blog of sampleBlogs) {
      // Generate slug from title
      const slug = blog.title
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, '')
        .replace(/[\s_]+/g, '-')
        .replace(/^-+|-+$/g, '');

      const newBlog = new Blog({
        ...blog,
        slug,
      });
      await newBlog.save();
    }
    console.log(`✓ Created ${sampleBlogs.length} blogs`);

    // Create admin user
    console.log('Creating sample admin user...');
    const userExists = await User.findOne({ email: sampleAdmin.email });
    if (!userExists) {
      const hashedPassword = await hashPassword(sampleAdmin.password);
      const newUser = new User({
        email: sampleAdmin.email,
        password: hashedPassword,
      });
      await newUser.save();
      console.log(`✓ Created admin user: ${sampleAdmin.email}`);
      console.log(`  Password: ${sampleAdmin.password}`);
    } else {
      console.log('✓ Admin user already exists');
    }

    console.log('\n✓ Database seeding completed!');
    console.log('\nTest Credentials:');
    console.log(`Email: ${sampleAdmin.email}`);
    console.log(`Password: ${sampleAdmin.password}`);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

// Run only when executed directly
if (require.main === module) {
  seedDatabase();
}

export default seedDatabase;
