import { 
  collection, 
  doc, 
  setDoc, 
  addDoc, 
  getDocs, 
  query, 
  where, 
  orderBy 
} from 'firebase/firestore';
import { db, isFirebaseConfigured } from '../config/firebase';
import { ChatConversation, ChatMessage, Listing, UserProfile } from '../types';

const LOCAL_STORAGE_CHATS_KEY = 'campussync_chats';
const LOCAL_STORAGE_MESSAGES_KEY = 'campussync_messages';

// Initial pre-seeded mock conversations so chat feels active right away
const INITIAL_CONVERSATIONS: ChatConversation[] = [
  {
    chatId: 'chat_seed_1',
    listingId: 'listing_02',
    listingTitle: 'Engineering Graphics Mini Drafter + Heavy-Duty Tube',
    listingImage: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=600&auto=format&fit=crop&q=80',
    listingPrice: 'Skill-Barter',
    transactionType: 'Skill-Barter',
    barterSkill: 'Need help debugging my Web Tech Node.js backend assignment',
    participants: ['user_ait_01', 'user_ait_03'],
    participantDetails: {
      'user_ait_01': {
        name: 'Aarav Sharma',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
        hostel: 'OBH-2'
      },
      'user_ait_03': {
        name: 'Rohan Verma',
        avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=150&auto=format&fit=crop&q=80',
        hostel: 'NBH-1'
      }
    },
    lastMessage: 'Hey! I can help you with your Node.js routing and Express controllers tonight after 8 PM!',
    lastMessageTimestamp: Date.now() - 1000 * 60 * 25, // 25 mins ago
    unreadCount: {
      'user_ait_03': 1,
      'user_ait_01': 0
    }
  }
];

const INITIAL_MESSAGES: Record<string, ChatMessage[]> = {
  'chat_seed_1': [
    {
      id: 'm1',
      senderId: 'user_ait_01',
      senderName: 'Aarav Sharma',
      senderAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
      text: 'Hi Rohan! Saw your listing for the mini-drafter. I am in OBH-2.',
      timestamp: Date.now() - 1000 * 60 * 40
    },
    {
      id: 'm2',
      senderId: 'user_ait_03',
      senderName: 'Rohan Verma',
      senderAvatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=150&auto=format&fit=crop&q=80',
      text: 'Awesome Aarav! Are you proficient with Node.js and MongoDB? I have an assignment due Friday.',
      timestamp: Date.now() - 1000 * 60 * 35
    },
    {
      id: 'm3',
      senderId: 'user_ait_01',
      senderName: 'Aarav Sharma',
      senderAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
      text: 'Hey! I can help you with your Node.js routing and Express controllers tonight after 8 PM at the Nescafe or library!',
      timestamp: Date.now() - 1000 * 60 * 25
    }
  ]
};

const getStoredConversations = (): ChatConversation[] => {
  const data = localStorage.getItem(LOCAL_STORAGE_CHATS_KEY) || localStorage.getItem('campusync_chats');
  if (data) {
    try {
      return JSON.parse(data);
    } catch {
      return INITIAL_CONVERSATIONS;
    }
  }
  localStorage.setItem(LOCAL_STORAGE_CHATS_KEY, JSON.stringify(INITIAL_CONVERSATIONS));
  return INITIAL_CONVERSATIONS;
};

const saveStoredConversations = (conversations: ChatConversation[]) => {
  localStorage.setItem(LOCAL_STORAGE_CHATS_KEY, JSON.stringify(conversations));
};

const getStoredMessages = (): Record<string, ChatMessage[]> => {
  const data = localStorage.getItem(LOCAL_STORAGE_MESSAGES_KEY) || localStorage.getItem('campusync_messages');
  if (data) {
    try {
      return JSON.parse(data);
    } catch {
      return INITIAL_MESSAGES;
    }
  }
  localStorage.setItem(LOCAL_STORAGE_MESSAGES_KEY, JSON.stringify(INITIAL_MESSAGES));
  return INITIAL_MESSAGES;
};

const saveStoredMessages = (messages: Record<string, ChatMessage[]>) => {
  localStorage.setItem(LOCAL_STORAGE_MESSAGES_KEY, JSON.stringify(messages));
};

