import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  X, Eye, Clock, CheckCircle2, Lock, ExternalLink, Send, ShieldCheck
} from 'lucide-react';
import { revealIdentity, setStatus, addUpdate } from '../data/complaintsApi';
import { canRevealIdentity } from '../data/router';
import { AUTHORITIES } from '../data/authorities';
import { useStore } from '../store/useStore';

export default function AuthorityDrawer({ complaint, onClose, onRefresh }) {
  const currentRole = useStore(s => s.currentRole);
  const navigate = useStore(s => s.navigate);

  const [dispatchNote, setDispatchNote] = useState('');
  const [isUpdating, setIsUpdating] = useState(false);
  const [revealing, setRevealing] = useState(false);

  if (!complaint) return null;

  const isWhistleblower = complaint.hide_identity;
  const isRevealed = complaint.is_revealed;
  const hasRevealPrivilege = canRevealIdentity(currentRole);

  const handleReveal = async () => {
    if (!hasRevealPrivilege) return;
    setRevealing(true);
    try {
      await revealIdentity(complaint.id, currentRole);
      onRefresh();
    } catch (err) {
      console.error('Failed to reveal identity', err);
    } finally {
      setRevealing(false);
    }
  };

  const handleStatusChange = async (newStatus) => {
    setIsUpdating(true);
    try {
      await setStatus(complaint.id, newStatus, currentRole, dispatchNote || `Status changed to ${newStatus}`);
      setDispatchNote('');
      onRefresh();
    } catch (err) {
      console.error('Failed to update status', err);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleSendDispatch = async (e) => {
    e.preventDefault();
    if (!dispatchNote.trim()) return;

    setIsUpdating(true);
    try {
      await addUpdate(complaint.id, {
        author_role: currentRole,
        author_name: AUTHORITIES[currentRole]?.name || currentRole,
        note: dispatchNote,
        is_audit: false,
      });
      setDispatchNote('');
      onRefresh();
    } catch (err) {
      console.error('Failed to post dispatch', err);
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden font-body">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-xs"
      />

      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ duration: 0.28, ease: [0.2, 0.8, 0.2, 1] }}
          className="w-screen max-w-lg bg-ink-surface text-mist border-l border-ink-border flex flex-col"
        >
          {/* Drawer Header */}
          <div className="p-6 border-b border-ink-border flex items-center justify-between">
            <div>
              <span className="text-xs text-steel font-medium lowercase">
                {complaint.category} • {complaint.upvote_count} votes
              </span>
              <h2 className="font-headline font-medium text-lg text-white mt-1 line-clamp-1">
                {complaint.title}
              </h2>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="p-1.5 text-steel hover:text-white rounded-full"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Drawer Body */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6 text-xs">
            {/* Identity Card */}
            <div className="p-4 rounded-card bg-ink border border-ink-border space-y-2">
              <span className="text-steel font-medium block">
                Reporter identity
              </span>

              {isWhistleblower ? (
                <div className="flex items-center justify-between gap-3 pt-1">
                  <div>
                    {isRevealed ? (
                      <span className="text-yellow font-medium">{complaint.reporter_name}</span>
                    ) : (
                      <span className="text-steel tracking-widest select-none font-mono">••••••••</span>
                    )}
                  </div>

                  {!isRevealed && hasRevealPrivilege && (
                    <button
                      type="button"
                      disabled={revealing}
                      onClick={handleReveal}
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-pill bg-yellow text-ink font-medium text-xs hover:bg-yellow-hover"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      Reveal
                    </button>
                  )}

                  {!isRevealed && !hasRevealPrivilege && (
                    <span className="text-steel flex items-center gap-1 text-[11px]">
                      <Lock className="w-3 h-3" /> Protected
                    </span>
                  )}
                </div>
              ) : (
                <div className="text-white font-medium">
                  {complaint.reporter_name}
                </div>
              )}
            </div>

            {/* Description */}
            <div className="space-y-1.5">
              <span className="text-steel font-medium block">Details</span>
              <p className="text-mist/90 leading-relaxed whitespace-pre-wrap p-3.5 rounded-card bg-ink border border-ink-border">
                {complaint.body}
              </p>
            </div>

            {/* Location & Time */}
            <div className="text-steel flex items-center justify-between">
              <span>Location: <strong className="text-white font-normal">{complaint.location}</strong></span>
              <span>{new Date(complaint.created_at).toLocaleDateString()}</span>
            </div>

            {/* Dispatch note */}
            <form onSubmit={handleSendDispatch} className="space-y-2 pt-2">
              <label className="text-steel font-medium block">Dispatch update note</label>
              <textarea
                rows={2}
                value={dispatchNote}
                onChange={(e) => setDispatchNote(e.target.value)}
                placeholder="Log an action taken..."
                className="w-full p-2.5 rounded-card bg-ink border border-ink-border text-xs text-white placeholder:text-steel focus:border-teal focus:outline-hidden resize-none"
              />
              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={isUpdating || !dispatchNote.trim()}
                  className="px-4 py-1.5 rounded-pill bg-teal text-white font-medium text-xs hover:bg-teal-hover disabled:opacity-50"
                >
                  Post update
                </button>
              </div>
            </form>

            {/* Updates History */}
            <div className="space-y-2 pt-3 border-t border-ink-border">
              <span className="text-steel font-medium block">History trail</span>
              <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                {(complaint.updates || []).map((u) => (
                  <div key={u.id} className="p-2.5 rounded-lg bg-ink border border-ink-border text-mist leading-relaxed">
                    <div className="flex items-center justify-between text-[11px] text-steel mb-1">
                      <span className="font-medium text-white">{u.author_name}</span>
                      <span>{new Date(u.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                    </div>
                    <p>{u.note}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Drawer Actions */}
          <div className="p-4 border-t border-ink-border flex items-center justify-between gap-2">
            <span className="text-xs text-steel">Set status:</span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => handleStatusChange('in_progress')}
                className="px-3 py-1.5 rounded-pill bg-ink border border-ink-border text-mist hover:text-white text-xs font-medium"
              >
                In progress
              </button>
              <button
                type="button"
                onClick={() => handleStatusChange('resolved')}
                className="px-3.5 py-1.5 rounded-pill bg-teal text-white hover:bg-teal-hover text-xs font-medium"
              >
                Resolve
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
