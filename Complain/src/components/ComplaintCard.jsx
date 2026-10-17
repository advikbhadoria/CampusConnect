import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, Check, MoreHorizontal, ShieldAlert, MapPin, User, Sparkles } from 'lucide-react';
import OdometerUpvote from './OdometerUpvote';
import ReportPopover from './ReportPopover';
import OpenedComplaintModal from './OpenedComplaintModal';
import { useStore } from '../store/useStore';

function formatDetailedTimeAgo(isoString) {
  if (!isoString) return '';
  const now = Date.now();
  const created = new Date(isoString).getTime();
  const diffMs = Math.max(0, now - created);
  const diffMins = Math.floor(diffMs / (60 * 1000));
  
  if (diffMins < 1) return 'Just now';
  if (diffMins < 60) return `${diffMins}m ago`;
  const diffHours = Math.floor(diffMins / 60);
  if (diffHours < 24) return `${diffHours}h ago`;
  const diffDays = Math.floor(diffHours / 24);
  return `${diffDays}d ago`;
}

function getCategoryBadgeStyle(category) {
  const cat = (category || '').toLowerCase();
  switch (cat) {
    case 'hostel':
      return 'bg-sky-50 text-sky-800 border-sky-200/90';
    case 'mess':
      return 'bg-amber-50 text-amber-900 border-amber-200/90';
    case 'academics':
    case 'labs':
    case 'faculty':
      return 'bg-purple-50 text-purple-900 border-purple-200/90';
    case 'library':
      return 'bg-indigo-50 text-indigo-900 border-indigo-200/90';
    case 'sports':
      return 'bg-emerald-50 text-emerald-900 border-emerald-200/90';
    case 'emergency':
    case 'safety':
      return 'bg-rose-50 text-rose-900 border-rose-200/90';
    case 'infrastructure':
    case 'campus':
      return 'bg-teal-50 text-teal-900 border-teal-200/90';
    default:
      return 'bg-mint text-teal border-mint-dark';
  }
}

