import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import ContextualHeader from '../../components/ui/ContextualHeader';
import BottomTabNavigation from '../../components/ui/BottomTabNavigation';
import FloatingActionButton from '../../components/ui/FloatingActionButton';
import FolderManagement from './components/FolderManagement';
import TagManagement from './components/TagManagement';
import StatisticsPanel from './components/StatisticsPanel';
import ImportExportPanel from './components/ImportExportPanel';
import SearchBar from './components/SearchBar';
import Icon from '../../components/AppIcon';

const TagAndFolderManagement = () => {
  const [activeTab, setActiveTab] = useState('folders');
  const [searchQuery, setSearchQuery] = useState('');
  const [showStatistics, setShowStatistics] = useState(false);
  const [showImportExport, setShowImportExport] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Mock data for folders
  const [folders, setFolders] = useState([]);
  const [tags, setTags] = useState([]);

  const mockFolders = [
    {
      id: 'f1',
      name: 'Work Projects',
      parentId: null,
      noteCount: 15,
      lastModified: '2024-01-15T14:20:00Z',
      children: [
        {
          id: 'f1-1',
          name: 'Q4 Planning',
          parentId: 'f1',
          noteCount: 5,
          lastModified: '2024-01-15T10:30:00Z',
          children: [],
        },
        {
          id: 'f1-2',
          name: 'Team Meetings',
          parentId: 'f1',
          noteCount: 8,
          lastModified: '2024-01-14T16:45:00Z',
          children: [],
        },
      ],
    },
    {
      id: 'f2',
      name: 'Personal',
      parentId: null,
      noteCount: 12,
      lastModified: '2024-01-13T11:20:00Z',
      children: [
        {
          id: 'f2-1',
          name: 'Daily Journal',
          parentId: 'f2',
          noteCount: 7,
          lastModified: '2024-01-15T09:00:00Z',
          children: [],
        },
      ],
    },
    {
      id: 'f3',
      name: 'Learning',
      parentId: null,
      noteCount: 8,
      lastModified: '2024-01-12T14:00:00Z',
      children: [],
    },
  ];

  const mockTags = [
    {
      id: 't1',
      name: 'meeting',
      color: '#2563EB',
      usageCount: 12,
      description: 'Meeting notes and agendas',
      lastUsed: '2024-01-15T14:20:00Z',
    },
    {
      id: 't2',
      name: 'planning',
      color: '#059669',
      usageCount: 8,
      description: 'Planning and strategy documents',
      lastUsed: '2024-01-15T10:30:00Z',
    },
    {
      id: 't3',
      name: 'journal',
      color: '#D97706',
      usageCount: 15,
      description: 'Personal journal entries',
      lastUsed: '2024-01-15T09:00:00Z',
    },
    {
      id: 't4',
      name: 'react',
      color: '#DC2626',
      usageCount: 6,
      description: 'React.js related notes',
      lastUsed: '2024-01-14T16:45:00Z',
    },
    {
      id: 't5',
      name: 'best-practices',
      color: '#7C3AED',
      usageCount: 4,
      description: 'Development best practices',
      lastUsed: '2024-01-14T18:30:00Z',
    },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setFolders(mockFolders);
        setTags(mockTags);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  // Helper: Get default folder (first root folder or by a flag)
  const getDefaultFolderId = () => {
    // You can enhance this to use a specific flag like isDefault
    const rootFolders = folders.filter((f) => !f.parentId);
    return rootFolders.length > 0 ? rootFolders[0].id : null;
  };

  // When deleting a folder, reassign notes to default folder (backend integration point)
  const reassignNotesToDefaultFolder = async (deletedFolderId) => {
    const defaultFolderId = getDefaultFolderId();
    if (!defaultFolderId) return;
    // TODO: Call backend API to update notes
    // await api.updateNotesFolder(deletedFolderId, defaultFolderId);
    // For mock/demo, you might want to update local notes state if you have it
  };

  // --- Folder CRUD helpers ---
  const createFolder = (parentId, folderData) => {
    const newFolder = {
      id: `f${Date.now()}`,
      name: folderData.name,
      description: folderData.description || '',
      parentId: parentId || null,
      noteCount: 0,
      lastModified: new Date().toISOString(),
      children: [],
      // isDefault: folderData.isDefault || false, // Uncomment if you want a default flag
    };
    if (!parentId) {
      setFolders((prev) => [...prev, newFolder]);
    } else {
      const addChild = (folders) =>
        folders.map((f) => {
          if (f.id === parentId) {
            return { ...f, children: [...f.children, newFolder] };
          }
          return { ...f, children: addChild(f.children) };
        });
      setFolders((prev) => addChild(prev));
    }
  };

  const renameFolder = (folderId, newData) => {
    const rename = (folders) =>
      folders.map((f) => {
        if (f.id === folderId) {
          return {
            ...f,
            name: newData.name,
            description: newData.description || '',
            lastModified: new Date().toISOString(),
          };
        }
        return { ...f, children: rename(f.children) };
      });
    setFolders((prev) => rename(prev));
  };

  const deleteFolder = async (folderId) => {
    await reassignNotesToDefaultFolder(folderId); // Ensure notes are not orphaned
    const remove = (folders) =>
      folders
        .filter((f) => f.id !== folderId)
        .map((f) => ({ ...f, children: remove(f.children) }));
    setFolders((prev) => remove(prev));
  };

  const moveFolder = (folderId, newParentId) => {
    let movedFolder = null;
    // Remove from old location
    const remove = (folders) =>
      folders
        .filter((f) => {
          if (f.id === folderId) {
            movedFolder = { ...f, parentId: newParentId };
            return false;
          }
          return true;
        })
        .map((f) => ({ ...f, children: remove(f.children) }));

    // Add to new parent
    const add = (folders) =>
      folders.map((f) => {
        if (f.id === newParentId) {
          return { ...f, children: [...f.children, movedFolder] };
        }
        return { ...f, children: add(f.children) };
      });

    setFolders((prev) => {
      let without = remove(prev);
      if (!newParentId) {
        // Move to root
        return [...without, movedFolder];
      }
      return add(without);
    });
  };

  // --- Tag CRUD helpers ---
  const createTag = (tagData) => {
    setTags((prev) => [
      ...prev,
      {
        id: `t${Date.now()}`,
        ...tagData,
        usageCount: 0,
        lastUsed: null,
      },
    ]);
  };

  const renameTag = (tagId, newData) => {
    setTags((prev) =>
      prev.map((tag) =>
        tag.id === tagId
          ? {
              ...tag,
              name: newData.name,
              color: newData.color || tag.color,
              description: newData.description || tag.description,
            }
          : tag
      )
    );
  };

  const deleteTag = (tagId) => {
    setTags((prev) => prev.filter((tag) => tag.id !== tagId));
  };

  const updateTag = (tagId, data) => {
    setTags((prev) =>
      prev.map((tag) => (tag.id === tagId ? { ...tag, ...data } : tag))
    );
  };

  const mergeTags = (tagIds, mergeData) => {
    // Simple merge: create new tag, remove old ones
    const mergedTag = {
      id: `t${Date.now()}`,
      name: mergeData.name,
      color: mergeData.color,
      description: mergeData.description,
      usageCount: mergeData.usageCount || 0,
      lastUsed: new Date().toISOString(),
    };
    setTags((prev) => [
      ...prev.filter((tag) => !tagIds.includes(tag.id)),
      mergedTag,
    ]);
  };

  // --- Handler dispatcher for FolderManagement/TagManagement ---
  const handleFolderAction = (action, folderId, data = null) => {
    switch (action) {
      case 'create':
        createFolder(folderId, data);
        break;
      case 'rename':
        renameFolder(folderId, data);
        break;
      case 'delete':
        deleteFolder(folderId);
        break;
      case 'move':
        moveFolder(folderId, data.newParentId);
        break;
      default:
        break;
    }
  };

  const handleTagAction = (action, tagId, data = null) => {
    switch (action) {
      case 'create':
        createTag(data);
        break;
      case 'rename':
        renameTag(tagId, data);
        break;
      case 'edit':
        renameTag(tagId, data);
        break;
      case 'delete':
        deleteTag(tagId);
        break;
      case 'update':
        updateTag(tagId, data);
        break;
      case 'merge':
        mergeTags(tagId, data);
        break;
      default:
        break;
    }
  };

  const getFilteredFolders = () => {
    if (!searchQuery) return folders;

    const filterFolder = (folder) => {
      const matchesSearch = folder?.name
        ?.toLowerCase()
        .includes(searchQuery.toLowerCase());
      const filteredChildren =
        folder?.children?.map(filterFolder).filter(Boolean) || [];

      if (matchesSearch || filteredChildren?.length > 0) {
        return {
          ...folder,
          children: filteredChildren,
        };
      }
      return null;
    };

    return folders?.map(filterFolder).filter(Boolean) || [];
  };

  const getFilteredTags = () => {
    if (!searchQuery) return tags;
    return (
      tags?.filter(
        (tag) =>
          tag?.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          tag?.description?.toLowerCase().includes(searchQuery.toLowerCase())
      ) || []
    );
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
        <title>Tag and Folder Management - Note Taking App</title>
        <meta
          name="description"
          content="Organize your notes with comprehensive tag and folder management tools."
        />
      </Helmet>

      <div className="min-h-screen bg-background">
        <ContextualHeader />

        {/* Header */}
        <div className="lg:ml-64 bg-surface border-b border-border sticky top-16 z-10">
          <div className="p-4 lg:p-6">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-xl lg:text-2xl font-heading font-semibold text-text-primary">
                Organization
              </h1>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setShowStatistics(!showStatistics)}
                  className="p-2 rounded-md border border-border hover:bg-background transition-colors"
                  title="Statistics"
                >
                  <Icon name="BarChart3" size={20} />
                </button>
                <button
                  onClick={() => setShowImportExport(!showImportExport)}
                  className="p-2 rounded-md border border-border hover:bg-background transition-colors"
                  title="Import/Export"
                >
                  <Icon name="Download" size={20} />
                </button>
              </div>
            </div>

            {/* Search */}
            <div className="mb-4">
              <SearchBar
                value={searchQuery}
                onChange={handleSearch}
                placeholder="Search folders and tags..."
              />
            </div>

            {/* Tabs */}
            <div className="flex border-b border-border">
              <button
                onClick={() => setActiveTab('folders')}
                className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === 'folders'
                    ? 'border-primary text-primary'
                    : 'border-transparent text-text-secondary hover:text-text-primary'
                }`}
              >
                <div className="flex items-center space-x-2">
                  <Icon name="Folder" size={16} />
                  <span>Folders</span>
                </div>
              </button>
              <button
                onClick={() => setActiveTab('tags')}
                className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === 'tags'
                    ? 'border-primary text-primary'
                    : 'border-transparent text-text-secondary hover:text-text-primary'
                }`}
              >
                <div className="flex items-center space-x-2">
                  <Icon name="Tag" size={16} />
                  <span>Tags</span>
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <main className="lg:ml-64 pb-16 lg:pb-6">
          <div className="flex flex-col lg:flex-row lg:gap-6 p-6">
            {/* Primary Content */}
            <div className="flex-1">
              {activeTab === 'folders' ? (
                <FolderManagement
                  folders={getFilteredFolders()}
                  onAction={handleFolderAction}
                  searchQuery={searchQuery}
                />
              ) : (
                <TagManagement
                  tags={getFilteredTags()}
                  onAction={handleTagAction}
                  searchQuery={searchQuery}
                />
              )}
            </div>

            {/* Side Panels */}
            <div className="lg:w-80 space-y-6 mt-6 lg:mt-0">
              {/* Statistics Panel */}
              {showStatistics && (
                <StatisticsPanel
                  folders={folders}
                  tags={tags}
                  onClose={() => setShowStatistics(false)}
                />
              )}

              {/* Import/Export Panel */}
              {showImportExport && (
                <ImportExportPanel onClose={() => setShowImportExport(false)} />
              )}
            </div>
          </div>
        </main>

        <FloatingActionButton />
        <BottomTabNavigation />
      </div>
    </>
  );
};

export default TagAndFolderManagement;
