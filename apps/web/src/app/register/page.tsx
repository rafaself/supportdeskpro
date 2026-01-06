"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Mail, Lock, Eye, EyeOff, User } from "lucide-react";
import logoImg from "../../assets/logo-name-support-desk.png";

export default function RegisterPage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Register attempt:", {
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
    });
    // Add registration logic here
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
            {/* First name */}
            <div className="relative group flex-1">
              <label htmlFor="first-name" className="sr-only">
                First Name
              </label>
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none z-20">
                <User
                  className="h-5 w-5 text-slate-500 group-focus-within:text-primary transition-colors"
                  aria-hidden="true"
                />
              </div>
              <input
                id="first-name"
                name="first-name"
                type="text"
                required
                className="relative block w-full rounded-md border border-slate-400 pl-10 px-3 py-2 text-slate-900 placeholder-slate-500 focus:z-10 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary sm:text-sm bg-white transition-all"
                placeholder="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>

            {/* Last name */}
            <div className="relative group flex-1">
              <label htmlFor="last-name" className="sr-only">
                Last Name
              </label>
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none z-20">
                <User
                  className="h-5 w-5 text-slate-500 group-focus-within:text-primary transition-colors"
                  aria-hidden="true"
                />
              </div>
              <input
                id="last-name"
                name="last-name"
                type="text"
                required
                className="relative block w-full rounded-md border border-slate-400 pl-10 px-3 py-2 text-slate-900 placeholder-slate-500 focus:z-10 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary sm:text-sm bg-white transition-all"
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>

            {/* Email Input */}
            <div className="relative group">
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none z-20">
                <Mail
                  className="h-5 w-5 text-slate-500 group-focus-within:text-primary transition-colors"
                  aria-hidden="true"
                />
              </div>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="relative block w-full rounded-md border border-slate-400 pl-10 px-3 py-2 text-slate-900 placeholder-slate-500 focus:z-10 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary sm:text-sm bg-white transition-all"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {/* Password Input */}
            <div className="relative group">
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none z-20">
                <Lock
                  className="h-5 w-5 text-slate-500 group-focus-within:text-primary transition-colors"
                  aria-hidden="true"
                />
              </div>
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                autoComplete="new-password"
                required
                className="relative block w-full rounded-md border border-slate-400 pl-10 pr-10 px-3 py-2 text-slate-900 placeholder-slate-500 focus:z-10 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary sm:text-sm bg-white transition-all"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer text-slate-500 hover:text-primary z-20 transition-colors"
                onClick={(e) => {
                  e.preventDefault();
                  setShowPassword(!showPassword);
                }}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5" aria-hidden="true" />
                ) : (
                  <Eye className="h-5 w-5" aria-hidden="true" />
                )}
              </button>
            </div>

            {/* Confirm Password Input */}
            <div className="relative group">
              <label htmlFor="confirm-password" className="sr-only">
                Confirm Password
              </label>
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none z-20">
                <Lock
                  className="h-5 w-5 text-slate-500 group-focus-within:text-primary transition-colors"
                  aria-hidden="true"
                />
              </div>
              <input
                id="confirm-password"
                name="confirm-password"
                type={showConfirmPassword ? "text" : "password"}
                autoComplete="new-password"
                required
                className="relative block w-full rounded-md border border-slate-400 pl-10 pr-10 px-3 py-2 text-slate-900 placeholder-slate-500 focus:z-10 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary sm:text-sm bg-white transition-all"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer text-slate-500 hover:text-primary z-20 transition-colors"
                onClick={(e) => {
                  e.preventDefault();
                  setShowConfirmPassword(!showConfirmPassword);
                }}
                aria-label={
                  showConfirmPassword ? "Hide password" : "Show password"
                }
              >
                {showConfirmPassword ? (
                  <EyeOff className="h-5 w-5" aria-hidden="true" />
                ) : (
                  <Eye className="h-5 w-5" aria-hidden="true" />
                )}
              </button>
            </div>
          </div>

          <div className="space-y-4">
            <button
              type="submit"
              className="group relative flex w-full justify-center rounded-md border border-transparent bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-all cursor-pointer"
            >
              Sign up
            </button>

            <div className="text-center text-sm">
              <span className="text-slate-500">Already have an account? </span>
              <Link
                href="/login"
                className="font-medium text-primary hover:underline transition-colors"
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
