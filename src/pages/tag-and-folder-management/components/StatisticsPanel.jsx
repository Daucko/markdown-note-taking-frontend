import React from 'react';
import Icon from '../../../components/AppIcon';

const StatisticsPanel = ({ folders, tags, onClose }) => {
  const getTotalNoteCount = (folderList) => {
    return folderList?.reduce((acc, folder) => {
      let count = folder?.noteCount || 0;
      if (folder?.children?.length > 0) {
        count += getTotalNoteCount(folder?.children);
      }
      return acc + count;
    }, 0) || 0;
  };

  const getFolderDepthStats = (folderList, depth = 0) => {
    let stats = { maxDepth: depth, totalFolders: 0 };
    
    folderList?.forEach(folder => {
      stats.totalFolders++;
      if (folder?.children?.length > 0) {
        const childStats = getFolderDepthStats(folder?.children, depth + 1);
        stats.maxDepth = Math.max(stats.maxDepth, childStats.maxDepth);
        stats.totalFolders += childStats.totalFolders;
      }
    });

    return stats;
  };

  const getTopTags = (tagList, limit = 5) => {
    return [...(tagList || [])]
      .sort((a, b) => (b?.usageCount || 0) - (a?.usageCount || 0))
      .slice(0, limit);
  };

  const getTopFolders = (folderList, limit = 5) => {
    const flatFolders = [];
    
    const flattenFolders = (folders) => {
      folders?.forEach(folder => {
        flatFolders.push(folder);
        if (folder?.children?.length > 0) {
          flattenFolders(folder?.children);
        }
      });
    };

    flattenFolders(folderList);
    
    return flatFolders
      .sort((a, b) => (b?.noteCount || 0) - (a?.noteCount || 0))
      .slice(0, limit);
  };

  const folderStats = getFolderDepthStats(folders);
  const totalNotes = getTotalNoteCount(folders);
  const totalTagUsage = tags?.reduce((acc, tag) => acc + (tag?.usageCount || 0), 0) || 0;
  const topTags = getTopTags(tags);
  const topFolders = getTopFolders(folders);

  return (
    <div className="bg-surface border border-border rounded-lg">
      <div className="flex items-center justify-between p-4 border-b border-border">
        <h3 className="text-lg font-heading font-medium text-text-primary">
          Statistics
        </h3>
        <button
          onClick={onClose}
          className="text-text-secondary hover:text-text-primary"
        >
          <Icon name="X" size={20} />
        </button>
      </div>

      <div className="p-4 space-y-6">
        {/* Overview */}
        <div>
          <h4 className="text-sm font-medium text-text-primary mb-3">Overview</h4>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-3 bg-background rounded-lg">
              <div className="text-2xl font-bold text-text-primary">{folderStats?.totalFolders}</div>
              <div className="text-xs text-text-secondary">Total Folders</div>
            </div>
            <div className="text-center p-3 bg-background rounded-lg">
              <div className="text-2xl font-bold text-text-primary">{tags?.length || 0}</div>
              <div className="text-xs text-text-secondary">Total Tags</div>
            </div>
            <div className="text-center p-3 bg-background rounded-lg">
              <div className="text-2xl font-bold text-text-primary">{totalNotes}</div>
              <div className="text-xs text-text-secondary">Total Notes</div>
            </div>
            <div className="text-center p-3 bg-background rounded-lg">
              <div className="text-2xl font-bold text-text-primary">{folderStats?.maxDepth}</div>
              <div className="text-xs text-text-secondary">Max Depth</div>
            </div>
          </div>
        </div>

        {/* Folder Stats */}
        {topFolders?.length > 0 && (
          <div>
            <h4 className="text-sm font-medium text-text-primary mb-3">Top Folders by Note Count</h4>
            <div className="space-y-2">
              {topFolders?.map((folder, index) => (
                <div key={folder?.id} className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 min-w-0 flex-1">
                    <div className="text-xs text-text-secondary w-4">#{index + 1}</div>
                    <Icon name="Folder" size={14} className="text-text-secondary flex-shrink-0" />
                    <span className="text-sm text-text-primary truncate">{folder?.name}</span>
                  </div>
                  <div className="text-sm font-medium text-text-primary">
                    {folder?.noteCount || 0}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tag Stats */}
        {topTags?.length > 0 && (
          <div>
            <h4 className="text-sm font-medium text-text-primary mb-3">Top Tags by Usage</h4>
            <div className="space-y-2">
              {topTags?.map((tag, index) => (
                <div key={tag?.id} className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 min-w-0 flex-1">
                    <div className="text-xs text-text-secondary w-4">#{index + 1}</div>
                    <div
                      className="w-3 h-3 rounded-full flex-shrink-0"
                      style={{ backgroundColor: tag?.color }}
                    />
                    <span className="text-sm text-text-primary truncate">#{tag?.name}</span>
                  </div>
                  <div className="text-sm font-medium text-text-primary">
                    {tag?.usageCount || 0}
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-3 pt-3 border-t border-border">
              <div className="flex justify-between text-sm">
                <span className="text-text-secondary">Total tag usage:</span>
                <span className="font-medium text-text-primary">{totalTagUsage}</span>
              </div>
            </div>
          </div>
        )}

        {/* Organization Health */}
        <div>
          <h4 className="text-sm font-medium text-text-primary mb-3">Organization Health</h4>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-text-secondary">Folder utilization</span>
              <div className="flex items-center space-x-2">
                <div className="w-16 bg-background rounded-full h-2">
                  <div
                    className="bg-primary h-2 rounded-full"
                    style={{
                      width: `${totalNotes > 0 ? Math.min(100, (totalNotes / Math.max(folderStats?.totalFolders, 1)) * 10) : 0}%`
                    }}
                  />
                </div>
                <span className="text-xs text-text-secondary">
                  {totalNotes > 0 ? Math.round((totalNotes / Math.max(folderStats?.totalFolders, 1)) * 10) : 0}%
                </span>
              </div>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-sm text-text-secondary">Tag coverage</span>
              <div className="flex items-center space-x-2">
                <div className="w-16 bg-background rounded-full h-2">
                  <div
                    className="bg-success h-2 rounded-full"
                    style={{
                      width: `${totalNotes > 0 ? Math.min(100, (totalTagUsage / totalNotes) * 100) : 0}%`
                    }}
                  />
                </div>
                <span className="text-xs text-text-secondary">
                  {totalNotes > 0 ? Math.round((totalTagUsage / totalNotes) * 100) : 0}%
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatisticsPanel;