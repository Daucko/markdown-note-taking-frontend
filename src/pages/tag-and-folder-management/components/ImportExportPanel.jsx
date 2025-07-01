import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const ImportExportPanel = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState('export');
  const [exportFormat, setExportFormat] = useState('json');
  const [exportType, setExportType] = useState('both');
  const [importFile, setImportFile] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleExport = async () => {
    setIsProcessing(true);
    try {
      // Simulate export process
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const exportData = {
        exportDate: new Date().toISOString(),
        type: exportType,
        format: exportFormat,
        folders: exportType === 'folders' || exportType === 'both' ? [
          // Mock folder data
          { id: 'f1', name: 'Work Projects', noteCount: 15 }
        ] : undefined,
        tags: exportType === 'tags' || exportType === 'both' ? [
          // Mock tag data
          { id: 't1', name: 'meeting', color: '#2563EB', usageCount: 12 }
        ] : undefined
      };

      // Create and download file
      const blob = new Blob([JSON.stringify(exportData, null, 2)], {
        type: exportFormat === 'json' ? 'application/json' : 'text/csv'
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `notes-organization-${exportType}-${new Date().toISOString().split('T')[0]}.${exportFormat}`;
      a.click();
      URL.revokeObjectURL(url);
      
      console.log('Export completed successfully');
    } catch (error) {
      console.error('Export failed:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleImport = async () => {
    if (!importFile) return;
    
    setIsProcessing(true);
    try {
      // Simulate import process
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const fileContent = await importFile.text();
      const importData = JSON.parse(fileContent);
      
      console.log('Import data:', importData);
      console.log('Import completed successfully');
      
      setImportFile(null);
    } catch (error) {
      console.error('Import failed:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="bg-surface border border-border rounded-lg">
      <div className="flex items-center justify-between p-4 border-b border-border">
        <h3 className="text-lg font-heading font-medium text-text-primary">
          Import / Export
        </h3>
        <button
          onClick={onClose}
          className="text-text-secondary hover:text-text-primary"
        >
          <Icon name="X" size={20} />
        </button>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-border">
        <button
          onClick={() => setActiveTab('export')}
          className={`flex-1 px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
            activeTab === 'export'
              ? 'border-primary text-primary' :'border-transparent text-text-secondary hover:text-text-primary'
          }`}
        >
          <div className="flex items-center justify-center space-x-2">
            <Icon name="Download" size={16} />
            <span>Export</span>
          </div>
        </button>
        <button
          onClick={() => setActiveTab('import')}
          className={`flex-1 px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
            activeTab === 'import' ?'border-primary text-primary' :'border-transparent text-text-secondary hover:text-text-primary'
          }`}
        >
          <div className="flex items-center justify-center space-x-2">
            <Icon name="Upload" size={16} />
            <span>Import</span>
          </div>
        </button>
      </div>

      <div className="p-4">
        {activeTab === 'export' ? (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                What to export
              </label>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="exportType"
                    value="both"
                    checked={exportType === 'both'}
                    onChange={(e) => setExportType(e.target.value)}
                    className="text-primary focus:ring-primary"
                  />
                  <span className="ml-2 text-sm text-text-secondary">
                    Folders and Tags
                  </span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="exportType"
                    value="folders"
                    checked={exportType === 'folders'}
                    onChange={(e) => setExportType(e.target.value)}
                    className="text-primary focus:ring-primary"
                  />
                  <span className="ml-2 text-sm text-text-secondary">
                    Folders only
                  </span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="exportType"
                    value="tags"
                    checked={exportType === 'tags'}
                    onChange={(e) => setExportType(e.target.value)}
                    className="text-primary focus:ring-primary"
                  />
                  <span className="ml-2 text-sm text-text-secondary">
                    Tags only
                  </span>
                </label>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Export format
              </label>
              <select
                value={exportFormat}
                onChange={(e) => setExportFormat(e.target.value)}
                className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                <option value="json">JSON</option>
                <option value="csv">CSV</option>
              </select>
            </div>

            <div className="pt-2">
              <Button
                variant="primary"
                iconName="Download"
                onClick={handleExport}
                loading={isProcessing}
                disabled={isProcessing}
                fullWidth
              >
                {isProcessing ? 'Exporting...' : 'Export Data'}
              </Button>
            </div>

            <div className="text-xs text-text-secondary bg-background p-3 rounded-lg">
              <div className="font-medium mb-1">Export includes:</div>
              <ul className="list-disc list-inside space-y-1">
                {(exportType === 'folders' || exportType === 'both') && (
                  <li>Folder structure and hierarchy</li>
                )}
                {(exportType === 'tags' || exportType === 'both') && (
                  <li>Tag names, colors, and descriptions</li>
                )}
                <li>Creation and modification dates</li>
                <li>Usage statistics</li>
              </ul>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Select file to import
              </label>
              <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                <input
                  type="file"
                  accept=".json,.csv"
                  onChange={(e) => setImportFile(e.target.files?.[0] || null)}
                  className="hidden"
                  id="import-file"
                />
                <label
                  htmlFor="import-file"
                  className="cursor-pointer flex flex-col items-center space-y-2"
                >
                  <Icon name="Upload" size={32} className="text-text-secondary" />
                  <div className="text-sm text-text-primary font-medium">
                    Choose file to upload
                  </div>
                  <div className="text-xs text-text-secondary">
                    JSON or CSV files only
                  </div>
                </label>
              </div>
              
              {importFile && (
                <div className="mt-2 flex items-center space-x-2 text-sm text-text-secondary">
                  <Icon name="File" size={16} />
                  <span>{importFile?.name}</span>
                  <button
                    onClick={() => setImportFile(null)}
                    className="text-error hover:text-error-dark"
                  >
                    <Icon name="X" size={16} />
                  </button>
                </div>
              )}
            </div>

            <div className="pt-2">
              <Button
                variant="primary"
                iconName="Upload"
                onClick={handleImport}
                loading={isProcessing}
                disabled={!importFile || isProcessing}
                fullWidth
              >
                {isProcessing ? 'Importing...' : 'Import Data'}
              </Button>
            </div>

            <div className="text-xs text-text-secondary bg-warning-light border border-warning p-3 rounded-lg">
              <div className="flex items-start space-x-2">
                <Icon name="AlertTriangle" size={14} className="text-warning mt-0.5 flex-shrink-0" />
                <div>
                  <div className="font-medium text-warning-dark mb-1">Important:</div>
                  <ul className="list-disc list-inside space-y-1 text-warning-dark">
                    <li>Importing will merge with existing data</li>
                    <li>Duplicate names will be skipped</li>
                    <li>Always backup your data before importing</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImportExportPanel;