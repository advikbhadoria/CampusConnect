import React from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { MarketplaceProvider, useMarketplace } from './context/MarketplaceContext';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { Dashboard } from './components/marketplace/Dashboard';
import { MyListingsView } from './components/marketplace/MyListingsView';
import { AddListingModal } from './components/marketplace/AddListingModal';
import { ItemDetailModal } from './components/marketplace/ItemDetailModal';
import { AuthModal } from './components/auth/AuthModal';
import { VerificationPrompt } from './components/auth/VerificationPrompt';
import { ChatDrawer } from './components/chat/ChatDrawer';

const MainLayout: React.FC = () => {
  const { currentUser, isEmailVerified, isAuthenticated } = useAuth();
  const { activeView } = useMarketplace();

  // If user is logged in but hasn't verified their college email, gate access
  const isGated = isAuthenticated && currentUser && !isEmailVerified;

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      
      {/* Top Navigation */}
      <Navbar />

      {/* Main App Content View */}
      <main className="flex-1">
        {isGated ? (
          <VerificationPrompt />
        ) : activeView === 'feed' ? (
          <Dashboard />
        ) : (
          <MyListingsView />
        )}
      </main>

      {/* Footer */}
      <Footer />

      {/* Global Application Modals */}
      <AddListingModal />
      <ItemDetailModal />
      <AuthModal />
      <ChatDrawer />

    </div>
  );
};

export const App: React.FC = () => {
  return (
    <AuthProvider>
      <MarketplaceProvider>
        <MainLayout />
      </MarketplaceProvider>
    </AuthProvider>
  );
};

export default App;
