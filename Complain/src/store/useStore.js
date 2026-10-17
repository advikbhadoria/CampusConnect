import { create } from 'zustand';
import { supabase } from '../lib/supabase';

// Persistent per-browser student ID so different laptops have distinct student identities in demo
const getOrCreateStudentId = () => {
  try {
    let id = localStorage.getItem('ait_client_student_id');
    if (!id) {
      // Generate clean student cadet ID e.g. STU-2026-4821
      const rand = Math.floor(1000 + Math.random() * 9000);
      id = `STU-2026-${rand}`;
      localStorage.setItem('ait_client_student_id', id);
    }
    return id;
  } catch {
    return 'STU-2026-CURRENT';
  }
};

const initialStudentId = getOrCreateStudentId();

const getInitialNavigation = () => {
  try {
    const search = (window.location.search || '').toLowerCase();
    const hash = (window.location.hash || '').toLowerCase();
    if (search.includes('dashboard') || search.includes('authority') || search.includes('jd') || hash.includes('dashboard') || hash.includes('authority')) {
      return { screen: 'authority', role: 'jd' };
    }
    if (search.includes('board') || search.includes('scorecard') || hash.includes('scorecard')) {
      return { screen: 'board', role: 'student' };
    }
    if (search.includes('new') || hash.includes('new')) {
      return { screen: 'new', role: 'student' };
    }
  } catch {}
  return { screen: 'register', role: 'student' };
};

const initialNav = getInitialNavigation();

const getLoggedInUser = () => {
  try {
    const raw = localStorage.getItem('campusConnectUser');
    if (raw) {
      const u = JSON.parse(raw);
      if (u && u.name) return u;
    }
  } catch {}
  return null;
};

const loggedUser = getLoggedInUser();

export const useStore = create((set, get) => ({
  // Active role in the application: 'student' | 'jd' | 'director' | 'chief_warden' | 'warden' | 'council'
  currentRole: initialNav.role,
  setRole: (role) => set({ currentRole: role }),

  // Toggle between Student and Faculty (Joint Director) part
  toggleFacultyMode: () => {
    const isFaculty = get().currentRole === 'jd';
    if (isFaculty) {
      set({ currentRole: 'student', currentScreen: 'register' });
    } else {
      set({ currentRole: 'jd', currentScreen: 'authority' });
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  },

  // Dev Switcher visibility (toggled via backtick ` key)
  isDevPanelOpen: false,
  toggleDevPanel: () => set((state) => ({ isDevPanelOpen: !state.isDevPanelOpen })),
  setDevPanelOpen: (isOpen) => set({ isDevPanelOpen: isOpen }),

  // Navigation State
  // currentScreen: 'register' | 'new' | 'detail' | 'authority' | 'board'
  currentScreen: initialNav.screen,
  selectedComplaintId: null,
  
  navigate: (screen, complaintId = null) => {
    // If going to authority screen, auto-suggest Joint Director (JD) role
    if (screen === 'authority' && get().currentRole === 'student') {
      set({ currentRole: 'jd' });
    }
    set({ currentScreen: screen, selectedComplaintId: complaintId });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  },

  // Newly injected complaint counter for live authority slide-in badge
  liveIncomingDocket: null,
  setLiveIncomingDocket: (docket) => set({ liveIncomingDocket: docket }),
  clearLiveIncomingDocket: () => set({ liveIncomingDocket: null }),

  // Active student identity
  studentId: loggedUser ? (loggedUser.regNo || initialStudentId) : initialStudentId,
  studentName: loggedUser ? loggedUser.name : 'Cadet Rohit Deshmukh',
  studentRoll: loggedUser ? (loggedUser.regNo || '231094') : '231094',

  // Realtime & Polling
  realtimeStatus: 'CONNECTED',
  realtimeTick: 0,
  subscribedOnce: false,

  // Toast Notification
  toast: null,
  showToast: (message = "Notice: Operation completed.") => {
    set({ toast: message });
    setTimeout(() => {
      if (get().toast === message) set({ toast: null });
    }, 3500);
  },
  clearToast: () => set({ toast: null }),

  // Subscribe once to postgres_changes with silent fallback
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
      if (!supabase || typeof supabase.channel !== 'function') {
        startPolling();
        return;
      }
      const channel = supabase
        .channel('complaints-live-channel')
        .on(
          'postgres_changes',
          { event: '*', schema: 'public', table: 'complaints' },
          (payload) => {
            if (payload.eventType === 'INSERT') {
              // ONLY show live incoming docket notification on the laptop where JD / Faculty tab is selected!
              const role = get().currentRole;
              if (role === 'jd' || role === 'director' || role === 'chief_warden') {
                set({ liveIncomingDocket: payload.new });
              }
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
      console.warn('Realtime subscription notice:', err);
      startPolling();
    }
  },
}));

