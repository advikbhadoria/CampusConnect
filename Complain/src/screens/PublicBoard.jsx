import React, { useState, useEffect, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, SlidersHorizontal, ChevronDown, Check, Clock, Flame, AlertTriangle, Radio } from 'lucide-react';
import ComplaintCard from '../components/ComplaintCard';
import { getComplaints } from '../data/complaintsApi';
import { useStore } from '../store/useStore';

const CATEGORIES = [
  { id: 'all', label: 'All' },
  { id: 'hostel', label: 'Hostel' },
  { id: 'mess', label: 'Mess' },
  { id: 'academics', label: 'Labs' },
  { id: 'library', label: 'Library' },
  { id: 'sports', label: 'Sports' },
  { id: 'emergency', label: 'Urgent' },
];

const STATUS_OPTIONS = [
  { id: 'all', label: 'All statuses' },
  { id: 'open', label: 'Open only' },
  { id: 'overdue', label: 'Overdue only' },
  { id: 'resolved', label: 'Resolved only' },
];

const SORT_OPTIONS = [
  { id: 'recent', label: 'Newest', fullLabel: 'Newest first (Default)', icon: Clock },
  { id: 'upvotes', label: 'Most upvoted', fullLabel: 'Most upvoted', icon: Flame },
  { id: 'severity', label: 'Urgent', fullLabel: 'Highest severity', icon: AlertTriangle },
];

