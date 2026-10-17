import React, { useState } from 'react';
import { 
  X, 
  ShieldAlert, 
  ShieldCheck, 
  Mail, 
  Lock, 
  User, 
  Building, 
  ArrowRight, 
  AlertCircle,
  Sparkles,
  Home
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { HostelBlock } from '../../types';

export const AuthModal: React.FC = () => {
  const { 
    isAuthModalOpen, 
    closeAuthModal, 
    authModalMode, 
    switchAuthModalMode, 
    login, 
    register, 
    authError, 
    clearAuthError,
    isLoading 
  } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [hostelBlock, setHostelBlock] = useState<HostelBlock>('OBH-1');
  const [roomNumber, setRoomNumber] = useState('');
  const [domainWarning, setDomainWarning] = useState<string | null>(null);

  if (!isAuthModalOpen) return null;

  // Real-time domain validation feedback
  const handleEmailChange = (val: string) => {
    setEmail(val);
    clearAuthError();

    const lower = val.trim().toLowerCase();
    if (lower.includes('@') && !lower.endsWith('@aitpune.edu.in')) {
      const parts = lower.split('@');
      if (parts[1].length > 3) {
        setDomainWarning(`⚠️ Invalid Domain (@${parts[1]}): Registration is strictly locked to "@aitpune.edu.in".`);
      }
    } else {
      setDomainWarning(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setDomainWarning(null);

    const lower = email.trim().toLowerCase();
    if (!lower.endsWith('@aitpune.edu.in')) {
      setDomainWarning('Access Denied: You must use your official Army Institute of Technology student email address ending with "@aitpune.edu.in".');
      return;
    }

    try {
      if (authModalMode === 'login') {
        await login(email, password);
      } else {
        await register(email, password, name, hostelBlock, roomNumber);
      }
    } catch (err) {
      // Error handled in AuthContext
    }
  };

  const fillQuickDemo = (demoEmail: string, demoName: string, demoHostel: HostelBlock) => {
    setEmail(demoEmail);
    setPassword('password123');
    setName(demoName);
    setHostelBlock(demoHostel);
    setDomainWarning(null);
    clearAuthError();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Ribbon */}
        <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-blue-600 px-6 py-5 text-white relative">
          <button
            onClick={closeAuthModal}
            className="absolute right-4 top-4 p-1 rounded-full text-white/80 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 mb-1.5">
            <span className="px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-widest bg-white/20 rounded-md backdrop-blur-sm">
              AIT Pune Gatekeeper
            </span>
          </div>

          <h3 className="text-xl font-extrabold tracking-tight">
            {authModalMode === 'login' ? 'Welcome Back to CampuSync' : 'Create Verified Student Account'}
          </h3>
          <p className="text-xs text-blue-100 mt-1">
            {authModalMode === 'login' 
              ? 'Log in to rent equipment, trade skills, and chat with peers.'
              : 'Sign up with your @aitpune.edu.in email address to get started.'}
          </p>
        </div>

        {/* Modal Body Form */}
        <div className="p-6">
          
          {/* Error Banner */}
          {(authError || domainWarning) && (
            <div className="mb-4 p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-start gap-2.5 animate-in slide-in-from-top-1">
              <ShieldAlert className="w-4 h-4 text-rose-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-bold">Access Restriction</p>
                <p className="mt-0.5 leading-relaxed">{domainWarning || authError}</p>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-3.5">
            
            {/* Registration specific fields */}
            {authModalMode === 'register' && (
              <>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Full Name
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      required
                      placeholder="e.g., Aarav Sharma"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 text-xs text-slate-900 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2.5">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Hostel / Residence
                    </label>
                    <div className="relative">
                      <Building className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                      <select
                        value={hostelBlock}
                        onChange={(e) => setHostelBlock(e.target.value as HostelBlock)}
                        className="w-full pl-9 pr-3 py-2 text-xs text-slate-900 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-blue-500 outline-none transition-all appearance-none font-medium"
                      >
                        <option value="OBH-1">OBH-1</option>
                        <option value="OBH-2">OBH-2</option>
                        <option value="OBH-3">OBH-3</option>
                        <option value="NBH-1">NBH-1</option>
                        <option value="NBH-2">NBH-2</option>
                        <option value="GH-1">GH-1</option>
                        <option value="GH-2">GH-2</option>
                        <option value="Day Scholar">Day Scholar</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Room No. (Optional)
                    </label>
                    <div className="relative">
                      <Home className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        placeholder="e.g. 214"
                        value={roomNumber}
                        onChange={(e) => setRoomNumber(e.target.value)}
                        className="w-full pl-9 pr-3 py-2 text-xs text-slate-900 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-blue-500 outline-none transition-all"
                      />
                    </div>
                  </div>
                </div>
              </>
            )}

            {/* Email Field with Strict Domain Hint */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs font-bold text-slate-700">
                  AIT Pune Email Address
                </label>
                <span className="text-[10px] font-semibold text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded">
                  @aitpune.edu.in required
                </span>
              </div>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  placeholder="e.g., yourname.comp24@aitpune.edu.in"
                  value={email}
                  onChange={(e) => handleEmailChange(e.target.value)}
                  className={`w-full pl-9 pr-3 py-2 text-xs text-slate-900 bg-slate-50 border rounded-xl focus:bg-white outline-none transition-all ${
                    domainWarning ? 'border-rose-400 focus:border-rose-500' : 'border-slate-200 focus:border-blue-500'
                  }`}
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  placeholder="At least 6 characters"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-xs text-slate-900 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-blue-500 outline-none transition-all"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full mt-2 py-2.5 px-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-xs font-bold rounded-xl shadow-md shadow-blue-600/20 active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isLoading ? (
                <span>Validating Campus Credentials...</span>
              ) : (
                <>
                  <span>{authModalMode === 'login' ? 'Sign In to Campus Portal' : 'Register with @aitpune.edu.in'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </>
              )}
            </button>

          </form>

          {/* Quick Demo Credentials for One-Click Evaluation */}
          <div className="mt-5 pt-4 border-t border-slate-100">
            <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2 text-center">
              Quick Test Accounts (AIT Pune)
            </p>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => fillQuickDemo('aarav.comp23@aitpune.edu.in', 'Aarav Sharma', 'OBH-2')}
                className="p-2 text-left bg-slate-50 hover:bg-blue-50 hover:border-blue-200 border border-slate-200 rounded-xl transition-all"
              >
                <p className="text-xs font-bold text-slate-800">Aarav (OBH-2)</p>
                <p className="text-[10px] text-slate-500 truncate">aarav.comp23@aitpune.edu.in</p>
              </button>
              <button
                type="button"
                onClick={() => fillQuickDemo('priya.it24@aitpune.edu.in', 'Priya Deshmukh', 'GH-1')}
                className="p-2 text-left bg-slate-50 hover:bg-blue-50 hover:border-blue-200 border border-slate-200 rounded-xl transition-all"
              >
                <p className="text-xs font-bold text-slate-800">Priya (GH-1)</p>
                <p className="text-[10px] text-slate-500 truncate">priya.it24@aitpune.edu.in</p>
              </button>
            </div>
          </div>

          {/* Switch Mode Footer */}
          <div className="mt-4 text-center">
            {authModalMode === 'login' ? (
              <p className="text-xs text-slate-600">
                New AIT student?{' '}
                <button
                  type="button"
                  onClick={() => switchAuthModalMode('register')}
                  className="font-bold text-blue-600 hover:text-blue-700 hover:underline"
                >
                  Create account
                </button>
              </p>
            ) : (
              <p className="text-xs text-slate-600">
                Already registered?{' '}
                <button
                  type="button"
                  onClick={() => switchAuthModalMode('login')}
                  className="font-bold text-blue-600 hover:text-blue-700 hover:underline"
                >
                  Log in here
                </button>
              </p>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};
