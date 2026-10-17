import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowUpRight, ThumbsUp, Sparkles, Repeat, AlertCircle } from 'lucide-react';
import { classifyComplaint, findDuplicates, createComplaint, upvote } from '../data/complaintsApi';
import SignatureDocketSubmission from '../components/SignatureDocketSubmission';
import { useStore } from '../store/useStore';

const CATEGORIES = [
  { id: 'hostel', label: 'Hostel' },
  { id: 'mess', label: 'Mess' },
  { id: 'academics', label: 'Academics' },
  { id: 'faculty', label: 'Faculty' },
  { id: 'labs', label: 'Labs' },
  { id: 'library', label: 'Library' },
  { id: 'sports', label: 'Sports' },
  { id: 'campus', label: 'Campus' },
  { id: 'transport', label: 'Transport' },
  { id: 'admin', label: 'Admin' },
  { id: 'safety', label: 'Safety' },
  { id: 'other', label: 'Other' },
];

const DIFFERENT_REASONS = [
  'Different issue',
  'Still not fixed after a long time',
  'Came back after a fix',
];

export default function FileComplaint() {
  const navigate = useStore(s => s.navigate);
  const studentId = useStore(s => s.studentId);
  const studentName = useStore(s => s.studentName);

  // Form Fields
  const [topic, setTopic] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('hostel');
  const [suggestedCategory, setSuggestedCategory] = useState(null);
  const [location, setLocation] = useState('');
  const [isPrivate, setIsPrivate] = useState(false);
  const [hideName, setHideName] = useState(false);
  const [forcedPrivate, setForcedPrivate] = useState(false);
  const [forcedReason, setForcedReason] = useState('');
  const [aboutPerson, setAboutPerson] = useState(null);
  const [duplicateOf, setDuplicateOf] = useState(null);

  // Duplicate check state
  const [duplicates, setDuplicates] = useState([]);
  const [isDuplicatePanelOpen, setIsDuplicatePanelOpen] = useState(false);
  const [askingDifferentReasonFor, setAskingDifferentReasonFor] = useState(null);

  // Submission & Signature moment
  const [submitting, setSubmitting] = useState(false);
  const [submissionResult, setSubmissionResult] = useState(null);

  const topicInputRef = useRef(null);

  // Trigger classification & duplicate check
  const runChecks = async (text) => {
    if (!text || text.trim().length < 4) return;
    try {
      // 1. Classification
      const classified = await classifyComplaint(text);
      if (classified) {
        let mappedCat = classified.category;
        if (mappedCat === 'infrastructure') mappedCat = 'campus';
        if (mappedCat === 'emergency') mappedCat = 'safety';
        setSuggestedCategory(mappedCat);
        setCategory(mappedCat);
        setAboutPerson(classified.about_person);

        // Conflict check: complaints about warden or teacher force private & hidden
        if (classified.about_person === 'warden' || classified.about_person === 'teacher' || classified.category === 'faculty') {
          setForcedPrivate(true);
          setIsPrivate(true);
          setHideName(true);
          setForcedReason('Complaints concerning staff or faculty are automatically kept private to safeguard student privacy.');
        } else {
          setForcedPrivate(false);
          setForcedReason('');
        }
      }

      // 2. Duplicate Check
      const matches = await findDuplicates(text, classified?.category);
      if (matches && matches.length > 0) {
        setDuplicates(matches.slice(0, 2));
        setIsDuplicatePanelOpen(true);
      } else {
        setDuplicates([]);
        setIsDuplicatePanelOpen(false);
      }
    } catch (err) {
      console.error('Check failed', err);
    }
  };

  // Idle check 800ms
  useEffect(() => {
    if (!topic.trim()) return;
    const timer = setTimeout(() => {
      runChecks(topic);
    }, 800);
    return () => clearTimeout(timer);
  }, [topic]);

  const handleTopicBlur = () => {
    runChecks(topic);
  };

  const handleUpvoteDuplicate = async (existingId) => {
    await upvote(existingId, studentId);
    navigate('detail', existingId);
  };

  const handleHappenedAgain = (resolvedComplaint) => {
    setDuplicateOf(resolvedComplaint.id);
    setTopic(resolvedComplaint.title);
    setIsDuplicatePanelOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!topic.trim() || !description.trim()) return;

    setSubmitting(true);
    try {
      const payload = {
        title: topic,
        body: description,
        category: category === 'safety' ? 'emergency' : (category === 'campus' ? 'infrastructure' : category),
        severity: category === 'safety' ? 5 : (isPrivate ? 4 : 3),
        about_person: aboutPerson,
        location: location || 'AIT Campus',
        visibility: isPrivate ? 'private' : 'public',
        hide_identity: hideName,
        duplicate_of: duplicateOf,
        reporter_name: hideName ? 'Confidential Student' : studentName,
        reporter_id: studentId,
      };

      const result = await createComplaint(payload);
      setSubmissionResult(result);
      useStore.setState((state) => ({ realtimeTick: state.realtimeTick + 1 }));
    } catch (err) {
      console.error('Failed to submit complaint', err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-mist text-ink font-body pb-28 px-6 sm:px-9 lg:px-12 select-none">
      {/* Signature moment modal on submit */}
      {submissionResult && (
        <SignatureDocketSubmission
          submissionResult={submissionResult}
          onFinish={() => navigate('register')}
        />
      )}

      <div className="max-w-2xl mx-auto pt-10">
        <button
          type="button"
          onClick={() => navigate('register')}
          className="inline-flex items-center gap-1.5 text-xs text-steel hover:text-ink transition-colors mb-8"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Back to board
        </button>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* 1. Topic (required): single line input, large 28px type, real placeholder */}
          <div className="space-y-2">
            <label className="text-xs text-steel font-medium block">
              Topic
            </label>
            <input
              ref={topicInputRef}
              type="text"
              required
              placeholder="Geyser not working in Block B"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              onBlur={handleTopicBlur}
              className="w-full text-2xl sm:text-[28px] font-headline font-medium text-ink bg-transparent border-b border-mist-dark pb-2 placeholder:text-steel/50 focus:border-teal focus:outline-hidden transition-colors"
            />
          </div>

          {/* DUPLICATE CHECK: slide in panel below topic field (not a modal) */}
          <AnimatePresence>
            {isDuplicatePanelOpen && duplicates.length > 0 && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden"
              >
                <div className="p-4 rounded-card bg-white border border-mint space-y-3 my-2 text-xs">
                  <span className="text-steel font-medium block">
                    Similar complaints already open
                  </span>

                  <div className="space-y-2">
                    {duplicates.map(({ complaint: dup, isResolved, resolvedDaysAgo }) => (
                      <div
                        key={dup.id}
                        className="p-3 rounded-lg bg-mist flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                      >
                        <div>
                          <p className="font-medium text-ink leading-snug">{dup.title}</p>
                          <span className="text-[11px] text-steel">
                            {isResolved ? `Fixed ${resolvedDaysAgo || 5} days ago` : `${dup.upvote_count} votes`}
                          </span>
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                          {isResolved ? (
                            <button
                              type="button"
                              onClick={() => handleHappenedAgain(dup)}
                              className="px-3 py-1 rounded-pill bg-mint text-teal font-medium hover:bg-mint-dark"
                            >
                              It happened again
                            </button>
                          ) : (
                            <button
                              type="button"
                              onClick={() => handleUpvoteDuplicate(dup.id)}
                              className="px-3 py-1 rounded-pill bg-yellow text-ink font-medium hover:bg-yellow-hover"
                            >
                              Upvote this one
                            </button>
                          )}

                          <button
                            type="button"
                            onClick={() => setAskingDifferentReasonFor(dup.id)}
                            className="px-3 py-1 rounded-pill bg-white border border-mint text-steel hover:text-ink"
                          >
                            Mine is different
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* One-tap reason chips if "Mine is different" clicked */}
                  {askingDifferentReasonFor && (
                    <div className="pt-2 border-t border-mist space-y-1.5">
                      <span className="text-[11px] text-steel block">
                        Why is yours different?
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {DIFFERENT_REASONS.map((reason) => (
                          <button
                            key={reason}
                            type="button"
                            onClick={() => {
                              setIsDuplicatePanelOpen(false);
                              setAskingDifferentReasonFor(null);
                            }}
                            className="px-2.5 py-1 rounded-pill bg-white border border-mint text-[11px] text-ink hover:bg-mist"
                          >
                            {reason}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* 2. Description (required): textarea, 3 rows, max 300 chars with small counter */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs text-steel">
              <label className="font-medium">Description</label>
              <span>{description.length}/300</span>
            </div>
            <textarea
              required
              rows={3}
              maxLength={300}
              placeholder="What happened and where?"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-3.5 rounded-card bg-white border border-mint text-sm text-ink placeholder:text-steel/50 focus:border-teal focus:outline-hidden transition-colors resize-none leading-relaxed"
            />
          </div>

          {/* 3. Category (required): row of selectable chips with "Suggested" tag */}
          <div className="space-y-2">
            <label className="text-xs text-steel font-medium block">
              Category
            </label>
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map((cat) => {
                const isSelected = category === cat.id;
                const isSuggested = suggestedCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setCategory(cat.id)}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-pill text-xs font-medium transition-colors ${
                      isSelected
                        ? 'bg-teal text-white'
                        : 'bg-white border border-mint text-ink hover:bg-mist'
                    }`}
                  >
                    <span>{cat.label}</span>
                    {isSuggested && !isSelected && (
                      <span className="text-[10px] bg-mint text-teal px-1.5 py-0.2 rounded-full">
                        Suggested
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 4. Location (optional): small text field */}
          <div className="space-y-1.5">
            <label className="text-xs text-steel font-medium block">
              Location, optional
            </label>
            <input
              type="text"
              placeholder="Block B, 3rd floor"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full p-3 rounded-card bg-white border border-mint text-xs text-ink placeholder:text-steel/50 focus:border-teal focus:outline-hidden transition-colors"
            />
          </div>

          {/* 5. Compact row of two toggles: "Post publicly / Keep private" & "Hide my name" */}
          <div className="p-4 rounded-card bg-white border border-mint space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
              {/* Toggle 1 */}
              <label className="flex items-center gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  disabled={forcedPrivate}
                  checked={isPrivate}
                  onChange={(e) => setIsPrivate(e.target.checked)}
                  className="w-4 h-4 accent-teal rounded"
                />
                <span className="text-ink font-medium">Keep private</span>
                <span className="text-steel font-normal">
                  (only authorities see this)
                </span>
              </label>

              {/* Toggle 2 */}
              <label className="flex items-center gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  disabled={forcedPrivate}
                  checked={hideName}
                  onChange={(e) => setHideName(e.target.checked)}
                  className="w-4 h-4 accent-teal rounded"
                />
                <span className="text-ink font-medium">Hide my name</span>
                <span className="text-steel font-normal">
                  (anonymous)
                </span>
              </label>
            </div>

            {forcedReason && (
              <p className="text-[11px] text-teal leading-tight pt-1 border-t border-mist">
                {forcedReason}
              </p>
            )}
          </div>

          {/* Bottom: One yellow "Submit complaint" button. Nothing else on the screen. */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={submitting || !topic.trim() || !description.trim()}
              className="px-6 py-3 rounded-pill bg-yellow text-ink font-headline font-medium text-sm hover:bg-yellow-hover disabled:opacity-50 transition-colors shadow-none"
            >
              {submitting ? 'Submitting...' : 'Submit complaint'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
