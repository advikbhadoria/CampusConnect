import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  sendEmailVerification, 
  updateProfile,
  User,
  onAuthStateChanged
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db, isFirebaseConfigured } from '../config/firebase';
import { UserProfile, HostelBlock } from '../types';
import { SEED_USERS } from '../data/seedData';

const LOCAL_STORAGE_USER_KEY = 'campussync_current_user';
const LOCAL_STORAGE_USERS_KEY = 'campussync_all_users';

/**
 * Validates whether an email belongs strictly to the AIT Pune institutional domain.
 */
export const validateAITDomain = (email: string): { isValid: boolean; error?: string } => {
  const trimmed = email.trim().toLowerCase();
  
  if (!trimmed) {
    return { isValid: false, error: 'Email address is required.' };
  }
  
  // Strict regex check for @aitpune.edu.in
  const domainPattern = /^[a-zA-Z0-9._%+-]+@aitpune\.edu\.in$/;
  
  if (!domainPattern.test(trimmed)) {
    return { 
      isValid: false, 
      error: 'Restricted Access: You must register with an official AIT Pune student email ending in "@aitpune.edu.in" (e.g. yourname.comp24@aitpune.edu.in).' 
    };
  }
  
  return { isValid: true };
};

// Initialize local users storage if needed
const getLocalUsers = (): UserProfile[] => {
  const saved = localStorage.getItem(LOCAL_STORAGE_USERS_KEY) || localStorage.getItem('campusync_all_users');
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch {
      return SEED_USERS;
    }
  }
  localStorage.setItem(LOCAL_STORAGE_USERS_KEY, JSON.stringify(SEED_USERS));
  return SEED_USERS;
};

const saveLocalUsers = (users: UserProfile[]) => {
  localStorage.setItem(LOCAL_STORAGE_USERS_KEY, JSON.stringify(users));
};

export const registerUser = async (
  email: string,
  password: string,
  name: string,
  hostelBlock: HostelBlock,
  roomNumber: string = ''
): Promise<UserProfile> => {
  const domainCheck = validateAITDomain(email);
  if (!domainCheck.isValid) {
    throw new Error(domainCheck.error);
  }

  if (password.length < 6) {
    throw new Error('Password must be at least 6 characters long.');
  }

  // Live Firebase Registration
  if (isFirebaseConfigured && auth && db) {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Set display name in auth
    await updateProfile(user, { displayName: name });

    // Send Firebase email verification
    await sendEmailVerification(user);

    const userProfile: UserProfile = {
      uid: user.uid,
      name,
      email,
      hostelBlock,
      roomNumber,
      rating: 5.0,
      ratingCount: 0,
      avatar: `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(name)}`,
      createdAt: Date.now(),
      isVerified: user.emailVerified,
    };

    // Save user profile document to Firestore
    await setDoc(doc(db, 'users', user.uid), userProfile);
    localStorage.setItem(LOCAL_STORAGE_USER_KEY, JSON.stringify(userProfile));
    return userProfile;
  }

  // Local / Campus Preview Registration Mode
  const users = getLocalUsers();
  const existing = users.find(u => u.email.toLowerCase() === email.toLowerCase());
  if (existing) {
    throw new Error('An account with this @aitpune.edu.in email already exists. Please log in.');
  }

  const newUid = `user_ait_${Date.now()}`;
  const mockProfile: UserProfile = {
    uid: newUid,
    name,
    email,
    hostelBlock,
    roomNumber,
    rating: 5.0,
    ratingCount: 0,
    avatar: `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(name)}`,
    createdAt: Date.now(),
    isVerified: false, // Starts as unverified to test the gatekeeper
  };

  users.push(mockProfile);
  saveLocalUsers(users);
  localStorage.setItem(LOCAL_STORAGE_USER_KEY, JSON.stringify(mockProfile));

  return mockProfile;
};

