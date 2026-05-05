"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { ReactNode } from "react";
import { loadLocalStorage, removeLocalStorage, saveLocalStorage } from "@/lib/storage";

type User = {
  id?: string;
  name: string;
  email: string;
  phone?: string;
  address?: string;
  city?: string;
  district?: string;
  ward?: string;
  postalCode?: string;
  avatar?: string;
};

type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  login: (user: User) => void;
  logout: () => void;
  updateUser: (updates: Partial<User>) => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);
const AUTH_USER_KEY = "monshoes-auth-user";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = loadLocalStorage<User | null>(AUTH_USER_KEY, null);
    if (storedUser) setUser(storedUser);
  }, []);

  useEffect(() => {
    if (user) {
      saveLocalStorage(AUTH_USER_KEY, user);
    } else {
      removeLocalStorage(AUTH_USER_KEY);
    }
  }, [user]);

  const value = useMemo(
    () => ({
      user,
      isAuthenticated: Boolean(user),
      login: (nextUser: User) => setUser(nextUser),
      updateUser: (updates: Partial<User>) => {
        if (user) {
          setUser({ ...user, ...updates });
        }
      },
      logout: () => setUser(null),
    }),
    [user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}
