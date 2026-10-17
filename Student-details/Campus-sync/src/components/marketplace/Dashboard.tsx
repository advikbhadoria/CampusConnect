import React from 'react';
import { Sparkles, PackageSearch, PlusCircle, RefreshCw, Layers } from 'lucide-react';
import { useMarketplace } from '../../context/MarketplaceContext';
import { Banner } from '../layout/Banner';
import { FilterBar } from './FilterBar';
import { ListingCard } from './ListingCard';

export const Dashboard: React.FC = () => {
  const { 
    filteredListings, 
    isLoadingListings, 
    resetFilters, 
    openAddModal,
    listings
  } = useMarketplace();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      
      {/* Campus Hero Banner */}
      <Banner />

      {/* Filter and Search Bar */}
      <FilterBar />

      {/* Main Feed Content */}
      {isLoadingListings ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="bg-white rounded-2xl border border-slate-200 p-4 space-y-3 animate-pulse">
              <div className="aspect-[4/3] bg-slate-200 rounded-xl w-full" />
              <div className="h-4 bg-slate-200 rounded w-1/3" />
              <div className="h-5 bg-slate-200 rounded w-3/4" />
              <div className="h-3 bg-slate-200 rounded w-full" />
              <div className="h-8 bg-slate-200 rounded-xl w-full" />
            </div>
          ))}
        </div>
      ) : filteredListings.length > 0 ? (
        <div>
          <div className="flex items-center justify-between mb-4">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Showing {filteredListings.length} campus item{filteredListings.length === 1 ? '' : 's'}
            </p>
          </div>

          {/* Responsive Item Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filteredListings.map((listing) => (
              <ListingCard key={listing.id} listing={listing} />
            ))}
          </div>
        </div>
      ) : (
        /* Empty State */
        <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center max-w-lg mx-auto shadow-sm my-8">
          <div className="w-16 h-16 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto mb-4 border border-blue-100">
            <PackageSearch className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-slate-900 mb-1">
            No matching campus items found
          </h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto mb-6">
            We couldn't find anything matching your current search criteria or hostel filter.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={resetFilters}
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold rounded-xl transition-colors"
            >
              Clear All Filters
            </button>
            <button
              onClick={openAddModal}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-sm transition-all flex items-center gap-1.5"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Be the First to Post It</span>
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
