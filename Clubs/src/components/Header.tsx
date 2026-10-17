import { Search } from 'lucide-react';
import { CATEGORIES } from '../data/clubs';
import { cn } from '../utils/cn';
import { Navbar } from './Navbar';

interface HeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

export function Header({
  searchQuery,
  onSearchChange,
  activeCategory,
  onCategoryChange,
}: HeaderProps) {
  return (
    <>
      <Navbar />

      <div className="bg-white/80 backdrop-blur-md border-b border-slate-200/80 py-6 px-4 md:px-8 shadow-xs">
        <div className="max-w-7xl mx-auto space-y-5">
          {/* Title & Search Bar */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-extrabold uppercase tracking-wider bg-purple-100 text-purple-700">
                  AIT Pune Directory
                </span>
                <a
                  href="https://aitnexus.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-semibold text-slate-500 hover:text-purple-600 transition-colors"
                >
                  Powered by aitnexus.in ↗
                </a>
              </div>
              <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                Campus Clubs &amp; Student Chapters
              </h1>
            </div>

            {/* Search Bar */}
            <div className="relative w-full md:w-88">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-slate-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-11 pr-4 py-2.5 border border-slate-200 rounded-full leading-5 bg-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-sm transition-all shadow-xs"
                placeholder="Search by club name, activity, or branch..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
              />
            </div>
          </div>

          {/* Filter Chips */}
          <div className="flex flex-wrap items-center gap-2 pt-1">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mr-1">Categories:</span>
            {CATEGORIES.map((category) => (
              <button
                key={category}
                onClick={() => onCategoryChange(category)}
                className={cn(
                  "px-4 py-1.5 rounded-full text-xs font-bold transition-all duration-200 border cursor-pointer",
                  activeCategory === category
                    ? "bg-purple-600 text-white border-purple-600 shadow-sm"
                    : "bg-white text-slate-600 border-slate-200 hover:bg-purple-50 hover:text-purple-700 hover:border-purple-200"
                )}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
