import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Plus, ShieldAlert, Check, Trash2, Clock, Eye, AlertCircle } from 'lucide-react';
import { getComplaints, simulateNewComplaint, getModerationQueue, resolveReport } from '../data/complaintsApi';
import { AUTHORITIES } from '../data/authorities';
import { useStore } from '../store/useStore';
import AuthorityDrawer from '../components/AuthorityDrawer';

export default function AuthorityDashboard() {
  const currentRole = useStore(s => s.currentRole);
  const realtimeTick = useStore(s => s.realtimeTick);
  const [complaints, setComplaints] = useState([]);
  const [moderationList, setModerationList] = useState([]);
  const [activeTab, setActiveTab] = useState('queue'); // 'queue' | 'moderation'
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDocket, setSelectedDocket] = useState(null);
  const [simulating, setSimulating] = useState(false);

  const activeOfficer = AUTHORITIES[currentRole] || AUTHORITIES.chief_warden;

  const loadData = async () => {
    setLoading(true);
    try {
      const data = await getComplaints(currentRole);
      setComplaints(data);
      const mod = await getModerationQueue(currentRole);
      setModerationList(mod);
    } catch (err) {
      console.error('Failed to load queue', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [currentRole, realtimeTick]);

  const handleSimulate = async () => {
    setSimulating(true);
    try {
      await simulateNewComplaint();
      await loadData();
    } catch (err) {
      console.error('Failed to simulate', err);
    } finally {
      setSimulating(false);
    }
  };

  const handleModerationDecision = async (id, decision) => {
    try {
      await resolveReport(id, decision, currentRole);
      await loadData();
    } catch (err) {
      console.error('Failed to resolve report', err);
    }
  };

  // Filtered queue items
  const filteredQueue = useMemo(() => {
    return complaints.filter((c) => {
      if (c.report_status === 'removed') return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        return (c.title || '').toLowerCase().includes(q) || (c.category || '').toLowerCase().includes(q);
      }
      return true;
    });
  }, [complaints, searchQuery]);

  return (
    <div className="min-h-screen bg-ink text-mist font-body pb-28 px-6 sm:px-9 lg:px-12 select-none">
      <div className="max-w-6xl mx-auto pt-14">
        {/* Header Row */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 mb-8 border-b border-ink-border">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs text-yellow font-medium">
                {activeOfficer.title}
              </span>
              <span className="text-xs text-steel">• {activeOfficer.name}</span>
            </div>
            <h1 className="font-headline font-medium text-3xl sm:text-4xl text-white tracking-tight">
              Authority queue
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              disabled={simulating}
              onClick={handleSimulate}
              className="px-4 py-2 rounded-pill bg-yellow text-ink text-xs font-medium hover:bg-yellow-hover disabled:opacity-50 transition-colors"
            >
              {simulating ? 'Injecting...' : 'Simulate complaint'}
            </button>
          </div>
        </div>

        {/* Tab Switcher: Queue vs Moderation */}
        <div className="flex items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-6 text-sm font-medium">
            <button
              type="button"
              onClick={() => setActiveTab('queue')}
              className={`relative py-1 transition-colors ${
                activeTab === 'queue' ? 'text-white' : 'text-steel hover:text-mist'
              }`}
            >
              <span>Queue ({filteredQueue.length})</span>
              {activeTab === 'queue' && (
                <motion.div
                  layoutId="activeQueueUnderline"
                  className="absolute bottom-0 left-0 right-0 h-[2px] bg-teal rounded-full"
                  transition={{ duration: 0.2 }}
                />
              )}
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('moderation')}
              className={`relative py-1 transition-colors flex items-center gap-1.5 ${
                activeTab === 'moderation' ? 'text-white' : 'text-steel hover:text-mist'
              }`}
            >
              <span>Moderation</span>
              {moderationList.length > 0 && (
                <span className="w-2 h-2 rounded-full bg-yellow" />
              )}
              {activeTab === 'moderation' && (
                <motion.div
                  layoutId="activeQueueUnderline"
                  className="absolute bottom-0 left-0 right-0 h-[2px] bg-teal rounded-full"
                  transition={{ duration: 0.2 }}
                />
              )}
            </button>
          </div>

          {activeTab === 'queue' && (
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-steel" />
              <input
                type="text"
                placeholder="Search queue..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-44 sm:w-56 pl-8 pr-3 py-1.5 text-xs rounded-pill bg-ink-surface border border-ink-border text-white placeholder:text-steel focus:border-teal focus:outline-hidden"
              />
            </div>
          )}
        </div>

        {/* TAB 1: Clean Queue Table (Title, Category, Status, SLA, Votes) */}
        {activeTab === 'queue' && (
          <div className="rounded-card border border-ink-border bg-ink-surface overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-ink-border text-steel font-medium">
                    <th className="py-3.5 px-5">Title</th>
                    <th className="py-3.5 px-4">Category</th>
                    <th className="py-3.5 px-4">Status</th>
                    <th className="py-3.5 px-4">SLA</th>
                    <th className="py-3.5 px-5 text-right">Votes</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-ink-border">
                  {filteredQueue.map((item) => {
                    const isOverdue = item.status !== 'resolved' && item.status !== 'closed' &&
                                      item.sla_deadline && new Date(item.sla_deadline).getTime() < Date.now();
                    const isResolved = item.status === 'resolved' || item.status === 'closed';

                    return (
                      <tr
                        key={item.id}
                        onClick={() => setSelectedDocket(item)}
                        className="hover:bg-ink cursor-pointer transition-colors"
                      >
                        {/* Title */}
                        <td className="py-3.5 px-5 max-w-sm">
                          <span className="font-medium text-white line-clamp-1 block">
                            {item.title}
                          </span>
                        </td>

                        {/* Category */}
                        <td className="py-3.5 px-4 whitespace-nowrap text-steel lowercase">
                          {item.category}
                        </td>

                        {/* Status */}
                        <td className="py-3.5 px-4 whitespace-nowrap">
                          <span className={`px-2.5 py-0.5 rounded-pill text-[11px] font-medium lowercase ${
                            isResolved
                              ? 'bg-teal/20 text-mint'
                              : isOverdue
                              ? 'bg-yellow/20 text-yellow'
                              : 'bg-ink border border-ink-border text-steel'
                          }`}>
                            {item.status.replace('_', ' ')}
                          </span>
                        </td>

                        {/* SLA */}
                        <td className="py-3.5 px-4 whitespace-nowrap text-steel">
                          {isOverdue ? (
                            <span className="text-yellow font-medium">Overdue</span>
                          ) : isResolved ? (
                            <span className="text-mint">Done</span>
                          ) : (
                            <span>{item.sla_hours || 48}h</span>
                          )}
                        </td>

                        {/* Votes */}
                        <td className="py-3.5 px-5 whitespace-nowrap text-right font-headline font-medium text-white">
                          {item.upvote_count || 0}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 2: Moderation Tab for Reported Complaints */}
        {activeTab === 'moderation' && (
          <div className="space-y-3">
            {moderationList.length === 0 ? (
              <div className="p-8 text-center text-steel bg-ink-surface rounded-card border border-ink-border text-xs">
                No complaints currently reported or under review.
              </div>
            ) : (
              moderationList.map((item) => (
                <div
                  key={item.id}
                  className="p-5 rounded-card bg-ink-surface border border-ink-border flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded-pill bg-yellow/20 text-yellow text-[11px] font-medium">
                        {item.report_count} flags
                      </span>
                      <span className="text-steel lowercase">{item.category}</span>
                      {item.report_status === 'under_review' && (
                        <span className="text-yellow text-[11px] font-medium">• Under review</span>
                      )}
                      {item.report_status === 'removed' && (
                        <span className="text-steel text-[11px] line-through">• Removed</span>
                      )}
                    </div>
                    <p className="font-medium text-white text-sm">{item.title}</p>
                    <p className="text-steel line-clamp-1 max-w-xl">{item.body}</p>

                    {item.reports && item.reports.length > 0 && (
                      <p className="text-[11px] text-steel/80 pt-1">
                        Flagged reasons: {item.reports.map(r => r.reason).join(', ')}
                      </p>
                    )}
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      type="button"
                      onClick={() => handleModerationDecision(item.id, 'keep')}
                      className="px-3 py-1.5 rounded-pill bg-teal text-white hover:bg-teal-hover font-medium transition-colors"
                    >
                      Keep
                    </button>
                    <button
                      type="button"
                      onClick={() => handleModerationDecision(item.id, 'remove')}
                      className="px-3 py-1.5 rounded-pill bg-ink border border-ink-border text-steel hover:text-white transition-colors"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>

      {/* Side Drawer for Details */}
      <AnimatePresence>
        {selectedDocket && (
          <AuthorityDrawer
            complaint={selectedDocket}
            onClose={() => setSelectedDocket(null)}
            onRefresh={loadData}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