export default function ComplaintCard({
  complaint,
  isFeatured = false,
  bgColor = 'white', // 'white' | 'yellow'
  onRefresh,
}) {
  const [isOpened, setIsOpened] = useState(false);
  const [isReportOpen, setIsReportOpen] = useState(false);
  const studentId = useStore(s => s.studentId);

  // States
  const isUnderReview = complaint.report_status === 'under_review';
  const isResolved = complaint.status === 'resolved' || complaint.status === 'closed';
  const isOverdue = !isResolved && complaint.sla_deadline && new Date(complaint.sla_deadline).getTime() < Date.now();
  
  // Brand new complaint check (posted within the last 2 hours)
  const isJustPosted = Boolean(
    complaint.created_at && 
    (Date.now() - new Date(complaint.created_at).getTime()) < (2 * 3600 * 1000)
  );

  // If under review (>=3 reports), collapse in public board to a muted "Under review" placeholder
  if (isUnderReview) {
    return (
      <div className="bg-white/80 p-5 rounded-card border border-mint text-steel text-xs flex items-center justify-between">
        <div className="flex items-center gap-2">
          <ShieldAlert className="w-4 h-4 text-steel" />
          <span className="font-medium text-ink">Complaint under review</span>
        </div>
        <span className="text-[11px] text-steel">Reported by students</span>
      </div>
    );
  }

  // Base card surface & border classes
  let cardClass = 'bg-white border border-[#D8E3E1] shadow-[0_3px_14px_rgba(18,32,31,0.05)] hover:border-teal/60 hover:shadow-[0_12px_32px_rgba(11,93,91,0.12)]';
  let titleClass = 'text-ink font-headline text-[18px] font-semibold leading-snug group-hover:text-teal transition-colors';
  let upvoteVariant = 'default';

  if (isResolved) {
    cardClass = 'bg-[#F4FAF9] border-[#BDE3DE] shadow-xs';
    titleClass = 'line-through text-steel/80 font-headline text-[17px] font-medium leading-snug';
    upvoteVariant = 'resolved';
  } else if (isOverdue) {
    cardClass = 'bg-white border-l-4 border-l-rose-500 border-y-[#FCA5A5]/60 border-r-[#FCA5A5]/60 shadow-[0_3px_14px_rgba(239,68,68,0.07)] hover:border-r-rose-400 hover:shadow-[0_12px_28px_rgba(239,68,68,0.14)]';
    titleClass = 'text-ink font-headline text-[18px] font-semibold leading-snug group-hover:text-rose-700 transition-colors';
    upvoteVariant = 'overdue';
  } else if (isJustPosted) {
    cardClass = 'bg-white border-2 border-emerald-400/90 shadow-[0_6px_22px_rgba(16,185,129,0.12)] hover:border-emerald-600 hover:shadow-[0_14px_34px_rgba(16,185,129,0.2)]';
  } else if (bgColor === 'yellow') {
    cardClass = 'bg-[#FFFDF4] border-[#F6DC8A] shadow-[0_3px_14px_rgba(245,158,11,0.08)] hover:border-amber-400 hover:shadow-[0_12px_32px_rgba(245,158,11,0.16)]';
  }

  const categoryBadgeClass = getCategoryBadgeStyle(complaint.category);

  return (
    <>
      <motion.article
        layout
        layoutId={`card-${complaint.id}`}
        onClick={() => setIsOpened(true)}
        className={`group relative cursor-pointer rounded-2xl p-5 sm:p-6 select-none flex flex-col justify-between transition-all duration-200 hover:-translate-y-1 ${cardClass}`}
      >
        <div>
          {/* Top Row: Category, "Just posted" indicator, Status & Actions */}
          <div className="flex items-center justify-between gap-2 mb-3">
            <div className="flex items-center gap-2 flex-wrap">
              {/* Category Badge */}
              <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-semibold tracking-wide border capitalize ${categoryBadgeClass}`}>
                {complaint.category || 'General'}
              </span>

              {/* Just posted badge */}
              {isJustPosted && !isResolved && (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                  New
                </span>
              )}

              {/* Overdue tag */}
              {isOverdue && (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-rose-50 text-rose-700 border border-rose-200">
                  <Clock className="w-3 h-3 text-rose-600" />
                  Overdue
                </span>
              )}

              {/* Resolved tag */}
              {isResolved && (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 text-teal border border-mint-dark">
                  <Check className="w-3 h-3 text-teal" />
                  Fixed
                </span>
              )}
            </div>

            {/* Top Right: Time ago & More Menu */}
            <div className="flex items-center gap-2 text-steel">
              <span className="text-xs font-normal text-steel/90 flex items-center gap-1">
                <Clock className="w-3 h-3 opacity-70" />
                {formatDetailedTimeAgo(complaint.created_at)}
              </span>

              {/* Three dots for reporting - visible on hover & touch */}
              {complaint.visibility !== 'private' && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsReportOpen(true);
                  }}
                  className="opacity-70 group-hover:opacity-100 p-1 rounded-full hover:bg-black/5 hover:text-ink transition-opacity"
                  aria-label="More options"
                >
                  <MoreHorizontal className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* Title */}
          <h3 className={`line-clamp-2 mb-2 ${titleClass}`}>
            {complaint.title}
          </h3>

          {/* Description Excerpt */}
          {complaint.body && (
            <p className="text-xs sm:text-[13px] text-steel/90 line-clamp-2 mb-3 leading-relaxed font-normal">
              {complaint.body}
            </p>
          )}

          {/* Location & Reporter chips */}
          <div className="flex items-center gap-2.5 text-[11px] text-steel/80 mb-1 flex-wrap">
            {complaint.location && (
              <span className="inline-flex items-center gap-1 bg-mist px-2 py-0.5 rounded-md font-medium text-steel">
                <MapPin className="w-3 h-3 text-teal" />
                {complaint.location}
              </span>
            )}

            <span className="inline-flex items-center gap-1 font-medium">
              <User className="w-3 h-3 text-steel/60" />
              {complaint.hide_identity
                ? 'Confidential Student'
                : (complaint.reporter_name || 'Cadet')}
            </span>
          </div>
        </div>

        {/* Bottom Row: View Details Link & Interactive Upvote Odometer */}
        <div className="flex items-center justify-between gap-3 pt-3.5 mt-3 border-t border-slate-100">
          <span className="text-xs text-teal font-medium group-hover:underline flex items-center gap-1">
            View details & updates →
          </span>

          <div onClick={(e) => e.stopPropagation()}>
            <OdometerUpvote
              complaintId={complaint.id}
              initialCount={complaint.upvote_count || 0}
              initialHasUpvoted={(complaint.upvoted_by || []).includes(studentId)}
              variant={upvoteVariant}
              onUpvoteChange={() => {
                if (onRefresh) onRefresh();
              }}
            />
          </div>
        </div>
      </motion.article>

      {/* Opened Complaint Modal */}
      <AnimatePresence>
        {isOpened && (
          <OpenedComplaintModal
            complaint={complaint}
            onClose={() => setIsOpened(false)}
            onRefresh={onRefresh}
          />
        )}
      </AnimatePresence>

      {/* Report Popover */}
      <ReportPopover
        complaintId={complaint.id}
        isOpen={isReportOpen}
        onClose={() => setIsReportOpen(false)}
        onReportSuccess={onRefresh}
      />
    </>
  );
}
