import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Flag, Check, AlertCircle } from 'lucide-react';
import { reportComplaint } from '../data/complaintsApi';
import { useStore } from '../store/useStore';

const REPORT_REASONS = [
  'Not a complaint (joke, spam, advertisement)',
  'Not relevant to the college',
  'Abusive or personal attack',
  'Names or targets a person',
  'Duplicate of another complaint',
  'Other',
];

export default function ReportPopover({ complaintId, isOpen, onClose, onReportSuccess }) {
  const studentId = useStore(s => s.studentId);
  const [selectedReason, setSelectedReason] = useState(REPORT_REASONS[1]);
  const [note, setNote] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState(null);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.stopPropagation();
    setSubmitting(true);
    try {
      const res = await reportComplaint(complaintId, studentId, selectedReason, note);
      if (res.alreadyReported) {
        setStatusMessage('You have already reported this complaint.');
        setTimeout(() => {
          onClose();
        }, 1500);
      } else if (res.success) {
        setStatusMessage("Thanks, we'll review it.");
        if (onReportSuccess) onReportSuccess();
        setTimeout(() => {
          onClose();
        }, 1200);
      }
    } catch (err) {
      console.error('Failed to submit report', err);
      setStatusMessage('Unable to submit report.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink/30 backdrop-blur-xs font-body"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.18 }}
        className="w-full max-w-sm bg-white rounded-card-lg p-6 border border-mint shadow-xl text-ink"
      >
        <div className="flex items-center justify-between pb-3 mb-3 border-b border-mist">
          <div className="flex items-center gap-2">
            <Flag className="w-4 h-4 text-steel" />
            <span className="font-headline font-medium text-base text-ink">
              Report complaint
            </span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 text-steel hover:text-ink rounded-full"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {statusMessage ? (
          <div className="py-6 text-center text-sm font-medium text-teal flex flex-col items-center gap-2">
            <Check className="w-5 h-5 text-teal" />
            <span>{statusMessage}</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3">
            <div className="space-y-2 text-xs">
              {REPORT_REASONS.map((reason) => (
                <label
                  key={reason}
                  className="flex items-center gap-2.5 p-2 rounded-lg hover:bg-mist cursor-pointer transition-colors"
                >
                  <input
                    type="radio"
                    name="reportReason"
                    value={reason}
                    checked={selectedReason === reason}
                    onChange={() => setSelectedReason(reason)}
                    className="accent-teal w-3.5 h-3.5"
                  />
                  <span className="text-ink leading-tight">{reason}</span>
                </label>
              ))}
            </div>

            {selectedReason === 'Other' && (
              <input
                type="text"
                placeholder="Optional one-line note"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                maxLength={80}
                className="w-full p-2 text-xs rounded-lg bg-mist border border-mint text-ink focus:border-teal focus:outline-hidden"
              />
            )}

            <div className="pt-3 border-t border-mist flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-3 py-1.5 text-xs text-steel hover:text-ink"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={submitting}
                className="px-4 py-1.5 rounded-pill bg-yellow text-ink font-medium text-xs hover:bg-yellow-hover disabled:opacity-50"
              >
                {submitting ? 'Submitting...' : 'Report'}
              </button>
            </div>
          </form>
        )}
      </motion.div>
    </div>
  );
}
