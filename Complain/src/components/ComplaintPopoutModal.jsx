import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X, MapPin, Clock, Calendar, ShieldCheck, CheckCircle2, AlertTriangle,
  User, Send, Check, MessageSquare, ExternalLink, Share2, Sparkles, AlertOctagon
} from 'lucide-react';
import OdometerUpvote from './OdometerUpvote';
import { useStore } from '../store/useStore';
import { addUpdate, setStatus } from '../data/complaintsApi';
import { AUTHORITIES } from '../data/authorities';

const TIMELINE_STEPS = [
  { id: 'submitted', label: 'Lodged' },
  { id: 'acknowledged', label: 'Acknowledged' },
  { id: 'in_progress', label: 'In Progress' },
  { id: 'resolved', label: 'Resolved' },
  { id: 'closed', label: 'Verified & Closed' },
];

export default function ComplaintPopoutModal({ complaint, onClose, onRefresh }) {
  const currentRole = useStore(s => s.currentRole);
  const studentId = useStore(s => s.studentId);
  const studentName = useStore(s => s.studentName);
  const navigate = useStore(s => s.navigate);

  const [activeDocket, setActiveDocket] = useState(complaint);
  const [dispatchText, setDispatchText] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [showDisputeInput, setShowDisputeInput] = useState(false);
  const [disputeNote, setDisputeNote] = useState('');
  const [copiedLink, setCopiedLink] = useState(false);

  if (!activeDocket) return null;

  const isResolved = activeDocket.status === 'resolved';
  const isClosed = activeDocket.status === 'closed';
  const currentStepIndex = TIMELINE_STEPS.findIndex(s => s.id === activeDocket.status);

  const isOverdue = !isResolved && !isClosed && activeDocket.sla_deadline &&
                    new Date(activeDocket.sla_deadline).getTime() < Date.now();

  const handleCopyId = () => {
    navigator.clipboard.writeText(`${window.location.origin}/register/c/${activeDocket.id}`);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleAddDispatch = async (e) => {
    e.preventDefault();
    if (!dispatchText.trim()) return;
    setIsSending(true);
    try {
      const author = currentRole === 'student' ? studentName : (AUTHORITIES[currentRole]?.name || currentRole.toUpperCase());
      const updated = await addUpdate(activeDocket.id, {
        author_role: currentRole,
        author_name: author,
        note: dispatchText,
        is_audit: false,
      });
      setActiveDocket({ ...updated });
      setDispatchText('');
      if (onRefresh) onRefresh();
    } catch (err) {
      console.error('Failed to post dispatch', err);
    } finally {
      setIsSending(false);
    }
  };

  const handleConfirmFixed = async (isFixed) => {
    if (isFixed) {
      const updated = await setStatus(activeDocket.id, 'closed', currentRole, 'Student verified and confirmed resolution. Docket officially closed.');
      setActiveDocket({ ...updated });
      if (onRefresh) onRefresh();
    } else {
      setShowDisputeInput(true);
    }
  };

  const handleDisputeSubmit = async () => {
    if (!disputeNote.trim()) return;
    const updated = await setStatus(activeDocket.id, 'in_progress', currentRole, `Student reopened issue: "${disputeNote}"`);
    setActiveDocket({ ...updated });
    setShowDisputeInput(false);
    setDisputeNote('');
    if (onRefresh) onRefresh();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto p-4 sm:p-6 lg:p-8 flex items-center justify-center">
      {/* Frosted Glass Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-md"
      />

      {/* Pop-out Card Container */}
      <motion.div
        layoutId={`card-${activeDocket.id}`}
        initial={{ opacity: 0, scale: 0.92, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.92, y: 20 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full max-w-3xl bg-white/95 backdrop-blur-2xl border border-white/80 rounded-modal shadow-glass-modal overflow-hidden z-10 my-auto text-[#1E2433] font-poppins"
      >
        {/* Decorative Top Accent Glow */}
        <div className="h-1.5 w-full bg-linear-to-r from-ait-maroon via-signal-yellow to-blue-600" />

        {/* Modal Top Bar */}
        <div className="p-6 sm:p-8 pb-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100">
          {/* Student Profile Info */}
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-linear-to-tr from-ait-maroon to-ait-maroon-light text-white flex items-center justify-center font-bold text-lg shadow-md shrink-0">
              {activeDocket.hide_identity ? (
                <ShieldCheck className="w-6 h-6 text-signal-yellow" />
              ) : (
                activeDocket.reporter_name?.charAt(0) || 'C'
              )}
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-base text-slate-900">
                  {activeDocket.hide_identity ? 'Protected Whistleblower' : activeDocket.reporter_name}
                </span>
                {activeDocket.hide_identity ? (
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 text-amber-800 border border-amber-200">
                    Identity Shielded
                  </span>
                ) : (
                  <span className="text-xs text-slate-500 font-medium">
                    Roll: {activeDocket.reporter_roll || 'Cadet'}
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-500 font-medium">
                {activeDocket.reporter_branch || 'Engineering Cadet'} • {activeDocket.reporter_hostel || 'Hostel Campus'}
              </p>
            </div>
          </div>

          {/* Action Tools */}
          <div className="flex items-center gap-2 self-end sm:self-center">
            <button
              type="button"
              onClick={handleCopyId}
              className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors text-xs flex items-center gap-1.5 font-medium"
              title="Share Link"
            >
              <Share2 className="w-4 h-4" />
              {copiedLink ? 'Copied' : 'Share'}
            </button>

            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-900 transition-colors"
              aria-label="Close dialog"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Content */}
        <div className="p-6 sm:p-8 space-y-6 max-h-[72vh] overflow-y-auto">
          {/* Category Tag & Metadata Row */}
          <div className="flex flex-wrap items-center gap-2.5">
            {/* Tag with proper border radius and vibrant modern color */}
            <span className="px-3.5 py-1.5 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200 shadow-xs">
              {activeDocket.category?.toUpperCase() || 'HOSTEL'}
            </span>

            <span className="px-3 py-1.5 rounded-full text-xs font-medium bg-slate-100 text-slate-700 border border-slate-200">
              {activeDocket.location}
            </span>

            <span className="px-3 py-1.5 rounded-full text-xs font-bold font-docket bg-slate-100 text-slate-800 border border-slate-200">
              {activeDocket.id}
            </span>

            {isOverdue && (
              <span className="px-3 py-1.5 rounded-full text-xs font-bold bg-red-50 text-red-700 border border-red-200 flex items-center gap-1">
                <AlertTriangle className="w-3.5 h-3.5" /> SLA Breached
              </span>
            )}
          </div>

          {/* Title of Complaint */}
          <div>
            <h2 className="font-bold text-xl sm:text-2xl text-slate-900 tracking-tight leading-snug">
              {activeDocket.title}
            </h2>
            <div className="flex items-center gap-4 text-xs text-slate-500 mt-2 font-medium">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-blue-600" />
                {new Date(activeDocket.created_at).toLocaleDateString('en-IN', {
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric',
                })}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-blue-600" />
                {new Date(activeDocket.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
              <span className="font-semibold text-slate-700">
                Severity Level: S{activeDocket.severity}/5
              </span>
            </div>
          </div>

          {/* Status Pipeline Timeline */}
          <div className="bg-slate-50/80 p-4 rounded-2xl border border-slate-200/80 space-y-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block">
              Resolution Pipeline Status
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
              {TIMELINE_STEPS.map((step, idx) => {
                const isPassed = idx <= currentStepIndex;
                const isCurrent = idx === currentStepIndex;
                return (
                  <div
                    key={step.id}
                    className={`p-2.5 rounded-xl border text-center transition-all ${
                      isCurrent
                        ? 'bg-blue-600 text-white font-bold border-blue-600 shadow-sm'
                        : isPassed
                        ? 'bg-emerald-50 text-emerald-800 border-emerald-300 font-semibold'
                        : 'bg-white text-slate-400 border-slate-200'
                    }`}
                  >
                    <div className="text-[10px] uppercase opacity-75">Step 0{idx + 1}</div>
                    <div className="text-xs truncate">{step.label}</div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Full Complaint Statement */}
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
              Detailed Grievance
            </span>
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/70 text-slate-800 text-sm leading-relaxed whitespace-pre-wrap font-sans">
              {activeDocket.body}
            </div>
          </div>

          {/* Resolution Confirmation: Actually Fixed? */}
          {isResolved && (
            <motion.div
              initial={{ scale: 0.98, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="p-5 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-3"
            >
              <div className="flex items-center gap-2 text-emerald-800 font-bold text-sm">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                Authority marked this complaint as resolved. Actually fixed?
              </div>
              <p className="text-xs text-emerald-900/80">
                Confirm whether the issue is fully repaired so this docket can be officially certified and closed.
              </p>

              {!showDisputeInput ? (
                <div className="flex items-center gap-3 pt-1">
                  <button
                    type="button"
                    onClick={() => handleConfirmFixed(true)}
                    className="px-4 py-2 rounded-xl bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-700 transition-colors shadow-xs flex items-center gap-1.5"
                  >
                    <Check className="w-4 h-4" /> Yes, Verified & Fixed
                  </button>
                  <button
                    type="button"
                    onClick={() => handleConfirmFixed(false)}
                    className="px-4 py-2 rounded-xl bg-red-600 text-white text-xs font-bold hover:bg-red-700 transition-colors shadow-xs"
                  >
                    No, Problem Still Persists
                  </button>
                </div>
              ) : (
                <div className="space-y-2 pt-2">
                  <input
                    type="text"
                    value={disputeNote}
                    onChange={(e) => setDisputeNote(e.target.value)}
                    placeholder="Describe what is still broken..."
                    className="w-full p-2.5 rounded-xl bg-white border border-slate-300 text-xs text-slate-900 focus:outline-hidden"
                  />
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={handleDisputeSubmit}
                      className="px-3.5 py-1.5 rounded-xl bg-red-600 text-white text-xs font-bold hover:bg-red-700"
                    >
                      Reopen Docket
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowDisputeInput(false)}
                      className="px-3 py-1.5 text-xs text-slate-600 hover:text-slate-900"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          )}

          {/* Official Dispatches & Update History */}
          <div className="space-y-3 pt-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block flex items-center gap-1.5">
              <MessageSquare className="w-4 h-4 text-blue-600" />
              Official Dispatches & Trail ({activeDocket.updates?.length || 0})
            </span>

            <div className="space-y-2.5">
              {(activeDocket.updates || []).map((u) => (
                <div
                  key={u.id}
                  className={`p-3.5 rounded-xl text-xs leading-relaxed border ${
                    u.is_audit
                      ? 'bg-slate-100 border-slate-200 text-slate-600 font-docket'
                      : 'bg-white border-slate-200 text-slate-800'
                  }`}
                >
                  <div className="flex items-center justify-between font-semibold text-slate-900 mb-1">
                    <span>{u.author_name}</span>
                    <span className="text-[10px] text-slate-400 font-normal">
                      {new Date(u.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} • {new Date(u.created_at).toLocaleDateString()}
                    </span>
                  </div>
                  <p>{u.note}</p>
                </div>
              ))}
            </div>

            {/* Quick Dispatch Input */}
            <form onSubmit={handleAddDispatch} className="flex items-center gap-2 pt-2">
              <input
                type="text"
                placeholder={currentRole === 'student' ? 'Add student note...' : `Post official dispatch as ${currentRole.toUpperCase()}...`}
                value={dispatchText}
                onChange={(e) => setDispatchText(e.target.value)}
                className="flex-1 px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:bg-white focus:border-blue-600 focus:outline-hidden"
              />
              <button
                type="submit"
                disabled={isSending || !dispatchText.trim()}
                className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm transition-colors shrink-0"
              >
                <Send className="w-3.5 h-3.5" />
                Post
              </button>
            </form>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-6 bg-slate-50/90 border-t border-slate-100 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500 font-medium">Cadet Support:</span>
            <OdometerUpvote
              complaintId={activeDocket.id}
              initialCount={activeDocket.upvote_count || 0}
              initialHasUpvoted={(activeDocket.upvoted_by || []).includes(studentId)}
              onUpvoteChange={(newCount) => {
                setActiveDocket(prev => ({ ...prev, upvote_count: newCount }));
                if (onRefresh) onRefresh();
              }}
            />
          </div>

          <button
            type="button"
            onClick={() => {
              onClose();
              navigate('detail', activeDocket.id);
            }}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-800 transition-colors"
          >
            Open Dedicated Docket Page <ExternalLink className="w-3.5 h-3.5" />
          </button>
        </div>
      </motion.div>
    </div>
  );
}
