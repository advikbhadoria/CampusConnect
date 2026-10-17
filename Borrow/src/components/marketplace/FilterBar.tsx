import React from 'react';
import { 
  Sparkles, 
  RefreshCw, 
  Tag, 
  Cpu, 
  BookOpen, 
  Compass, 
  Bike, 
  Coffee, 
  Trophy, 
  SlidersHorizontal,
  RotateCcw
} from 'lucide-react';
import { useMarketplace } from '../../context/MarketplaceContext';
import { ListingCategory, HostelBlock } from '../../types';

interface CategoryOption {
  label: string;
  value: string;
  icon: React.ReactNode;
}

const CATEGORIES: CategoryOption[] = [
  { label: 'All Items', value: 'All', icon: <Compass className="w-3.5 h-3.5" /> },
  { label: 'Electronics & IoT', value: 'Electronics & IoT', icon: <Cpu className="w-3.5 h-3.5" /> },
  { label: 'Lab Tools & Drafters', value: 'Lab Tools & Drafters', icon: <Compass className="w-3.5 h-3.5" /> },
  { label: 'Books & Notes', value: 'Books & Notes', icon: <BookOpen className="w-3.5 h-3.5" /> },
  { label: 'Cycles & Mobility', value: 'Cycles & Mobility', icon: <Bike className="w-3.5 h-3.5" /> },
  { label: 'Hostel Essentials', value: 'Hostel Essentials', icon: <Coffee className="w-3.5 h-3.5" /> },
  { label: 'Sports & Gym', value: 'Sports & Gym', icon: <Trophy className="w-3.5 h-3.5" /> },
];

export const FilterBar: React.FC = () => {
  const { 
    filters, 
    setCategory, 
    setTransactionType, 
    setHostelBlock, 
    setSortBy, 
    resetFilters,
    listings 
  } = useMarketplace();

  const isFilterActive = 
    filters.category !== 'All' || 
    filters.transactionType !== 'All' || 
    filters.hostelBlock !== 'All' || 
    filters.searchQuery !== '';

  return (
    <div className="space-y-4 mb-6">
      
      {/* Top Filter Level: Transaction Type Tabs */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-3 border-b border-slate-200">
        
        {/* Transaction Type Tabs */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-100/90 rounded-2xl border border-slate-200 text-xs font-bold overflow-x-auto max-w-full">
          
          <button
            onClick={() => setTransactionType('All')}
            className={`px-3.5 py-1.5 rounded-xl transition-all whitespace-nowrap ${
              filters.transactionType === 'All'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            All Campus Deals
          </button>

          <button
            onClick={() => setTransactionType('Skill-Barter')}
            className={`px-3.5 py-1.5 rounded-xl transition-all flex items-center gap-1.5 whitespace-nowrap ${
              filters.transactionType === 'Skill-Barter'
                ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md shadow-purple-500/20'
                : 'text-purple-700 hover:bg-purple-100/60'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>🔄 Skill-Barter Only</span>
          </button>

          <button
            onClick={() => setTransactionType('Rent')}
            className={`px-3.5 py-1.5 rounded-xl transition-all flex items-center gap-1.5 whitespace-nowrap ${
              filters.transactionType === 'Rent'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>⏳ For Rent</span>
          </button>

          <button
            onClick={() => setTransactionType('Sell')}
            className={`px-3.5 py-1.5 rounded-xl transition-all flex items-center gap-1.5 whitespace-nowrap ${
              filters.transactionType === 'Sell'
                ? 'bg-slate-900 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Tag className="w-3.5 h-3.5" />
            <span>🏷️ For Sale</span>
          </button>

        </div>

        {/* Secondary Filters: Hostel Dropdown & Sorting */}
        <div className="flex items-center gap-2 self-end sm:self-auto">
          
          {/* Hostel Filter */}
          <div className="flex items-center gap-1 text-xs">
            <span className="text-slate-500 font-medium hidden xs:inline">Hostel:</span>
            <select
              value={filters.hostelBlock}
              onChange={(e) => setHostelBlock(e.target.value)}
              className="px-2.5 py-1.5 text-xs font-semibold text-slate-800 bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 shadow-sm"
            >
              <option value="All">All Hostels (OBH / NBH / GH)</option>
              <option value="OBH-1">OBH-1</option>
              <option value="OBH-2">OBH-2</option>
              <option value="OBH-3">OBH-3</option>
              <option value="NBH-1">NBH-1</option>
              <option value="NBH-2">NBH-2</option>
              <option value="GH-1">GH-1</option>
              <option value="GH-2">GH-2</option>
              <option value="Day Scholar">Day Scholar</option>
            </select>
          </div>

          {/* Sort Filter */}
          <div className="flex items-center gap-1 text-xs">
            <select
              value={filters.sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-2.5 py-1.5 text-xs font-semibold text-slate-800 bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 shadow-sm"
            >
              <option value="newest">🕒 Newest First</option>
              <option value="price-low">💰 Price: Low to High</option>
              <option value="price-high">💎 Price: High to Low</option>
              <option value="rating">⭐ Top Rated Owners</option>
            </select>
          </div>

          {/* Reset Filters */}
          {isFilterActive && (
            <button
              onClick={resetFilters}
              title="Reset all filters"
              className="p-1.5 text-xs text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-xl transition-colors border border-slate-200"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          )}

        </div>

      </div>

      {/* Category Chips Horizontal Scroll */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
        {CATEGORIES.map((cat) => {
          const isSelected = filters.category === cat.value;
          const count = cat.value === 'All' 
            ? listings.length 
            : listings.filter(i => i.category === cat.value).length;

          return (
            <button
              key={cat.value}
              onClick={() => setCategory(cat.value)}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all whitespace-nowrap border ${
                isSelected
                  ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                  : 'bg-white text-slate-700 hover:bg-slate-50 border-slate-200'
              }`}
            >
              {cat.icon}
              <span>{cat.label}</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                isSelected ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-500'
              }`}>
                {count}
              </span>
            </button>
          );
        })}
      </div>

    </div>
  );
};
