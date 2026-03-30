import { Metadata } from 'next';
import LoginForm from '@/app/components/LoginForm';

export const metadata: Metadata = {
  title: 'Admin Login - BlogHub',
  description: 'Admin login page',
};

export default function LoginPage() {
  return (
    <div className="min-h-[calc(100vh-300px)] flex items-center justify-center">
      <LoginForm />
    </div>
  );
}
