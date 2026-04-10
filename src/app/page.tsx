import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'DIDM BLOG - Delhi Institute Of Digital Marketing',
  description: 'Expert insights, trends, and tutorials on Digital Marketing from Delhi Institute of Digital Marketing (DIDM).',
};

import HomePage from './page-content';

export default function Home() {
  return <HomePage />;
}
