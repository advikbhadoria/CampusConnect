import { useState } from 'react';
import { GraduationCap, Menu, X } from 'lucide-react';

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="border-b border-slate-200/80 bg-white/95 backdrop-blur-md sticky top-0 z-40 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo */}
          <a
            href="../../homepage/homepage.html"
            className="flex items-center gap-2.5 text-slate-800 font-extrabold text-lg no-underline hover:text-purple-600 transition-colors"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-purple-600 via-indigo-600 to-pink-500 flex items-center justify-center text-white shadow-md shadow-purple-200">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold tracking-tight text-slate-900 text-base leading-tight">Campus Connect</span>
              <span className="text-[10px] font-semibold text-purple-600 uppercase tracking-widest leading-none">AIT Pune</span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 bg-slate-100/80 p-1 rounded-full border border-slate-200/80 text-xs font-semibold text-slate-600 shadow-inner overflow-x-auto">
            <a
              href="../../homepage/homepage.html"
              className="px-3 py-1.5 rounded-full hover:text-purple-600 hover:bg-white transition-all no-underline whitespace-nowrap"
            >
              Home
            </a>
            <a
              href="../../Feed/feed.html"
              className="px-3 py-1.5 rounded-full hover:text-purple-600 hover:bg-white transition-all no-underline whitespace-nowrap"
            >
              Feeds
            </a>
            <a
              href="../../Student-details/student-details.html"
              className="px-3 py-1.5 rounded-full hover:text-purple-600 hover:bg-white transition-all no-underline whitespace-nowrap"
            >
              Students
            </a>
            <a
              href="../../Faculty directory/faculty-directory.html"
              className="px-3 py-1.5 rounded-full hover:text-purple-600 hover:bg-white transition-all no-underline whitespace-nowrap"
            >
              Faculty
            </a>
            <a
              href="../../alumini directory/alumini.html"
              className="px-3 py-1.5 rounded-full hover:text-purple-600 hover:bg-white transition-all no-underline whitespace-nowrap"
            >
              Alumni
            </a>
            <span className="px-3 py-1.5 rounded-full bg-purple-600 text-white shadow-sm font-bold whitespace-nowrap">
              Clubs
            </span>
            <a
              href="../../Aakriti/aakriti.html"
              className="px-3 py-1.5 rounded-full hover:text-purple-600 hover:bg-white text-blue-600 font-bold transition-all no-underline whitespace-nowrap"
            >
              🏆 Aakriti
            </a>
            <a
              href="../../Outpass/outpass.html"
              className="px-3 py-1.5 rounded-full hover:text-blue-700 hover:bg-white text-blue-700 font-bold transition-all no-underline whitespace-nowrap"
            >
              📝 Applications
            </a>
            <a
              href="../../Complain/dist/index.html"
              className="px-3 py-1.5 rounded-full hover:text-amber-700 hover:bg-white text-amber-700 font-bold transition-all no-underline whitespace-nowrap"
            >
              📢 Complaints
            </a>
            <a
              href="../../Shops/index.html"
              className="px-3 py-1.5 rounded-full hover:text-emerald-700 hover:bg-white text-emerald-700 font-bold transition-all no-underline whitespace-nowrap"
            >
              🏬 Shops
            </a>
            <a
              href="../../Borrow/dist/index.html"
              className="px-3 py-1.5 rounded-full hover:text-blue-700 hover:bg-white text-blue-700 font-bold transition-all no-underline whitespace-nowrap"
            >
              🤝 Borrow &amp; Share
            </a>
            <a
              href="../../Feed/Profile/profile.html"
              className="px-3 py-1.5 rounded-full hover:text-purple-600 hover:bg-white transition-all no-underline whitespace-nowrap"
            >
              Profile
            </a>
          </nav>

          {/* Right Action: Official Portal Quick Link & Sign Out */}
          <div className="hidden sm:flex items-center gap-2.5">
            <a
              href="https://aitnexus.in"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-purple-50 hover:bg-purple-100 text-purple-700 font-bold text-xs border border-purple-200 transition-colors no-underline shadow-xs"
              title="Visit official AIT Nexus Portal"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>AIT Nexus (aitnexus.in) ↗</span>
            </a>
            <button
              onClick={() => {
                if ((window as any).CampusAuth) {
                  (window as any).CampusAuth.signOut();
                } else {
                  localStorage.removeItem('campusConnectUser');
                  window.location.href = '../../homepage/homepage.html';
                }
              }}
              className="px-3.5 py-1.5 rounded-full bg-red-50 hover:bg-red-100 text-red-600 font-bold text-xs border border-red-200 transition-colors cursor-pointer"
              title="Sign out of Campus Connect"
            >
              🚪 Sign Out
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center gap-2">
            <a
              href="https://aitnexus.in"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-2.5 py-1 rounded-full bg-purple-50 text-purple-700 font-bold text-[11px] border border-purple-200 no-underline"
            >
              Nexus ↗
            </a>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-100 bg-white px-4 pt-3 pb-5 space-y-2 shadow-lg animate-in slide-in-from-top-2 duration-150">
          <a
            href="../../homepage/homepage.html"
            className="block px-3.5 py-2 rounded-xl text-sm font-semibold text-slate-700 hover:bg-purple-50 hover:text-purple-700 transition-colors no-underline"
          >
            🏠 Home
          </a>
          <a
            href="../../Feed/feed.html"
            className="block px-3.5 py-2 rounded-xl text-sm font-semibold text-slate-700 hover:bg-purple-50 hover:text-purple-700 transition-colors no-underline"
          >
            📰 Feeds &amp; News
          </a>
          <a
            href="../../Student-details/student-details.html"
            className="block px-3.5 py-2 rounded-xl text-sm font-semibold text-slate-700 hover:bg-purple-50 hover:text-purple-700 transition-colors no-underline"
          >
            🎓 Student Directory
          </a>
          <a
            href="../../Faculty directory/faculty-directory.html"
            className="block px-3.5 py-2 rounded-xl text-sm font-semibold text-slate-700 hover:bg-purple-50 hover:text-purple-700 transition-colors no-underline"
          >
            👨‍🏫 Faculty Directory
          </a>
          <a
            href="../../alumini directory/alumini.html"
            className="block px-3.5 py-2 rounded-xl text-sm font-semibold text-slate-700 hover:bg-purple-50 hover:text-purple-700 transition-colors no-underline"
          >
            💼 Alumni Directory
          </a>
          <div className="block px-3.5 py-2 rounded-xl text-sm font-bold bg-purple-600 text-white shadow-xs">
            🎪 Clubs &amp; Societies (Active)
          </div>
          <a
            href="../../Aakriti/aakriti.html"
            className="block px-3.5 py-2 rounded-xl text-sm font-bold text-blue-600 hover:bg-blue-50 transition-colors no-underline"
          >
            🏆 Aakriti Championship Hub
          </a>
          <a
            href="../../Outpass/outpass.html"
            className="block px-3.5 py-2 rounded-xl text-sm font-bold text-blue-700 hover:bg-blue-50 transition-colors no-underline"
          >
            📝 Applications (Outpass / Leave)
          </a>
          <a
            href="../../Complain/dist/index.html"
            className="block px-3.5 py-2 rounded-xl text-sm font-bold text-amber-700 hover:bg-amber-50 transition-colors no-underline"
          >
            📢 Complaints &amp; Redressal
          </a>
          <a
            href="../../Shops/index.html"
            className="block px-3.5 py-2 rounded-xl text-sm font-bold text-emerald-700 hover:bg-emerald-50 transition-colors no-underline"
          >
            🏬 Campus Commercial Shops
          </a>
          <a
            href="../../Borrow/dist/index.html"
            className="block px-3.5 py-2 rounded-xl text-sm font-bold text-blue-700 hover:bg-blue-50 transition-colors no-underline"
          >
            🤝 Borrow &amp; Share (CampusSync)
          </a>
          <a
            href="../../Feed/Profile/profile.html"
            className="block px-3.5 py-2 rounded-xl text-sm font-semibold text-slate-700 hover:bg-purple-50 hover:text-purple-700 transition-colors no-underline"
          >
            👤 Profile &amp; Settings
          </a>
          <div className="pt-2 border-t border-slate-100 space-y-2">
            <a
              href="https://aitnexus.in"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-purple-50 text-purple-700 font-bold text-xs border border-purple-200 no-underline"
            >
              <span>Visit AIT Nexus Portal (aitnexus.in) ↗</span>
            </a>
            <button
              onClick={() => {
                if ((window as any).CampusAuth) {
                  (window as any).CampusAuth.signOut();
                } else {
                  localStorage.removeItem('campusConnectUser');
                  window.location.href = '../../homepage/homepage.html';
                }
              }}
              className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-red-50 text-red-600 font-bold text-xs border border-red-200 cursor-pointer"
            >
              <span>🚪 Sign Out of Campus Connect</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
