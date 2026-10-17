import React, { useState } from 'react';
import { MailCheck, RefreshCw, CheckCircle2, ShieldAlert, LogOut, ExternalLink } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const VerificationPrompt: React.FC = () => {
  const { currentUser, verifyEmailNow, resendVerificationEmail, logout } = useAuth();
  const [isResending, setIsResending] = useState(false);
  const [resendSuccess, setResendSuccess] = useState(false);

  if (!currentUser || currentUser.isVerified) return null;

  const handleResend = async () => {
    setIsResending(true);
    try {
      await resendVerificationEmail();
      setResendSuccess(true);
      setTimeout(() => setResendSuccess(false), 4000);
    } catch (err) {
      console.error(err);
    } finally {
      setIsResending(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full bg-white rounded-3xl p-8 shadow-2xl border border-slate-200 text-center relative overflow-hidden">
        
        {/* Top Accent Pattern */}
        <div className="absolute top-0 left-0 right-0 h-3 bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600" />

        {/* Big Icon */}
        <div className="w-16 h-16 rounded-2xl bg-amber-50 border border-amber-200 text-amber-600 flex items-center justify-center mx-auto mb-5 shadow-inner">
          <MailCheck className="w-8 h-8" />
        </div>

        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100/80 text-amber-900 text-xs font-bold mb-3">
          <ShieldAlert className="w-3.5 h-3.5 text-amber-700" />
          <span>Institutional Verification Gate</span>
        </div>

        <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight mb-2">
          Verify Your AIT Email
        </h2>

        <p className="text-xs text-slate-600 leading-relaxed mb-6">
          To maintain a safe and closed peer-to-peer network, access to CampusSync is restricted until you verify your official college email:
        </p>

        {/* Email Pill */}
        <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 text-xs font-mono font-bold text-slate-800 break-all mb-6">
          {currentUser.email}
        </div>

        {resendSuccess && (
          <div className="mb-5 p-3 bg-emerald-50 text-emerald-800 text-xs font-medium rounded-xl border border-emerald-200 flex items-center justify-center gap-2 animate-in fade-in">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Verification link sent to your college inbox!</span>
          </div>
        )}

        {/* Action Buttons */}
        <div className="space-y-3">
          
          {/* Instant Local Verification Button */}
          <button
            onClick={verifyEmailNow}
            className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-xs sm:text-sm font-bold rounded-xl shadow-md shadow-blue-600/20 transition-all flex items-center justify-center gap-2 active:scale-95"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>I Have Verified My Email (Enter Portal)</span>
          </button>

          {/* Resend button */}
          <button
            onClick={handleResend}
            disabled={isResending}
            className="w-full py-2.5 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl transition-all flex items-center justify-center gap-2 disabled:opacity-50"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isResending ? 'animate-spin' : ''}`} />
            <span>{isResending ? 'Sending...' : 'Resend Verification Email'}</span>
          </button>

        </div>

        {/* Sign out */}
        <div className="mt-6 pt-5 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <span>Wrong account?</span>
          <button
            onClick={logout}
            className="font-bold text-rose-600 hover:text-rose-700 flex items-center gap-1 hover:underline"
          >
            <LogOut className="w-3.5 h-3.5" /> Sign Out
          </button>
        </div>

      </div>
    </div>
  );
};
