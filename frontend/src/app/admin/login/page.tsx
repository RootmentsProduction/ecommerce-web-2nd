"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

export default function AdminLoginPage() {
  const router = useRouter();
  const { adminLogin, isAdmin, isAuthenticated, isLoading } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // If already logged in as admin, redirect immediately
  useEffect(() => {
    if (!isLoading && isAuthenticated && isAdmin) {
      router.push('/admin/dashboard');
    }
  }, [isAuthenticated, isAdmin, isLoading, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email.trim() || !password.trim()) {
      setError('Please fill in all fields.');
      return;
    }

    setLoading(true);
    try {
      await adminLogin(email, password);
      router.push('/admin/dashboard');
    } catch (err: unknown) {
      const errMsg = err instanceof Error ? err.message : 'Access denied. Invalid admin credentials.';
      setError(errMsg);
    } finally {
      setLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen w-full bg-[#111111] text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#c59b27] mx-auto mb-4"></div>
          <p className="font-sans text-xs uppercase tracking-widest text-neutral-400">Verifying session...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-[#111111] text-white flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-[#161616] border border-[#262626] p-8 md:p-10 shadow-2xl relative">
        <div className="absolute top-0 left-0 w-full h-[3px] bg-[#c59b27]"></div>

        <div className="text-center mb-8">
          <span className="text-[#c59b27] text-2xl font-bold select-none leading-none">✳</span>
          <h1 className="font-raleway text-lg uppercase tracking-widest text-white mt-3 font-semibold">Zorucci Admin</h1>
          <p className="font-sans text-[11px] text-neutral-400 mt-1 uppercase tracking-wider">Management Console Login</p>
        </div>

        {error && (
          <div className="mb-6 p-3 bg-red-950/50 border-l-2 border-red-500 text-red-300 text-xs font-sans">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="email" className="block text-[10px] uppercase tracking-wider text-neutral-400 font-sans mb-1.5 font-semibold">Administrator Email</label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2.5 bg-[#1e1e1e] border border-[#333333] text-sm text-white focus:outline-hidden focus:border-[#c59b27] focus:ring-0 transition-colors placeholder-neutral-600 font-sans"
              placeholder="admin@zorucci.com"
              autoComplete="username"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-[10px] uppercase tracking-wider text-neutral-400 font-sans mb-1.5 font-semibold">Security Password</label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2.5 bg-[#1e1e1e] border border-[#333333] text-sm text-white focus:outline-hidden focus:border-[#c59b27] focus:ring-0 transition-colors placeholder-neutral-600 pr-10 font-sans"
                placeholder="••••••••"
                autoComplete="current-password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-neutral-500 hover:text-neutral-300"
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
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#c59b27] hover:bg-[#a9831e] text-white py-3 px-4 font-sans text-xs uppercase tracking-widest transition-colors duration-300 disabled:bg-neutral-700 flex items-center justify-center font-bold cursor-pointer"
          >
            {loading ? (
              <span className="inline-block border-2 border-t-transparent border-white rounded-full h-4 w-4 animate-spin"></span>
            ) : (
              'Verify & Access'
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
