import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Blog from '@/models/Blog';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    await dbConnect();
    const { slug } = await params;

    const blog = await Blog.findOne({ slug });
    if (!blog) {
      return NextResponse.json(
        { success: false, message: 'Blog not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: blog }, { status: 200 });
  } catch (error) {
    console.error('Get blog error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch blog' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    await dbConnect();
    const { slug } = await params;

    const body = await request.json();
    const { title, description, content, image, author, tags, isFeatured } = body;

    // Find and update blog
    const updatedBlog = await Blog.findOneAndUpdate(
      { slug },
      {
        title: title || undefined,
        description: description || undefined,
        content: content || undefined,
        image: image || undefined,
        author: author || undefined,
        tags: tags || undefined,
        isFeatured: isFeatured !== undefined ? isFeatured : undefined,
      },
      { new: true, runValidators: true }
    );

    if (!updatedBlog) {
      return NextResponse.json(
        { success: false, message: 'Blog not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, data: updatedBlog, message: 'Blog updated successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Update blog error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to update blog' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    await dbConnect();
    const { slug } = await params;

    const deletedBlog = await Blog.findOneAndDelete({ slug });

    if (!deletedBlog) {
      return NextResponse.json(
        { success: false, message: 'Blog not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, message: 'Blog deleted successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Delete blog error:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to delete blog' },
      { status: 500 }
    );
  }
}
