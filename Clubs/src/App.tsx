import { useState, useMemo } from 'react';
import { Header } from './components/Header';
import { ClubGrid } from './components/ClubGrid';
import { ClubDetails } from './components/ClubDetails';
import { CLUBS } from './data/clubs';

function App() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedClubId, setSelectedClubId] = useState<string | null>(null);

  const filteredClubs = useMemo(() => {
    return CLUBS.filter((club) => {
      const matchesCategory = activeCategory === "All" || club.category === activeCategory;
      const matchesSearch = club.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            club.tagline.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  const selectedClub = useMemo(() => {
    return CLUBS.find(c => c.id === selectedClubId) || null;
  }, [selectedClubId]);

  if (selectedClub) {
    return (
      <ClubDetails 
        club={selectedClub} 
        onBack={() => setSelectedClubId(null)} 
      />
    );
  }

  return (
    <div className="min-h-screen">
      <Header 
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h2 className="text-3xl font-bold text-slate-800 mb-2">Explore Clubs</h2>
            <p className="text-slate-500">Discover and join student organizations that match your interests.</p>
          </div>
          <div className="text-sm font-semibold text-slate-400 bg-white px-4 py-2 rounded-full shadow-sm border border-slate-100">
            Showing {filteredClubs.length} result{filteredClubs.length !== 1 ? 's' : ''}
          </div>
        </div>

        {filteredClubs.length > 0 ? (
          <ClubGrid clubs={filteredClubs} onClubClick={(club) => setSelectedClubId(club.id)} />
        ) : (
          <div className="text-center py-24 bg-white rounded-3xl border border-slate-100 shadow-sm">
            <h3 className="text-xl font-bold text-slate-700 mb-2">No clubs found</h3>
            <p className="text-slate-500 max-w-sm mx-auto">
              We couldn't find any clubs matching your criteria. Try adjusting your filters or search term.
            </p>
            <button 
              onClick={() => {
                setSearchQuery("");
                setActiveCategory("All");
              }}
              className="mt-6 px-6 py-2.5 bg-purple-50 text-purple-700 hover:bg-purple-100 font-semibold rounded-xl transition-colors"
            >
              Clear Filters
            </button>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
