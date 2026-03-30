import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'BlogHub - Discover Amazing Stories',
  description: 'Read and share amazing blog posts',
};

import HomePage from './page-content';

export default function Home() {
  return <HomePage />;
}
