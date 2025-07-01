import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const AttachmentSection = ({ attachments = [], onAddAttachment, onRemoveAttachment }) => {
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleFileInput = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleFiles(e.target.files);
    }
  };

  const handleFiles = (files) => {
    Array.from(files).forEach(file => {
      if (file.size > 10 * 1024 * 1024) { // 10MB limit
        alert('File size must be less than 10MB');
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        const attachment = {
          id: Date.now() + Math.random(),
          name: file.name,
          size: file.size,
          type: file.type,
          url: e.target.result,
          uploadedAt: new Date().toISOString()
        };
        onAddAttachment(attachment);
      };
      reader.readAsDataURL(file);
    });
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getFileIcon = (type) => {
    if (type.startsWith('image/')) return 'Image';
    if (type.includes('pdf')) return 'FileText';
    if (type.includes('word')) return 'FileText';
    if (type.includes('excel') || type.includes('spreadsheet')) return 'FileSpreadsheet';
    return 'File';
  };

  const isImage = (type) => type.startsWith('image/');

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium text-text-primary">Attachments</h3>
        <span className="text-sm text-text-secondary">
          {attachments.length} file{attachments.length !== 1 ? 's' : ''}
        </span>
      </div>

      {/* Upload Area */}
      <div
        className={`relative border-2 border-dashed rounded-lg p-6 text-center transition-micro ${
          dragActive 
            ? 'border-primary bg-primary/5' :'border-border hover:border-text-secondary'
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          type="file"
          multiple
          onChange={handleFileInput}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          accept="image/*,.pdf,.doc,.docx,.txt"
        />
        
        <div className="space-y-2">
          <Icon name="Upload" size={32} className="mx-auto text-text-secondary" />
          <div>
            <p className="text-sm font-medium text-text-primary">
              Drop files here or click to upload
            </p>
            <p className="text-xs text-text-secondary">
              Support for images, PDF, DOC, TXT files up to 10MB
            </p>
          </div>
        </div>
      </div>

      {/* Attachments List */}
      {attachments.length > 0 && (
        <div className="space-y-3">
          {attachments.map((attachment) => (
            <div
              key={attachment.id}
              className="flex items-center space-x-3 p-3 bg-background rounded-lg border border-border"
            >
              {/* File Preview/Icon */}
              <div className="flex-shrink-0">
                {isImage(attachment.type) ? (
                  <div className="w-12 h-12 rounded-md overflow-hidden bg-border">
                    <Image
                      src={attachment.url}
                      alt={attachment.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : (
                  <div className="w-12 h-12 rounded-md bg-primary/10 flex items-center justify-center">
                    <Icon 
                      name={getFileIcon(attachment.type)} 
                      size={20} 
                      className="text-primary" 
                    />
                  </div>
                )}
              </div>

              {/* File Info */}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-text-primary truncate">
                  {attachment.name}
                </p>
                <p className="text-xs text-text-secondary">
                  {formatFileSize(attachment.size)} • {new Date(attachment.uploadedAt).toLocaleDateString()}
                </p>
              </div>

              {/* Actions */}
              <div className="flex items-center space-x-1">
                <Button
                  variant="ghost"
                  size="sm"
                  iconName="Download"
                  onClick={() => {
                    const link = document.createElement('a');
                    link.href = attachment.url;
                    link.download = attachment.name;
                    link.click();
                  }}
                  className="p-2"
                />
                <Button
                  variant="ghost"
                  size="sm"
                  iconName="Trash2"
                  onClick={() => onRemoveAttachment(attachment.id)}
                  className="p-2 text-error hover:text-error"
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AttachmentSection;