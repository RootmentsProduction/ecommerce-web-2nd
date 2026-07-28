"use client";

import React, { useState, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

function SignupForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams?.get('redirect') || '';

  const { signup } = useAuth();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!firstName.trim() || !lastName.trim()) {
      setError('First and last names are required.');
      return;
    }

    if (password.length < 8) {
      setError('Password must be at least 8 characters long.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setLoading(true);
    try {
      await signup(email, password, firstName, lastName);
      const verifyUrl = redirect 
        ? `/verify-email?email=${encodeURIComponent(email)}&redirect=${encodeURIComponent(redirect)}`
        : `/verify-email?email=${encodeURIComponent(email)}`;
      router.push(verifyUrl);
    } catch (err: unknown) {
      const errMsg = err instanceof Error ? err.message : 'Signup failed. Please try again.';
      setError(errMsg);
    } finally {
      setLoading(false);
    }
  };

  const loginHref = redirect 
    ? `/login?redirect=${encodeURIComponent(redirect)}` 
    : '/login';

  return (
    <div className="min-h-screen bg-[#fafafa] flex items-center justify-center pt-24 pb-16 px-4">
      <div className="w-full max-w-md bg-white border border-[#e8dbb4] p-8 md:p-10 shadow-xs relative">
        <div className="absolute top-0 left-0 w-full h-[3px] bg-[#c59b27]"></div>
        
        <div className="text-center mb-8">
          <span className="text-[#c59b27] text-2xl font-bold select-none leading-none">✳</span>
          <h1 className="font-raleway text-2xl uppercase tracking-widest text-[#111111] mt-2">Create Account</h1>
          <p className="font-questrial text-xs text-neutral-500 mt-1.5">Join Jewelry by Zorucci to explore exclusive collections.</p>
        </div>

        {error && (
          <div className="mb-6 p-3 bg-red-50 border-l-2 border-red-500 text-red-700 text-xs font-questrial">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="firstName" className="block text-[11px] uppercase tracking-wider text-neutral-600 font-questrial mb-1.5">First Name</label>
              <input
                id="firstName"
                type="text"
                required
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full px-3 py-2.5 border border-neutral-200 text-sm font-questrial focus:outline-hidden focus:border-[#c59b27] bg-white transition-colors"
                placeholder="Jane"
              />
            </div>
            <div>
              <label htmlFor="lastName" className="block text-[11px] uppercase tracking-wider text-neutral-600 font-questrial mb-1.5">Last Name</label>
              <input
                id="lastName"
                type="text"
                required
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="w-full px-3 py-2.5 border border-neutral-200 text-sm font-questrial focus:outline-hidden focus:border-[#c59b27] bg-white transition-colors"
                placeholder="Doe"
              />
            </div>
          </div>

          <div>
            <label htmlFor="email" className="block text-[11px] uppercase tracking-wider text-neutral-600 font-questrial mb-1.5">Email Address</label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2.5 border border-neutral-200 text-sm font-questrial focus:outline-hidden focus:border-[#c59b27] bg-white transition-colors"
              placeholder="jane.doe@example.com"
              autoComplete="username"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-[11px] uppercase tracking-wider text-neutral-600 font-questrial mb-1.5">Password</label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2.5 border border-neutral-200 text-sm font-questrial focus:outline-hidden focus:border-[#c59b27] bg-white pr-10 transition-colors"
                placeholder="••••••••"
                autoComplete="new-password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-neutral-400 hover:text-neutral-600"
              >
                {showPassword ? (
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                  </svg>
                ) : (
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                )}
              </button>
            </div>
            <p className="text-[10px] text-neutral-400 mt-1">Minimum 8 characters.</p>
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-[11px] uppercase tracking-wider text-neutral-600 font-questrial mb-1.5">Confirm Password</label>
            <input
              id="confirmPassword"
              type={showPassword ? 'text' : 'password'}
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-3 py-2.5 border border-neutral-200 text-sm font-questrial focus:outline-hidden focus:border-[#c59b27] bg-white pr-10 transition-colors"
              placeholder="••••••••"
              autoComplete="new-password"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#111111] text-white py-3 px-4 font-questrial text-sm uppercase tracking-widest hover:bg-[#c59b27] transition-colors duration-300 disabled:bg-neutral-400 flex items-center justify-center cursor-pointer"
          >
            {loading ? (
              <span className="inline-block border-2 border-t-transparent border-white rounded-full h-4 w-4 animate-spin"></span>
            ) : (
              'Create Account'
            )}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="font-questrial text-xs text-neutral-500">
            Already have an account?{' '}
            <Link href={loginHref} className="text-[#c59b27] hover:underline">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default function SignupPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#fafafa] flex items-center justify-center pt-24">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#c59b27]"></div>
      </div>
    }>
      <SignupForm />
    </Suspense>
  );
}
