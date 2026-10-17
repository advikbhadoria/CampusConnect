import React from 'react';
import { motion } from 'framer-motion';
import { Plus } from 'lucide-react';
import { useStore } from '../store/useStore';
import { AUTHORITIES } from '../data/authorities';

export default function Navbar() {
  const { currentRole, currentScreen, navigate, toggleDevPanel } = useStore();

  const navItems = [
    { id: 'register', label: 'Board' },
    { id: 'authority', label: 'Queue' },
    { id: 'board', label: 'Scorecard' },
  ];

  return (
    <header className="w-full bg-mist border-b border-mist-dark/60 font-body select-none">
      <div className="max-w-6xl mx-auto px-6 sm:px-9 h-16 flex items-center justify-between gap-4">
        {/* Left: Small Teal AIT mark with Yellow text + Nav Links */}
        <div className="flex items-center gap-7">
          {/* Small teal mark with yellow text */}
          <button
            type="button"
            onClick={() => navigate('register')}
            className="w-8 h-8 rounded-lg bg-teal flex items-center justify-center font-headline font-medium text-sm text-yellow tracking-tight"
            aria-label="AIT Board Home"
          >
            AIT
          </button>

          {/* Nav as plain text with yellow underline on active item */}
          <nav className="flex items-center gap-6 text-sm">
            {navItems.map((item) => {
              const isActive = currentScreen === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => navigate(item.id)}
                  className={`relative py-1 transition-colors ${
                    isActive ? 'text-ink font-medium' : 'text-steel hover:text-ink'
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

        {/* Right: Role indicator & Yellow pill button "File a complaint" */}
        <div className="flex items-center gap-4">
          {/* Role indicator */}
          <button
            type="button"
            onClick={toggleDevPanel}
            title="Press ` to switch roles"
            className="text-xs text-steel hover:text-ink transition-colors flex items-center gap-1.5"
          >
            <span className="w-2 h-2 rounded-full bg-teal" />
            <span className="hidden sm:inline">
              {AUTHORITIES[currentRole]?.title || 'Student'}
            </span>
            <kbd className="text-[10px] bg-white px-1 py-0.5 rounded border border-mint text-steel">`</kbd>
          </button>

          {/* Yellow pill button: File a complaint */}
          <button
            type="button"
            onClick={() => navigate('new')}
            className="px-4 py-2 rounded-pill bg-yellow text-ink font-medium text-xs hover:bg-yellow-hover transition-colors shadow-none"
          >
            File a complaint
          </button>
        </div>
      </div>
    </header>
  );
}
