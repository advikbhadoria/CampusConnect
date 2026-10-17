import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, ArrowRight } from 'lucide-react';
import { useStore } from '../store/useStore';

export default function SignatureDocketSubmission({ submissionResult, onFinish }) {
  const { complaint, routingChain = [], isRerouted } = submissionResult;
  const navigate = useStore(s => s.navigate);

  // Stages:
  // 0: Slip appears
  // 1: Stamped "Received" in yellow
  // 2: Routing chain progression
  // 3: Finished, button ready
  const [stage, setStage] = useState(0);
  const [activeNodeIndex, setActiveNodeIndex] = useState(-1);

  useEffect(() => {
    // Stamp Received after 400ms
    const t1 = setTimeout(() => {
      setStage(1);
    }, 450);

    // Travel along routing chain pills
    const t2 = setTimeout(() => {
      setStage(2);
      routingChain.forEach((_, idx) => {
        setTimeout(() => {
          setActiveNodeIndex(idx);
        }, 800 * (idx + 1));
      });
    }, 1200);

    const totalTime = 1200 + 800 * (routingChain.length + 1);
    const t3 = setTimeout(() => {
      setStage(3);
    }, totalTime);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [routingChain]);

  return (
    <div className="fixed inset-0 z-50 bg-ink/50 backdrop-blur-xs flex items-center justify-center p-4 font-body">
      <motion.div
        initial={{ opacity: 0, scale: 0.94 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.94 }}
        className="w-full max-w-lg bg-white rounded-card-lg p-7 border border-mint text-ink relative"
      >
        {/* The Small Slip */}
        <div className="p-5 rounded-card bg-mist border border-mint relative mb-6">
          <div className="flex items-center justify-between text-xs text-steel mb-2">
            <span className="font-medium text-teal lowercase">{complaint.category}</span>
            <span>{new Date(complaint.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
          </div>

          <h3 className="font-headline font-medium text-lg text-ink leading-snug mb-1">
            {complaint.title}
          </h3>

          <p className="text-xs text-steel line-clamp-2 max-w-[55ch]">
            {complaint.body}
          </p>

          {/* Stamped "Received" in yellow */}
          <AnimatePresence>
            {stage >= 1 && (
              <motion.div
                initial={{ scale: 2, opacity: 0, rotate: -8 }}
                animate={{ scale: 1, opacity: 1, rotate: -4 }}
                transition={{ type: 'spring', stiffness: 450, damping: 20 }}
                className="absolute right-4 bottom-4"
              >
                <div className="px-3.5 py-1.5 rounded-pill bg-yellow text-ink font-headline font-medium text-xs border border-yellow-hover shadow-xs">
                  Received
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Travel along the routing chain pills */}
        <div className="space-y-3 mb-6">
          <span className="text-xs text-steel font-medium block">
            Routing pathway
          </span>

          <div className="flex flex-wrap items-center gap-2">
            {routingChain.map((node, idx) => {
              const isBlocked = node.status === 'blocked';
              const isReached = idx <= activeNodeIndex;
              const isCurrent = idx === activeNodeIndex;

              return (
                <React.Fragment key={node.role || idx}>
                  <motion.div
                    animate={{
                      scale: isCurrent ? 1.05 : 1,
                    }}
                    className={`px-3 py-1.5 rounded-pill text-xs font-medium transition-colors ${
                      isBlocked
                        ? 'bg-mist text-steel line-through border border-mint'
                        : isCurrent
                        ? 'bg-teal text-white'
                        : isReached
                        ? 'bg-mint text-teal'
                        : 'bg-mist text-steel'
                    }`}
                  >
                    <span>{node.label}</span>
                    {isBlocked && (
                      <span className="ml-1.5 text-[10px] text-error font-normal no-underline">
                        (Not notified)
                      </span>
                    )}
                  </motion.div>

                  {idx < routingChain.length - 1 && (
                    <span className="text-steel text-xs font-medium">&gt;</span>
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </div>

        {/* Action button */}
        <AnimatePresence>
          {stage >= 3 && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex justify-end pt-2 border-t border-mist"
            >
              <button
                type="button"
                onClick={() => {
                  if (onFinish) onFinish();
                  else navigate('register');
                }}
                className="px-5 py-2 rounded-pill bg-yellow text-ink font-medium text-xs hover:bg-yellow-hover transition-colors"
              >
                Back to board
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
