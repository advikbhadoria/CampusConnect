import React, { useState } from 'react';
import { 
  Building2, 
  Search, 
  PlusCircle, 
  MessageSquare, 
  Bookmark, 
  Package, 
  LogOut, 
  CheckCircle2, 
  Sparkles,
  ShieldCheck,
  Menu,
  X
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useMarketplace } from '../../context/MarketplaceContext';

export const Navbar: React.FC = () => {
  const { currentUser, logout, openAuthModal, isAuthenticated } = useAuth();
  const { 
    filters, 
    setSearchQuery, 
    openAddModal, 
    openChatDrawer, 
    unreadCountTotal,
    activeView,
    setActiveView
  } = useMarketplace();

  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          
          {/* Logo & College Tag */}
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setActiveView('feed')}
              className="flex items-center gap-2.5 text-left group focus:outline-none"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-blue-500 flex items-center justify-center text-white shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform">
                <Building2 className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-extrabold text-xl tracking-tight text-slate-900 group-hover:text-blue-600 transition-colors">
                    Campus<span className="text-blue-600">Sync</span>
                  </span>
                  <span className="hidden sm:inline-flex items-center gap-0.5 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-blue-50 text-blue-700 rounded-full border border-blue-200">
                    <ShieldCheck className="w-3 h-3 text-blue-600" /> AIT Pune
                  </span>
                </div>
                <p className="text-[11px] font-medium text-slate-500 hidden sm:block">
                  Peer-to-Peer Rental & Skill Barter
                </p>
              </div>
            </button>
          </div>

          {/* Desktop Search Bar */}
          <div className="flex-1 max-w-md hidden md:block">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                placeholder="Search Arduino kits, drafters, cycles, books, skills..."
                value={filters.searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-slate-100/80 hover:bg-slate-100 focus:bg-white text-sm text-slate-900 placeholder:text-slate-400 rounded-full border border-transparent focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none"
              />
              {filters.searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600 p-1"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* Nav Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Back to Campus Connect Student Directory */}
            <a
              href="../../student-details.html"
              className="hidden lg:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 hover:text-blue-600 rounded-xl transition-all border border-slate-200"
              title="Return to Campus Connect Student Directory"
            >
              <span>← Student Directory</span>
            </a>

            {/* View Switchers */}
            <div className="hidden lg:flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs font-semibold">
              <button
                onClick={() => setActiveView('feed')}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  activeView === 'feed'
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Browse Feed
              </button>
              <button
                onClick={() => {
                  if (!isAuthenticated) return openAuthModal('login');
                  setActiveView('my-listings');
                }}
                className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1 ${
                  activeView === 'my-listings'
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Package className="w-3.5 h-3.5" /> My Listings
              </button>
              <button
                onClick={() => {
                  if (!isAuthenticated) return openAuthModal('login');
                  setActiveView('saved');
                }}
                className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1 ${
                  activeView === 'saved'
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Bookmark className="w-3.5 h-3.5" /> Saved
              </button>
            </div>

            {/* Post Listing CTA */}
            <button
              onClick={openAddModal}
              className="inline-flex items-center gap-1.5 px-3.5 sm:px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-xs sm:text-sm font-semibold rounded-xl shadow-md shadow-blue-600/20 active:scale-95 transition-all"
            >
              <PlusCircle className="w-4 h-4" />
              <span className="hidden xs:inline">Post Item</span>
            </button>

            {/* Chat Inbox Button */}
            <button
              onClick={() => {
                if (!isAuthenticated) return openAuthModal('login');
                openChatDrawer();
              }}
              className="relative p-2 text-slate-600 hover:text-blue-600 hover:bg-slate-100 rounded-xl transition-all border border-slate-200"
              title="Campus Chats & Negotiations"
            >
              <MessageSquare className="w-5 h-5" />
              {unreadCountTotal > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-rose-500 text-white text-[11px] font-bold rounded-full flex items-center justify-center ring-2 ring-white animate-pulse">
                  {unreadCountTotal}
                </span>
              )}
            </button>

            {/* User Profile / Auth State */}
            {currentUser ? (
              <div className="relative">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center gap-2 p-1.5 pl-2 rounded-xl hover:bg-slate-100 border border-slate-200 transition-all text-left"
                >
                  <img
                    src={currentUser.avatar}
                    alt={currentUser.name}
                    className="w-7 h-7 rounded-lg object-cover ring-1 ring-blue-500/20"
                  />
                  <div className="hidden xl:block">
                    <p className="text-xs font-bold text-slate-800 leading-tight flex items-center gap-1">
                      {currentUser.name}
                      <CheckCircle2 className="w-3 h-3 text-blue-500" />
                    </p>
                    <p className="text-[10px] text-slate-500 font-medium">
                      {currentUser.hostelBlock} • ⭐ {currentUser.rating}
                    </p>
                  </div>
                </button>

                {/* User Dropdown Menu */}
                {isUserMenuOpen && (
                  <>
                    <div 
                      className="fixed inset-0 z-40" 
                      onClick={() => setIsUserMenuOpen(false)}
                    />
                    <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-slate-100 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                      <div className="px-4 py-3 border-b border-slate-100">
                        <p className="text-sm font-bold text-slate-900">{currentUser.name}</p>
                        <p className="text-xs text-slate-500 truncate">{currentUser.email}</p>
                        <div className="mt-2 flex items-center gap-2">
                          <span className="px-2 py-0.5 text-[10px] font-bold bg-blue-50 text-blue-700 rounded-md border border-blue-200">
                            📍 {currentUser.hostelBlock}
                          </span>
                          <span className="px-2 py-0.5 text-[10px] font-bold bg-amber-50 text-amber-700 rounded-md border border-amber-200">
                            ⭐ {currentUser.rating} ({currentUser.ratingCount} reviews)
                          </span>
                        </div>
                      </div>

                      <div className="p-1">
                        <button
                          onClick={() => {
                            setActiveView('my-listings');
                            setIsUserMenuOpen(false);
                          }}
                          className="w-full px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 rounded-xl flex items-center gap-2.5 transition-colors"
                        >
                          <Package className="w-4 h-4 text-slate-500" /> My Active Listings
                        </button>
                        <button
                          onClick={() => {
                            setActiveView('saved');
                            setIsUserMenuOpen(false);
                          }}
                          className="w-full px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 rounded-xl flex items-center gap-2.5 transition-colors"
                        >
                          <Bookmark className="w-4 h-4 text-slate-500" /> Saved Items
                        </button>
                        <button
                          onClick={() => {
                            openChatDrawer();
                            setIsUserMenuOpen(false);
                          }}
                          className="w-full px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 rounded-xl flex items-center gap-2.5 transition-colors"
                        >
                          <MessageSquare className="w-4 h-4 text-slate-500" /> Peer Chats
                        </button>
                      </div>

                      <div className="border-t border-slate-100 p-1">
                        <button
                          onClick={() => {
                            logout();
                            setIsUserMenuOpen(false);
                          }}
                          className="w-full px-3 py-2 text-xs font-semibold text-rose-600 hover:bg-rose-50 rounded-xl flex items-center gap-2.5 transition-colors"
                        >
                          <LogOut className="w-4 h-4" /> Sign Out
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => openAuthModal('login')}
                  className="px-3 py-1.5 text-xs font-semibold text-slate-700 hover:text-blue-600 hover:bg-slate-100 rounded-xl transition-all"
                >
                  Log In
                </button>
                <button
                  onClick={() => openAuthModal('register')}
                  className="px-3.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-sm transition-all flex items-center gap-1"
                >
                  <Sparkles className="w-3.5 h-3.5" /> Sign Up
                </button>
              </div>
            )}

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-slate-600 hover:bg-slate-100 rounded-xl md:hidden"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

          </div>
        </div>

        {/* Mobile Search & Navigation Panel */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-3 border-t border-slate-200 animate-in fade-in duration-150">
            <a
              href="../../student-details.html"
              className="block text-center py-2 px-3 text-xs font-bold rounded-xl bg-blue-50 text-blue-700 border border-blue-200 mb-3 hover:bg-blue-100 transition-colors"
            >
              ← Back to Campus Connect (Student Directory)
            </a>

            <div className="relative mb-3">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                placeholder="Search items, books, skills..."
                value={filters.searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-slate-100 text-sm rounded-xl border border-slate-200 outline-none focus:border-blue-500"
              />
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => {
                  setActiveView('feed');
                  setIsMobileMenuOpen(false);
                }}
                className={`flex-1 py-2 text-xs font-semibold rounded-lg text-center ${
                  activeView === 'feed' ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-700'
                }`}
              >
                Feed
              </button>
              <button
                onClick={() => {
                  if (!isAuthenticated) return openAuthModal('login');
                  setActiveView('my-listings');
                  setIsMobileMenuOpen(false);
                }}
                className={`flex-1 py-2 text-xs font-semibold rounded-lg text-center ${
                  activeView === 'my-listings' ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-700'
                }`}
              >
                My Items
              </button>
              <button
                onClick={() => {
                  if (!isAuthenticated) return openAuthModal('login');
                  setActiveView('saved');
                  setIsMobileMenuOpen(false);
                }}
                className={`flex-1 py-2 text-xs font-semibold rounded-lg text-center ${
                  activeView === 'saved' ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-700'
                }`}
              >
                Saved
              </button>
            </div>
          </div>
        )}

      </div>
    </header>
  );
};
