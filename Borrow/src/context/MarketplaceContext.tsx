import React, { createContext, useContext, useState, useEffect, useMemo, ReactNode } from 'react';
import { Listing, FilterState, ListingStatus, ChatConversation, ChatMessage } from '../types';
import { useAuth } from './AuthContext';
import { 
  fetchAllListings, 
  createNewListing, 
  updateListingStatus, 
  removeListing 
} from '../services/listingService';
import { 
  fetchUserChats, 
  fetchMessagesForChat, 
  startOrGetChat, 
  sendNewMessage 
} from '../services/chatService';

interface MarketplaceContextType {
  listings: Listing[];
  filteredListings: Listing[];
  isLoadingListings: boolean;
  filters: FilterState;
  setSearchQuery: (query: string) => void;
  setCategory: (category: string) => void;
  setTransactionType: (type: string) => void;
  setHostelBlock: (hostel: string) => void;
  setCondition: (condition: string) => void;
  setSortBy: (sort: 'newest' | 'price-low' | 'price-high' | 'rating') => void;
  resetFilters: () => void;
  
  // Listing Actions
  addNewListing: (data: Omit<Listing, 'id' | 'createdAt' | 'views' | 'ownerId' | 'ownerName' | 'ownerAvatar' | 'ownerRating' | 'ownerHostel'>) => Promise<Listing>;
  changeListingStatus: (listingId: string, status: ListingStatus) => Promise<void>;
  deleteListingById: (listingId: string) => Promise<void>;
  
  // Saved Listings
  savedListingIds: string[];
  toggleSaveListing: (listingId: string) => void;
  
  // Item Detail Modal
  activeDetailItem: Listing | null;
  openDetailModal: (listing: Listing) => void;
  closeDetailModal: () => void;

  // Add Listing Modal
  isAddModalOpen: boolean;
  openAddModal: () => void;
  closeAddModal: () => void;

  // Real-Time Chat & Negotiation
  chats: ChatConversation[];
  activeChat: ChatConversation | null;
  activeChatMessages: ChatMessage[];
  isChatDrawerOpen: boolean;
  unreadCountTotal: number;
  openChatDrawer: (chat?: ChatConversation) => void;
  closeChatDrawer: () => void;
  selectChat: (chat: ChatConversation) => void;
  openChatForListing: (listing: Listing) => Promise<void>;
  sendMessageToActiveChat: (text: string, isOffer?: boolean, offerDetails?: { type: string; details: string }) => Promise<void>;

  // Navigation tabs
  activeView: 'feed' | 'my-listings' | 'saved';
  setActiveView: (view: 'feed' | 'my-listings' | 'saved') => void;
}

const initialFilters: FilterState = {
  searchQuery: '',
  category: 'All',
  transactionType: 'All',
  hostelBlock: 'All',
  condition: 'All',
  status: 'All',
  sortBy: 'newest',
};

const MarketplaceContext = createContext<MarketplaceContextType | undefined>(undefined);

