"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

export default function ForgotPasswordPage() {
  const router = useRouter();
  const { forgotPassword } = useAuth();

  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!email.trim()) {
      setError('Please enter your email address.');
      return;
    }

    setLoading(true);
    try {
      await forgotPassword(email);
      setSuccess('If the email is registered, we have sent a 6-digit password reset code.');
      setTimeout(() => {
        router.push(`/reset-password?email=${encodeURIComponent(email)}`);
      }, 2000);
    } catch (err: unknown) {
      const errMsg = err instanceof Error ? err.message : 'Request failed. Please try again later.';
      setError(errMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#fafafa] flex items-center justify-center pt-24 pb-16 px-4">
      <div className="w-full max-w-md bg-white border border-[#e8dbb4] p-8 md:p-10 shadow-xs relative">
        <div className="absolute top-0 left-0 w-full h-[3px] bg-[#c59b27]"></div>

        <div className="text-center mb-8">
          <span className="text-[#c59b27] text-2xl font-bold select-none leading-none">✳</span>
          <h1 className="font-raleway text-2xl uppercase tracking-widest text-[#111111] mt-2">Reset Password</h1>
          <p className="font-questrial text-xs text-neutral-500 mt-1.5">Enter your email and we&apos;ll send you a password reset code.</p>
        </div>

        {error && (
          <div className="mb-6 p-3 bg-red-50 border-l-2 border-red-500 text-red-700 text-xs font-questrial">
            {error}
          </div>
        )}

        {success && (
          <div className="mb-6 p-3 bg-green-50 border-l-2 border-green-500 text-green-700 text-xs font-questrial">
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
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

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#111111] text-white py-3 px-4 font-questrial text-sm uppercase tracking-widest hover:bg-[#c59b27] transition-colors duration-300 disabled:bg-neutral-400 flex items-center justify-center cursor-pointer"
          >
            {loading ? (
              <span className="inline-block border-2 border-t-transparent border-white rounded-full h-4 w-4 animate-spin"></span>
            ) : (
              'Send Reset Code'
            )}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="font-questrial text-xs text-neutral-500">
            Remember your password?{' '}
            <Link href="/login" className="text-[#c59b27] hover:underline">
              Back to log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
