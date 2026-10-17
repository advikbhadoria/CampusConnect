import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { getAuthorityStats } from '../data/complaintsApi';

export default function AccountabilityBoard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStats() {
      try {
        const data = await getAuthorityStats();
        setStats(data);
      } catch (err) {
        console.error('Failed to load stats', err);
      } finally {
        setLoading(false);
      }
    }
    loadStats();
  }, []);

  return (
    <div className="min-h-screen bg-mist text-ink font-body pb-28 px-6 sm:px-9 lg:px-12 select-none">
      <div className="max-w-4xl mx-auto pt-14">
        {/* Header */}
        <section className="mb-14">
          <h1 className="font-headline font-medium text-4xl sm:text-[52px] leading-[1.08] tracking-tightest text-ink">
            Accountability<br />scorecard
          </h1>
          <p className="text-sm text-steel mt-3 font-normal max-w-[60ch]">
            Resolution rates and response times across college authorities.
          </p>
        </section>

        {loading ? (
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map(i => (
              <div key={i} className="h-14 bg-white/60 rounded-xl animate-pulse" />
            ))}
          </div>
        ) : (
          /* Ranked rows, one line per authority, no cards */
          <div className="space-y-6">
            <div className="flex items-center justify-between text-xs text-steel pb-2 border-b border-mist-dark/60 font-medium">
              <span>Authority</span>
              <div className="flex items-center gap-12 pr-2">
                <span className="w-48 sm:w-64 text-left">Resolution rate</span>
                <span className="w-20 text-right">Avg response</span>
              </div>
            </div>

            <div className="space-y-5">
              {stats?.departments?.map((dept, index) => (
                <div
                  key={dept.id}
                  className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-sm py-2 border-b border-mist-dark/40"
                >
                  {/* Left: Rank & Title */}
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-steel font-medium w-4">
                      0{index + 1}
                    </span>
                    <div>
                      <span className="font-medium text-ink block leading-tight">
                        {dept.name}
                      </span>
                      <span className="text-xs text-steel font-normal">
                        {dept.inCharge}
                      </span>
                    </div>
                  </div>

                  {/* Right: Teal Bar for Resolution Rate & Avg Response as Plain Text */}
                  <div className="flex items-center gap-8 sm:gap-12 pl-7 sm:pl-0">
                    {/* Animated Teal Bar */}
                    <div className="w-48 sm:w-64 space-y-1">
                      <div className="flex items-center justify-between text-xs text-steel">
                        <span>{dept.resolutionRate}%</span>
                        <span className="text-[11px]">{dept.resolved}/{dept.total}</span>
                      </div>
                      <div className="w-full h-1.5 bg-mint rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${dept.resolutionRate}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.6, ease: [0.2, 0.8, 0.2, 1] }}
                          className="h-full bg-teal rounded-full"
                        />
                      </div>
                    </div>

                    {/* Average Response Time as Plain Text */}
                    <div className="w-20 text-right text-xs text-steel font-medium">
                      {dept.avgResponseHours}h
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
