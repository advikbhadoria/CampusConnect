import { useState, useEffect } from 'react';
import {
  ArrowLeft,
  ExternalLink,
  Briefcase,
  Code,
  Video,
  MessageSquare,
  Award,
  Users,
  ChevronRight,
  Globe,
  X,
  Info,
  CheckCircle2,
  AlertCircle,
  Calendar as CalendarIcon,
  Sparkles,
  MapPin,
  ClipboardList
} from 'lucide-react';
import type { Club, Member } from '../data/clubs';
import { cn } from '../utils/cn';
import { Calendar } from './Calendar';
import { Navbar } from './Navbar';

interface ClubDetailsProps {
  club: Club;
  onBack: () => void;
}

const TABS = ['Overview', 'Members Directory', 'Events Calendar', 'Recruitment'];

const InstagramIcon = ({ size = 20 }: { size?: number }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

const MemberCard = ({ member }: { member: Member }) => (
  <div className="flex items-center gap-4 p-4 rounded-xl border border-slate-100 bg-white shadow-[0_2px_10px_rgb(0,0,0,0.02)] hover:border-purple-200 transition-colors">
    <div className="w-12 h-12 rounded-full overflow-hidden shrink-0 border border-slate-200">
      <img src={member.avatarUrl} alt={member.name} className="w-full h-full object-cover" />
    </div>
    <div>
      <h4 className="font-bold text-slate-800">{member.name}</h4>
      <p className="text-sm text-slate-500">{member.role} • {member.branch}</p>
    </div>
  </div>
);

export function ClubDetails({ club, onBack }: ClubDetailsProps) {
  const [activeTab, setActiveTab] = useState(TABS[0]);
  const [showActivityModal, setShowActivityModal] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState<any>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [club]);

  // Lock body scroll when full-screen modal is active
  useEffect(() => {
    if (showActivityModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [showActivityModal]);

  // Handle ESC key to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && showActivityModal) {
        setShowActivityModal(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showActivityModal]);

  const instagramUrl = club.socials.instagram && club.socials.instagram !== "Coming soon"
    ? (club.socials.instagram.startsWith('http') ? club.socials.instagram : `https://instagram.com/${club.socials.instagram.replace('@', '')}`)
    : null;

  const nexusUrl = club.socials.nexus || "https://aitnexus.in";

  return (
    <div className="min-h-screen bg-slate-50 animate-in fade-in duration-300">
      {/* Universal Top Navigation Bar */}
      <Navbar />

      {/* Subheader / Breadcrumb Bar */}
      <div className="bg-white/90 backdrop-blur-md border-b border-slate-200 sticky top-16 z-30 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between">
          <button 
            onClick={onBack}
            className="flex items-center gap-2 text-slate-600 hover:text-purple-600 font-bold text-sm transition-colors cursor-pointer bg-slate-100 hover:bg-purple-50 px-4 py-2 rounded-xl"
          >
            <ArrowLeft size={18} />
            <span>Back to All Clubs</span>
          </button>
          
          <div className="flex items-center gap-3">
            <a
              href={nexusUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-700 font-bold text-xs border border-purple-200 transition-colors"
            >
              <Globe size={14} />
              <span>AIT Nexus ({nexusUrl.replace(/^https?:\/\//, '')}) ↗</span>
            </a>

            <button
              onClick={() => setActiveTab('Recruitment')}
              className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white px-5 py-2 rounded-xl font-bold text-sm transition-all shadow-md shadow-purple-200 cursor-pointer"
            >
              <span>Join Club</span>
              <ExternalLink size={15} />
            </button>
          </div>
        </div>
      </div>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 flex flex-col lg:flex-row gap-8">
        
        {/* Left Sidebar / Profile Card */}
        <div className="w-full lg:w-1/3 shrink-0">
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] sticky top-36">
            <div className="flex flex-col items-center text-center">
              <div className="w-28 h-28 rounded-full bg-slate-50 border-2 border-slate-100 flex items-center justify-center text-slate-400 mb-5 shadow-sm overflow-hidden">
                {club.logoUrl ? (
                  <img src={club.logoUrl} alt={club.name} className="w-full h-full object-cover" />
                ) : (
                  <Users size={48} />
                )}
              </div>
              
              <span className={`inline-block px-3.5 py-1 rounded-full text-xs font-bold mb-3 uppercase tracking-wider bg-${club.themeColor}-100 text-${club.themeColor}-700`}>
                {club.category}
              </span>
              
              <h2 className="text-2xl font-extrabold text-slate-900 mb-2 leading-tight">{club.name}</h2>
              <p className="text-slate-500 mb-6 text-sm leading-relaxed">
                {club.tagline}
              </p>
              
              {/* Social Links Row */}
              <div className="flex flex-wrap gap-2.5 justify-center mb-6">
                {instagramUrl && (
                  <a 
                    href={instagramUrl} 
                    target="_blank" 
                    rel="noreferrer" 
                    className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-pink-50 hover:bg-pink-100 text-pink-700 text-xs font-bold transition-colors border border-pink-100"
                    title={`Instagram: ${club.socials.instagram}`}
                  >
                    <InstagramIcon size={16} />
                    <span>{club.socials.instagram}</span>
                  </a>
                )}
                <a
                  href={nexusUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-700 text-xs font-bold transition-colors border border-purple-100"
                  title="Official Club Portal on AIT Nexus"
                >
                  <Globe size={16} />
                  <span>aitnexus.in ↗</span>
                </a>
                {club.socials.linkedin && club.socials.linkedin !== "Coming soon" && (
                  <a href={club.socials.linkedin} target="_blank" rel="noreferrer" className="w-9 h-9 rounded-xl bg-slate-50 text-slate-500 hover:bg-blue-50 hover:text-blue-600 flex items-center justify-center transition-colors border border-slate-100" title="LinkedIn"><Briefcase size={16} /></a>
                )}
                {club.socials.github && club.socials.github !== "Coming soon" && (
                  <a href={club.socials.github} target="_blank" rel="noreferrer" className="w-9 h-9 rounded-xl bg-slate-50 text-slate-500 hover:bg-slate-200 hover:text-slate-900 flex items-center justify-center transition-colors border border-slate-100" title="GitHub"><Code size={16} /></a>
                )}
                {club.socials.youtube && club.socials.youtube !== "Coming soon" && (
                  <a href={club.socials.youtube} target="_blank" rel="noreferrer" className="w-9 h-9 rounded-xl bg-slate-50 text-slate-500 hover:bg-red-50 hover:text-red-600 flex items-center justify-center transition-colors border border-slate-100" title="YouTube"><Video size={16} /></a>
                )}
                {club.socials.discord && club.socials.discord !== "Coming soon" && (
                  <a href={club.socials.discord} target="_blank" rel="noreferrer" className="w-9 h-9 rounded-xl bg-slate-50 text-slate-500 hover:bg-indigo-50 hover:text-indigo-600 flex items-center justify-center transition-colors border border-slate-100" title="Discord"><MessageSquare size={16} /></a>
                )}
              </div>

              {/* Status & Stats */}
              <div className="w-full border-t border-slate-100 pt-5 space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-semibold text-slate-500">Recruitment Status</span>
                  <span className={cn("text-xs font-bold px-2.5 py-1 rounded-md uppercase", club.recruitmentStatus === 'Open' ? "bg-emerald-100 text-emerald-700" : "bg-slate-100 text-slate-500")}>
                    {club.recruitmentStatus}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs font-semibold text-slate-500">Total Active Members</span>
                  <span className="text-xs font-bold text-slate-800">
                    {club.secretaries.length + club.jointSecs.length + club.teMembers.length + club.beMembers.length} Members
                  </span>
                </div>
              </div>
              
              {/* Direct AIT Nexus CTA */}
              <a
                href={nexusUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full mt-6 bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-xl font-bold text-xs shadow-md shadow-purple-200 transition-colors flex items-center justify-center gap-2"
              >
                <span>Open AIT Nexus Hub</span>
                <ExternalLink size={14} />
              </a>
            </div>
          </div>
        </div>

        {/* Right Content Area */}
        <div className="w-full lg:w-2/3 flex flex-col gap-6">
          
          {/* Custom Tabs */}
          <div className="flex overflow-x-auto hide-scrollbar gap-2 p-1.5 bg-white rounded-2xl border border-slate-100 shadow-[0_2px_10px_rgb(0,0,0,0.02)]">
            {TABS.map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={cn(
                  "whitespace-nowrap px-6 py-2.5 rounded-xl text-sm font-bold transition-all cursor-pointer",
                  activeTab === tab 
                    ? "bg-purple-600 text-white shadow-md shadow-purple-200" 
                    : "text-slate-500 hover:text-slate-900 hover:bg-slate-50"
                )}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="bg-transparent rounded-3xl min-h-[500px]">
            
            {/* OVERVIEW TAB */}
            {activeTab === 'Overview' && (
              <div className="space-y-6 animate-in fade-in duration-300">
                <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-xs">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-extrabold text-slate-900 flex items-center gap-2.5">
                      <Award className="text-purple-600" /> Key Activities &amp; Events
                    </h3>
                    <span className="text-xs font-semibold text-slate-400 bg-slate-50 px-3 py-1 rounded-full border border-slate-100">
                      Click any activity for full details
                    </span>
                  </div>

                  <div className="flex flex-col gap-5">
                    {club.keyActivities.map((act, i) => (
                      <div
                        key={i}
                        onClick={() => { setSelectedActivity(act); setShowActivityModal(true); }}
                        className="group flex flex-col sm:flex-row gap-5 p-5 rounded-2xl bg-slate-50/70 border border-slate-200/70 hover:bg-purple-50/40 hover:border-purple-300 hover:shadow-md transition-all duration-200 cursor-pointer"
                      >
                        <div className="w-full sm:w-52 h-36 shrink-0 rounded-xl overflow-hidden bg-slate-200 relative">
                          <img src={act.imageUrl} alt={act.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-3">
                            <span className="text-[10px] font-bold text-white uppercase tracking-wider bg-purple-600/90 px-2 py-0.5 rounded-md backdrop-blur-xs">
                              Key Activity
                            </span>
                          </div>
                        </div>
                        <div className="flex flex-col justify-center flex-grow">
                          <div className="flex items-center justify-between gap-2 mb-1.5">
                            <h4 className="text-lg font-bold text-slate-900 group-hover:text-purple-700 transition-colors">
                              {act.title}
                            </h4>
                            <span className="text-xs font-bold text-purple-600 shrink-0 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                              Full Details <ChevronRight size={14} />
                            </span>
                          </div>
                          <p className="text-slate-600 text-xs sm:text-sm leading-relaxed line-clamp-2 mb-3">
                            {act.description}
                          </p>
                          <div className="flex flex-wrap items-center gap-2 text-[11px] text-slate-500">
                            {act.eligibility && (
                              <span className="px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-700 font-semibold border border-emerald-100">
                                🎯 {act.eligibility.length > 30 ? act.eligibility.slice(0, 30) + '...' : act.eligibility}
                              </span>
                            )}
                            <span className="px-2.5 py-1 rounded-md bg-purple-50 text-purple-700 font-semibold border border-purple-100">
                              📋 Rules &amp; Steps Available
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* About & Mission Box */}
                <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-xs">
                  <h3 className="text-lg font-bold text-slate-900 mb-3 flex items-center gap-2">
                    <Sparkles className="text-amber-500" size={18} /> Official AIT Nexus Registration
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed mb-4">
                    All student events, recruitment drives, workshop registrations, and official certification for <strong>{club.name}</strong> are synchronized directly through the campus-wide AIT Nexus portal.
                  </p>
                  <a
                    href={nexusUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-xs font-bold text-purple-600 hover:text-purple-700 bg-purple-50 hover:bg-purple-100 px-4 py-2 rounded-xl transition-colors border border-purple-200"
                  >
                    <span>Visit {club.name} on aitnexus.in</span>
                    <ExternalLink size={13} />
                  </a>
                </div>
              </div>
            )}

            {/* MEMBERS DIRECTORY TAB */}
            {activeTab === 'Members Directory' && (
              <div className="space-y-8 animate-in fade-in duration-300 bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-xs">
                
                <section>
                  <h3 className="text-xl font-extrabold text-slate-900 mb-6 flex items-center gap-2">
                     <Users className="text-purple-600" /> Core Leadership &amp; Secretaries
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {club.secretaries.map((sec, i) => <MemberCard key={i} member={sec} />)}
                  </div>
                </section>

                <div className="h-px w-full bg-slate-100 my-8"></div>

                <section>
                  <h3 className="text-xl font-extrabold text-slate-900 mb-6 flex items-center gap-2">
                     <Users className="text-purple-600" /> Executive Committee
                  </h3>
                  <div className="space-y-6">
                    <div>
                      <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 border-b border-slate-100 pb-2">Joint Secretaries</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {club.jointSecs.map((member, i) => <MemberCard key={i} member={member} />)}
                      </div>
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 border-b border-slate-100 pb-2">BE Mentors</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {club.beMembers.map((member, i) => <MemberCard key={i} member={member} />)}
                      </div>
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 border-b border-slate-100 pb-2">TE Members</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {club.teMembers.map((member, i) => <MemberCard key={i} member={member} />)}
                      </div>
                    </div>
                  </div>
                </section>
              </div>
            )}

            {/* EVENTS CALENDAR TAB */}
            {activeTab === 'Events Calendar' && (
              <div className="animate-in fade-in duration-300">
                <Calendar events={club.events} />
              </div>
            )}

            {/* RECRUITMENT TAB */}
            {activeTab === 'Recruitment' && (
              <div className="space-y-6 animate-in fade-in duration-300">
                {club.recruitmentStatus === 'Open' ? (
                  club.interviews.map((interview, i) => (
                    <div key={i} className="bg-white rounded-3xl p-6 sm:p-8 border border-emerald-200 shadow-xs relative overflow-hidden">
                      <div className="absolute top-0 left-0 w-2 h-full bg-emerald-500"></div>
                      <span className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-100 text-emerald-700 mb-3">
                        Active Recruitment Drive
                      </span>
                      <h4 className="text-2xl font-extrabold text-slate-900 mb-2">{interview.role}</h4>
                      <p className="text-slate-500 text-sm mb-6">Applications are open on AIT Nexus. Please review the criteria and interview dates below.</p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 bg-slate-50 p-5 rounded-2xl border border-slate-100">
                        <div>
                          <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-1">Criteria</p>
                          <p className="font-semibold text-slate-800 text-sm">{interview.criteria}</p>
                        </div>
                        <div>
                          <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-1">Dates</p>
                          <p className="font-semibold text-slate-800 text-sm">{interview.dates}</p>
                        </div>
                        <div>
                          <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-1">Venue</p>
                          <p className="font-semibold text-slate-800 text-sm">{interview.venue}</p>
                        </div>
                      </div>
                      
                      <a
                        href={interview.link || nexusUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3.5 rounded-xl font-bold text-sm transition-all shadow-md shadow-emerald-200 inline-flex items-center gap-2 cursor-pointer"
                      >
                        <span>Apply via AIT Nexus (aitnexus.in)</span>
                        <ChevronRight size={18} />
                      </a>
                    </div>
                  ))
                ) : (
                  <div className="bg-white rounded-3xl p-12 border border-slate-100 shadow-xs text-center flex flex-col items-center">
                     <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4 text-slate-400">
                       <Briefcase size={28} />
                     </div>
                     <h4 className="text-xl font-bold text-slate-800 mb-2">Recruitment Currently Closed</h4>
                     <p className="text-slate-500 max-w-md text-sm mb-6 leading-relaxed">
                       There are no active recruitment interviews right now for {club.name}. Stay tuned on AIT Nexus or check back next semester!
                     </p>
                     <a
                       href={nexusUrl}
                       target="_blank"
                       rel="noopener noreferrer"
                       className="px-6 py-2.5 rounded-xl bg-purple-50 text-purple-700 font-bold text-xs border border-purple-200 hover:bg-purple-100 transition-colors"
                     >
                       Visit AIT Nexus Noticeboard ↗
                     </a>
                  </div>
                )}
              </div>
            )}

          </div>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          FULL-SCREEN IMMERSIVE KEY ACTIVITY EXPLANATION MODAL
          ───────────────────────────────────────────────────────────── */}
      {showActivityModal && selectedActivity && (
        <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-2xl overflow-y-auto flex flex-col animate-in fade-in duration-200">
          
          {/* Top Sticky Glass Control Bar */}
          <div className="sticky top-0 z-20 bg-slate-900/90 backdrop-blur-md border-b border-slate-800 px-4 sm:px-8 py-4 flex items-center justify-between text-white">
            <button 
              onClick={() => setShowActivityModal(false)}
              className="flex items-center gap-2 text-slate-300 hover:text-white bg-slate-800/80 hover:bg-slate-700 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-colors cursor-pointer border border-slate-700"
              title="Close (ESC)"
            >
              <ArrowLeft size={16} />
              <span>Back to Overview (ESC)</span>
            </button>

            <div className="hidden md:flex items-center gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider bg-purple-600 text-white shadow-xs">
                {club.category}
              </span>
              <span className="text-sm font-bold text-slate-300">
                {club.name}
              </span>
            </div>

            <div className="flex items-center gap-3">
              <a 
                href={selectedActivity.registrationLink || nexusUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-xs shadow-md transition-all cursor-pointer"
              >
                <span>Register on AIT Nexus</span>
                <ExternalLink size={14} />
              </a>

              <button 
                onClick={() => setShowActivityModal(false)}
                className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-xl transition-colors cursor-pointer border border-slate-700"
                aria-label="Close"
              >
                <X size={20} />
              </button>
            </div>
          </div>

          {/* Full Screen Scrollable Content Container */}
          <div className="max-w-6xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 sm:py-12 flex-grow space-y-10">
            
            {/* Hero Image & Banner Card */}
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-slate-800 bg-slate-900 group min-h-[320px] md:min-h-[420px] flex flex-col justify-end p-6 sm:p-10">
              <img 
                src={selectedActivity.imageUrl} 
                alt={selectedActivity.title} 
                className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-transparent"></div>
              
              <div className="relative z-10 space-y-4 max-w-3xl">
                <div className="flex flex-wrap items-center gap-2.5">
                  <span className="px-3.5 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider bg-purple-600 text-white shadow-sm">
                    Flagship Key Activity
                  </span>
                  <span className="px-3.5 py-1 rounded-full text-xs font-bold bg-white/10 text-white backdrop-blur-md border border-white/20">
                    {club.name}
                  </span>
                  <a
                    href="https://aitnexus.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3.5 py-1 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1.5"
                  >
                    <Globe size={12} />
                    <span>Official aitnexus.in Event</span>
                  </a>
                </div>

                <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-tight">
                  {selectedActivity.title}
                </h1>

                <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl">
                  {selectedActivity.description}
                </p>
              </div>
            </div>

            {/* Structured 2-Column Details Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              
              {/* LEFT COLUMN: Overview & Eligibility */}
              <div className="space-y-8">
                
                {/* 1. Deep Dive Description */}
                <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl">
                  <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2.5">
                    <Info className="text-purple-400" size={22} />
                    <span>About this Event / Activity</span>
                  </h3>
                  <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                    {selectedActivity.description}
                  </p>
                  <div className="mt-6 pt-6 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
                    <div className="flex items-center gap-2">
                      <MapPin size={14} className="text-purple-400" />
                      <span>Organized on AIT Pune Campus &amp; Outskirts</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CalendarIcon size={14} className="text-purple-400" />
                      <span>Annual / Recurring Activity</span>
                    </div>
                  </div>
                </div>

                {/* 2. Eligibility & Requirements */}
                <div className="bg-slate-900/90 border border-emerald-900/50 rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-2 h-full bg-emerald-500"></div>
                  <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2.5">
                    <CheckCircle2 className="text-emerald-400" size={22} />
                    <span>Eligibility &amp; Who Can Participate</span>
                  </h3>
                  <div className="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-800/40 text-emerald-200 text-sm leading-relaxed font-medium">
                    {selectedActivity.eligibility || "Open to all registered AIT Pune students across all engineering branches (CSE, IT, E&TC, Mech, ARE) and all academic years."}
                  </div>
                  <ul className="mt-4 space-y-2 text-xs text-slate-400">
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                      <span>Must hold a valid Army Institute of Technology student ID card.</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                      <span>Prior registration on AIT Nexus (aitnexus.in) is mandatory.</span>
                    </li>
                  </ul>
                </div>

              </div>

              {/* RIGHT COLUMN: Rules & Registration Steps */}
              <div className="space-y-8">
                
                {/* 3. Rules & Guidelines / Instructions */}
                <div className="bg-slate-900/90 border border-amber-900/50 rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-2 h-full bg-amber-500"></div>
                  <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2.5">
                    <AlertCircle className="text-amber-400" size={22} />
                    <span>Rules, Guidelines &amp; Instructions</span>
                  </h3>
                  
                  <div className="space-y-3">
                    {selectedActivity.rules && selectedActivity.rules.length > 0 ? (
                      selectedActivity.rules.map((rule: string, idx: number) => (
                        <div key={idx} className="flex items-start gap-3 text-slate-300 bg-slate-800/60 p-3.5 rounded-xl border border-slate-700/60 text-xs sm:text-sm">
                          <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-300 font-bold flex items-center justify-center text-[11px] shrink-0 mt-0.5">
                            {idx + 1}
                          </span>
                          <span className="leading-relaxed">{rule}</span>
                        </div>
                      ))
                    ) : (
                      <div className="space-y-2 text-xs sm:text-sm text-slate-300">
                        <div className="p-3 bg-slate-800/60 rounded-xl border border-slate-700">1. All participants must report on time to the designated venue.</div>
                        <div className="p-3 bg-slate-800/60 rounded-xl border border-slate-700">2. College code of conduct and sportsmanship must be upheld at all times.</div>
                        <div className="p-3 bg-slate-800/60 rounded-xl border border-slate-700">3. Organizers and club secretaries reserve right to final scheduling decisions.</div>
                      </div>
                    )}
                  </div>
                </div>

                {/* 4. Step-by-Step Registration Process */}
                <div className="bg-slate-900/90 border border-purple-900/50 rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-2 h-full bg-purple-500"></div>
                  <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2.5">
                    <ClipboardList className="text-purple-400" size={22} />
                    <span>Step-by-Step Registration Guide</span>
                  </h3>

                  <div className="space-y-3.5">
                    {selectedActivity.registrationSteps && selectedActivity.registrationSteps.length > 0 ? (
                      selectedActivity.registrationSteps.map((step: string, idx: number) => (
                        <div key={idx} className="flex items-start gap-3 text-slate-200">
                          <div className="w-7 h-7 rounded-xl bg-gradient-to-br from-purple-600 to-indigo-600 text-white flex items-center justify-center text-xs font-extrabold shrink-0 shadow-md">
                            {idx + 1}
                          </div>
                          <div className="pt-0.5 text-xs sm:text-sm leading-relaxed text-slate-300">
                            {step}
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="space-y-3">
                        <div className="flex items-start gap-3">
                          <div className="w-6 h-6 rounded-full bg-purple-600 text-white flex items-center justify-center text-xs font-bold shrink-0">1</div>
                          <p className="text-xs sm:text-sm text-slate-300">Visit the official event link on AIT Nexus (aitnexus.in).</p>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="w-6 h-6 rounded-full bg-purple-600 text-white flex items-center justify-center text-xs font-bold shrink-0">2</div>
                          <p className="text-xs sm:text-sm text-slate-300">Fill in your team details, branch, and role.</p>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="w-6 h-6 rounded-full bg-purple-600 text-white flex items-center justify-center text-xs font-bold shrink-0">3</div>
                          <p className="text-xs sm:text-sm text-slate-300">Join the official participant WhatsApp/Discord channel for briefing.</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

              </div>
            </div>

            {/* Bottom Full-Width Action Banner */}
            <div className="bg-gradient-to-r from-purple-900/60 via-indigo-900/60 to-slate-900/80 border border-purple-800/60 rounded-3xl p-6 sm:p-10 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-2xl">
              <div>
                <h4 className="text-2xl font-black text-white mb-2">Ready to Participate in {selectedActivity.title}?</h4>
                <p className="text-slate-300 text-xs sm:text-sm max-w-xl">
                  Registrations and live slot allocations are hosted securely on <strong>AIT Nexus (aitnexus.in)</strong>. Reach out to {club.secretaries[0]?.name || 'Club Secretaries'} for queries.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
                <button
                  onClick={() => setShowActivityModal(false)}
                  className="w-full sm:w-auto px-6 py-3.5 rounded-xl font-bold text-xs sm:text-sm text-slate-300 bg-slate-800 hover:bg-slate-700 transition-colors border border-slate-700 cursor-pointer"
                >
                  Close View
                </button>
                <a
                  href={selectedActivity.registrationLink || nexusUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-8 py-3.5 rounded-xl font-extrabold text-xs sm:text-sm text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 transition-all shadow-xl shadow-purple-600/30 flex items-center justify-center gap-2 group cursor-pointer"
                >
                  <span>Register on AIT Nexus (aitnexus.in)</span>
                  <ExternalLink size={16} className="group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
