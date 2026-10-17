export type TransactionType = 'Rent' | 'Sell' | 'Skill-Barter';

export type ListingCategory = 
  | 'Electronics & IoT'
  | 'Books & Notes'
  | 'Lab Tools & Drafters'
  | 'Cycles & Mobility'
  | 'Hostel Essentials'
  | 'Sports & Gym'
  | 'Other';

export type ItemCondition = 'Brand New' | 'Like New' | 'Gently Used' | 'Fair';

export type ListingStatus = 'Available' | 'Rented' | 'Sold' | 'Reserved';

export type HostelBlock = 
  | 'OBH-1'
  | 'OBH-2'
  | 'OBH-3'
  | 'NBH-1'
  | 'NBH-2'
  | 'GH-1'
  | 'GH-2'
  | 'Day Scholar';

export interface UserProfile {
  uid: string;
  name: string;
  email: string;
  hostelBlock: HostelBlock;
  roomNumber?: string;
  rating: number;
  ratingCount: number;
  avatar: string;
  phone?: string;
  createdAt: number;
  isVerified: boolean;
}

export interface Listing {
  id: string;
  ownerId: string;
  ownerName: string;
  ownerEmail?: string;
  ownerHostel: HostelBlock | string;
  ownerAvatar: string;
  ownerRating: number;
  title: string;
  description: string;
  category: ListingCategory;
  transactionType: TransactionType;
  price: number; // 0 if pure barter, or rental/sale cost in INR (₹)
  rentalPeriod?: 'per day' | 'per week' | 'per month' | 'per semester' | 'flat sale';
  barterSkill?: string; // The requested skill or help, e.g. "Need help debugging React/Node assignment"
  condition: ItemCondition;
  imageUrl: string;
  status: ListingStatus;
  hostelBlock: HostelBlock | string;
  createdAt: number;
  tags?: string[];
  views?: number;
}

export interface ChatMessage {
  id: string;
  senderId: string;
  senderName: string;
  senderAvatar?: string;
  text: string;
  timestamp: number;
  isOffer?: boolean;
  offerType?: TransactionType;
  offerAmount?: string;
  offerStatus?: 'pending' | 'accepted' | 'declined';
}

export interface ChatConversation {
  chatId: string;
  listingId: string;
  listingTitle: string;
  listingImage: string;
  listingPrice: string;
  transactionType: TransactionType;
  barterSkill?: string;
  participants: string[]; // [buyerUid, sellerUid]
  participantDetails: {
    [uid: string]: {
      name: string;
      avatar: string;
      hostel: string;
    };
  };
  lastMessage: string;
  lastMessageTimestamp: number;
  unreadCount: {
    [uid: string]: number;
  };
}

export interface FilterState {
  searchQuery: string;
  category: string; // 'All' or ListingCategory
  transactionType: string; // 'All' or TransactionType
  hostelBlock: string; // 'All' or HostelBlock
  condition: string; // 'All' or ItemCondition
  status: string; // 'All' or 'Available'
  sortBy: 'newest' | 'price-low' | 'price-high' | 'rating';
}
