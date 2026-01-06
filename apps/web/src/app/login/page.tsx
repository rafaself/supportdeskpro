'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import logoImg from '../../assets/logo-name-support-desk.png';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Login attempt:', { email, password });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
      <div className="w-full max-w-md space-y-8 rounded-lg bg-white p-8 shadow-sm border border-slate-100">
        <div className="flex flex-col items-center">
          <div className="py-4">
            <Image
              src={logoImg}
              alt="SupportDesk Pro Logo"
              width={280}
              priority
              className="object-contain h-auto"
            />
          </div>
          <h2 className="text-center text-xl font-medium text-slate-500">
            Welcome back! Ready to help?
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-4">
            <Input
              id="email-address"
              type="email"
              autoComplete="email"
              required
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              icon={<Mail className="h-5 w-5" aria-hidden="true" />}
            />

            <Input
              id="password"
              type={showPassword ? 'text' : 'password'}
              autoComplete="current-password"
              required
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              icon={<Lock className="h-5 w-5" aria-hidden="true" />}
              rightElement={
                <button
                  type="button"
                  className="cursor-pointer text-slate-500 hover:text-indigo-600 transition-colors focus:outline-none"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" aria-hidden="true" />
                  ) : (
                    <Eye className="h-5 w-5" aria-hidden="true" />
                  )}
                </button>
              }
            />
          </div>

          <div className="space-y-4">
            <Button type="submit" className="w-full">
              Sign in
            </Button>

            <div className="text-center text-sm">
              <span className="text-slate-500">Don&apos;t have an account? </span>
              <Link 
                href="/register" 
                className="font-medium text-indigo-600 hover:underline transition-colors"
              >
                Sign up
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}