import React, { useState } from 'react';
import { formatDistanceToNow } from 'date-fns';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import FolderTree from './FolderTree';
import FolderDialog from './FolderDialog';
import ConfirmDialog from './ConfirmDialog';

const FolderManagement = ({ folders, onAction, searchQuery }) => {
  const [selectedFolders, setSelectedFolders] = useState([]);
  const [expandedFolders, setExpandedFolders] = useState(new Set());
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [showRenameDialog, setShowRenameDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [editingFolder, setEditingFolder] = useState(null);
  const [draggedFolder, setDraggedFolder] = useState(null);

  const handleFolderSelect = (folderId, isMultiSelect = false) => {
    if (isMultiSelect) {
      setSelectedFolders(prev =>
        prev.includes(folderId)
          ? prev.filter(id => id !== folderId)
          : [...prev, folderId]
      );
    } else {
      setSelectedFolders([folderId]);
    }
  };

  const handleFolderExpand = (folderId) => {
    setExpandedFolders(prev => {
      const newSet = new Set(prev);
      if (newSet.has(folderId)) {
        newSet.delete(folderId);
      } else {
        newSet.add(folderId);
      }
      return newSet;
    });
  };

  const handleCreateFolder = () => {
    setShowCreateDialog(true);
    setEditingFolder(null);
  };

  const handleRenameFolder = (folder) => {
    setEditingFolder(folder);
    setShowRenameDialog(true);
  };

  const handleDeleteFolder = (folder) => {
    setEditingFolder(folder);
    setShowDeleteDialog(true);
  };

  const handleBulkDelete = () => {
    if (selectedFolders?.length > 0) {
      setShowDeleteDialog(true);
    }
  };

  const handleDragStart = (folder) => {
    setDraggedFolder(folder);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (targetFolder) => {
    if (draggedFolder && targetFolder?.id !== draggedFolder?.id) {
      onAction?.('move', draggedFolder?.id, { newParentId: targetFolder?.id });
      setDraggedFolder(null);
    }
  };

  const confirmCreateFolder = (folderData) => {
    onAction?.('create', null, folderData);
    setShowCreateDialog(false);
  };

  const confirmRenameFolder = (folderData) => {
    onAction?.('rename', editingFolder?.id, folderData);
    setShowRenameDialog(false);
    setEditingFolder(null);
  };

  const confirmDeleteFolder = () => {
    if (editingFolder) {
      onAction?.('delete', editingFolder?.id);
    } else if (selectedFolders?.length > 0) {
      selectedFolders?.forEach(folderId => {
        onAction?.('delete', folderId);
      });
      setSelectedFolders([]);
    }
    setShowDeleteDialog(false);
    setEditingFolder(null);
  };

  const getTotalNoteCount = (folder) => {
    let count = folder?.noteCount || 0;
    folder?.children?.forEach(child => {
      count += getTotalNoteCount(child);
    });
    return count;
  };

  const formatDate = (dateString) => {
    try {
      return formatDistanceToNow(new Date(dateString), { addSuffix: true });
    } catch (error) {
      return 'Unknown';
    }
  };

  if (folders?.length === 0 && searchQuery) {
    return (
      <div className="text-center py-12">
        <Icon name="Search" size={48} className="mx-auto text-text-secondary mb-4" />
        <h3 className="text-lg font-medium text-text-primary mb-2">
          No folders found
        </h3>
        <p className="text-text-secondary">
          Try adjusting your search terms
        </p>
      </div>
    );
  }

  if (folders?.length === 0) {
    return (
      <div className="text-center py-12">
        <Icon name="Folder" size={48} className="mx-auto text-text-secondary mb-4" />
        <h3 className="text-lg font-medium text-text-primary mb-2">
          No folders yet
        </h3>
        <p className="text-text-secondary mb-6">
          Create your first folder to organize your notes
        </p>
        <Button
          variant="primary"
          iconName="Plus"
          onClick={handleCreateFolder}
        >
          Create Folder
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Toolbar */}
      <div className="flex items-center justify-between">
        <div className="text-sm text-text-secondary">
          {folders?.length} folders • {folders?.reduce((acc, folder) => acc + getTotalNoteCount(folder), 0)} total notes
        </div>
        <div className="flex items-center space-x-2">
          {selectedFolders?.length > 0 && (
            <>
              <Button
                variant="outline"
                size="sm"
                iconName="Trash2"
                onClick={handleBulkDelete}
              >
                Delete ({selectedFolders?.length})
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSelectedFolders([])}
              >
                Cancel
              </Button>
            </>
          )}
          <Button
            variant="primary"
            size="sm"
            iconName="Plus"
            onClick={handleCreateFolder}
          >
            New Folder
          </Button>
        </div>
      </div>

      {/* Folder Tree */}
      <div className="bg-surface border border-border rounded-lg">
        <FolderTree
          folders={folders}
          selectedFolders={selectedFolders}
          expandedFolders={expandedFolders}
          onSelect={handleFolderSelect}
          onExpand={handleFolderExpand}
          onRename={handleRenameFolder}
          onDelete={handleDeleteFolder}
          onDragStart={handleDragStart}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          draggedFolder={draggedFolder}
        />
      </div>

      {/* Create Folder Dialog */}
      {showCreateDialog && (
        <FolderDialog
          title="Create New Folder"
          folder={null}
          folders={folders}
          onConfirm={confirmCreateFolder}
          onCancel={() => setShowCreateDialog(false)}
        />
      )}

      {/* Rename Folder Dialog */}
      {showRenameDialog && (
        <FolderDialog
          title="Rename Folder"
          folder={editingFolder}
          folders={folders}
          onConfirm={confirmRenameFolder}
          onCancel={() => {
            setShowRenameDialog(false);
            setEditingFolder(null);
          }}
        />
      )}

      {/* Delete Confirmation Dialog */}
      {showDeleteDialog && (
        <ConfirmDialog
          title={editingFolder ? "Delete Folder" : "Delete Folders"}
          message={
            editingFolder
              ? `Are you sure you want to delete "${editingFolder?.name}"? This will also delete all notes in this folder and its subfolders.`
              : `Are you sure you want to delete ${selectedFolders?.length} folders? This will also delete all notes in these folders and their subfolders.`
          }
          confirmText="Delete"
          confirmVariant="danger"
          onConfirm={confirmDeleteFolder}
          onCancel={() => {
            setShowDeleteDialog(false);
            setEditingFolder(null);
          }}
        />
      )}
    </div>
  );
};

export default FolderManagement;