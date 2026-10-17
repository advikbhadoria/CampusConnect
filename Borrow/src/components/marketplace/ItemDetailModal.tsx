import React from 'react';
import { 
  X, 
  Sparkles, 
  MapPin, 
  MessageSquare, 
  Bookmark, 
  ShieldCheck, 
  Calendar, 
  Eye, 
  Tag, 
  CheckCircle2, 
  AlertCircle,
  HelpCircle,
  Share2
} from 'lucide-react';
import { useMarketplace } from '../../context/MarketplaceContext';
import { useAuth } from '../../context/AuthContext';

export const ItemDetailModal: React.FC = () => {
  const { 
    activeDetailItem, 
    closeDetailModal, 
    openChatForListing, 
    savedListingIds, 
    toggleSaveListing 
  } = useMarketplace();
  const { currentUser } = useAuth();

  if (!activeDetailItem) return null;

  const isSaved = savedListingIds.includes(activeDetailItem.id);
  const isOwner = currentUser?.uid === activeDetailItem.ownerId;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-sm overflow-y-auto animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={closeDetailModal}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/40 hover:bg-black/60 text-white backdrop-blur-md transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          
          {/* Left: Image Container */}
          <div className="relative aspect-square md:aspect-auto bg-slate-900 flex items-center justify-center overflow-hidden">
            <img
              src={activeDetailItem.imageUrl}
              alt={activeDetailItem.title}
              className="w-full h-full object-cover"
            />
            
            {/* Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />

            {/* Badges on Image */}
            <div className="absolute top-4 left-4 flex flex-col gap-2">
              {activeDetailItem.transactionType === 'Skill-Barter' ? (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg shadow-purple-600/30">
                  <Sparkles className="w-3.5 h-3.5 text-purple-200" />
                  <span>Skill Barter</span>
                </span>
              ) : activeDetailItem.transactionType === 'Rent' ? (
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-blue-600 text-white shadow-md">
                  <span>⏳ For Rent</span>
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-slate-900 text-white shadow-md">
                  <span>🏷️ Direct Sale</span>
                </span>
              )}

              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-white/20 backdrop-blur-md text-white">
                Condition: {activeDetailItem.condition}
              </span>
            </div>

            <div className="absolute bottom-4 left-4 right-4 text-white text-xs font-medium flex items-center justify-between">
              <div className="flex items-center gap-1 bg-black/50 px-2.5 py-1 rounded-lg backdrop-blur-md">
                <MapPin className="w-3.5 h-3.5 text-blue-400" />
                <span>Hostel: {activeDetailItem.hostelBlock}</span>
              </div>
              <div className="flex items-center gap-1 bg-black/50 px-2.5 py-1 rounded-lg backdrop-blur-md">
                <Eye className="w-3.5 h-3.5 text-slate-300" />
                <span>{activeDetailItem.views || 48} campus views</span>
              </div>
            </div>
          </div>

          {/* Right: Item Details & Actions */}
          <div className="p-6 flex flex-col justify-between max-h-[85vh] overflow-y-auto">
            
            <div className="space-y-4">
              
              {/* Category & Status */}
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2.5 py-1 rounded-lg border border-blue-100">
                  {activeDetailItem.category}
                </span>

                <div className="flex items-center gap-1 text-emerald-600 text-xs font-bold bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-100">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span>{activeDetailItem.status}</span>
                </div>
              </div>

              {/* Title */}
              <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 leading-snug">
                {activeDetailItem.title}
              </h2>

              {/* Price / Barter Callout */}
              {activeDetailItem.transactionType === 'Skill-Barter' ? (
                <div className="p-3.5 rounded-2xl bg-purple-50 border border-purple-200">
                  <div className="flex items-center gap-1 text-xs font-extrabold text-purple-900 mb-1">
                    <Sparkles className="w-4 h-4 text-purple-600" />
                    <span>Requested Peer Trade / Skill Help:</span>
                  </div>
                  <p className="text-xs font-semibold text-purple-950 leading-relaxed">
                    "{activeDetailItem.barterSkill || 'Looking to exchange for programming tutoring or exam study notes'}"
                  </p>
                </div>
              ) : (
                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-baseline justify-between">
                  <div>
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
                      {activeDetailItem.transactionType === 'Rent' ? 'Rental Rate' : 'Sale Price'}
                    </span>
                    <span className="text-2xl font-black text-slate-900">
                      ₹{activeDetailItem.price}
                    </span>
                  </div>
                  <span className="text-xs font-bold text-slate-600 bg-white px-2.5 py-1 rounded-lg border border-slate-200">
                    {activeDetailItem.rentalPeriod ? activeDetailItem.rentalPeriod : 'One-time sale'}
                  </span>
                </div>
              )}

              {/* Description */}
              <div>
                <h4 className="text-xs font-extrabold text-slate-800 uppercase tracking-wider mb-1">
                  Item Description
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed whitespace-pre-line bg-slate-50/70 p-3 rounded-xl border border-slate-100">
                  {activeDetailItem.description}
                </p>
              </div>

              {/* Owner Profile Card */}
              <div className="p-3.5 rounded-2xl bg-blue-50/50 border border-blue-100 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={activeDetailItem.ownerAvatar}
                    alt={activeDetailItem.ownerName}
                    className="w-10 h-10 rounded-xl object-cover ring-2 ring-blue-500/20"
                  />
                  <div>
                    <p className="text-xs font-bold text-slate-900 flex items-center gap-1">
                      {activeDetailItem.ownerName}
                      <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
                    </p>
                    <p className="text-[11px] text-slate-500">
                      📍 {activeDetailItem.ownerHostel} • ⭐ {activeDetailItem.ownerRating} verified rating
                    </p>
                  </div>
                </div>
                <span className="px-2 py-1 text-[10px] font-bold bg-blue-100 text-blue-800 rounded-md">
                  AIT Verified
                </span>
              </div>

              {/* Campus Handover & Safety Tips */}
              <div className="text-[11px] text-slate-500 flex items-start gap-1.5 p-2 bg-slate-50 rounded-xl border border-slate-200">
                <AlertCircle className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
                <span>
                  Recommended handover locations: <strong>Nescafe Cafe</strong>, <strong>Academic Block Porch</strong>, or respective <strong>Hostel Wardens' Gate</strong>.
                </span>
              </div>

            </div>

            {/* Modal Actions */}
            <div className="pt-4 border-t border-slate-100 mt-4 flex items-center gap-2">
              <button
                type="button"
                onClick={() => toggleSaveListing(activeDetailItem.id)}
                className={`p-2.5 rounded-xl border transition-all ${
                  isSaved
                    ? 'bg-blue-50 border-blue-300 text-blue-600'
                    : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
                title="Bookmark item"
              >
                <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-blue-600' : ''}`} />
              </button>

              <button
                type="button"
                onClick={() => {
                  closeDetailModal();
                  openChatForListing(activeDetailItem);
                }}
                className="flex-1 py-2.5 px-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-xs sm:text-sm font-bold rounded-xl shadow-md shadow-blue-600/20 active:scale-95 transition-all flex items-center justify-center gap-2"
              >
                <MessageSquare className="w-4 h-4" />
                <span>{isOwner ? 'View Inquiries on this Item' : 'Contact Owner / Negotiate'}</span>
              </button>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
