# API Documentation

## Base URL
```
Development: http://localhost:3000
Production: https://yourdomain.com
```

## Authentication

All protected endpoints require a Bearer token in the Authorization header:
```
Authorization: Bearer <token>
```

Get a token by logging in via `/api/auth/login` endpoint.

---

## Authentication Endpoints

### POST /api/auth/register
Create a new admin account.

**Request:**
```json
{
  "email": "admin@example.com",
  "password": "securepassword123"
}
```

**Response (Success - 201):**
```json
{
  "success": true,
  "message": "Registration successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Response (Error):**
```json
{
  "success": false,
  "message": "User already exists"
}
```

**Status Codes:**
- `201` - Registration successful
- `400` - Validation error or user exists
- `500` - Server error

---

### POST /api/auth/login
Login to admin account.

**Request:**
```json
{
  "email": "admin@example.com",
  "password": "securepassword123"
}
```

**Response (Success - 200):**
```json
{
  "success": true,
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Response (Error):**
```json
{
  "success": false,
  "message": "Invalid credentials"
}
```

**Status Codes:**
- `200` - Login successful
- `400` - Missing fields
- `401` - Invalid credentials
- `500` - Server error

---

## Blog Endpoints

### GET /api/blogs
Get all blog posts (public - no auth required).

**Query Parameters:**
- None currently (pagination can be added)

**Response (Success - 200):**
```json
{
  "success": true,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "title": "My First Blog",
      "slug": "my-first-blog",
      "content": "<p>Blog content here</p>",
      "image": "https://example.com/image.jpg",
      "author": "John Doe",
      "tags": ["tech", "blogging"],
      "createdAt": "2024-03-24T10:30:00.000Z",
      "updatedAt": "2024-03-24T10:30:00.000Z"
    }
  ]
}
```

**Status Codes:**
- `200` - Success
- `500` - Server error

---

### GET /api/blogs/:slug
Get a single blog post by slug (public - no auth required).

**URL Parameters:**
- `slug` (required): The blog post slug (e.g., "my-first-blog")

**Response (Success - 200):**
```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "title": "My First Blog",
    "slug": "my-first-blog",
    "content": "<p>Blog content here</p>",
    "image": "https://example.com/image.jpg",
    "author": "John Doe",
    "tags": ["tech", "blogging"],
    "createdAt": "2024-03-24T10:30:00.000Z",
    "updatedAt": "2024-03-24T10:30:00.000Z"
  }
}
```

**Response (Not Found - 404):**
```json
{
  "success": false,
  "message": "Blog not found"
}
```

**Status Codes:**
- `200` - Success
- `404` - Blog not found
- `500` - Server error

---

### POST /api/blogs
Create a new blog post (protected - requires auth).

**Headers:**
```
Authorization: Bearer <token>
Content-Type: application/json
```

**Request:**
```json
{
  "title": "My Blog Post",
  "content": "<p>This is the blog content</p>",
  "image": "https://example.com/image.jpg",
  "author": "John Doe",
  "tags": ["tech", "nextjs", "mongodb"]
}
```

**Response (Success - 201):**
```json
{
  "success": true,
  "message": "Blog created successfully",
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "title": "My Blog Post",
    "slug": "my-blog-post",
    "content": "<p>This is the blog content</p>",
    "image": "https://example.com/image.jpg",
    "author": "John Doe",
    "tags": ["tech", "nextjs", "mongodb"],
    "createdAt": "2024-03-24T10:30:00.000Z",
    "updatedAt": "2024-03-24T10:30:00.000Z"
  }
}
```

**Response Errors:**
```json
{
  "success": false,
  "message": "Unauthorized"
}
```

or

```json
{
  "success": false,
  "message": "Missing required fields"
}
```

or

```json
{
  "success": false,
  "message": "A blog with this title already exists"
}
```

**Status Codes:**
- `201` - Blog created
- `400` - Validation error
- `401` - Unauthorized
- `500` - Server error

---

### PUT /api/blogs/:slug
Update an existing blog (protected - requires auth).

**Headers:**
```
Authorization: Bearer <token>
Content-Type: application/json
```

**URL Parameters:**
- `slug` (required): The blog post slug

**Request:**
```json
{
  "title": "Updated Blog Post",
  "content": "<p>Updated content</p>",
  "image": "https://example.com/new-image.jpg",
  "author": "Jane Doe",
  "tags": ["tech", "updated"]
}
```

**Note:** All fields are optional. Only provided fields will be updated.

**Response (Success - 200):**
```json
{
  "success": true,
  "message": "Blog updated successfully",
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "title": "Updated Blog Post",
    "slug": "my-blog-post",
    "content": "<p>Updated content</p>",
    "image": "https://example.com/new-image.jpg",
    "author": "Jane Doe",
    "tags": ["tech", "updated"],
    "createdAt": "2024-03-24T10:30:00.000Z",
    "updatedAt": "2024-03-24T11:00:00.000Z"
  }
}
```

**Status Codes:**
- `200` - Success
- `401` - Unauthorized
- `404` - Blog not found
- `500` - Server error

---

### DELETE /api/blogs/:slug
Delete a blog post (protected - requires auth).

**Headers:**
```
Authorization: Bearer <token>
```

**URL Parameters:**
- `slug` (required): The blog post slug

**Response (Success - 200):**
```json
{
  "success": true,
  "message": "Blog deleted successfully"
}
```

**Status Codes:**
- `200` - Success
- `401` - Unauthorized
- `404` - Blog not found
- `500` - Server error

---

## Error Handling

All endpoints follow this error format:

```json
{
  "success": false,
  "message": "Error description"
}
```

### HTTP Status Codes

| Code | Meaning |
|------|---------|
| 200 | OK - Request successful |
| 201 | Created - Resource created |
| 400 | Bad Request - Invalid input |
| 401 | Unauthorized - Missing/invalid token |
| 404 | Not Found - Resource not found |
| 500 | Internal Server Error |

---

## Example Usage with curl

### Register
```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@test.com",
    "password": "password123"
  }'
```

### Login
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@test.com",
    "password": "password123"
  }'
```

### Create Blog
```bash
curl -X POST http://localhost:3000/api/blogs \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "title": "My First Blog",
    "content": "<p>Hello World</p>",
    "image": "https://via.placeholder.com/800x400",
    "author": "John Doe",
    "tags": ["tech"]
  }'
```

### Get All Blogs
```bash
curl http://localhost:3000/api/blogs
```

### Get Single Blog
```bash
curl http://localhost:3000/api/blogs/my-first-blog
```

### Update Blog
```bash
curl -X PUT http://localhost:3000/api/blogs/my-first-blog \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "title": "Updated Title"
  }'
```

### Delete Blog
```bash
curl -X DELETE http://localhost:3000/api/blogs/my-first-blog \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

---

## Rate Limiting

Currently, there is no rate limiting implemented. For production deployment, consider adding:
- Rate limiting middleware
- Request validation
- Security headers
- CORS policies

---

## Versioning

Current API Version: v1 (implicit)

Future versions can be implemented using `/api/v2/blogs` pattern.

---

## Pagination (Future)

Future versions will support pagination:
```
GET /api/blogs?page=1&limit=10
```

---

## Filtering & Search (Future)

Future versions will support filtering:
```
GET /api/blogs?search=nextjs&tag=tech&author=John
```

---

## Support

For issues or questions about the API, refer to the main README.md or SETUP.md files.
