import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Blog from '@/models/Blog';
import { verifyToken, getTokenFromHeader } from '@/utils/auth';
import { generateSlug } from '@/utils/helpers';
import { Blog as BlogType } from '@/types';

// GET all blogs
export async function GET(request: NextRequest) {
  try {
    await dbConnect();
    
    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search');
    const tag = searchParams.get('tag');
    const isFeatured = searchParams.get('isFeatured');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    
    let query: any = {};
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }
    if (tag) {
      query.tags = tag;
    }
    if (isFeatured === 'true') {
      query.isFeatured = true;
    }

    const total = await Blog.countDocuments(query);
    const blogs = await Blog.find(query)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit);

    return NextResponse.json({ success: true, data: blogs, total, page, limit }, { status: 200 });
  } catch (error) {
    console.error('Get blogs error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch blogs' },
      { status: 500 }
    );
  }
}

// POST create blog
export async function POST(request: NextRequest) {
  try {
    await dbConnect();

    // Verify authorization
    const token = getTokenFromHeader(request.headers.get('authorization'));
    if (!token || !verifyToken(token)) {
      return NextResponse.json(
        { success: false, message: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { title, description, content, image, author, tags, isFeatured } = body;

    // Validation
    if (!title || !description || !content || !image || !author) {
      return NextResponse.json(
        { success: false, message: 'Missing required fields: title, description, content, image, author' },
        { status: 400 }
      );
    }

    // Generate slug
    const slug = generateSlug(title);

    // Check if slug already exists
    const existingBlog = await Blog.findOne({ slug });
    if (existingBlog) {
      return NextResponse.json(
        { success: false, message: 'A blog with this title already exists' },
        { status: 400 }
      );
    }

    // Create blog
    const newBlog = new Blog({
      title,
      slug,
      description,
      content,
      image,
      author,
      tags: tags || [],
      isFeatured: isFeatured || false,
    });

    await newBlog.save();

    return NextResponse.json(
      { success: true, data: newBlog, message: 'Blog created successfully' },
      { status: 201 }
    );
  } catch (error) {
    console.error('Create blog error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to create blog' },
      { status: 500 }
    );
  }
}
