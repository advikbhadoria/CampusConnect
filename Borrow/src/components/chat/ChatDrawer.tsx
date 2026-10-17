import React, { useState, useEffect, useRef } from 'react';
import { 
  X, 
  Send, 
  MessageSquare, 
  Sparkles, 
  MapPin, 
  CheckCircle2, 
  Building2, 
  Coffee, 
  Clock, 
  AlertCircle,
  HelpCircle,
  ChevronLeft
} from 'lucide-react';
import { useMarketplace } from '../../context/MarketplaceContext';
import { useAuth } from '../../context/AuthContext';
import { ChatConversation } from '../../types';

export const ChatDrawer: React.FC = () => {
  const { 
    isChatDrawerOpen, 
    closeChatDrawer, 
    chats, 
    activeChat, 
    selectChat, 
    activeChatMessages, 
    sendMessageToActiveChat 
  } = useMarketplace();
  
  const { currentUser } = useAuth();
  const [inputText, setInputText] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto scroll to bottom of messages
  useEffect(() => {
    if (isChatDrawerOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [activeChatMessages, isChatDrawerOpen]);

  if (!isChatDrawerOpen) return null;

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    sendMessageToActiveChat(inputText.trim());
    setInputText('');
  };

  const sendQuickChip = (text: string) => {
    sendMessageToActiveChat(text);
  };

  // Find other participant details
  const getOtherParticipant = (chat: ChatConversation) => {
    if (!currentUser) return { name: 'AIT Student', avatar: '', hostel: 'Campus' };
    const otherUid = chat.participants.find(id => id !== currentUser.uid) || chat.participants[0];
    return chat.participantDetails[otherUid] || { name: 'AIT Student', avatar: '', hostel: 'Campus' };
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-end bg-slate-950/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="w-full sm:max-w-2xl h-full bg-white shadow-2xl flex flex-col sm:flex-row overflow-hidden border-l border-slate-200"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Left Side (or Top on Mobile): Conversation List */}
        <div className={`w-full sm:w-72 bg-slate-50 border-r border-slate-200 flex flex-col h-full ${activeChat ? 'hidden sm:flex' : 'flex'}`}>
          
          {/* Header */}
          <div className="p-4 bg-slate-900 text-white flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-blue-400" />
              <h3 className="font-extrabold text-sm tracking-tight">Peer Inquiries</h3>
            </div>
            <button
              onClick={closeChatDrawer}
              className="sm:hidden p-1 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Chat List Items */}
          <div className="flex-1 overflow-y-auto divide-y divide-slate-100">
            {chats.length > 0 ? (
              chats.map((chat) => {
                const other = getOtherParticipant(chat);
                const isSelected = activeChat?.chatId === chat.chatId;

                return (
                  <button
                    key={chat.chatId}
                    onClick={() => selectChat(chat)}
                    className={`w-full p-3.5 text-left transition-all flex items-start gap-3 hover:bg-slate-100/80 ${
                      isSelected ? 'bg-white border-l-4 border-blue-600 shadow-sm' : ''
                    }`}
                  >
                    <img
                      src={chat.listingImage}
                      alt={chat.listingTitle}
                      className="w-11 h-11 rounded-xl object-cover ring-1 ring-slate-200 flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1 mb-0.5">
                        <span className="text-xs font-bold text-slate-900 truncate">
                          {other.name}
                        </span>
                        <span className="text-[10px] text-slate-400 flex-shrink-0">
                          {other.hostel}
                        </span>
                      </div>
                      <p className="text-[11px] font-semibold text-blue-600 truncate">
                        {chat.listingTitle}
                      </p>
                      <p className="text-[10px] text-slate-500 truncate mt-0.5">
                        {chat.lastMessage}
                      </p>
                    </div>
                  </button>
                );
              })
            ) : (
              <div className="p-8 text-center text-slate-400">
                <MessageSquare className="w-8 h-8 mx-auto mb-2 opacity-40" />
                <p className="text-xs font-bold text-slate-700">No active conversations</p>
                <p className="text-[11px] text-slate-400 mt-1">
                  Click "Contact Owner" on any item card to start negotiating.
                </p>
              </div>
            )}
          </div>

        </div>

        {/* Right Side: Active Chat Conversation */}
        <div className={`flex-1 flex flex-col h-full bg-white ${!activeChat ? 'hidden sm:flex items-center justify-center' : 'flex'}`}>
          
          {activeChat ? (
            <>
              {/* Conversation Top Bar */}
              <div className="p-3.5 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
                <div className="flex items-center gap-2.5 min-w-0">
                  <button
                    onClick={() => selectChat(null as any)}
                    className="sm:hidden p-1 text-slate-300 hover:text-white"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <img
                    src={getOtherParticipant(activeChat).avatar}
                    alt={getOtherParticipant(activeChat).name}
                    className="w-8 h-8 rounded-full object-cover ring-1 ring-white/20"
                  />
                  <div className="min-w-0">
                    <p className="text-xs font-bold truncate">
                      {getOtherParticipant(activeChat).name}
                    </p>
                    <p className="text-[10px] text-slate-400">
                      📍 {getOtherParticipant(activeChat).hostel} • Verified Student
                    </p>
                  </div>
                </div>

                <button
                  onClick={closeChatDrawer}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Pinned Listing Summary at Top of Chat */}
              <div className="p-3 bg-blue-50/70 border-b border-blue-100 flex items-center justify-between gap-3">
                <div className="flex items-center gap-2.5 min-w-0">
                  <img
                    src={activeChat.listingImage}
                    alt={activeChat.listingTitle}
                    className="w-10 h-10 rounded-lg object-cover flex-shrink-0"
                  />
                  <div className="min-w-0">
                    <span className="text-[10px] font-bold text-blue-700 uppercase tracking-wider block">
                      {activeChat.transactionType}
                    </span>
                    <p className="text-xs font-bold text-slate-900 truncate">
                      {activeChat.listingTitle}
                    </p>
                    <p className="text-[10px] text-slate-600 truncate">
                      {activeChat.transactionType === 'Skill-Barter'
                        ? `Skill: ${activeChat.barterSkill}`
                        : activeChat.listingPrice}
                    </p>
                  </div>
                </div>

                {activeChat.transactionType === 'Skill-Barter' && (
                  <span className="px-2 py-1 text-[10px] font-extrabold bg-purple-100 text-purple-800 rounded-md border border-purple-200 flex items-center gap-1 flex-shrink-0">
                    <Sparkles className="w-3 h-3 text-purple-600" />
                    <span>Skill Trade</span>
                  </span>
                )}
              </div>

              {/* Messages Feed */}
              <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-slate-50/50">
                
                {/* Intro Timestamp Banner */}
                <div className="text-center my-2">
                  <span className="px-2.5 py-1 text-[10px] font-semibold bg-slate-200/80 text-slate-600 rounded-full">
                    AIT Campus Verified Chat
                  </span>
                </div>

                {activeChatMessages.map((msg) => {
                  const isMe = msg.senderId === currentUser?.uid;

                  return (
                    <div
                      key={msg.id}
                      className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}
                    >
                      <div className="flex items-end gap-1.5 max-w-[85%]">
                        {!isMe && (
                          <img
                            src={msg.senderAvatar || 'https://api.dicebear.com/7.x/bottts/svg?seed=user'}
                            alt={msg.senderName}
                            className="w-5 h-5 rounded-full object-cover mb-1 flex-shrink-0"
                          />
                        )}

                        <div
                          className={`p-3 rounded-2xl text-xs leading-relaxed ${
                            isMe
                              ? 'bg-blue-600 text-white rounded-br-xs shadow-sm'
                              : 'bg-white text-slate-800 border border-slate-200 rounded-bl-xs shadow-sm'
                          }`}
                        >
                          {!isMe && (
                            <p className="text-[10px] font-bold text-blue-600 mb-0.5">
                              {msg.senderName}
                            </p>
                          )}
                          <p className="whitespace-pre-wrap">{msg.text}</p>
                        </div>
                      </div>

                      <span className="text-[9px] text-slate-400 mt-1 px-1">
                        {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                  );
                })}

                <div ref={messagesEndRef} />
              </div>

              {/* Quick Negotiation Prompt Chips */}
              <div className="px-3 pt-2 pb-1 bg-white border-t border-slate-100 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex-shrink-0">
                  Quick:
                </span>
                
                {activeChat.transactionType === 'Skill-Barter' ? (
                  <>
                    <button
                      onClick={() => sendQuickChip('I can definitely help with your project! When are you free?')}
                      className="px-2.5 py-1 text-[11px] font-medium bg-purple-50 text-purple-800 rounded-full border border-purple-200 hover:bg-purple-100 whitespace-nowrap transition-colors"
                    >
                      🤝 I can help with this!
                    </button>
                    <button
                      onClick={() => sendQuickChip('Can we meet at Nescafe cafe at 6 PM to discuss?')}
                      className="px-2.5 py-1 text-[11px] font-medium bg-slate-100 text-slate-700 rounded-full hover:bg-slate-200 whitespace-nowrap transition-colors"
                    >
                      ☕ Meet at Nescafe
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => sendQuickChip('Is this item still available?')}
                      className="px-2.5 py-1 text-[11px] font-medium bg-slate-100 text-slate-700 rounded-full hover:bg-slate-200 whitespace-nowrap transition-colors"
                    >
                      🙋 Is this available?
                    </button>
                    <button
                      onClick={() => sendQuickChip('Can we meet at the Nescafe or Hostel gate today?')}
                      className="px-2.5 py-1 text-[11px] font-medium bg-slate-100 text-slate-700 rounded-full hover:bg-slate-200 whitespace-nowrap transition-colors"
                    >
                      📍 Handover spot?
                    </button>
                    <button
                      onClick={() => sendQuickChip('Can I inspect and rent this for the coming week?')}
                      className="px-2.5 py-1 text-[11px] font-medium bg-blue-50 text-blue-700 rounded-full border border-blue-200 hover:bg-blue-100 whitespace-nowrap transition-colors"
                    >
                      ⏳ Rent for week
                    </button>
                  </>
                )}
              </div>

              {/* Message Input Form */}
              <form onSubmit={handleSend} className="p-3 bg-white border-t border-slate-200 flex items-center gap-2">
                <input
                  type="text"
                  placeholder="Type a message or negotiation proposal..."
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  className="flex-1 px-3.5 py-2.5 text-xs text-slate-900 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-blue-500 outline-none"
                />
                <button
                  type="submit"
                  disabled={!inputText.trim()}
                  className="p-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-md shadow-blue-600/20 active:scale-95 transition-all disabled:opacity-40"
                  title="Send Message"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>

            </>
          ) : (
            <div className="p-8 text-center text-slate-400">
              <Building2 className="w-10 h-10 mx-auto mb-2 text-slate-300" />
              <p className="text-sm font-bold text-slate-700">Select a Conversation</p>
              <p className="text-xs text-slate-400 mt-1 max-w-xs">
                Select an inquiry from the left panel to message peer students.
              </p>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
