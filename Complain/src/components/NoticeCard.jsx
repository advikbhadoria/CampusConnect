import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Clock, Calendar, MapPin, ShieldCheck, User, Repeat, AlertTriangle, CheckCircle2, ArrowUpRight
} from 'lucide-react';
import OdometerUpvote from './OdometerUpvote';
import ComplaintPopoutModal from './ComplaintPopoutModal';
import { useStore } from '../store/useStore';

export const CATEGORY_STYLES = {
  hostel: {
    badge: 'bg-blue-50 text-blue-700 border-blue-200/90 shadow-xs',
    label: 'Hostel & Living',
    dot: 'bg-blue-600',
  },
  mess: {
    badge: 'bg-amber-50 text-amber-800 border-amber-200/90 shadow-xs',
    label: 'Mess & Catering',
    dot: 'bg-amber-500',
  },
  academics: {
    badge: 'bg-indigo-50 text-indigo-700 border-indigo-200/90 shadow-xs',
    label: 'Academic Labs',
    dot: 'bg-indigo-600',
  },
  faculty: {
    badge: 'bg-purple-50 text-purple-700 border-purple-200/90 shadow-xs',
    label: 'Faculty Inquiry',
    dot: 'bg-purple-600',
  },
  sports: {
    badge: 'bg-emerald-50 text-emerald-700 border-emerald-200/90 shadow-xs',
    label: 'Sports Complex',
    dot: 'bg-emerald-600',
  },
  library: {
    badge: 'bg-violet-50 text-violet-700 border-violet-200/90 shadow-xs',
    label: 'Central Library',
    dot: 'bg-violet-600',
  },
  infrastructure: {
    badge: 'bg-slate-100 text-slate-800 border-slate-300/80 shadow-xs',
    label: 'Campus Estate',
    dot: 'bg-slate-600',
  },
  emergency: {
    badge: 'bg-rose-50 text-rose-700 border-rose-200 shadow-xs',
    label: 'Urgent Intervention',
    dot: 'bg-rose-600',
  },
};

