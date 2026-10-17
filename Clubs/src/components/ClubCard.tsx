import { Users, ArrowRight, Globe } from 'lucide-react';
import type { Club } from '../data/clubs';

interface ClubCardProps {
  club: Club;
  onClick: () => void;
}

const InstagramIcon = ({ size = 15 }: { size?: number }) => (
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

const themeBorderMap: Record<string, string> = {
  indigo: 'border-t-indigo-500',
  rose: 'border-t-rose-500',
  emerald: 'border-t-emerald-500',
  amber: 'border-t-amber-500',
  blue: 'border-t-blue-500',
  purple: 'border-t-purple-500',
  slate: 'border-t-slate-500',
  fuchsia: 'border-t-fuchsia-500',
  teal: 'border-t-teal-500',
  sky: 'border-t-sky-500',
  pink: 'border-t-pink-500',
  violet: 'border-t-violet-500',
  orange: 'border-t-orange-500',
  cyan: 'border-t-cyan-500'
};

const themeBgMap: Record<string, string> = {
  indigo: 'bg-indigo-50 text-indigo-700',
  rose: 'bg-rose-50 text-rose-700',
  emerald: 'bg-emerald-50 text-emerald-700',
  amber: 'bg-amber-50 text-amber-700',
  blue: 'bg-blue-50 text-blue-700',
  purple: 'bg-purple-50 text-purple-700',
  slate: 'bg-slate-50 text-slate-700',
  fuchsia: 'bg-fuchsia-50 text-fuchsia-700',
  teal: 'bg-teal-50 text-teal-700',
  sky: 'bg-sky-50 text-sky-700',
  pink: 'bg-pink-50 text-pink-700',
  violet: 'bg-violet-50 text-violet-700',
  orange: 'bg-orange-50 text-orange-700',
  cyan: 'bg-cyan-50 text-cyan-700'
};

export function ClubCard({ club, onClick }: ClubCardProps) {
  const borderColorClass = themeBorderMap[club.themeColor] || 'border-t-indigo-500';
  const badgeClass = themeBgMap[club.themeColor] || 'bg-indigo-50 text-indigo-700';

  const instagramUrl = club.socials.instagram && club.socials.instagram !== "Coming soon"
    ? (club.socials.instagram.startsWith('http') ? club.socials.instagram : `https://instagram.com/${club.socials.instagram.replace('@', '')}`)
    : null;

  const nexusUrl = club.socials.nexus || "https://aitnexus.in";

  return (
    <div
      onClick={onClick}
      className={`card-container group relative flex flex-col p-6 cursor-pointer hover:-translate-y-1 hover:shadow-[0_12px_35px_rgb(0,0,0,0.08)] border-t-4 ${borderColorClass} transition-all duration-300 bg-white rounded-2xl border border-slate-100 overflow-hidden`}
    >
      {/* Top Section */}
      <div className="flex flex-col items-center text-center space-y-3.5 mb-3">
        <div className="w-16 h-16 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 group-hover:scale-105 transition-transform duration-300 shadow-sm overflow-hidden">
          {club.logoUrl ? (
            <img src={club.logoUrl} alt={club.name} className="w-full h-full object-cover" />
          ) : (
            <Users size={28} strokeWidth={1.5} />
          )}
        </div>
        
        <div className="space-y-1.5 w-full">
          <span className={`inline-block px-3 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider ${badgeClass}`}>
            {club.category}
          </span>
          <h3 className="text-lg font-bold text-slate-900 leading-snug line-clamp-2 group-hover:text-purple-700 transition-colors">
            {club.name}
          </h3>
        </div>
      </div>

      {/* Middle Section: Tagline */}
      <div className="flex-grow">
        <p className="text-xs text-slate-500 text-center line-clamp-2 leading-relaxed">
          {club.tagline}
        </p>
      </div>

      {/* Social & Nexus Quick Links */}
      <div className="flex items-center justify-center gap-2 my-3.5 pt-2 border-t border-slate-100/80">
        {instagramUrl ? (
          <a
            href={instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-pink-50 hover:bg-pink-100 text-pink-700 text-xs font-semibold transition-colors border border-pink-100"
            title={`Open ${club.name} Instagram`}
          >
            <InstagramIcon size={13} />
            <span className="truncate max-w-[80px]">{club.socials.instagram?.replace('@', '') || 'Instagram'}</span>
          </a>
        ) : (
          <span className="inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-slate-50 text-slate-400 text-xs">
            <InstagramIcon size={12} />
            <span>@ait</span>
          </span>
        )}

        <a
          href={nexusUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-purple-50 hover:bg-purple-100 text-purple-700 text-xs font-bold transition-colors border border-purple-100"
          title="Open Official Club Portal on AIT Nexus"
        >
          <Globe size={13} />
          <span>aitnexus.in ↗</span>
        </a>
      </div>

      {/* Key Activity Tags */}
      <div className="flex flex-wrap gap-1 justify-center mb-4">
        {club.keyActivities && club.keyActivities.slice(0, 2).map((act, i) => (
           <span key={i} className="px-2 py-0.5 rounded-md bg-slate-50 border border-slate-100 text-slate-500 text-[10px] font-medium tracking-wide truncate max-w-[130px]">
             • {act.title}
           </span>
        ))}
      </div>

      {/* Bottom Action */}
      <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
        <div className="flex items-center gap-1.5 text-xs text-slate-400 font-medium">
           <Users size={13} />
           <span>{club.secretaries.length + club.jointSecs.length + club.teMembers.length + club.beMembers.length} Members</span>
        </div>
        <button className="text-xs font-bold text-purple-600 bg-purple-50 hover:bg-purple-600 hover:text-white px-3 py-1.5 rounded-full transition-all flex items-center gap-1">
          <span>Details</span>
          <ArrowRight size={12} />
        </button>
      </div>
    </div>
  );
}