export const loginUser = async (email: string, password: string): Promise<UserProfile> => {
  const domainCheck = validateAITDomain(email);
  if (!domainCheck.isValid) {
    throw new Error(domainCheck.error);
  }

  if (isFirebaseConfigured && auth && db) {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
    // Fetch profile from Firestore
    const userDoc = await getDoc(doc(db, 'users', user.uid));
    let profile: UserProfile;

    if (userDoc.exists()) {
      profile = {
        ...(userDoc.data() as UserProfile),
        isVerified: user.emailVerified
      };
    } else {
      profile = {
        uid: user.uid,
        name: user.displayName || email.split('@')[0],
        email: user.email || email,
        hostelBlock: 'OBH-1',
        rating: 5.0,
        ratingCount: 0,
        avatar: `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(user.displayName || email)}`,
        createdAt: Date.now(),
        isVerified: user.emailVerified,
      };
      await setDoc(doc(db, 'users', user.uid), profile);
    }

    localStorage.setItem(LOCAL_STORAGE_USER_KEY, JSON.stringify(profile));
    return profile;
  }

  // Local / Campus Preview Mode
  const users = getLocalUsers();
  let found = users.find(u => u.email.toLowerCase() === email.toLowerCase());

  if (!found) {
    // If it's a valid @aitpune.edu.in email for demonstration, create an active profile
    const username = email.split('@')[0].replace('.', ' ');
    const formattedName = username.charAt(0).toUpperCase() + username.slice(1);
    
    found = {
      uid: `user_${Date.now()}`,
      name: formattedName,
      email,
      hostelBlock: 'OBH-1',
      rating: 5.0,
      ratingCount: 1,
      avatar: `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(formattedName)}`,
      createdAt: Date.now(),
      isVerified: true, // Demo accounts can start verified or testable
    };
    users.push(found);
    saveLocalUsers(users);
  }

  localStorage.setItem(LOCAL_STORAGE_USER_KEY, JSON.stringify(found));
  return found;
};

export const logoutUser = async (): Promise<void> => {
  if (isFirebaseConfigured && auth) {
    await signOut(auth);
  }
  localStorage.removeItem(LOCAL_STORAGE_USER_KEY);
};

export const sendVerificationEmailToUser = async (userProfile?: UserProfile | null): Promise<boolean> => {
  if (isFirebaseConfigured && auth && auth.currentUser) {
    await sendEmailVerification(auth.currentUser);
    return true;
  }
  // In demo mode, simulated email verification
  console.log('Simulated verification email sent to', userProfile?.email);
  return true;
};

export const verifyCurrentEmailLocally = (uid: string): UserProfile | null => {
  const users = getLocalUsers();
  const index = users.findIndex(u => u.uid === uid);
  if (index !== -1) {
    users[index].isVerified = true;
    saveLocalUsers(users);
    localStorage.setItem(LOCAL_STORAGE_USER_KEY, JSON.stringify(users[index]));
    return users[index];
  }
  return null;
};

export const getSavedSessionUser = (): UserProfile | null => {
  const saved = localStorage.getItem(LOCAL_STORAGE_USER_KEY) || localStorage.getItem('campusync_current_user');
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch {
      return null;
    }
  }
  // Seamlessly inherit sign-in data from Campus Connect
  const ccUserRaw = localStorage.getItem('campusConnectUser');
  if (ccUserRaw) {
    try {
      const ccUser = JSON.parse(ccUserRaw);
      if (ccUser && (ccUser.name || ccUser.studentName || ccUser.email)) {
        const displayName = ccUser.name || ccUser.studentName || 'Student';
        return {
          uid: 'user_signed_in',
          name: displayName,
          email: ccUser.email || 'student@aitpune.edu.in',
          hostelBlock: 'OBH-1',
          rating: 5.0,
          ratingCount: 1,
          avatar: `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(displayName)}`,
          createdAt: Date.now(),
          isVerified: true,
        };
      }
    } catch (e) {
      // ignore JSON parse errors
    }
  }
  return null;
};

export const subscribeToAuthState = (callback: (user: UserProfile | null) => void) => {
  if (isFirebaseConfigured && auth) {
    return onAuthStateChanged(auth, async (firebaseUser: User | null) => {
      if (firebaseUser) {
        if (db) {
          const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
          if (userDoc.exists()) {
            const profile = {
              ...(userDoc.data() as UserProfile),
              isVerified: firebaseUser.emailVerified
            };
            callback(profile);
            return;
          }
        }
        callback({
          uid: firebaseUser.uid,
          name: firebaseUser.displayName || 'AIT Student',
          email: firebaseUser.email || '',
          hostelBlock: 'OBH-1',
          rating: 5.0,
          ratingCount: 0,
          avatar: firebaseUser.photoURL || `https://api.dicebear.com/7.x/bottts/svg?seed=${firebaseUser.uid}`,
          createdAt: Date.now(),
          isVerified: firebaseUser.emailVerified
        });
      } else {
        callback(null);
      }
    });
  }

  // Local state listener
  const saved = getSavedSessionUser();
  callback(saved);
  return () => {};
};
