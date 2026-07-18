"use client";

import React, { useState, useEffect, useRef, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

function VerifyEmailForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams?.get('email') || '';

  const { verifyEmail, resendOtp } = useAuth();
  
  const [otp, setOtp] = useState<string[]>(new Array(6).fill(''));
  const [cooldown, setCooldown] = useState(60);
  const isResendDisabled = cooldown > 0;
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (!email) {
      router.push('/login');
    }
  }, [email, router]);

  // Resend Timer Countdown
  useEffect(() => {
    if (cooldown > 0) {
      const timer = setTimeout(() => setCooldown(cooldown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [cooldown]);

  const handleChange = (val: string, index: number) => {
    if (isNaN(Number(val))) return;

    const newOtp = [...otp];
    newOtp[index] = val.substring(val.length - 1);
    setOtp(newOtp);

    // Auto-focus next input
    if (val && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === 'Backspace') {
      const target = e.currentTarget;
      if (!target.value && index > 0) {
        inputRefs.current[index - 1]?.focus();
        const newOtp = [...otp];
        newOtp[index - 1] = '';
        setOtp(newOtp);
      }
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData('text');
    if (!/^\d{6}$/.test(pasteData.trim())) return;

    const digits = pasteData.trim().split('');
    setOtp(digits);
    
    // Focus last input
    inputRefs.current[5]?.focus();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    const otpCode = otp.join('');
    if (otpCode.length !== 6) {
      setError('Please enter all 6 digits.');
      return;
    }

    setLoading(true);
    try {
      await verifyEmail(email, otpCode);
      setSuccess('Your email has been verified successfully. Redirecting to login...');
      setTimeout(() => {
        router.push('/login');
      }, 2000);
    } catch (err: unknown) {
      const errMsg = err instanceof Error ? err.message : 'Verification failed. Please check the code and try again.';
      setError(errMsg);
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    setError('');
    setSuccess('');
    setLoading(true);
    try {
      await resendOtp(email);
      setSuccess('A new verification code has been sent to your email.');
      setCooldown(60);
      setOtp(new Array(6).fill(''));
      inputRefs.current[0]?.focus();
    } catch (err: unknown) {
      const errMsg = err instanceof Error ? err.message : 'Failed to resend code.';
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
          <h1 className="font-raleway text-2xl uppercase tracking-widest text-[#111111] mt-2">Verify Email</h1>
          <p className="font-questrial text-xs text-neutral-500 mt-2">
            We sent a verification code to <br />
            <strong className="text-neutral-800 font-medium">{email}</strong>
          </p>
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

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex justify-between gap-2 max-w-[280px] mx-auto">
            {otp.map((data, index) => (
              <input
                key={index}
                ref={(el) => { inputRefs.current[index] = el; }}
                type="text"
                maxLength={1}
                value={data}
                onChange={(e) => handleChange(e.target.value, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                onPaste={index === 0 ? handlePaste : undefined}
                className="w-10 h-12 md:w-11 md:h-13 text-center border border-neutral-200 text-lg font-questrial focus:outline-hidden focus:border-[#c59b27] transition-colors bg-white"
              />
            ))}
          </div>

          <button
            type="submit"
            disabled={loading || otp.join('').length !== 6}
            className="w-full bg-[#111111] text-white py-3 px-4 font-questrial text-sm uppercase tracking-widest hover:bg-[#c59b27] transition-colors duration-300 disabled:bg-neutral-200 flex items-center justify-center cursor-pointer"
          >
            {loading ? (
              <span className="inline-block border-2 border-t-transparent border-white rounded-full h-4 w-4 animate-spin"></span>
            ) : (
              'Verify Code'
            )}
          </button>
        </form>

        <div className="mt-8 text-center border-t border-neutral-100 pt-6">
          <p className="font-questrial text-xs text-neutral-500">
            Didn&apos;t receive the code?{' '}
            {isResendDisabled ? (
              <span className="text-neutral-400 block sm:inline mt-1 sm:mt-0 font-medium">
                Resend in {cooldown}s
              </span>
            ) : (
              <button
                onClick={handleResend}
                disabled={loading}
                className="text-[#c59b27] font-medium hover:underline hover:text-gold-600 focus:outline-none cursor-pointer"
              >
                Resend Code
              </button>
            )}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function VerifyEmailPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#fafafa] flex items-center justify-center pt-24">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#c59b27]"></div>
      </div>
    }>
      <VerifyEmailForm />
    </Suspense>
  );
}
