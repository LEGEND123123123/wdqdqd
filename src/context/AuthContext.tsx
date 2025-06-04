import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { User } from '../types';
import { supabase } from '../lib/supabase';

interface AuthContextType {
  user: User | null;
  isLoggedIn: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string, phone: string) => Promise<boolean>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const isLoggedIn = user !== null;

  useEffect(() => {
    // Check active session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        fetchUserProfile(session.user.id);
      }
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        fetchUserProfile(session.user.id);
      } else {
        setUser(null);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const fetchUserProfile = async (userId: string) => {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', userId)
      .single();

    if (error) {
      console.error('Error fetching user profile:', error);
      return;
    }

    if (data) {
      setUser({
        id: data.id,
        name: data.name,
        email: data.email,
        phone: data.phone,
        balance: data.balance,
        joinedAt: new Date(data.created_at),
        avatar: data.avatar_url
      });
    }
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      return !error;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  const register = async (
    name: string,
    email: string,
    password: string,
    phone: string
  ): Promise<boolean> => {
    try {
      const { data: { user: authUser }, error: signUpError } = await supabase.auth.signUp({
        email,
        password
      });

      if (signUpError || !authUser) {
        throw signUpError || new Error('Registration failed');
      }

      // Create user profile
      const { error: profileError } = await supabase
        .from('users')
        .insert([
          {
            id: authUser.id,
            name,
            email,
            phone,
            balance: 2 // New users start with 2 hours
          }
        ]);

      if (profileError) {
        throw profileError;
      }

      return true;
    } catch (error) {
      console.error('Registration error:', error);
      return false;
    }
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  const value = {
    user,
    isLoggedIn,
    login,
    register,
    logout
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};