import React from 'react';
import { motion } from 'framer-motion';
import { Plus, ShieldCheck, UserCheck } from 'lucide-react';
import { useStore } from '../store/useStore';
import { AUTHORITIES } from '../data/authorities';

export default function Navbar() {
  const { currentRole, setRole, currentScreen, navigate, toggleDevPanel } = useStore();

  const isFacultyActive = currentRole === 'jd' || currentRole === 'chief_warden' || currentRole === 'director';

  const navItems = [
    { id: 'register', label: 'Student Board' },
    { id: 'authority', label: 'JD Queue' },
    { id: 'board', label: 'Scorecard' },
  ];

  return (
    <header className="w-full bg-mist border-b border-mist-dark/60 font-body select-none sticky top-0 z-40 backdrop-blur-md bg-mist/95">
      <div className="max-w-6xl mx-auto px-4 sm:px-9 h-16 flex items-center justify-between gap-3">
        {/* Left: Small Teal AIT mark with Yellow text + Nav Links */}
        <div className="flex items-center gap-5 sm:gap-7">
          {/* Small teal mark with yellow text */}
          <button
            type="button"
            onClick={() => navigate('register')}
            className="w-8 h-8 rounded-lg bg-teal flex items-center justify-center font-headline font-medium text-sm text-yellow tracking-tight shrink-0 shadow-sm"
            aria-label="AIT Board Home"
          >
            AIT
          </button>

          {/* Nav as plain text with yellow underline on active item */}
          <nav className="flex items-center gap-4 sm:gap-6 text-xs sm:text-sm">
            {navItems.map((item) => {
              const isActive = currentScreen === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    if (item.id === 'authority') {
                      setRole('jd');
                    }
                    navigate(item.id);
                  }}
                  className={`relative py-1 transition-colors whitespace-nowrap ${
                    isActive ? 'text-ink font-semibold' : 'text-steel hover:text-ink'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <motion.div
                      layoutId="activeUnderline"
                      className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-yellow rounded-full"
                      transition={{ duration: 0.2 }}
                    />
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Center/Right: Fast Segmented Toggle between Student and Faculty (JD) Part */}
        <div className="flex items-center gap-2 sm:gap-4">
          <div className="flex items-center bg-white/90 p-0.5 rounded-full border border-mist-dark shadow-sm">
            <button
              type="button"
              onClick={() => {
                setRole('student');
                navigate('register');
              }}
              className={`px-2.5 sm:px-3.5 py-1 rounded-full text-[11px] sm:text-xs font-semibold transition-all flex items-center gap-1.5 ${
                !isFacultyActive
                  ? 'bg-teal text-yellow shadow-sm font-bold'
                  : 'text-steel hover:text-ink'
              }`}
              title="Switch to Student view"
            >
              <span className={`w-1.5 h-1.5 rounded-full ${!isFacultyActive ? 'bg-yellow' : 'bg-steel/40'}`} />
              <span>Student</span>
            </button>
            <button
              type="button"
              onClick={() => {
                setRole('jd');
                navigate('authority');
              }}
              className={`px-2.5 sm:px-3.5 py-1 rounded-full text-[11px] sm:text-xs font-semibold transition-all flex items-center gap-1.5 ${
                isFacultyActive
                  ? 'bg-teal text-yellow shadow-sm font-bold'
                  : 'text-steel hover:text-ink'
              }`}
              title="Switch to Joint Director (Faculty) queue"
            >
              <span className={`w-1.5 h-1.5 rounded-full ${isFacultyActive ? 'bg-yellow' : 'bg-steel/40'}`} />
              <span>Faculty (JD)</span>
            </button>
          </div>

          {/* Active persona badge / dev switcher trigger */}
          <button
            type="button"
            onClick={toggleDevPanel}
            title="Press ` to switch authority personas"
            className="hidden md:flex text-[11px] text-steel hover:text-ink transition-colors items-center gap-1.5 py-1 px-2 rounded-lg hover:bg-black/5"
          >
            <span className={`w-2 h-2 rounded-full ${isFacultyActive ? 'bg-amber-500' : 'bg-teal'}`} />
            <span className="font-medium">
              {isFacultyActive ? 'Col A K Joshi (Retd)' : 'Cadet Rohit'}
            </span>
          </button>

          {/* Yellow pill button: File a complaint */}
          <button
            type="button"
            onClick={() => navigate('new')}
            className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-pill bg-yellow text-ink font-semibold text-xs hover:bg-yellow-hover transition-colors shadow-sm shrink-0 whitespace-nowrap"
          >
            File complaint
          </button>
        </div>
      </div>
    </header>
  );
}

