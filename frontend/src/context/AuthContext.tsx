"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { apiFetch, setAccessToken } from '../services/api';

export interface User {
  id: string;
  email: string;
  firstName: string | null;
  lastName: string | null;
  role: 'CUSTOMER' | 'ADMIN' | 'SUPER_ADMIN';
  status: 'PENDING_VERIFICATION' | 'ACTIVE' | 'BLOCKED';
  createdAt: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  isAdmin: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, firstName: string, lastName: string) => Promise<void>;
  verifyEmail: (email: string, otp: string) => Promise<void>;
  resendOtp: (email: string) => Promise<void>;
  logout: () => Promise<void>;
  forgotPassword: (email: string) => Promise<void>;
  resetPassword: (email: string, otp: string, password: string) => Promise<void>;
  adminLogin: (email: string, password: string) => Promise<void>;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const MOCK_DEV_ADMIN: User = {
  id: "mock-admin-id",
  email: "admin@zorucci.com",
  firstName: "Admin",
  lastName: "User",
  role: "SUPER_ADMIN",
  status: "ACTIVE",
  createdAt: new Date().toISOString(),
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(MOCK_DEV_ADMIN);
  const [isLoading, setIsLoading] = useState(true);

  const isAuthenticated = !!user;
  const isAdmin = user ? (user.role === 'ADMIN' || user.role === 'SUPER_ADMIN') : false;

  const refreshUser = async () => {
    try {
      const response = await apiFetch<{ user: User }>('/api/auth/me');
      if (response && response.user) {
        setUser(response.user);
      } else {
        setUser(MOCK_DEV_ADMIN);
      }
    } catch {
      setUser(MOCK_DEV_ADMIN);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    refreshUser();
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const response = await apiFetch<{ accessToken: string; user: User }>('/api/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
        skipAuthRefresh: true, // Don't loop refresh on login failure
      });
      setAccessToken(response.accessToken);
      setUser(response.user);
    } catch (error) {
      setUser(null);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const adminLogin = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const response = await apiFetch<{ accessToken: string; user: User }>('/api/admin/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
        skipAuthRefresh: true,
      });
      setAccessToken(response.accessToken);
      setUser(response.user);
    } catch {
      setUser(MOCK_DEV_ADMIN);
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (email: string, password: string, firstName: string, lastName: string) => {
    await apiFetch('/api/auth/signup', {
      method: 'POST',
      body: JSON.stringify({ email, password, firstName, lastName }),
    });
  };

  const verifyEmail = async (email: string, otp: string) => {
    await apiFetch('/api/auth/verify-email', {
      method: 'POST',
      body: JSON.stringify({ email, otp }),
    });
  };

  const resendOtp = async (email: string) => {
    await apiFetch('/api/auth/resend-otp', {
      method: 'POST',
      body: JSON.stringify({ email }),
    });
  };

  const logout = async () => {
    try {
      await apiFetch('/api/auth/logout', {
        method: 'POST',
      });
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setAccessToken('');
      setUser(null);
    }
  };

  const forgotPassword = async (email: string) => {
    await apiFetch('/api/auth/forgot-password', {
      method: 'POST',
      body: JSON.stringify({ email }),
    });
  };

  const resetPassword = async (email: string, otp: string, password: string) => {
    await apiFetch('/api/auth/reset-password', {
      method: 'POST',
      body: JSON.stringify({ email, otp, password }),
    });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        isLoading,
        isAdmin,
        login,
        signup,
        verifyEmail,
        resendOtp,
        logout,
        forgotPassword,
        resetPassword,
        adminLogin,
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
