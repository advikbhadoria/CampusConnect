import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Key, RefreshCw, PlusCircle, X, Clock } from 'lucide-react';
import { useStore } from '../store/useStore';
import { AUTHORITIES } from '../data/authorities';
import { simulateNewComplaint, resetDataStore, fastForwardOverdue, getComplaints } from '../data/complaintsApi';

export default function DevRoleSwitcher({ onDataRefresh }) {
  const { currentRole, setRole, isDevPanelOpen, setDevPanelOpen } = useStore();

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === '`' || e.code === 'Backquote') {
        if (['INPUT', 'TEXTAREA'].includes(document.activeElement?.tagName)) {
          return;
        }
        e.preventDefault();
        setDevPanelOpen(!isDevPanelOpen);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isDevPanelOpen, setDevPanelOpen]);

  const handleSimulate = async () => {
    try {
      const res = await simulateNewComplaint();
      if (onDataRefresh) onDataRefresh(res.complaint);
    } catch (err) {
      console.error('Failed to simulate complaint', err);
    }
  };

  const handleReset = () => {
    if (window.confirm('Reset all complaints to default seed data?')) {
      resetDataStore();
      if (onDataRefresh) onDataRefresh();
    }
  };

  const handleFastForward = async () => {
    try {
      const active = await getComplaints('chief_warden');
      if (active && active.length > 0) {
        const target = active.find(c => c.status !== 'resolved' && c.status !== 'closed') || active[0];
        await fastForwardOverdue(target.id);
        if (onDataRefresh) onDataRefresh();
      }
    } catch (err) {
      console.error('Failed to fast forward', err);
    }
  };


  const roles = [
    {
      id: 'student',
      label: 'Student',
      desc: 'Can file dockets, upvote, report, and verify fixes.',
      name: 'Cadet Rohit Deshmukh',
    },
    {
      id: 'warden',
      label: 'Hostel Warden',
      desc: AUTHORITIES.warden.name + ' - Block level response. Blocked on warden complaints.',
      name: AUTHORITIES.warden.name,
    },
    {
      id: 'chief_warden',
      label: 'Chief Warden',
      desc: AUTHORITIES.chief_warden.name + ' - Oversees hostels, mess hygiene, campus living.',
      name: AUTHORITIES.chief_warden.name,
    },
    {
      id: 'jd',
      label: 'Joint Director',
      desc: AUTHORITIES.jd.name + ' - Disciplinary ethics, whistleblower identity unmask privilege.',
      name: AUTHORITIES.jd.name,
    },
    {
      id: 'director',
      label: 'Director',
      desc: AUTHORITIES.director.name + ' - Apex authority, final moderation arbiter.',
      name: AUTHORITIES.director.name,
    },
    {
      id: 'council',
      label: 'Student Council',
      desc: 'Redacted oversight view: category, title, status only. No private data.',
      name: 'General Secretary (AIT SC)',
    },
  ];

  return (
    <AnimatePresence>
      {isDevPanelOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setDevPanelOpen(false)}
            className="fixed inset-0 bg-ink/60 backdrop-blur-xs z-50"
          />

          {/* Modal Panel */}
          <motion.aside
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.2 }}
            className="fixed top-12 left-1/2 -translate-x-1/2 w-full max-w-lg bg-ink-surface border border-ink-border text-mist rounded-card-lg shadow-2xl z-50 p-6 overflow-hidden max-h-[85vh] flex flex-col font-body"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-ink-border pb-4 mb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-teal flex items-center justify-center text-yellow">
                  <Key className="w-4 h-4" />
                </div>
                <div>
                  <h2 className="font-headline font-medium text-lg text-white flex items-center gap-2">
                    Role switcher
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-ink border border-ink-border text-yellow">
                      `
                    </span>
                  </h2>
                  <p className="text-xs text-steel">
                    Switch roles to evaluate router bypasses and clearances.
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setDevPanelOpen(false)}
                className="p-1 text-steel hover:text-white rounded-full"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* List */}
            <div className="space-y-2 overflow-y-auto pr-1 flex-1">
              {roles.map((r) => {
                const isActive = currentRole === r.id;
                return (
                  <button
                    key={r.id}
                    type="button"
                    onClick={() => {
                      setRole(r.id);
                      setDevPanelOpen(false);
                    }}
                    className={`w-full text-left p-3.5 rounded-card border transition-colors flex items-start justify-between gap-3 ${
                      isActive
                        ? 'bg-teal/20 border-teal text-white'
                        : 'bg-ink border-ink-border text-mist hover:border-steel'
                    }`}
                  >
                    <div>
                      <div className="font-headline font-medium text-sm text-white mb-0.5">
                        {r.label}
                      </div>
                      <p className="text-xs text-steel leading-relaxed">{r.desc}</p>
                      <p className="text-[11px] text-yellow/90 mt-1 font-mono">
                        {r.name}
                      </p>
                    </div>

                    <div className="shrink-0 pt-1">
                      <div className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center ${
                        isActive ? 'border-yellow bg-yellow' : 'border-steel'
                      }`}>
                        {isActive && <div className="w-1.5 h-1.5 rounded-full bg-ink" />}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Actions */}
            <div className="mt-5 pt-4 border-t border-ink-border flex items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleSimulate}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-pill bg-yellow text-ink font-medium hover:bg-yellow-hover"
                >
                  <PlusCircle className="w-3.5 h-3.5" />
                  Simulate complaint
                </button>

                <button
                  type="button"
                  onClick={handleFastForward}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-pill bg-ink border border-ink-border text-steel hover:text-white"
                  title="Fast-forward complaint SLA to overdue"
                >
                  <Clock className="w-3.5 h-3.5 text-yellow" />
                  Fast-forward 48h
                </button>

                <button
                  type="button"
                  onClick={handleReset}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-pill bg-ink border border-ink-border text-steel hover:text-white"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  Reset data
                </button>
              </div>

              <span className="text-[11px] text-steel">
                Press <kbd className="px-1 py-0.5 bg-ink rounded border border-ink-border text-white">`</kbd>
              </span>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
