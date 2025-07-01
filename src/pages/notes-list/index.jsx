import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import ContextualHeader from '../../components/ui/ContextualHeader';
import BottomTabNavigation from '../../components/ui/BottomTabNavigation';
import FloatingActionButton from '../../components/ui/FloatingActionButton';
import SearchBar from './components/SearchBar';
import FilterPanel from './components/FilterPanel';
import SortDropdown from './components/SortDropdown';
import NoteCard from './components/NoteCard';
import BulkActionBar from './components/BulkActionBar';
import PullToRefresh from './components/PullToRefresh';
import EmptyState from './components/EmptyState';

const NotesList = () => {
  const [notes, setNotes] = useState([]);
  const [filteredNotes, setFilteredNotes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedNotes, setSelectedNotes] = useState([]);
  const [isSelectionMode, setIsSelectionMode] = useState(false);
  const [showFilterPanel, setShowFilterPanel] = useState(false);
  const [filters, setFilters] = useState({
    categories: [],
    dateRange: null,
    favorites: false
  });
  const [sortBy, setSortBy] = useState('modified');

  // Mock notes data
  const mockNotes = [
    {
      id: 1,
      title: 'Meeting Notes - Q4 Planning',
      content: '# Q4 Planning Meeting\n\n## Agenda\n- Review Q3 performance\n- Set Q4 goals\n- Budget allocation\n\n## Key Points\n- Revenue target: $2M\n- New product launch in December\n- Hiring 5 new developers',
      category: 'Work',
      tags: ['meeting', 'planning', 'q4'],
      createdAt: '2024-01-15T10:30:00Z',
      modifiedAt: '2024-01-15T14:20:00Z',
      isFavorite: true,
      preview: 'Q4 Planning Meeting agenda and key points from today\'s session...'
    },
    {
      id: 2,
      title: 'Daily Journal - Jan 15',
      content: '# January 15, 2024\n\nToday was quite productive. Completed the markdown parser implementation and started working on the notes dashboard.\n\n## Achievements\n- ✅ Finished markdown parser\n- ✅ Created notes dashboard mockup\n- ✅ Fixed bugs in authentication flow\n\n## Tomorrow\'s Goals\n- Start notes list implementation\n- Review PR feedback\n- Team standup at 9 AM',
      category: 'Personal',
      tags: ['journal', 'daily', 'reflection'],
      createdAt: '2024-01-15T09:00:00Z',
      modifiedAt: '2024-01-15T21:15:00Z',
      isFavorite: false,
      preview: 'Today was quite productive. Completed the markdown parser implementation...'
    },
    {
      id: 3,
      title: 'React Best Practices',
      content: '# React Best Practices\n\n## Component Design\n- Keep components small and focused\n- Use functional components with hooks\n- Implement proper prop validation\n\n## Performance\n- Use React.memo for expensive components\n- Implement proper key props for lists\n- Lazy load components when possible\n\n## Code Organization\n- Group related components in folders\n- Use custom hooks for business logic\n- Keep components pure when possible',
      category: 'Learning',
      tags: ['react', 'javascript', 'best-practices'],
      createdAt: '2024-01-14T16:45:00Z',
      modifiedAt: '2024-01-14T18:30:00Z',
      isFavorite: true,
      preview: 'Component Design principles and performance optimization techniques...'
    },
    {
      id: 4,
      title: 'App Ideas Brainstorm',
      content: '# App Ideas\n\n## Productivity Apps\n1. **Smart Todo List**\n   - AI-powered task prioritization\n   - Natural language input\n   - Calendar integration\n\n2. **Note-taking with Voice**\n   - Speech-to-text conversion\n   - Auto-categorization\n   - Smart search\n\n3. **Habit Tracker Plus**\n   - Gamification elements\n   - Social challenges\n   - Analytics dashboard',
      category: 'Ideas',
      tags: ['brainstorm', 'apps', 'productivity'],
      createdAt: '2024-01-13T11:20:00Z',
      modifiedAt: '2024-01-13T12:10:00Z',
      isFavorite: false,
      preview: 'Brainstorming session for new productivity app ideas and features...'
    },
    {
      id: 5,
      title: 'Project Documentation',
      content: '# Project Setup Documentation\n\n## Prerequisites\n- Node.js 18+\n- npm or yarn\n- Git\n\n## Installation\n```bash\nnpm install\nnpm run dev\n```\n\n## Project Structure\n```\nsrc/\n├── components/\n├── pages/\n├── hooks/\n└── utils/\n```\n\n## Available Scripts\n- `npm run dev` - Start development server\n- `npm run build` - Build for production\n- `npm run test` - Run tests',
      category: 'Work',
      tags: ['documentation', 'setup', 'project'],
      createdAt: '2024-01-12T14:00:00Z',
      modifiedAt: '2024-01-15T13:45:00Z',
      isFavorite: true,
      preview: 'Complete project setup guide and documentation for new team members...'
    }
  ];

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        setIsLoading(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        setNotes(mockNotes);
      } catch (error) {
        console.error('Error fetching notes:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchNotes();
  }, []);

  useEffect(() => {
    let filtered = [...notes];

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(note =>
        note?.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        note?.content?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        note?.tags?.some(tag => tag?.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    // Apply category filter
    if (filters?.categories?.length > 0) {
      filtered = filtered.filter(note =>
        filters?.categories?.includes(note?.category)
      );
    }

    // Apply favorites filter
    if (filters?.favorites) {
      filtered = filtered.filter(note => note?.isFavorite);
    }

    // Apply sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'modified':
          return new Date(b?.modifiedAt) - new Date(a?.modifiedAt);
        case 'created':
          return new Date(b?.createdAt) - new Date(a?.createdAt);
        case 'title':
          return a?.title?.localeCompare(b?.title);
        case 'favorites':
          if (a?.isFavorite === b?.isFavorite) {
            return new Date(b?.modifiedAt) - new Date(a?.modifiedAt);
          }
          return b?.isFavorite - a?.isFavorite;
        default:
          return 0;
      }
    });

    setFilteredNotes(filtered);
  }, [notes, searchQuery, filters, sortBy]);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    // Simulate refresh
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsRefreshing(false);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleSort = (option) => {
    setSortBy(option);
  };

  const handleFilter = (newFilters) => {
    setFilters(newFilters);
    setShowFilterPanel(false);
  };

  const handleNoteLongPress = (noteId) => {
    setIsSelectionMode(true);
    setSelectedNotes([noteId]);
  };

  const handleNoteSelect = (noteId) => {
    if (isSelectionMode) {
      setSelectedNotes(prev =>
        prev.includes(noteId)
          ? prev.filter(id => id !== noteId)
          : [...prev, noteId]
      );
    }
  };

  const handleBulkAction = (action) => {
    console.log(`Performing ${action} on notes:`, selectedNotes);
    // Implement bulk actions here
    setIsSelectionMode(false);
    setSelectedNotes([]);
  };

  const handleCancelSelection = () => {
    setIsSelectionMode(false);
    setSelectedNotes([]);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Notes List - Note Taking App</title>
        <meta name="description" content="Browse, filter, and manage all your markdown notes in one place." />
      </Helmet>

      <div className="min-h-screen bg-background">
        <ContextualHeader />

        {/* Search and Filter Header */}
        <div className="lg:ml-64 bg-surface border-b border-border sticky top-16 z-10">
          <div className="p-4 lg:p-6">
            <div className="flex items-center space-x-4">
              <div className="flex-1">
                <SearchBar
                  value={searchQuery}
                  onChange={handleSearch}
                  placeholder="Search notes and content..."
                />
              </div>
              <SortDropdown value={sortBy} onChange={handleSort} />
              <button
                onClick={() => setShowFilterPanel(true)}
                className="p-2 rounded-md border border-border hover:bg-background transition-colors lg:hidden"
              >
                <span className="sr-only">Filter</span>
                📋
              </button>
            </div>
          </div>
        </div>

        {/* Bulk Action Bar */}
        {isSelectionMode && (
          <BulkActionBar
            selectedCount={selectedNotes?.length}
            onAction={handleBulkAction}
            onCancel={handleCancelSelection}
          />
        )}

        {/* Main Content */}
        <main className="lg:ml-64 pb-16 lg:pb-6">
          <PullToRefresh onRefresh={handleRefresh} isRefreshing={isRefreshing}>
            <div className="lg:flex lg:gap-6 lg:p-6">
              {/* Desktop Filter Sidebar */}
              <div className="hidden lg:block lg:w-64 lg:flex-shrink-0">
                <div className="sticky top-32">
                  <FilterPanel
                    filters={filters}
                    onApply={handleFilter}
                    notes={notes}
                  />
                </div>
              </div>

              {/* Notes List */}
              <div className="flex-1">
                {filteredNotes?.length === 0 ? (
                  <EmptyState 
                    searchQuery={searchQuery}
                    hasFilters={filters?.categories?.length > 0 || filters?.favorites}
                  />
                ) : (
                  <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 p-4 lg:p-0">
                    {filteredNotes?.map((note) => (
                      <NoteCard
                        key={note?.id}
                        note={note}
                        isSelected={selectedNotes?.includes(note?.id)}
                        isSelectionMode={isSelectionMode}
                        onLongPress={() => handleNoteLongPress(note?.id)}
                        onSelect={() => handleNoteSelect(note?.id)}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </PullToRefresh>
        </main>

        {/* Mobile Filter Panel */}
        {showFilterPanel && (
          <div className="lg:hidden fixed inset-0 z-50">
            <div className="absolute inset-0 bg-black bg-opacity-50" onClick={() => setShowFilterPanel(false)} />
            <div className="absolute bottom-0 left-0 right-0 bg-surface rounded-t-lg">
              <FilterPanel
                filters={filters}
                onApply={handleFilter}
                onClose={() => setShowFilterPanel(false)}
                notes={notes}
              />
            </div>
          </div>
        )}

        <FloatingActionButton />
        <BottomTabNavigation />
      </div>
    </>
  );
};

export default NotesList;