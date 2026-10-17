import { create } from 'zustand';
import { supabase } from '../lib/supabase';

export const useStore = create((set, get) => ({
  // Active role in the application
  currentRole: 'student', // 'student' | 'warden' | 'chief_warden' | 'jd' | 'director' | 'council'
  setRole: (role) => set({ currentRole: role }),

  // Dev Switcher visibility (toggled via backtick ` key)
  isDevPanelOpen: false,
  toggleDevPanel: () => set((state) => ({ isDevPanelOpen: !state.isDevPanelOpen })),
  setDevPanelOpen: (isOpen) => set({ isDevPanelOpen: isOpen }),

  // Navigation State
  // currentScreen: 'register' | 'new' | 'detail' | 'authority' | 'board'
  currentScreen: 'register',
  selectedComplaintId: null,
  
  navigate: (screen, complaintId = null) => {
    // If going to authority screen, auto-suggest authority role if on student
    if (screen === 'authority' && get().currentRole === 'student') {
      set({ currentRole: 'chief_warden' });
    }
    set({ currentScreen: screen, selectedComplaintId: complaintId });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  },

  // Newly injected complaint counter for live authority slide-in badge
  liveIncomingDocket: null,
  setLiveIncomingDocket: (docket) => set({ liveIncomingDocket: docket }),
  clearLiveIncomingDocket: () => set({ liveIncomingDocket: null }),

  // Active student identity
  studentId: 'STU-2026-CURRENT',
  studentName: 'Cadet Rohit Deshmukh',
  studentRoll: '231094',

  // Realtime & Polling
  realtimeStatus: 'CONNECTING',
  realtimeTick: 0,
  subscribedOnce: false,

  // Toast Notification
  toast: null,
  showToast: (message = "Couldn't reach the server. Try again.") => {
    set({ toast: message });
    setTimeout(() => {
      if (get().toast === message) set({ toast: null });
    }, 3500);
  },
  clearToast: () => set({ toast: null }),

  // Subscribe once to postgres_changes with polling fallback if not SUBSCRIBED
  initRealtimeSubscription: () => {
    if (get().subscribedOnce) return;
    set({ subscribedOnce: true });

    let pollInterval = null;

    const startPolling = () => {
      if (pollInterval) return;
      pollInterval = setInterval(() => {
        set((state) => ({ realtimeTick: state.realtimeTick + 1 }));
      }, 5000);
    };

    const stopPolling = () => {
      if (pollInterval) {
        clearInterval(pollInterval);
        pollInterval = null;
      }
    };

    try {
      const channel = supabase
        .channel('complaints-live-channel')
        .on(
          'postgres_changes',
          { event: '*', schema: 'public', table: 'complaints' },
          (payload) => {
            if (payload.eventType === 'INSERT') {
              set({ liveIncomingDocket: payload.new });
            }
            set((state) => ({ realtimeTick: state.realtimeTick + 1 }));
          }
        )
        .on(
          'postgres_changes',
          { event: 'INSERT', schema: 'public', table: 'updates' },
          () => {
            set((state) => ({ realtimeTick: state.realtimeTick + 1 }));
          }
        )
        .subscribe((status) => {
          set({ realtimeStatus: status });
          if (status === 'SUBSCRIBED') {
            stopPolling();
          } else {
            startPolling();
          }
        });

      return () => {
        stopPolling();
        supabase.removeChannel(channel);
      };
    } catch (err) {
      console.warn('Realtime subscription fallback to polling', err);
      startPolling();
    }
  },
}));