export const STATUS_STYLES = {
  submitted: { label: 'Lodged', style: 'bg-slate-100 text-slate-600 border-slate-200' },
  acknowledged: { label: 'Acknowledged', style: 'bg-blue-50 text-blue-700 border-blue-200' },
  in_progress: { label: 'In Progress', style: 'bg-amber-50 text-amber-800 border-amber-200' },
  resolved: { label: 'Resolved', style: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
  closed: { label: 'Verified & Closed', style: 'bg-slate-100 text-slate-700 border-slate-200' },
};

export const CATEGORY_COLORS = CATEGORY_STYLES;
export const STATUS_BADGES = STATUS_STYLES;

function formatTimeAgo(isoString) {
  if (!isoString) return '';
  const diffHours = Math.round((Date.now() - new Date(isoString).getTime()) / (3600 * 1000));
  if (diffHours < 1) return 'Just now';
  if (diffHours < 24) return `${diffHours}h ago`;
  const days = Math.floor(diffHours / 24);
  return `${days}d ago`;
}

function formatPostDate(isoString) {
  if (!isoString) return '';
  const d = new Date(isoString);
  return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
}

function formatPostTime(isoString) {
  if (!isoString) return '';
  const d = new Date(isoString);
  return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

export default function NoticeCard({ complaint, onRefresh }) {
  const [isPopoutOpen, setIsPopoutOpen] = useState(false);
  const studentId = useStore(s => s.studentId);

  const catStyle = CATEGORY_STYLES[complaint.category] || CATEGORY_STYLES.infrastructure;
  const statusConfig = STATUS_STYLES[complaint.status] || STATUS_STYLES.submitted;

  const isOverdue = complaint.status !== 'resolved' &&
                    complaint.status !== 'closed' &&
                    complaint.sla_deadline &&
                    new Date(complaint.sla_deadline).getTime() < Date.now();

  const isResolved = complaint.status === 'resolved' || complaint.status === 'closed';

  return (
    <>
      <motion.article
        layout
        layoutId={`card-${complaint.id}`}
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        onClick={() => setIsPopoutOpen(true)}
        className="group relative cursor-pointer bg-white/90 backdrop-blur-xl rounded-card border border-slate-200/80 shadow-glass hover:shadow-glass-hover p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 hover:border-blue-400/50 hover:-translate-y-1 overflow-hidden"
      >
        {/* Subtle Ambient Hover Glow */}
        <div className="absolute inset-0 bg-linear-to-br from-blue-500/5 via-transparent to-ait-maroon/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

        {/* 1. FIRST LINE AT TOP: Student Icon and Student Name */}
        <div className="flex items-center justify-between gap-3 mb-4">
          <div className="flex items-center gap-3 min-w-0">
            {/* Student Avatar Icon */}
            <div className="w-10 h-10 rounded-2xl bg-linear-to-tr from-ait-maroon to-ait-maroon-light text-white flex items-center justify-center font-bold text-sm shadow-xs shrink-0 group-hover:scale-105 transition-transform">
              {complaint.hide_identity ? (
                <ShieldCheck className="w-5 h-5 text-signal-yellow" />
              ) : (
                complaint.reporter_name?.charAt(0) || 'C'
              )}
            </div>

            {/* Student Name & Roll */}
            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="font-poppins font-bold text-sm text-slate-900 group-hover:text-blue-700 transition-colors truncate">
                  {complaint.hide_identity ? 'Protected Whistleblower' : complaint.reporter_name}
                </span>
                {complaint.hide_identity && (
                  <span className="w-2 h-2 rounded-full bg-signal-yellow" title="Confidential identity" />
                )}
              </div>
              <p className="text-[11px] text-slate-500 font-medium truncate">
                {complaint.hide_identity ? 'Identity Safeguarded' : (complaint.reporter_branch || 'AIT Cadet')}
              </p>
            </div>
          </div>

          {/* Docket Serial Pill on right */}
          <div className="flex items-center gap-1.5 shrink-0">
            <span className="font-docket text-[11px] font-bold text-slate-600 bg-slate-100/90 px-2.5 py-1 rounded-full border border-slate-200/90">
              {complaint.id}
            </span>
          </div>
        </div>

        {/* 2. NEXT LINE: Tag with proper border radius and professional color */}
        <div className="flex flex-wrap items-center gap-2 mb-3.5">
          {/* Professional Category Tag */}
          <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${catStyle.badge}`}>
            <span className={`w-1.5 h-1.5 rounded-full ${catStyle.dot}`} />
            {catStyle.label}
          </span>

          {/* Location Badge */}
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-slate-100/80 text-slate-700 border border-slate-200">
            <MapPin className="w-3 h-3 text-slate-500" />
            <span className="truncate max-w-[170px]">{complaint.location}</span>
          </span>

          {/* Status Badge */}
          <span className={`px-2.5 py-1 rounded-full text-[11px] font-semibold border ${statusConfig.style}`}>
            {statusConfig.label}
          </span>

          {/* Overdue alert if breached */}
          {isOverdue && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-red-50 text-red-700 border border-red-200">
              <AlertTriangle className="w-3 h-3 text-red-600" /> SLA Overdue
            </span>
          )}

          {/* Recurring issue pill */}
          {complaint.duplicate_of && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-amber-50 text-amber-800 border border-amber-200">
              <Repeat className="w-3 h-3" /> Recurring
            </span>
          )}
        </div>

        {/* 3. AFTER THAT: Title of the Complaint */}
        <div className="mb-5 flex-1">
          <h3 className="font-poppins font-bold text-base text-slate-900 group-hover:text-blue-700 transition-colors leading-snug line-clamp-2 mb-2">
            {complaint.title}
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed font-sans line-clamp-2 font-normal">
            {complaint.body}
          </p>
        </div>

        {/* 4. NEXT LINE: Time and Date of Posting & Upvote Button */}
        <div className="pt-3.5 border-t border-slate-100 flex items-center justify-between gap-3">
          {/* Time and Date of posting */}
          <div className="flex flex-col text-xs text-slate-500 font-medium">
            <div className="flex items-center gap-1.5 text-slate-700 font-semibold text-[11px]">
              <Calendar className="w-3.5 h-3.5 text-blue-600 shrink-0" />
              <span>{formatPostDate(complaint.created_at)}</span>
              <span className="text-slate-300">•</span>
              <span>{formatPostTime(complaint.created_at)}</span>
            </div>
            <div className="flex items-center gap-1 text-[11px] text-slate-400 mt-0.5">
              <Clock className="w-3 h-3 shrink-0" />
              <span>{formatTimeAgo(complaint.created_at)}</span>
            </div>
          </div>

          {/* Upvote Button with Odometer */}
          <div onClick={(e) => e.stopPropagation()}>
            <OdometerUpvote
              complaintId={complaint.id}
              initialCount={complaint.upvote_count || 0}
              initialHasUpvoted={(complaint.upvoted_by || []).includes(studentId)}
              onUpvoteChange={() => {
                if (onRefresh) onRefresh();
              }}
            />
          </div>
        </div>

        {/* Card Click Indicator on hover */}
        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity text-slate-400">
          <ArrowUpRight className="w-4 h-4 text-blue-600" />
        </div>
      </motion.article>

      {/* Pop-out Details Modal when card is clicked */}
      <AnimatePresence>
        {isPopoutOpen && (
          <ComplaintPopoutModal
            complaint={complaint}
            onClose={() => setIsPopoutOpen(false)}
            onRefresh={onRefresh}
          />
        )}
      </AnimatePresence>
    </>
  );
}
