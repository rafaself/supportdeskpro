'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Mail, Lock, Eye, EyeOff, User } from 'lucide-react';
import logoImg from '../../assets/logo-name-support-desk.png';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';

export default function RegisterPage() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Register attempt:', { firstName, lastName, email, password, confirmPassword });
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
            Let&apos;s build something great together!
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-4">
            <div className="flex flex-row gap-4">
              <Input
                id="first-name"
                required
                placeholder="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                icon={<User className="h-5 w-5" />}
                className="flex-1"
              />
              <Input
                id="last-name"
                required
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                icon={<User className="h-5 w-5" />}
                className="flex-1"
              />
            </div>

            <Input
              id="email-address"
              type="email"
              autoComplete="email"
              required
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              icon={<Mail className="h-5 w-5" />}
            />

            <Input
              id="password"
              type={showPassword ? 'text' : 'password'}
              autoComplete="new-password"
              required
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              icon={<Lock className="h-5 w-5" />}
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

            <Input
              id="confirm-password"
              type={showConfirmPassword ? 'text' : 'password'}
              autoComplete="new-password"
              required
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              icon={<Lock className="h-5 w-5" />}
              rightElement={
                <button
                  type="button"
                  className="cursor-pointer text-slate-500 hover:text-indigo-600 transition-colors focus:outline-none"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                >
                  {showConfirmPassword ? (
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
              Sign up
            </Button>

            <div className="text-center text-sm">
              <span className="text-slate-500">Already have an account? </span>
              <Link 
                href="/login" 
                className="font-medium text-indigo-600 hover:underline transition-colors"
              >
                Sign in
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}