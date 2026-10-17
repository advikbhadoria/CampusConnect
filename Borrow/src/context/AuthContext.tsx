import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { UserProfile, HostelBlock } from '../types';
import { 
  registerUser, 
  loginUser, 
  logoutUser, 
  validateAITDomain, 
  sendVerificationEmailToUser,
  verifyCurrentEmailLocally,
  getSavedSessionUser,
  subscribeToAuthState 
} from '../services/authService';

interface AuthContextType {
  currentUser: UserProfile | null;
  isAuthenticated: boolean;
  isEmailVerified: boolean;
  isLoading: boolean;
  authError: string | null;
  register: (email: string, password: string, name: string, hostel: HostelBlock, room?: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  verifyEmailNow: () => void;
  resendVerificationEmail: () => Promise<boolean>;
  clearAuthError: () => void;
  isAuthModalOpen: boolean;
  openAuthModal: (mode?: 'login' | 'register') => void;
  closeAuthModal: () => void;
  authModalMode: 'login' | 'register';
  switchAuthModalMode: (mode: 'login' | 'register') => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Default to pre-logged in AIT Student for instant seamless exploratory experience if none saved
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(() => {
    const saved = getSavedSessionUser();
    if (saved) return saved;
    // Default initial student user (Aarav Sharma - AIT Pune)
    return {
      uid: 'user_ait_01',
      name: 'Aarav Sharma',
      email: 'aarav.comp23@aitpune.edu.in',
      hostelBlock: 'OBH-2',
      roomNumber: '214',
      rating: 4.9,
      ratingCount: 18,
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
      createdAt: Date.now() - 1000 * 60 * 60 * 24 * 60,
      isVerified: true,
    };
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const [authModalMode, setAuthModalMode] = useState<'login' | 'register'>('login');

  useEffect(() => {
    const unsubscribe = subscribeToAuthState((profile) => {
      if (profile) {
        setCurrentUser(profile);
      }
    });
    return () => unsubscribe();
  }, []);

  const clearAuthError = () => setAuthError(null);

  const openAuthModal = (mode: 'login' | 'register' = 'login') => {
    setAuthModalMode(mode);
    setAuthError(null);
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
    setAuthError(null);
  };

  const switchAuthModalMode = (mode: 'login' | 'register') => {
    setAuthModalMode(mode);
    setAuthError(null);
  };

  const register = async (
    email: string, 
    password: string, 
    name: string, 
    hostel: HostelBlock, 
    room?: string
  ) => {
    setIsLoading(true);
    setAuthError(null);

    // Strict validation
    const domainCheck = validateAITDomain(email);
    if (!domainCheck.isValid) {
      setIsLoading(false);
      setAuthError(domainCheck.error || 'Invalid AIT email');
      throw new Error(domainCheck.error);
    }

    try {
      const profile = await registerUser(email, password, name, hostel, room);
      setCurrentUser(profile);
      setIsAuthModalOpen(false);
    } catch (err: any) {
      setAuthError(err.message || 'Registration failed');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    setAuthError(null);

    const domainCheck = validateAITDomain(email);
    if (!domainCheck.isValid) {
      setIsLoading(false);
      setAuthError(domainCheck.error || 'Invalid AIT email');
      throw new Error(domainCheck.error);
    }

    try {
      const profile = await loginUser(email, password);
      setCurrentUser(profile);
      setIsAuthModalOpen(false);
    } catch (err: any) {
      setAuthError(err.message || 'Login failed');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setIsLoading(true);
    try {
      await logoutUser();
      setCurrentUser(null);
    } catch (err: any) {
      console.error('Logout error', err);
    } finally {
      setIsLoading(false);
    }
  };

  const verifyEmailNow = () => {
    if (!currentUser) return;
    const updated = verifyCurrentEmailLocally(currentUser.uid);
    if (updated) {
      setCurrentUser(updated);
    } else {
      setCurrentUser({ ...currentUser, isVerified: true });
    }
  };

  const resendVerificationEmail = async (): Promise<boolean> => {
    if (!currentUser) return false;
    return await sendVerificationEmailToUser(currentUser);
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        isAuthenticated: !!currentUser,
        isEmailVerified: currentUser ? currentUser.isVerified : false,
        isLoading,
        authError,
        register,
        login,
        logout,
        verifyEmailNow,
        resendVerificationEmail,
        clearAuthError,
        isAuthModalOpen,
        openAuthModal,
        closeAuthModal,
        authModalMode,
        switchAuthModalMode,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
