import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const DataManagementSection = ({ onExport, onBackup }) => {
  const [exportLoading, setExportLoading] = useState({});
  const [backupLoading, setBackupLoading] = useState(false);

  const handleExport = async (format) => {
    setExportLoading(prev => ({ ...prev, [format]: true }));
    
    // Simulate export process
    setTimeout(() => {
      setExportLoading(prev => ({ ...prev, [format]: false }));
      
      // Create mock download
      const filename = `tasks_export_${new Date().toISOString().split('T')[0]}.${format}`;
      alert(`Export completed! File: ${filename}`);
      
      onExport && onExport(format);
    }, 2000);
  };

  const handleBackup = async () => {
    setBackupLoading(true);
    
    // Simulate backup process
    setTimeout(() => {
      setBackupLoading(false);
      alert('Account backup completed successfully!');
      onBackup && onBackup();
    }, 3000);
  };

  const exportOptions = [
    {
      format: 'csv',
      title: 'CSV Export',
      description: 'Export tasks in comma-separated values format',
      icon: 'FileText',
      size: '~2.5 KB'
    },
    {
      format: 'pdf',
      title: 'PDF Export',
      description: 'Export tasks as a formatted PDF document',
      icon: 'FileDown',
      size: '~15 KB'
    },
    {
      format: 'json',
      title: 'JSON Export',
      description: 'Export raw task data in JSON format',
      icon: 'Code',
      size: '~3.2 KB'
    }
  ];

  const dataStats = [
    { label: 'Total Tasks', value: '127', icon: 'CheckSquare' },
    { label: 'Completed Tasks', value: '89', icon: 'CheckCircle' },
    { label: 'Active Projects', value: '8', icon: 'Folder' },
    { label: 'Account Age', value: '2.3 years', icon: 'Calendar' }
  ];

  return (
    <div className="bg-surface border border-border rounded-lg shadow-elevation-1">
      <div className="flex items-center space-x-3 p-6 border-b border-border">
        <Icon name="Database" size={20} className="text-primary" />
        <h2 className="text-lg font-heading font-semibold text-text-primary">
          Data Management
        </h2>
      </div>

      <div className="p-6 space-y-8">
        {/* Data Overview */}
        <div>
          <h3 className="text-md font-medium text-text-primary mb-4">Data Overview</h3>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {dataStats.map((stat, index) => (
              <div key={index} className="p-4 bg-background rounded-lg border border-border">
                <div className="flex items-center space-x-3">
                  <Icon name={stat.icon} size={20} className="text-primary" />
                  <div>
                    <div className="text-lg font-semibold text-text-primary">
                      {stat.value}
                    </div>
                    <div className="text-xs text-text-secondary">
                      {stat.label}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Export Data */}
        <div>
          <h3 className="text-md font-medium text-text-primary mb-4">Export Data</h3>
          <div className="space-y-4">
            {exportOptions.map((option) => (
              <div key={option.format} className="flex items-center justify-between p-4 bg-background rounded-lg border border-border">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Icon name={option.icon} size={20} className="text-primary" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-text-primary">
                      {option.title}
                    </h4>
                    <p className="text-xs text-text-secondary">
                      {option.description}
                    </p>
                    <p className="text-xs text-text-secondary mt-1">
                      Estimated size: {option.size}
                    </p>
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  iconName="Download"
                  onClick={() => handleExport(option.format)}
                  loading={exportLoading[option.format]}
                  disabled={Object.values(exportLoading).some(loading => loading)}
                >
                  Export
                </Button>
              </div>
            ))}
          </div>
        </div>

        {/* Backup Account */}
        <div>
          <h3 className="text-md font-medium text-text-primary mb-4">Account Backup</h3>
          <div className="p-4 bg-background rounded-lg border border-border">
            <div className="flex items-start space-x-4">
              <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center">
                <Icon name="Shield" size={20} className="text-success" />
              </div>
              <div className="flex-1">
                <h4 className="text-sm font-medium text-text-primary mb-1">
                  Full Account Backup
                </h4>
                <p className="text-xs text-text-secondary mb-3">
                  Create a complete backup of your account including tasks, preferences, and settings. 
                  The backup will be sent to your registered email address.
                </p>
                <div className="flex items-center space-x-4 text-xs text-text-secondary mb-4">
                  <div className="flex items-center space-x-1">
                    <Icon name="Clock" size={14} />
                    <span>Last backup: 7 days ago</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Icon name="HardDrive" size={14} />
                    <span>Size: ~45 KB</span>
                  </div>
                </div>
                <Button
                  variant="success"
                  size="sm"
                  iconName="Download"
                  onClick={handleBackup}
                  loading={backupLoading}
                >
                  Create Backup
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Data Retention Policy */}
        <div>
          <h3 className="text-md font-medium text-text-primary mb-4">Data Retention</h3>
          <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
            <div className="flex items-start space-x-3">
              <Icon name="Info" size={20} className="text-amber-600 mt-0.5" />
              <div>
                <h4 className="text-sm font-medium text-amber-800 mb-1">
                  Data Retention Policy
                </h4>
                <p className="text-sm text-amber-700">
                  Your data is automatically backed up daily and retained for 90 days. 
                  Deleted tasks are kept in our system for 30 days before permanent deletion. 
                  You can request complete data deletion at any time.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataManagementSection;