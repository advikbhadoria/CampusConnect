import React from 'react';
import { ShieldCheck, Sparkles, RefreshCw, ArrowRight, MapPin, Zap } from 'lucide-react';
import { useMarketplace } from '../../context/MarketplaceContext';

export const Banner: React.FC = () => {
  const { setTransactionType, openAddModal, listings } = useMarketplace();

  const barterCount = listings.filter(i => i.transactionType === 'Skill-Barter').length;
  const rentCount = listings.filter(i => i.transactionType === 'Rent').length;

  return (
    <div className="relative overflow-hidden bg-gradient-to-r from-slate-900 via-indigo-950 to-blue-950 text-white rounded-3xl p-6 sm:p-8 mb-8 shadow-xl border border-indigo-900/50">
      
      {/* Background Decorative Accents */}
      <div className="absolute top-0 right-0 -mt-8 -mr-8 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/3 -mb-12 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-4xl">
        {/* Verification Pill */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/15 border border-blue-400/30 text-blue-300 text-xs font-semibold mb-4 backdrop-blur-sm">
          <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
          <span>Exclusive to Army Institute of Technology, Pune (@aitpune.edu.in)</span>
        </div>

        {/* Main Headline */}
        <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight leading-tight mb-3">
          Campus Gear Rentals & <span className="bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-300 bg-clip-text text-transparent">Skill-Barter Network</span>
        </h1>

        <p className="text-sm sm:text-base text-slate-300 max-w-2xl font-normal leading-relaxed mb-6">
          Rent lab tools for the semester, sell used engineering books, or trade your coding & design skills directly with batchmates across OBH, NBH, and GH blocks.
        </p>

        {/* Action Buttons & Quick Filters */}
        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => setTransactionType('Skill-Barter')}
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-purple-600 hover:bg-purple-500 text-white text-xs sm:text-sm font-bold rounded-xl shadow-lg shadow-purple-600/30 transition-all active:scale-95"
          >
            <Sparkles className="w-4 h-4 text-purple-200" />
            <span>Explore Skill Barters ({barterCount})</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={() => setTransactionType('Rent')}
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-blue-600/80 hover:bg-blue-600 text-white text-xs sm:text-sm font-bold rounded-xl border border-blue-400/30 transition-all active:scale-95 backdrop-blur-sm"
          >
            <RefreshCw className="w-4 h-4 text-blue-200" />
            <span>Campus Rentals ({rentCount})</span>
          </button>

          <button
            onClick={openAddModal}
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-white/10 hover:bg-white/15 text-slate-200 text-xs sm:text-sm font-semibold rounded-xl border border-white/10 transition-all active:scale-95 backdrop-blur-sm"
          >
            <Zap className="w-4 h-4 text-amber-400" />
            <span>List an Item for Free</span>
          </button>
        </div>

        {/* Campus Spot Handover Highlights */}
        <div className="mt-6 pt-5 border-t border-white/10 flex flex-wrap items-center gap-4 sm:gap-8 text-[11px] sm:text-xs text-slate-300 font-medium">
          <div className="flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-blue-400" />
            <span>Handover Spots: Nescafe • Main Library • Hostel Gate</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span className="text-emerald-300 font-semibold">Live Peer Messaging Active</span>
          </div>
        </div>

      </div>
    </div>
  );
};
