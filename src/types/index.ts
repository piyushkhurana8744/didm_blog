export interface Blog {
  _id?: string;
  title: string;
  slug: string;
  description: string;
  content: string;
  image: string;
  author: string;
  tags?: string[];
  isFeatured?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface User {
  _id?: string;
  email: string;
  password: string;
  createdAt?: Date;
}

export interface AuthPayload {
  email: string;
  password: string;
}

export interface AuthResponse {
  token?: string;
  message: string;
  success: boolean;
}
