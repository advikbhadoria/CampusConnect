import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft, Clock, MapPin, ShieldCheck, CheckCircle2, AlertTriangle,
  Send, MessageSquare, ThumbsUp, Check, X, Shield, FileText, CornerDownRight, Calendar
} from 'lucide-react';
import { getComplaint, addUpdate, setStatus } from '../data/complaintsApi';
import { useStore } from '../store/useStore';
import { CATEGORY_STYLES, STATUS_STYLES } from '../components/NoticeCard';
import OdometerUpvote from '../components/OdometerUpvote';
import { AUTHORITIES } from '../data/authorities';

const TIMELINE_STEPS = [
  { id: 'submitted', label: 'Lodged' },
  { id: 'acknowledged', label: 'Acknowledged' },
  { id: 'in_progress', label: 'In Progress' },
  { id: 'resolved', label: 'Resolved' },
  { id: 'closed', label: 'Verified & Closed' },
];

export default function ComplaintDetail({ complaintId, onBack }) {
  const [complaint, setComplaint] = useState(null);
  const [loading, setLoading] = useState(true);
  const [newNote, setNewNote] = useState('');
  const [isSubmittingNote, setIsSubmittingNote] = useState(false);
  const [disputeNote, setDisputeNote] = useState('');
  const [showDisputeInput, setShowDisputeInput] = useState(false);

  const currentRole = useStore(s => s.currentRole);
  const studentId = useStore(s => s.studentId);
  const studentName = useStore(s => s.studentName);
  const navigate = useStore(s => s.navigate);

  const fetchDocket = async () => {
    setLoading(true);
    try {
      const data = await getComplaint(complaintId, currentRole);
      setComplaint(data);
    } catch (err) {
      console.error('Failed to load docket', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDocket();
  }, [complaintId, currentRole]);

  const handleAddUpdate = async (e) => {
    e.preventDefault();
    if (!newNote.trim()) return;

    setIsSubmittingNote(true);
    try {
      const authorName = currentRole === 'student' ? studentName : (AUTHORITIES[currentRole]?.name || currentRole.toUpperCase());
      const updated = await addUpdate(complaint.id, {
        author_role: currentRole,
        author_name: authorName,
        note: newNote,
        is_audit: false,
      });
      setComplaint({ ...updated });
      setNewNote('');
    } catch (err) {
      console.error('Failed to post dispatch', err);
    } finally {
      setIsSubmittingNote(false);
    }
  };

  const handleConfirmFixed = async (isFixed) => {
    if (isFixed) {
      const updated = await setStatus(complaint.id, 'closed', currentRole, 'Student verified and confirmed resolution. Docket officially closed.');
      setComplaint({ ...updated });
    } else {
      setShowDisputeInput(true);
    }
  };

  const handleDisputeSubmit = async () => {
    if (!disputeNote.trim()) return;
    const updated = await setStatus(
      complaint.id,
      'in_progress',
      currentRole,
      `Student reopened docket: "${disputeNote}"`
    );
    setComplaint({ ...updated });
    setShowDisputeInput(false);
    setDisputeNote('');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F8F9FD] text-[#1E2433] py-16 px-4 flex justify-center items-center font-poppins">
        <div className="text-sm text-slate-500 font-medium animate-pulse">
          Loading Grievance Docket #{complaintId}...
        </div>
      </div>
    );
  }

  if (!complaint) {
    return (
      <div className="min-h-screen bg-[#F8F9FD] text-[#1E2433] py-16 px-4 text-center font-poppins">
        <p className="font-bold text-lg text-slate-800 mb-2">Docket not found or clearance restricted</p>
        <button
          onClick={() => navigate('register')}
          className="text-xs text-blue-600 font-bold underline"
        >
          Return to Notice Board
        </button>
      </div>
    );
  }

  const cat = CATEGORY_STYLES[complaint.category] || CATEGORY_STYLES.infrastructure;
  const statusConfig = STATUS_STYLES[complaint.status] || STATUS_STYLES.submitted;
  const currentStepIndex = TIMELINE_STEPS.findIndex(s => s.id === complaint.status);

  const isOverdue = complaint.status !== 'resolved' &&
                    complaint.status !== 'closed' &&
                    complaint.sla_deadline &&
                    new Date(complaint.sla_deadline).getTime() < Date.now();

  const isResolvedPendingConfirmation = complaint.status === 'resolved';

  return (
    <div className="min-h-screen bg-[#F8F9FD] text-[#1E2433] py-12 px-4 sm:px-6 lg:px-8 font-poppins">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Navigation Bar */}
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={() => onBack ? onBack() : navigate('register')}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-900 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Notice Board
          </button>

          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400 font-medium">DOCKET ID:</span>
            <span className="font-docket font-bold text-sm text-slate-800 bg-white px-3 py-1 rounded-full border border-slate-200 shadow-xs">
              {complaint.id}
            </span>
          </div>
        </div>

        {/* Main Dossier Card: Spacious, Clean & Morphic */}
        <div className="bg-white/90 backdrop-blur-2xl rounded-3xl border border-white/80 shadow-glass-modal p-6 sm:p-10 space-y-7 relative overflow-hidden">
          {/* Header Metadata */}
          <div className="border-b border-slate-100 pb-6 flex flex-col md:flex-row md:items-start justify-between gap-5">
            <div className="space-y-3 max-w-2xl">
              <div className="flex flex-wrap items-center gap-2">
                <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${cat.badge}`}>
                  {cat.label}
                </span>

                <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${statusConfig.style}`}>
                  {statusConfig.label}
                </span>

                <span className="px-3 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-700 border border-slate-200">
                  Severity: S{complaint.severity}/5
                </span>

                {isOverdue && (
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-red-50 text-red-700 border border-red-200 flex items-center gap-1">
                    <AlertTriangle className="w-3.5 h-3.5" /> SLA Breached
                  </span>
                )}
              </div>

              <h1 className="font-extrabold text-2xl sm:text-3xl text-slate-900 tracking-tight leading-snug">
                {complaint.title}
              </h1>

              <div className="flex flex-wrap items-center gap-y-1.5 gap-x-4 text-xs text-slate-500 font-medium">
                <span className="flex items-center gap-1.5 text-slate-700">
                  <MapPin className="w-3.5 h-3.5 text-blue-600" /> {complaint.location}
                </span>
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-blue-600" /> Lodged on {new Date(complaint.created_at).toLocaleDateString()} at {new Date(complaint.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            </div>

            {/* Upvote & Reporter Box */}
            <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-start gap-4 shrink-0">
              <OdometerUpvote
                complaintId={complaint.id}
                initialCount={complaint.upvote_count || 0}
                initialHasUpvoted={(complaint.upvoted_by || []).includes(studentId)}
              />

              <div className="text-right">
                <div className="text-[11px] text-slate-400 font-medium">Cadet Reporter:</div>
                <div className="text-xs font-bold text-slate-900">
                  {complaint.hide_identity ? (
                    <span className="text-amber-700 font-semibold flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5" /> Protected Whistleblower
                    </span>
                  ) : (
                    complaint.reporter_name
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* SLA Countdown Bar */}
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-blue-600" />
              <span className="font-bold text-slate-800">
                Institutional SLA Window: {complaint.sla_hours || 48} Hours
              </span>
            </div>
            <div className="font-docket text-slate-600">
              {isOverdue ? (
                <span className="text-red-700 font-bold">
                  SLA breached! Escalated to Chief Warden & Directorate.
                </span>
              ) : (
                <span>
                  Resolution Target: {new Date(complaint.sla_deadline).toLocaleString([], { dateStyle: 'short', timeStyle: 'short' })}
                </span>
              )}
            </div>
          </div>

          {/* STATUS PIPELINE */}
          <div>
            <h3 className="font-bold text-xs uppercase tracking-wider text-slate-400 mb-3">
              Resolution Pipeline Status
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
              {TIMELINE_STEPS.map((step, idx) => {
                const isPassed = idx <= currentStepIndex;
                const isCurrent = idx === currentStepIndex;

                return (
                  <div
                    key={step.id}
                    className={`p-3 rounded-2xl border text-center transition-all ${
                      isCurrent
                        ? 'bg-blue-600 text-white font-bold border-blue-600 shadow-sm'
                        : isPassed
                        ? 'bg-emerald-50 text-emerald-800 border-emerald-300 font-semibold'
                        : 'bg-slate-50 text-slate-400 border-slate-200'
                    }`}
                  >
                    <div className="text-[10px] uppercase opacity-75">
                      0{idx + 1}
                    </div>
                    <div className="text-xs truncate">{step.label}</div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Statement Details */}
          <div className="space-y-2">
            <h3 className="font-bold text-sm text-slate-900">
              Grievance Narrative
            </h3>
            <p className="text-sm text-slate-800 leading-relaxed font-sans whitespace-pre-wrap bg-slate-50 p-5 rounded-2xl border border-slate-200/70">
              {complaint.body}
            </p>
          </div>

          {/* RESOLUTION CONFIRMATION: "Actually Fixed?" */}
          {isResolvedPendingConfirmation && (
            <motion.div
              initial={{ scale: 0.98, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="p-6 rounded-2xl bg-emerald-50 border border-emerald-300 shadow-sm space-y-3"
            >
              <div className="flex items-center gap-2 text-emerald-800 font-bold text-sm">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                Authority marked this complaint as Resolved. Actually fixed?
              </div>
              <p className="text-xs text-emerald-900/80 leading-relaxed">
                As part of AIT transparency standards, this docket cannot be permanently closed until the reporting student or cadet body confirms that physical repairs are complete.
              </p>

              {!showDisputeInput ? (
                <div className="flex flex-wrap items-center gap-3 pt-1">
                  <button
                    type="button"
                    onClick={() => handleConfirmFixed(true)}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-700 shadow-xs"
                  >
                    <Check className="w-4 h-4" /> Yes, Verified & Fixed
                  </button>

                  <button
                    type="button"
                    onClick={() => handleConfirmFixed(false)}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-red-600 text-white text-xs font-bold hover:bg-red-700 shadow-xs"
                  >
                    <X className="w-4 h-4" /> No, Issue Persists
                  </button>
                </div>
              ) : (
                <div className="space-y-2 pt-2 border-t border-emerald-200">
                  <label className="block text-xs font-bold text-slate-800">
                    Specify what remains broken or unaddressed:
                  </label>
                  <textarea
                    rows={2}
                    value={disputeNote}
                    onChange={(e) => setDisputeNote(e.target.value)}
                    placeholder="e.g. Geyser coil is still tripping MCB breaker..."
                    className="w-full p-3 rounded-xl bg-white border border-slate-300 text-xs text-slate-900 focus:outline-hidden"
                  />
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={handleDisputeSubmit}
                      className="px-4 py-2 rounded-xl bg-red-600 text-white text-xs font-bold hover:bg-red-700"
                    >
                      Reopen Docket with Dispute Note
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowDisputeInput(false)}
                      className="px-3 py-1.5 rounded text-xs text-slate-500 hover:text-slate-800"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          )}

          {/* OFFICIAL UPDATES & DISPATCHES */}
          <div className="pt-4 border-t border-slate-100 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-blue-600" />
                Official Dispatches & Resolution Trail ({complaint.updates?.length || 0})
              </h3>
              <span className="font-docket text-[10px] text-slate-400">
                Audit Trail Recorded
              </span>
            </div>

            <div className="space-y-3">
              {(complaint.updates || []).map((update) => (
                <div
                  key={update.id}
                  className={`p-4 rounded-2xl border text-xs leading-relaxed ${
                    update.is_audit
                      ? 'bg-slate-50 border-slate-200 text-slate-600 font-docket'
                      : update.author_role === 'student'
                      ? 'bg-blue-50/50 border-blue-100 text-slate-800'
                      : 'bg-slate-50 border-slate-200 text-slate-800'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className="font-bold text-slate-900 font-sans">
                      {update.author_name}
                    </span>
                    <span className="text-[10px] text-slate-400">
                      {new Date(update.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} • {new Date(update.created_at).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="whitespace-pre-wrap">{update.note}</p>
                </div>
              ))}
            </div>

            {/* Add Dispatch Form */}
            <form onSubmit={handleAddUpdate} className="pt-2 flex flex-col sm:flex-row items-stretch gap-2.5">
              <input
                type="text"
                placeholder={currentRole === 'student' ? 'Add student note or update...' : `Issue official dispatch as ${currentRole.toUpperCase()}...`}
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
                className="flex-1 px-4 py-2.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:border-blue-600 focus:bg-white focus:outline-hidden transition-all shadow-xs"
              />
              <button
                type="submit"
                disabled={isSubmittingNote || !newNote.trim()}
                className="px-5 py-2.5 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white disabled:opacity-50 text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm transition-colors shrink-0"
              >
                <Send className="w-3.5 h-3.5" />
                Post Update
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
