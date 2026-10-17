import type { Club } from '../data/clubs';
import { ClubCard } from './ClubCard';

interface ClubGridProps {
  clubs: Club[];
  onClubClick: (club: Club) => void;
}

export function ClubGrid({ clubs, onClubClick }: ClubGridProps) {
  if (clubs.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4">
          <span className="text-2xl">🔍</span>
        </div>
        <h3 className="text-xl font-semibold text-slate-800 mb-2">No clubs found</h3>
        <p className="text-slate-500">Try adjusting your search or filters.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 px-4 md:px-8 py-8 max-w-7xl mx-auto">
      {clubs.map((club) => (
        <ClubCard key={club.id} club={club} onClick={() => onClubClick(club)} />
      ))}
    </div>
  );
}
