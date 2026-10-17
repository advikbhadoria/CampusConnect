import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowBigUp } from 'lucide-react';
import { upvote } from '../data/complaintsApi';
import { useStore } from '../store/useStore';

export default function OdometerUpvote({
  complaintId,
  initialCount = 0,
  initialHasUpvoted = false,
  variant = 'default', // 'default' | 'overdue' | 'resolved' | 'featured'
  onUpvoteChange,
}) {
  const [count, setCount] = useState(initialCount);
  const [hasUpvoted, setHasUpvoted] = useState(initialHasUpvoted);
  const [isBouncing, setIsBouncing] = useState(false);
  const studentId = useStore(s => s.studentId);

  // If resolved state, prompt states: "vote count as plain text"
  if (variant === 'resolved') {
    return (
      <span className="text-xs font-medium text-steel">
        {count} votes
      </span>
    );
  }

  const handleVote = async (e) => {
    e.stopPropagation();
    setIsBouncing(true);

    const nextVoted = !hasUpvoted;
    const nextCount = nextVoted ? count + 1 : Math.max(0, count - 1);
    setHasUpvoted(nextVoted);
    setCount(nextCount);

    if (onUpvoteChange) {
      onUpvoteChange(nextCount, nextVoted);
    }

    try {
      const res = await upvote(complaintId, studentId);
      if (res) {
        setCount(res.upvote_count);
        setHasUpvoted(res.hasUpvoted);
      }
    } catch (err) {
      console.error('Failed to upvote', err);
    } finally {
      setTimeout(() => setIsBouncing(false), 220);
    }
  };

  const digits = String(count).split('');

  // Styling based on state and variant
  // Contrast rule: Yellow ONLY with Ink text, never white!
  let buttonStyle = 'border border-teal text-teal hover:bg-mint/40';
  if (hasUpvoted || variant === 'featured' || variant === 'overdue') {
    buttonStyle = 'bg-yellow text-ink border-transparent hover:bg-yellow-hover';
  }

  return (
    <motion.button
      type="button"
      onClick={handleVote}
      animate={isBouncing ? { scale: [1, 1.08, 0.96, 1] } : { scale: 1 }}
      transition={{ duration: 0.22, ease: [0.2, 0.8, 0.2, 1] }}
      aria-label={`Upvote complaint. Count: ${count}`}
      className={`relative inline-flex items-center gap-1.5 px-3 py-1.5 rounded-pill text-xs font-medium tracking-normal transition-colors duration-200 select-none ${buttonStyle}`}
    >
      <ArrowBigUp
        className={`w-3.5 h-3.5 transition-transform ${
          hasUpvoted ? 'fill-ink text-ink' : (variant === 'featured' || variant === 'overdue') ? 'fill-ink text-ink' : 'text-teal'
        }`}
      />

      {/* Odometer roll container */}
      <div className="flex items-center overflow-hidden h-4 leading-none font-headline font-medium text-[13px]">
        {digits.map((digit, idx) => (
          <div key={`${idx}-${digit}`} className="relative w-[7.5px] h-4 overflow-hidden flex items-center justify-center">
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.span
                key={digit}
                initial={{ y: hasUpvoted ? 12 : -12, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: hasUpvoted ? -12 : 12, opacity: 0 }}
                transition={{ duration: 0.18, ease: [0.2, 0.8, 0.2, 1] }}
                className="absolute inset-0 flex items-center justify-center"
              >
                {digit}
              </motion.span>
            </AnimatePresence>
          </div>
        ))}
      </div>
    </motion.button>
  );
}
