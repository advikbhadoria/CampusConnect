import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronDown, ChevronUp, Check, MoreHorizontal, Flag, AlertTriangle, Clock } from 'lucide-react';
import OdometerUpvote from './OdometerUpvote';
import ReportPopover from './ReportPopover';
import { setStatus, addUpdate } from '../data/complaintsApi';
import { useStore } from '../store/useStore';
import { AUTHORITIES } from '../data/authorities';

const PROGRESS_STEPS = [
  { id: 'submitted', label: 'Lodged' },
  { id: 'acknowledged', label: 'Seen' },
  { id: 'in_progress', label: 'Fixing' },
  { id: 'resolved', label: 'Fixed' },
];

export default function OpenedComplaintModal({ complaint, onClose, onRefresh }) {
  const currentRole = useStore(s => s.currentRole);
  const studentId = useStore(s => s.studentId);
  const studentName = useStore(s => s.studentName);

  const [activeDocket, setActiveDocket] = useState(complaint);
  const [isUpdatesExpanded, setIsUpdatesExpanded] = useState(false);
  const [newNote, setNewNote] = useState('');
  const [submittingNote, setSubmittingNote] = useState(false);
  const [isReportOpen, setIsReportOpen] = useState(false);
  const [showDisputeInput, setShowDisputeInput] = useState(false);
  const [disputeText, setDisputeText] = useState('');

  // Close on Escape key
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onClose]);

  if (!activeDocket) return null;

  // Determine current step index (0 to 3)
  let currentStepIdx = 0;
  if (activeDocket.status === 'acknowledged') currentStepIdx = 1;
  else if (activeDocket.status === 'in_progress') currentStepIdx = 2;
  else if (activeDocket.status === 'resolved' || activeDocket.status === 'closed') currentStepIdx = 3;

  const isResolved = activeDocket.status === 'resolved';

  const handleConfirmFixed = async (isFixed) => {
    if (isFixed) {
      const updated = await setStatus(activeDocket.id, 'closed', currentRole, 'Student confirmed the fix.');
      setActiveDocket({ ...updated });
      if (onRefresh) onRefresh();
    } else {
      setShowDisputeInput(true);
    }
  };

  const handleDisputeSubmit = async (e) => {
    e.preventDefault();
    if (!disputeText.trim()) return;
    const updated = await setStatus(activeDocket.id, 'in_progress', currentRole, `Student reported problem persists: "${disputeText}"`);
    setActiveDocket({ ...updated });
    setShowDisputeInput(false);
    setDisputeText('');
    if (onRefresh) onRefresh();
  };

  const handleAddNote = async (e) => {
    e.preventDefault();
    if (!newNote.trim()) return;
    setSubmittingNote(true);
    try {
      const author = currentRole === 'student' ? studentName : (AUTHORITIES[currentRole]?.name || currentRole.toUpperCase());
      const updated = await addUpdate(activeDocket.id, {
        author_role: currentRole,
        author_name: author,
        note: newNote,
        is_audit: false,
      });
      setActiveDocket({ ...updated });
      setNewNote('');
      if (onRefresh) onRefresh();
    } catch (err) {
      console.error('Failed to add update', err);
    } finally {
      setSubmittingNote(false);
    }
  };

  const routingRoles = activeDocket.assigned_roles || ['warden', 'chief_warden', 'jd'];

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 overflow-y-auto p-4 sm:p-6 lg:p-10 flex items-center justify-center bg-ink/40 backdrop-blur-xs font-body"
    >
      <motion.div
        layoutId={`card-${activeDocket.id}`}
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.96 }}
        transition={{ duration: 0.32, ease: [0.2, 0.8, 0.2, 1] }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-2xl bg-white rounded-card-lg p-7 sm:p-9 border border-mint text-ink my-auto select-text"
      >
        {/* Top Close Button & Report Trigger */}
        <div className="flex items-center justify-between pb-3">
          <span className="px-3 py-1 rounded-pill bg-mint text-teal text-xs font-medium lowercase">
            {activeDocket.category}
          </span>

          <div className="flex items-center gap-2">
            {activeDocket.visibility !== 'private' && (
              <button
                type="button"
                onClick={() => setIsReportOpen(true)}
                className="p-1.5 rounded-full hover:bg-mist text-steel hover:text-ink text-xs transition-colors"
                title="Report complaint"
              >
                <MoreHorizontal className="w-4 h-4" />
              </button>
            )}

            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-full hover:bg-mist text-steel hover:text-ink transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Top Header Row: 30px Title, Description, Yellow Upvote Pill */}
        <div className="flex flex-col sm:flex-row items-start justify-between gap-4 mt-2 mb-8">
          <div className="flex-1 pr-2">
            <h2 className="font-headline font-medium text-2xl sm:text-[30px] leading-tight text-ink mb-3">
              {activeDocket.title}
            </h2>
            <p className="text-sm text-steel leading-relaxed max-w-[60ch] line-clamp-2">
              {activeDocket.body}
            </p>
          </div>

          <div className="shrink-0 self-start">
            <OdometerUpvote
              complaintId={activeDocket.id}
              initialCount={activeDocket.upvote_count || 0}
              initialHasUpvoted={(activeDocket.upvoted_by || []).includes(studentId)}
              variant="featured"
              onUpvoteChange={(nextCount) => {
                setActiveDocket(prev => ({ ...prev, upvote_count: nextCount }));
                if (onRefresh) onRefresh();
              }}
            />
          </div>
        </div>

        {/* 4-Step Progress Line: Lodged, Seen, Fixing, Fixed */}
        <div className="py-5 border-t border-b border-mist my-6">
          <div className="relative flex items-center justify-between">
            {/* Horizontal Line connector */}
            <div className="absolute left-3 right-3 top-2.5 h-0.5 bg-mint -z-0" />
            <div
              className="absolute left-3 top-2.5 h-0.5 bg-teal -z-0 transition-all duration-300"
              style={{ width: `${(currentStepIdx / 3) * 100}%` }}
            />

            {PROGRESS_STEPS.map((step, idx) => {
              const isDone = idx < currentStepIdx;
              const isCurrent = idx === currentStepIdx;

              return (
                <div key={step.id} className="relative z-10 flex flex-col items-center">
                  {isCurrent ? (
                    <div className="w-5 h-5 rounded-full bg-yellow border-2 border-teal flex items-center justify-center">
                      <div className="w-1.5 h-1.5 rounded-full bg-teal" />
                    </div>
                  ) : isDone ? (
                    <div className="w-5 h-5 rounded-full bg-teal flex items-center justify-center text-white">
                      <Check className="w-3 h-3 text-white" />
                    </div>
                  ) : (
                    <div className="w-5 h-5 rounded-full bg-mint border border-mint-dark" />
                  )}

                  <span className={`text-xs mt-2 font-medium ${isCurrent ? 'text-ink font-semibold' : 'text-steel'}`}>
                    {step.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom Row: Routing Chain Pills with Handler & Escalation Time */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-steel pt-1 pb-4">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-steel mr-1">Route:</span>
            {routingRoles.map((roleKey, idx) => {
              const isCurrentHandler = idx === 0;
              const label = AUTHORITIES[roleKey]?.title || roleKey;
              return (
                <React.Fragment key={roleKey}>
                  <span
                    className={`px-3 py-1 rounded-pill ${
                      isCurrentHandler
                        ? 'bg-teal text-white font-medium'
                        : 'bg-mint text-ink'
                    }`}
                  >
                    {label}
                  </span>
                  {idx < routingRoles.length - 1 && (
                    <span className="text-steel font-medium">&gt;</span>
                  )}
                </React.Fragment>
              );
            })}
          </div>

          <div className="text-xs text-steel">
            Escalates in 6h
          </div>
        </div>

        {/* Collapsible Updates Thread & Confirmation Action */}
        <div className="pt-2 border-t border-mist">
          <button
            type="button"
            onClick={() => setIsUpdatesExpanded(!isUpdatesExpanded)}
            className="w-full flex items-center justify-between py-2 text-xs font-medium text-steel hover:text-ink transition-colors"
          >
            <span>Updates ({activeDocket.updates?.length || 0})</span>
            {isUpdatesExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>

          <AnimatePresence>
            {isUpdatesExpanded && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="space-y-3 pt-3 overflow-hidden text-xs"
              >
                {/* Resolution confirmation step */}
                {isResolved && (
                  <div className="p-4 rounded-card bg-mint text-ink space-y-2 mb-3">
                    <p className="font-medium text-sm">Has this issue been fixed?</p>
                    {!showDisputeInput ? (
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => handleConfirmFixed(true)}
                          className="px-3 py-1.5 rounded-pill bg-teal text-white font-medium hover:bg-teal-dark"
                        >
                          Confirm it's fixed
                        </button>
                        <button
                          type="button"
                          onClick={() => handleConfirmFixed(false)}
                          className="px-3 py-1.5 rounded-pill bg-white text-ink border border-mint-dark"
                        >
                          Not fixed yet
                        </button>
                      </div>
                    ) : (
                      <form onSubmit={handleDisputeSubmit} className="space-y-2 pt-1">
                        <input
                          type="text"
                          value={disputeText}
                          onChange={(e) => setDisputeText(e.target.value)}
                          placeholder="What is still broken?"
                          className="w-full p-2 rounded-lg bg-white border border-mint-dark text-xs"
                        />
                        <div className="flex items-center gap-2">
                          <button
                            type="submit"
                            className="px-3 py-1.5 rounded-pill bg-teal text-white font-medium"
                          >
                            Send note
                          </button>
                          <button
                            type="button"
                            onClick={() => setShowDisputeInput(false)}
                            className="px-2 py-1 text-steel hover:text-ink"
                          >
                            Cancel
                          </button>
                        </div>
                      </form>
                    )}
                  </div>
                )}

                {/* Updates list */}
                <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                  {(activeDocket.updates || []).map((u) => (
                    <div key={u.id} className="p-3 rounded-lg bg-mist border border-mint">
                      <div className="flex items-center justify-between text-steel mb-1">
                        <span className="font-medium text-ink">{u.author_name}</span>
                        <span className="text-[11px]">{new Date(u.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                      </div>
                      <p className="text-ink leading-relaxed">{u.note}</p>
                    </div>
                  ))}
                </div>

                {/* Add note input */}
                <form onSubmit={handleAddNote} className="flex items-center gap-2 pt-2">
                  <input
                    type="text"
                    value={newNote}
                    onChange={(e) => setNewNote(e.target.value)}
                    placeholder="Add a note..."
                    className="flex-1 p-2 text-xs rounded-pill bg-mist border border-mint text-ink focus:border-teal focus:outline-hidden px-4"
                  />
                  <button
                    type="submit"
                    disabled={submittingNote || !newNote.trim()}
                    className="px-4 py-2 rounded-pill bg-teal text-white font-medium text-xs hover:bg-teal-dark disabled:opacity-50"
                  >
                    Post
                  </button>
                </form>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Report Popover */}
      <ReportPopover
        complaintId={activeDocket.id}
        isOpen={isReportOpen}
        onClose={() => setIsReportOpen(false)}
        onReportSuccess={() => {
          if (onRefresh) onRefresh();
        }}
      />
    </div>
  );
}