export default function PublicBoard() {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedSort, setSelectedSort] = useState('recent'); // Default: newest first
  const [searchQuery, setSearchQuery] = useState('');
  const [isFilterPopoverOpen, setIsFilterPopoverOpen] = useState(false);
  const [visibleLimit, setVisibleLimit] = useState(24);

  const filterPopoverRef = useRef(null);
  const currentRole = useStore(s => s.currentRole);
  const realtimeTick = useStore(s => s.realtimeTick);
  const navigate = useStore(s => s.navigate);

  const fetchBoardComplaints = async () => {
    setLoading(true);
    try {
      const data = await getComplaints(currentRole);
      setComplaints(data || []);
    } catch (err) {
      console.error('Failed to load complaints', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBoardComplaints();
  }, [currentRole, realtimeTick]);

  // Close filter popover on outside click
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (filterPopoverRef.current && !filterPopoverRef.current.contains(e.target)) {
        setIsFilterPopoverOpen(false);
      }
    };
    if (isFilterPopoverOpen) {
      document.addEventListener('click', handleOutsideClick);
    }
    return () => document.removeEventListener('click', handleOutsideClick);
  }, [isFilterPopoverOpen]);

  // Live open complaints count
  const openCount = useMemo(() => {
    return complaints.filter(c => c.status !== 'resolved' && c.status !== 'closed' && c.report_status !== 'removed').length;
  }, [complaints]);

  // Filter & sort
  const filteredComplaints = useMemo(() => {
    const now = Date.now();
    let result = complaints.filter(c => {
      // Do not show removed
      if (c.report_status === 'removed') return false;

      // Role privacy: private complaints only visible if permitted
      if (currentRole === 'student' && c.visibility === 'private' && c.reporter_id !== 'STU-2026-CURRENT') {
        return false;
      }

      // Category filter
      if (selectedCategory !== 'all') {
        if (selectedCategory === 'academics') {
          if (c.category !== 'academics' && c.category !== 'faculty') return false;
        } else if (c.category !== selectedCategory) {
          return false;
        }
      }

      // Status filter from popover
      const isResolved = c.status === 'resolved' || c.status === 'closed';
      const isOverdue = !isResolved && c.sla_deadline && new Date(c.sla_deadline).getTime() < now;

      if (selectedStatus === 'open' && isResolved) return false;
      if (selectedStatus === 'resolved' && !isResolved) return false;
      if (selectedStatus === 'overdue' && !isOverdue) return false;

      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = (c.title || '').toLowerCase().includes(q);
        const matchesCat = (c.category || '').toLowerCase().includes(q);
        const matchesBody = (c.body || '').toLowerCase().includes(q);
        const matchesLocation = (c.location || '').toLowerCase().includes(q);
        if (!matchesTitle && !matchesCat && !matchesBody && !matchesLocation) return false;
      }

      return true;
    });

    // Chronological / Criteria sorting
    result.sort((a, b) => {
      const timeA = new Date(a.created_at || a.created_time || 0).getTime();
      const timeB = new Date(b.created_at || b.created_time || 0).getTime();

      if (selectedSort === 'recent') {
        return timeB - timeA;
      }
      if (selectedSort === 'upvotes') {
        const diff = (b.upvote_count || 0) - (a.upvote_count || 0);
        if (diff !== 0) return diff;
        return timeB - timeA;
      }
      if (selectedSort === 'severity') {
        const diff = (b.severity || 0) - (a.severity || 0);
        if (diff !== 0) return diff;
        return timeB - timeA;
      }
      return timeB - timeA;
    });

    return result;
  }, [complaints, selectedCategory, selectedStatus, selectedSort, searchQuery, currentRole]);

  const displayedComplaints = filteredComplaints.slice(0, visibleLimit);

  return (
    <div className="min-h-screen bg-mist text-ink font-body pb-28 px-4 sm:px-8 lg:px-12 select-none">
      <div className="max-w-6xl mx-auto pt-10 sm:pt-14">
        {/* Header Section: Title & Live status indicator */}
        <section className="mb-10 sm:mb-12">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <motion.div
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-mint/70 border border-mint-dark text-teal text-xs font-medium mb-3"
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-teal"></span>
                </span>
                <span>Live Feed • Realtime Updates</span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="font-headline font-semibold text-4xl sm:text-[48px] leading-[1.08] tracking-tightest text-ink max-w-[60ch]"
              >
                Campus complaints
              </motion.h1>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.1 }}
                className="text-sm text-steel mt-2 font-normal"
              >
                {openCount} active issues logged. Chronologically tracked from submission to resolution.
              </motion.p>
            </div>

            {/* Quick action button for mobile / top */}
            <div className="sm:hidden">
              <button
                type="button"
                onClick={() => navigate('new')}
                className="w-full py-2.5 px-4 rounded-pill bg-yellow text-ink font-headline font-semibold text-sm shadow-sm hover:bg-yellow-hover transition-colors"
              >
                + File a complaint
              </button>
            </div>
          </div>
        </section>

        {/* Toolbar: Category filters, Quick Sort segmented control, Search, and Status filter */}
        <div className="space-y-4 pb-6 mb-8 border-b border-mist-dark/60">
          {/* Row 1: Category tabs */}
          <div className="flex items-center justify-between gap-4 overflow-x-auto no-scrollbar pb-1">
            <div className="flex items-center gap-2 sm:gap-3 text-sm font-medium">
              {CATEGORIES.map((cat) => {
                const isActive = selectedCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`relative px-3.5 py-1.5 rounded-pill transition-all whitespace-nowrap text-xs sm:text-sm ${
                      isActive
                        ? 'bg-teal text-white shadow-xs font-semibold'
                        : 'bg-white/80 text-steel border border-transparent hover:border-mint-dark hover:text-ink'
                    }`}
                  >
                    {cat.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Row 2: Quick Sort Pills + Pill Search Box + Small Filter Popover Button */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
            {/* Quick Sort Segmented Control */}
            <div className="flex items-center gap-1.5 bg-white/90 p-1 rounded-pill border border-mint shrink-0 overflow-x-auto">
              <span className="text-[11px] font-medium text-steel px-2 uppercase tracking-wider hidden sm:inline-block">
                Sort:
              </span>
              {SORT_OPTIONS.map((opt) => {
                const isSelected = selectedSort === opt.id;
                const Icon = opt.icon;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setSelectedSort(opt.id)}
                    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-pill text-xs font-medium transition-all ${
                      isSelected
                        ? 'bg-mint text-teal font-semibold shadow-xs'
                        : 'text-steel hover:text-ink hover:bg-mist'
                    }`}
                  >
                    <Icon className="w-3 h-3" />
                    <span>{opt.label}</span>
                    {opt.id === 'recent' && (
                      <span className="text-[10px] text-teal/80 bg-white/70 px-1 rounded-sm ml-0.5 font-normal">
                        Default
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Right: Search Box + Status Filter */}
            <div className="flex items-center gap-2.5 shrink-0 relative" ref={filterPopoverRef}>
              {/* Pill Search Box */}
              <div className="relative flex-1 sm:flex-initial">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-steel" />
                <input
                  type="text"
                  placeholder="Search issues, hostel, lab..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full sm:w-56 pl-8 pr-3 py-1.5 text-xs rounded-pill bg-white border border-mint text-ink placeholder:text-steel focus:border-teal focus:outline-hidden transition-all shadow-xs"
                />
              </div>

              {/* Status Filter popover button */}
              <button
                type="button"
                onClick={() => setIsFilterPopoverOpen(!isFilterPopoverOpen)}
                className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-pill text-xs font-medium border transition-colors shadow-xs ${
                  selectedStatus !== 'all'
                    ? 'bg-teal text-white border-teal'
                    : 'bg-white text-ink border-mint hover:border-steel/40'
                }`}
              >
                <SlidersHorizontal className="w-3 h-3" />
                <span>
                  {selectedStatus === 'all'
                    ? 'All Statuses'
                    : STATUS_OPTIONS.find(s => s.id === selectedStatus)?.label}
                </span>
                <ChevronDown className="w-3 h-3 opacity-60" />
              </button>

              {/* Filter Popover Content */}
              <AnimatePresence>
                {isFilterPopoverOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.98 }}
                    transition={{ duration: 0.16 }}
                    className="absolute right-0 top-10 mt-1 w-56 bg-white rounded-card p-4 border border-mint shadow-xl z-30 space-y-4 text-xs font-body"
                  >
                    <div>
                      <span className="text-[11px] font-medium text-steel uppercase block mb-1.5">
                        Filter by Status
                      </span>
                      <div className="space-y-1">
                        {STATUS_OPTIONS.map((st) => (
                          <button
                            key={st.id}
                            type="button"
                            onClick={() => {
                              setSelectedStatus(st.id);
                              setIsFilterPopoverOpen(false);
                            }}
                            className={`w-full text-left px-2.5 py-1.5 rounded-lg flex items-center justify-between transition-colors ${
                              selectedStatus === st.id ? 'bg-mint text-teal font-medium' : 'text-ink hover:bg-mist'
                            }`}
                          >
                            <span>{st.label}</span>
                            {selectedStatus === st.id && <Check className="w-3.5 h-3.5 text-teal" />}
                          </button>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Complaints Grid: Balanced, modern 2-column responsive layout */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="h-44 bg-white/70 rounded-2xl border border-mint animate-pulse" />
            ))}
          </div>
        ) : filteredComplaints.length === 0 ? (
          <div className="p-12 text-center text-steel bg-white rounded-2xl border border-mint max-w-md mx-auto my-12 shadow-sm">
            <p className="text-sm font-medium text-ink mb-1">
              No complaints found
            </p>
            <p className="text-xs text-steel mb-5">
              {searchQuery || selectedCategory !== 'all' || selectedStatus !== 'all'
                ? 'Try adjusting your filters or search query.'
                : 'No complaints have been filed in this category yet.'}
            </p>
            <button
              type="button"
              onClick={() => navigate('new')}
              className="px-4 py-2 rounded-pill bg-yellow text-ink text-xs font-semibold shadow-xs hover:bg-yellow-hover transition-colors"
            >
              File a complaint now
            </button>
          </div>
        ) : (
          <div>
            {/* Feed Status Summary */}
            <div className="flex items-center justify-between text-xs text-steel mb-4 px-1">
              <span>
                Showing <strong className="text-ink font-semibold">{filteredComplaints.length}</strong> complaints
                {selectedSort === 'recent' && ' • Newest post at top'}
              </span>
              <span className="text-[11px] text-teal font-medium">
                Click any card to view timeline & add updates
              </span>
            </div>

            {/* Responsive 2-Column Feed */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-5 items-stretch">
              {displayedComplaints.map((complaint) => (
                <ComplaintCard
                  key={complaint.id}
                  complaint={complaint}
                  isFeatured={false}
                  onRefresh={fetchBoardComplaints}
                />
              ))}
            </div>

            {/* Load more if filteredComplaints exceeds visibleLimit */}
            {filteredComplaints.length > visibleLimit && (
              <div className="mt-10 text-center">
                <button
                  type="button"
                  onClick={() => setVisibleLimit(prev => prev + 24)}
                  className="px-6 py-2.5 rounded-pill bg-white border border-mint text-xs font-medium text-ink hover:bg-mist transition-colors shadow-xs"
                >
                  Load more complaints ({filteredComplaints.length - visibleLimit} remaining)
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
