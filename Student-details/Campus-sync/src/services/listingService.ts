import { 
  collection, 
  getDocs, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  query, 
  orderBy 
} from 'firebase/firestore';
import { db, isFirebaseConfigured } from '../config/firebase';
import { Listing, ListingStatus } from '../types';
import { SEED_LISTINGS } from '../data/seedData';

const LOCAL_STORAGE_LISTINGS_KEY = 'campusync_listings';

const getStoredListings = (): Listing[] => {
  const data = localStorage.getItem(LOCAL_STORAGE_LISTINGS_KEY);
  if (data) {
    try {
      return JSON.parse(data);
    } catch {
      return SEED_LISTINGS;
    }
  }
  localStorage.setItem(LOCAL_STORAGE_LISTINGS_KEY, JSON.stringify(SEED_LISTINGS));
  return SEED_LISTINGS;
};

const saveStoredListings = (listings: Listing[]) => {
  localStorage.setItem(LOCAL_STORAGE_LISTINGS_KEY, JSON.stringify(listings));
};

export const fetchAllListings = async (): Promise<Listing[]> => {
  if (isFirebaseConfigured && db) {
    try {
      const q = query(collection(db, 'listings'), orderBy('createdAt', 'desc'));
      const snapshot = await getDocs(q);
      if (!snapshot.empty) {
        return snapshot.docs.map(docSnapshot => ({
          id: docSnapshot.id,
          ...(docSnapshot.data() as Omit<Listing, 'id'>)
        }));
      }
    } catch (err) {
      console.warn('Could not fetch from live Firestore, using local cached listings', err);
    }
  }

  return getStoredListings();
};

export const createNewListing = async (newListingData: Omit<Listing, 'id' | 'createdAt' | 'views'>): Promise<Listing> => {
  const timestamp = Date.now();
  
  if (isFirebaseConfigured && db) {
    try {
      const docRef = await addDoc(collection(db, 'listings'), {
        ...newListingData,
        createdAt: timestamp,
        views: 1
      });

      const created: Listing = {
        id: docRef.id,
        ...newListingData,
        createdAt: timestamp,
        views: 1
      };
      
      // Also sync to local cache
      const local = getStoredListings();
      saveStoredListings([created, ...local]);
      return created;
    } catch (err) {
      console.error('Failed to create in Firestore, saving locally:', err);
    }
  }

  // Local / Preview creation
  const localListings = getStoredListings();
  const created: Listing = {
    id: `listing_${Date.now()}`,
    ...newListingData,
    createdAt: timestamp,
    views: 1
  };

  const updated = [created, ...localListings];
  saveStoredListings(updated);
  return created;
};

export const updateListingStatus = async (listingId: string, status: ListingStatus): Promise<void> => {
  if (isFirebaseConfigured && db) {
    try {
      const docRef = doc(db, 'listings', listingId);
      await updateDoc(docRef, { status });
    } catch (err) {
      console.warn('Failed to update status in Firestore, updating locally', err);
    }
  }

  const localListings = getStoredListings();
  const updated = localListings.map(item => item.id === listingId ? { ...item, status } : item);
  saveStoredListings(updated);
};

export const removeListing = async (listingId: string): Promise<void> => {
  if (isFirebaseConfigured && db) {
    try {
      const docRef = doc(db, 'listings', listingId);
      await deleteDoc(docRef);
    } catch (err) {
      console.warn('Failed to delete from Firestore, deleting locally', err);
    }
  }

  const localListings = getStoredListings();
  const updated = localListings.filter(item => item.id !== listingId);
  saveStoredListings(updated);
};
