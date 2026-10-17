import React, { useEffect } from 'react';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';
import { useStore } from './store/useStore';
import Navbar from './components/Navbar';
import DevRoleSwitcher from './components/DevRoleSwitcher';
import PublicBoard from './screens/PublicBoard';
import FileComplaint from './screens/FileComplaint';
import ComplaintDetail from './screens/ComplaintDetail';
import AuthorityDashboard from './screens/AuthorityDashboard';
import AccountabilityBoard from './screens/AccountabilityBoard';

export default function App() {
  const { currentScreen, selectedComplaintId, navigate, currentRole, toast, initRealtimeSubscription } = useStore();

  // Initialize Realtime Postgres subscription once at app start
  useEffect(() => {
    initRealtimeSubscription();
  }, [initRealtimeSubscription]);

  // Snappy, 60fps smooth scroll without lag
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const lenis = new Lenis({
      lerp: 0.16, // Snappy response, zero lag
      wheelMultiplier: 1.0,
      touchMultiplier: 1.0,
      infinite: false,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  const isAuthorityScreen = currentScreen === 'authority';

  return (
    <div className={`min-h-screen transition-colors duration-200 ${isAuthorityScreen ? 'bg-ink text-mist' : 'bg-mist text-ink'}`}>
      {/* Dev Persona Switcher (Toggled via ` key or navbar button) */}
      <DevRoleSwitcher onDataRefresh={() => window.location.reload()} />

      {/* Top Institutional Header */}
      <Navbar />

      {/* Main Screen Router */}
      <main>
        {currentScreen === 'register' && <PublicBoard />}
        {currentScreen === 'new' && <FileComplaint />}
        {currentScreen === 'detail' && (
          <ComplaintDetail
            complaintId={selectedComplaintId}
            onBack={() => navigate('register')}
          />
        )}
        {currentScreen === 'authority' && <AuthorityDashboard />}
        {currentScreen === 'board' && <AccountabilityBoard />}
      </main>

      {/* Server Error Toast */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 bg-ink text-white px-4 py-2.5 rounded-card border border-ink-border shadow-2xl text-xs font-medium flex items-center gap-2">
          <span>{toast}</span>
        </div>
      )}
    </div>
  );
}