export const MarketplaceProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { currentUser, openAuthModal } = useAuth();

  const [listings, setListings] = useState<Listing[]>([]);
  const [isLoadingListings, setIsLoadingListings] = useState<boolean>(true);
  const [filters, setFilters] = useState<FilterState>(initialFilters);
  const [activeView, setActiveView] = useState<'feed' | 'my-listings' | 'saved'>('feed');

  // Saved items
  const [savedListingIds, setSavedListingIds] = useState<string[]>(() => {
    const saved = localStorage.getItem('campusync_saved_ids');
    return saved ? JSON.parse(saved) : ['listing_01', 'listing_04'];
  });

  // Modals state
  const [activeDetailItem, setActiveDetailItem] = useState<Listing | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);

  // Chat & Messaging state
  const [chats, setChats] = useState<ChatConversation[]>([]);
  const [activeChat, setActiveChat] = useState<ChatConversation | null>(null);
  const [activeChatMessages, setActiveChatMessages] = useState<ChatMessage[]>([]);
  const [isChatDrawerOpen, setIsChatDrawerOpen] = useState<boolean>(false);

  // Load listings on mount
  useEffect(() => {
    const loadListings = async () => {
      setIsLoadingListings(true);
      try {
        const items = await fetchAllListings();
        setListings(items);
      } catch (err) {
        console.error('Failed to load listings', err);
      } finally {
        setIsLoadingListings(false);
      }
    };
    loadListings();
  }, []);

  // Load chats when user changes
  useEffect(() => {
    if (currentUser) {
      const loadChats = async () => {
        try {
          const userChats = await fetchUserChats(currentUser.uid);
          setChats(userChats);
        } catch (err) {
          console.error('Failed to load chats', err);
        }
      };
      loadChats();
    } else {
      setChats([]);
      setActiveChat(null);
      setActiveChatMessages([]);
    }
  }, [currentUser]);

  // Load messages when activeChat changes
  useEffect(() => {
    if (activeChat) {
      const loadMessages = async () => {
        try {
          const msgs = await fetchMessagesForChat(activeChat.chatId);
          setActiveChatMessages(msgs);
        } catch (err) {
          console.error('Failed to load messages', err);
        }
      };
      loadMessages();
    } else {
      setActiveChatMessages([]);
    }
  }, [activeChat]);

  // Save bookmarked IDs
  const toggleSaveListing = (listingId: string) => {
    setSavedListingIds(prev => {
      const exists = prev.includes(listingId);
      const next = exists ? prev.filter(id => id !== listingId) : [...prev, listingId];
      localStorage.setItem('campusync_saved_ids', JSON.stringify(next));
      return next;
    });
  };

  // Filter and sort listings
  const filteredListings = useMemo(() => {
    let result = [...listings];

    // Filter by Active View
    if (activeView === 'my-listings' && currentUser) {
      result = result.filter(item => item.ownerId === currentUser.uid);
    } else if (activeView === 'saved') {
      result = result.filter(item => savedListingIds.includes(item.id));
    }

    // Search query filter
    if (filters.searchQuery.trim()) {
      const q = filters.searchQuery.toLowerCase().trim();
      result = result.filter(item => 
        item.title.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q) ||
        item.hostelBlock.toLowerCase().includes(q) ||
        (item.barterSkill && item.barterSkill.toLowerCase().includes(q)) ||
        (item.tags && item.tags.some(tag => tag.toLowerCase().includes(q)))
      );
    }

    // Category filter
    if (filters.category !== 'All') {
      result = result.filter(item => item.category === filters.category);
    }

    // Transaction Type filter (Rent, Sell, Skill-Barter)
    if (filters.transactionType !== 'All') {
      result = result.filter(item => item.transactionType === filters.transactionType);
    }

    // Hostel Block filter
    if (filters.hostelBlock !== 'All') {
      result = result.filter(item => item.hostelBlock === filters.hostelBlock || item.ownerHostel === filters.hostelBlock);
    }

    // Condition filter
    if (filters.condition !== 'All') {
      result = result.filter(item => item.condition === filters.condition);
    }

    // Status filter
    if (filters.status !== 'All') {
      result = result.filter(item => item.status === filters.status);
    }

    // Sorting
    result.sort((a, b) => {
      if (filters.sortBy === 'newest') {
        return b.createdAt - a.createdAt;
      }
      if (filters.sortBy === 'price-low') {
        return a.price - b.price;
      }
      if (filters.sortBy === 'price-high') {
        return b.price - a.price;
      }
      if (filters.sortBy === 'rating') {
        return (b.ownerRating || 0) - (a.ownerRating || 0);
      }
      return 0;
    });

    return result;
  }, [listings, filters, activeView, currentUser, savedListingIds]);

  // Total unread messages across conversations
  const unreadCountTotal = useMemo(() => {
    if (!currentUser) return 0;
    return chats.reduce((acc, c) => acc + (c.unreadCount?.[currentUser.uid] || 0), 0);
  }, [chats, currentUser]);

  // Filter setters
  const setSearchQuery = (query: string) => setFilters(prev => ({ ...prev, searchQuery: query }));
  const setCategory = (category: string) => setFilters(prev => ({ ...prev, category }));
  const setTransactionType = (type: string) => setFilters(prev => ({ ...prev, transactionType: type }));
  const setHostelBlock = (hostel: string) => setFilters(prev => ({ ...prev, hostelBlock: hostel }));
  const setCondition = (condition: string) => setFilters(prev => ({ ...prev, condition }));
  const setSortBy = (sortBy: 'newest' | 'price-low' | 'price-high' | 'rating') => setFilters(prev => ({ ...prev, sortBy }));
  const resetFilters = () => setFilters(initialFilters);

  // Add Listing
  const addNewListing = async (
    data: Omit<Listing, 'id' | 'createdAt' | 'views' | 'ownerId' | 'ownerName' | 'ownerAvatar' | 'ownerRating' | 'ownerHostel'>
  ): Promise<Listing> => {
    if (!currentUser) {
      openAuthModal('login');
      throw new Error('You must be logged in to create a listing.');
    }

    const newListing = await createNewListing({
      ...data,
      ownerId: currentUser.uid,
      ownerName: currentUser.name,
      ownerEmail: currentUser.email,
      ownerHostel: currentUser.hostelBlock,
      ownerAvatar: currentUser.avatar,
      ownerRating: currentUser.rating,
      hostelBlock: data.hostelBlock || currentUser.hostelBlock,
    });

    setListings(prev => [newListing, ...prev]);
    return newListing;
  };

  // Change listing status
  const changeListingStatus = async (listingId: string, status: ListingStatus) => {
    await updateListingStatus(listingId, status);
    setListings(prev => prev.map(item => item.id === listingId ? { ...item, status } : item));
    if (activeDetailItem && activeDetailItem.id === listingId) {
      setActiveDetailItem(prev => prev ? { ...prev, status } : null);
    }
  };

  // Delete listing
  const deleteListingById = async (listingId: string) => {
    await removeListing(listingId);
    setListings(prev => prev.filter(item => item.id !== listingId));
    if (activeDetailItem && activeDetailItem.id === listingId) {
      setActiveDetailItem(null);
    }
  };

  // Detail Modal Handlers
  const openDetailModal = (listing: Listing) => setActiveDetailItem(listing);
  const closeDetailModal = () => setActiveDetailItem(null);

  // Add Listing Modal Handlers
  const openAddModal = () => {
    if (!currentUser) {
      openAuthModal('login');
      return;
    }
    setIsAddModalOpen(true);
  };
  const closeAddModal = () => setIsAddModalOpen(false);

  // Chat Handlers
  const openChatDrawer = (chat?: ChatConversation) => {
    if (chat) {
      setActiveChat(chat);
    }
    setIsChatDrawerOpen(true);
  };

  const closeChatDrawer = () => {
    setIsChatDrawerOpen(false);
  };

  const selectChat = (chat: ChatConversation) => {
    setActiveChat(chat);
    // Reset unread count for current user
    if (currentUser) {
      setChats(prev => prev.map(c => {
        if (c.chatId === chat.chatId && c.unreadCount) {
          return {
            ...c,
            unreadCount: { ...c.unreadCount, [currentUser.uid]: 0 }
          };
        }
        return c;
      }));
    }
  };

  const openChatForListing = async (listing: Listing) => {
    if (!currentUser) {
      openAuthModal('login');
      return;
    }

    if (currentUser.uid === listing.ownerId) {
      // User is the owner, open drawer to general chats
      openChatDrawer();
      return;
    }

    try {
      const conv = await startOrGetChat(
        listing,
        currentUser,
        {
          uid: listing.ownerId,
          name: listing.ownerName,
          avatar: listing.ownerAvatar,
          hostel: listing.ownerHostel as string,
        }
      );

      setChats(prev => {
        const filtered = prev.filter(c => c.chatId !== conv.chatId);
        return [conv, ...filtered];
      });

      setActiveChat(conv);
      setIsChatDrawerOpen(true);
    } catch (err) {
      console.error('Could not initiate chat', err);
    }
  };

  const sendMessageToActiveChat = async (
    text: string, 
    isOffer: boolean = false, 
    offerDetails?: { type: string; details: string }
  ) => {
    if (!activeChat || !currentUser || !text.trim()) return;

    try {
      const msg = await sendNewMessage(
        activeChat.chatId,
        currentUser,
        text,
        isOffer,
        offerDetails
      );

      setActiveChatMessages(prev => [...prev, msg]);

      // Update conversation in list
      setChats(prev => prev.map(c => {
        if (c.chatId === activeChat.chatId) {
          return {
            ...c,
            lastMessage: text,
            lastMessageTimestamp: Date.now()
          };
        }
        return c;
      }));
    } catch (err) {
      console.error('Failed to send message', err);
    }
  };

  return (
    <MarketplaceContext.Provider
      value={{
        listings,
        filteredListings,
        isLoadingListings,
        filters,
        setSearchQuery,
        setCategory,
        setTransactionType,
        setHostelBlock,
        setCondition,
        setSortBy,
        resetFilters,
        addNewListing,
        changeListingStatus,
        deleteListingById,
        savedListingIds,
        toggleSaveListing,
        activeDetailItem,
        openDetailModal,
        closeDetailModal,
        isAddModalOpen,
        openAddModal,
        closeAddModal,
        chats,
        activeChat,
        activeChatMessages,
        isChatDrawerOpen,
        unreadCountTotal,
        openChatDrawer,
        closeChatDrawer,
        selectChat,
        openChatForListing,
        sendMessageToActiveChat,
        activeView,
        setActiveView,
      }}
    >
      {children}
    </MarketplaceContext.Provider>
  );
};

export const useMarketplace = (): MarketplaceContextType => {
  const context = useContext(MarketplaceContext);
  if (!context) {
    throw new Error('useMarketplace must be used within a MarketplaceProvider');
  }
  return context;
};
