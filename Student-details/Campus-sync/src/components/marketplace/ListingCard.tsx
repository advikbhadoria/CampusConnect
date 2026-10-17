import React from 'react';
import { 
  Sparkles, 
  MapPin, 
  Star, 
  MessageSquare, 
  Bookmark, 
  Eye, 
  Clock, 
  CheckCircle2, 
  ArrowRight,
  ShieldCheck 
} from 'lucide-react';
import { Listing } from '../../types';
import { useMarketplace } from '../../context/MarketplaceContext';
import { useAuth } from '../../context/AuthContext';

interface ListingCardProps {
  listing: Listing;
}

export const ListingCard: React.FC<ListingCardProps> = ({ listing }) => {
  const { openDetailModal, openChatForListing, savedListingIds, toggleSaveListing } = useMarketplace();
  const { currentUser } = useAuth();

  const isSaved = savedListingIds.includes(listing.id);
  const isOwner = currentUser?.uid === listing.ownerId;

  // Render Transaction Badge
  const renderBadge = () => {
    switch (listing.transactionType) {
      case 'Skill-Barter':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-extrabold bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md shadow-purple-600/30">
            <Sparkles className="w-3 h-3 text-purple-200" />
            <span>Skill Barter</span>
          </span>
        );
      case 'Rent':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-blue-600 text-white shadow-md shadow-blue-600/20">
            <span>⏳ For Rent</span>
          </span>
        );
      case 'Sell':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-slate-900 text-white shadow-sm">
            <span>🏷️ For Sale</span>
          </span>
        );
    }
  };

  return (
    <div className="group bg-white rounded-2xl border border-slate-200 hover:border-blue-400/80 shadow-sm hover:shadow-xl hover:shadow-blue-500/5 transition-all duration-300 flex flex-col overflow-hidden relative">
      
      {/* Image Container with Badges */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100 cursor-pointer" onClick={() => openDetailModal(listing)}>
        <img
          src={listing.imageUrl}
          alt={listing.title}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />

        {/* Gradient Overlay on Bottom of Image */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

        {/* Top Badges */}
        <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between z-10">
          <div>{renderBadge()}</div>
          
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              toggleSaveListing(listing.id);
            }}
            aria-label="Save listing"
            className={`p-2 rounded-xl backdrop-blur-md transition-all ${
              isSaved 
                ? 'bg-blue-600 text-white shadow-md' 
                : 'bg-black/30 hover:bg-black/50 text-white'
            }`}
          >
            <Bookmark className={`w-3.5 h-3.5 ${isSaved ? 'fill-white' : ''}`} />
          </button>
        </div>

        {/* Bottom Image Meta: Location & Condition */}
        <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-between text-[11px] font-bold text-white z-10">
          <div className="flex items-center gap-1 bg-black/40 px-2 py-0.5 rounded-md backdrop-blur-sm">
            <MapPin className="w-3 h-3 text-blue-400" />
            <span>{listing.hostelBlock}</span>
          </div>

          <span className="bg-white/20 backdrop-blur-sm px-2 py-0.5 rounded-md text-[10px] uppercase tracking-wider font-extrabold text-blue-100">
            {listing.condition}
          </span>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        
        <div>
          {/* Category Tag */}
          <div className="text-[10px] font-bold text-blue-600 uppercase tracking-wider mb-1">
            {listing.category}
          </div>

          {/* Item Title */}
          <h3 
            onClick={() => openDetailModal(listing)}
            className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-1 cursor-pointer mb-1.5"
            title={listing.title}
          >
            {listing.title}
          </h3>

          {/* Description Preview */}
          <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed mb-3">
            {listing.description}
          </p>

          {/* Dynamic Pricing / Skill Barter Highlight Box */}
          {listing.transactionType === 'Skill-Barter' ? (
            <div className="p-2.5 rounded-xl bg-purple-50 border border-purple-200/80 mb-3">
              <div className="flex items-center gap-1 text-[10px] font-extrabold uppercase tracking-wide text-purple-700 mb-0.5">
                <Sparkles className="w-3 h-3 text-purple-600" />
                <span>Requested Skill / Trade:</span>
              </div>
              <p className="text-xs font-semibold text-purple-950 line-clamp-2 leading-tight">
                "{listing.barterSkill || 'Open to technical or project assistance'}"
              </p>
            </div>
          ) : (
            <div className="flex items-baseline gap-1.5 mb-3">
              <span className="text-lg font-extrabold text-slate-900">
                ₹{listing.price}
              </span>
              <span className="text-xs font-semibold text-slate-500">
                {listing.rentalPeriod ? `/${listing.rentalPeriod.replace('per ', '')}` : '(Flat Sale)'}
              </span>
            </div>
          )}
        </div>

        {/* Footer: Owner info & Contact Owner CTA */}
        <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
          
          {/* Owner Details */}
          <div className="flex items-center gap-1.5 min-w-0">
            <img
              src={listing.ownerAvatar}
              alt={listing.ownerName}
              className="w-6 h-6 rounded-full object-cover ring-1 ring-slate-200 flex-shrink-0"
            />
            <div className="min-w-0">
              <p className="text-[11px] font-bold text-slate-800 truncate">
                {listing.ownerName}
              </p>
              <div className="flex items-center gap-1 text-[10px] text-slate-500">
                <span className="text-amber-500 font-bold">⭐ {listing.ownerRating}</span>
              </div>
            </div>
          </div>

          {/* Action CTA */}
          <button
            type="button"
            onClick={() => openChatForListing(listing)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1 shadow-sm active:scale-95 flex-shrink-0 ${
              listing.transactionType === 'Skill-Barter'
                ? 'bg-purple-600 hover:bg-purple-700 text-white shadow-purple-600/20'
                : 'bg-blue-600 hover:bg-blue-700 text-white shadow-blue-600/20'
            }`}
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>{isOwner ? 'My Chats' : 'Chat'}</span>
          </button>

        </div>

      </div>

    </div>
  );
};
