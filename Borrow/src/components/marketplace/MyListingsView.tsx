import React from 'react';
import { Package, Bookmark, PlusCircle, Trash2, CheckCircle2, ArrowLeft, ExternalLink } from 'lucide-react';
import { useMarketplace } from '../../context/MarketplaceContext';
import { useAuth } from '../../context/AuthContext';
import { ListingCard } from './ListingCard';
import { ListingStatus } from '../../types';

export const MyListingsView: React.FC = () => {
  const { 
    listings, 
    activeView, 
    setActiveView, 
    openAddModal, 
    savedListingIds, 
    changeListingStatus,
    deleteListingById,
    openDetailModal
  } = useMarketplace();
  const { currentUser } = useAuth();

  const isSavedView = activeView === 'saved';

  const myListings = listings.filter(i => i.ownerId === currentUser?.uid);
  const savedListings = listings.filter(i => savedListingIds.includes(i.id));

  const displayedListings = isSavedView ? savedListings : myListings;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-slate-200">
        <div>
          <button
            onClick={() => setActiveView('feed')}
            className="inline-flex items-center gap-1 text-xs font-bold text-blue-600 hover:text-blue-700 mb-2"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Main Feed
          </button>
          
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
            {isSavedView ? (
              <>
                <Bookmark className="w-6 h-6 text-blue-600 fill-blue-600" />
                <span>Saved Campus Items ({savedListings.length})</span>
              </>
            ) : (
              <>
                <Package className="w-6 h-6 text-blue-600" />
                <span>My Active Listings & Barters ({myListings.length})</span>
              </>
            )}
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            {isSavedView 
              ? 'Items and skill-barters you have bookmarked for later inquiry.'
              : 'Manage status (Available, Rented, Sold) or remove your listed campus gear.'}
          </p>
        </div>

        {!isSavedView && (
          <button
            onClick={openAddModal}
            className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-md shadow-blue-600/20 active:scale-95 transition-all flex items-center gap-1.5"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Post New Item</span>
          </button>
        )}
      </div>

      {/* Grid or Management List */}
      {displayedListings.length > 0 ? (
        <div className="space-y-6">
          
          {!isSavedView ? (
            /* Manage My Listings Table / Card Layout */
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {myListings.map((item) => (
                <div key={item.id} className="bg-white rounded-2xl border border-slate-200 p-4 flex flex-col justify-between shadow-sm hover:border-blue-300 transition-all">
                  <div className="flex gap-4">
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      className="w-20 h-20 rounded-xl object-cover bg-slate-100 flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          item.transactionType === 'Skill-Barter' 
                            ? 'bg-purple-100 text-purple-800' 
                            : 'bg-blue-100 text-blue-800'
                        }`}>
                          {item.transactionType}
                        </span>
                        <span className="text-[10px] font-semibold text-slate-500">
                          {item.category}
                        </span>
                      </div>
                      <h4 className="text-sm font-bold text-slate-900 truncate">
                        {item.title}
                      </h4>
                      <p className="text-xs text-slate-500 truncate mt-0.5">
                        {item.transactionType === 'Skill-Barter' 
                          ? `Trade: ${item.barterSkill}` 
                          : `₹${item.price} (${item.rentalPeriod || 'Flat sale'})`}
                      </p>
                    </div>
                  </div>

                  {/* Status & Action controls */}
                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-bold text-slate-600">Status:</span>
                      <select
                        value={item.status}
                        onChange={(e) => changeListingStatus(item.id, e.target.value as ListingStatus)}
                        className="px-2 py-1 text-xs font-bold rounded-lg border border-slate-200 bg-slate-50 text-slate-800 outline-none"
                      >
                        <option value="Available">Available</option>
                        <option value="Rented">Rented</option>
                        <option value="Sold">Sold</option>
                        <option value="Reserved">Reserved</option>
                      </select>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => openDetailModal(item)}
                        className="p-1.5 text-xs text-slate-500 hover:text-blue-600 hover:bg-slate-100 rounded-lg"
                        title="View Public Card"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => {
                          if (confirm('Are you sure you want to delete this listing?')) {
                            deleteListingById(item.id);
                          }
                        }}
                        className="p-1.5 text-xs text-rose-500 hover:bg-rose-50 rounded-lg"
                        title="Delete Listing"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* Saved Grid */
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {savedListings.map((listing) => (
                <ListingCard key={listing.id} listing={listing} />
              ))}
            </div>
          )}

        </div>
      ) : (
        /* Empty State */
        <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center max-w-md mx-auto shadow-sm">
          <div className="w-14 h-14 rounded-2xl bg-slate-100 text-slate-500 flex items-center justify-center mx-auto mb-4">
            {isSavedView ? <Bookmark className="w-6 h-6" /> : <Package className="w-6 h-6" />}
          </div>
          <h3 className="text-base font-bold text-slate-900 mb-1">
            {isSavedView ? 'No saved items yet' : 'You haven\'t posted any items yet'}
          </h3>
          <p className="text-xs text-slate-500 mb-6">
            {isSavedView
              ? 'Click the bookmark icon on any item card on the feed to save it here.'
              : 'Have semester books, a spare drafter, cycle, or need skill help? List it now!'}
          </p>
          <button
            onClick={() => isSavedView ? setActiveView('feed') : openAddModal()}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-sm transition-all"
          >
            {isSavedView ? 'Browse Campus Items' : 'Post Your First Item'}
          </button>
        </div>
      )}

    </div>
  );
};