export const fetchUserChats = async (userId: string): Promise<ChatConversation[]> => {
  if (isFirebaseConfigured && db) {
    try {
      const q = query(
        collection(db, 'chats'),
        where('participants', 'array-contains', userId)
      );
      const snapshot = await getDocs(q);
      if (!snapshot.empty) {
        return snapshot.docs.map(d => ({
          chatId: d.id,
          ...(d.data() as Omit<ChatConversation, 'chatId'>)
        }));
      }
    } catch (err) {
      console.warn('Error fetching Firestore chats, using local data', err);
    }
  }

  const all = getStoredConversations();
  return all.filter(c => c.participants.includes(userId));
};

export const fetchMessagesForChat = async (chatId: string): Promise<ChatMessage[]> => {
  if (isFirebaseConfigured && db) {
    try {
      const q = query(
        collection(db, 'chats', chatId, 'messages'),
        orderBy('timestamp', 'asc')
      );
      const snapshot = await getDocs(q);
      if (!snapshot.empty) {
        return snapshot.docs.map(d => ({
          id: d.id,
          ...(d.data() as Omit<ChatMessage, 'id'>)
        }));
      }
    } catch (err) {
      console.warn('Error fetching Firestore messages, using local data', err);
    }
  }

  const messagesMap = getStoredMessages();
  return messagesMap[chatId] || [];
};

export const startOrGetChat = async (
  listing: Listing,
  buyer: UserProfile,
  seller: { uid: string; name: string; avatar: string; hostel: string }
): Promise<ChatConversation> => {
  const chatId = `chat_${listing.id}_${buyer.uid}`;
  const timestamp = Date.now();

  const conversation: ChatConversation = {
    chatId,
    listingId: listing.id,
    listingTitle: listing.title,
    listingImage: listing.imageUrl,
    listingPrice: listing.transactionType === 'Skill-Barter' 
      ? 'Skill Barter' 
      : `₹${listing.price}${listing.rentalPeriod ? ` / ${listing.rentalPeriod.replace('per ', '')}` : ''}`,
    transactionType: listing.transactionType,
    barterSkill: listing.barterSkill,
    participants: [buyer.uid, seller.uid],
    participantDetails: {
      [buyer.uid]: {
        name: buyer.name,
        avatar: buyer.avatar,
        hostel: buyer.hostelBlock
      },
      [seller.uid]: {
        name: seller.name,
        avatar: seller.avatar,
        hostel: seller.hostel
      }
    },
    lastMessage: `Inquiring about "${listing.title}"`,
    lastMessageTimestamp: timestamp,
    unreadCount: {
      [seller.uid]: 1,
      [buyer.uid]: 0
    }
  };

  if (isFirebaseConfigured && db) {
    try {
      await setDoc(doc(db, 'chats', chatId), conversation, { merge: true });
    } catch (err) {
      console.warn('Error saving chat to Firestore', err);
    }
  }

  const all = getStoredConversations();
  const existingIdx = all.findIndex(c => c.chatId === chatId);
  if (existingIdx >= 0) {
    all[existingIdx] = conversation;
  } else {
    all.unshift(conversation);
  }
  saveStoredConversations(all);

  return conversation;
};

export const sendNewMessage = async (
  chatId: string,
  sender: UserProfile,
  text: string,
  isOffer: boolean = false,
  _offerDetails?: { type: string; details: string }
): Promise<ChatMessage> => {
  const timestamp = Date.now();
  const newMessage: ChatMessage = {
    id: `msg_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    senderId: sender.uid,
    senderName: sender.name,
    senderAvatar: sender.avatar,
    text,
    timestamp,
    isOffer,
    offerStatus: isOffer ? 'pending' : undefined
  };

  if (isFirebaseConfigured && db) {
    try {
      await addDoc(collection(db, 'chats', chatId, 'messages'), newMessage);
      await setDoc(
        doc(db, 'chats', chatId),
        {
          lastMessage: text,
          lastMessageTimestamp: timestamp
        },
        { merge: true }
      );
    } catch (err) {
      console.warn('Error saving message in Firestore', err);
    }
  }

  // Update local storage
  const messagesMap = getStoredMessages();
  const currentChatMessages = messagesMap[chatId] || [];
  messagesMap[chatId] = [...currentChatMessages, newMessage];
  saveStoredMessages(messagesMap);

  // Update conversation last message
  const conversations = getStoredConversations();
  const targetConv = conversations.find(c => c.chatId === chatId);
  if (targetConv) {
    targetConv.lastMessage = text;
    targetConv.lastMessageTimestamp = timestamp;
    saveStoredConversations([...conversations]);
  }

  return newMessage;
};
