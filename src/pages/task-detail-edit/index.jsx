import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ContextualHeader from '../../components/ui/ContextualHeader';
import BottomTabNavigation from '../../components/ui/BottomTabNavigation';
import TaskForm from './components/TaskForm';
import AttachmentSection from './components/AttachmentSection';
import CommentsSection from './components/CommentsSection';
import ActivityHistory from './components/ActivityHistory';
import TaskMetadata from './components/TaskMetadata';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';

const TaskDetailEdit = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('details');
  const [task, setTask] = useState(null);
  const [attachments, setAttachments] = useState([]);
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  // Get mode from location state (create or edit)
  const mode = location.state?.mode || 'edit';
  const taskId = location.state?.taskId;

  useEffect(() => {
    loadTaskData();
  }, [taskId, mode]);

  const loadTaskData = async () => {
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (mode === 'edit') {
        // Mock task data
        const mockTask = {
          id: taskId || 1,
          title: "Complete project documentation",
          description: `Create comprehensive documentation for the new task management system.\n\nThis includes:\n- User guide\n- API documentation\n- Installation instructions\n- Troubleshooting guide`,
          dueDate: "2024-12-25",
          priority: "high",
          category: "work",
          status: "in-progress",
          tags: ["documentation", "project", "urgent"],
          createdAt: "2024-12-01T10:00:00Z",
          updatedAt: "2024-12-15T14:30:00Z"
        };
        
        setTask(mockTask);
        
        // Mock attachments
        setAttachments([
          {
            id: 1,
            name: "project-requirements.pdf",
            size: 2048576,
            type: "application/pdf",
            url: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=400&h=300&fit=crop",
            uploadedAt: "2024-12-10T09:00:00Z"
          },
          {
            id: 2,
            name: "wireframes.png",
            size: 1024000,
            type: "image/png",
            url: "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=400&h=300&fit=crop",
            uploadedAt: "2024-12-12T15:30:00Z"
          }
        ]);
        
        // Mock comments
        setComments([
          {
            id: 1,
            text: "Started working on the user guide section. Should have the first draft ready by tomorrow.",
            author: {
              name: "John Doe",
              avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
            },
            createdAt: "2024-12-14T10:30:00Z",
            isOwn: true
          },
          {
            id: 2,
            text: "Great progress! Make sure to include screenshots in the user guide for better clarity.",
            author: {
              name: "Jane Smith",
              avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"
            },
            createdAt: "2024-12-14T16:45:00Z",
            isOwn: false
          }
        ]);
      }
    } catch (error) {
      console.error('Error loading task data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveTask = async (formData) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (mode === 'create') {
        console.log('Creating new task:', formData);
        // Navigate back to task list after creation
        navigate('/task-list', { 
          state: { 
            message: 'Task created successfully!',
            type: 'success'
          }
        });
      } else {
        console.log('Updating task:', formData);
        setTask(prev => ({ ...prev, ...formData }));
        setHasUnsavedChanges(false);
        // Show success message
        alert('Task updated successfully!');
      }
    } catch (error) {
      console.error('Error saving task:', error);
      alert('Error saving task. Please try again.');
    }
  };

  const handleCancel = () => {
    if (hasUnsavedChanges) {
      if (window.confirm('You have unsaved changes. Are you sure you want to leave?')) {
        navigate(-1);
      }
    } else {
      navigate(-1);
    }
  };

  const handleAddAttachment = (attachment) => {
    setAttachments(prev => [...prev, attachment]);
    setHasUnsavedChanges(true);
  };

  const handleRemoveAttachment = (attachmentId) => {
    setAttachments(prev => prev.filter(att => att.id !== attachmentId));
    setHasUnsavedChanges(true);
  };

  const handleAddComment = (comment) => {
    setComments(prev => [comment, ...prev]);
  };

  const handleDeleteComment = (commentId) => {
    if (window.confirm('Are you sure you want to delete this comment?')) {
      setComments(prev => prev.filter(comment => comment.id !== commentId));
    }
  };

  const handleDeleteTask = () => {
    if (window.confirm('Are you sure you want to delete this task? This action cannot be undone.')) {
      // Simulate API call
      console.log('Deleting task:', task.id);
      navigate('/task-list', {
        state: {
          message: 'Task deleted successfully!',
          type: 'success'
        }
      });
    }
  };

  const handleDuplicateTask = () => {
    navigate('/task-detail-edit', {
      state: {
        mode: 'create',
        duplicateFrom: task
      }
    });
  };

  const tabs = [
    { id: 'details', label: 'Details', icon: 'FileText' },
    { id: 'attachments', label: 'Files', icon: 'Paperclip', badge: attachments.length },
    { id: 'comments', label: 'Comments', icon: 'MessageCircle', badge: comments.length },
    { id: 'activity', label: 'Activity', icon: 'Activity' }
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <ContextualHeader />
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <Icon name="Loader2" size={32} className="animate-spin mx-auto mb-4 text-primary" />
            <p className="text-text-secondary">Loading task...</p>
          </div>
        </div>
        <BottomTabNavigation />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <ContextualHeader 
        title={mode === 'create' ? 'Create Task' : task?.title || 'Task Details'}
        showBack={true}
        actions={mode === 'edit' ? [
          {
            icon: 'Copy',
            onClick: handleDuplicateTask
          },
          {
            icon: 'Trash2',
            onClick: handleDeleteTask
          }
        ] : []}
      />

      <div className="lg:ml-64">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="lg:grid lg:grid-cols-12 lg:gap-8">
            {/* Main Content */}
            <div className="lg:col-span-8">
              {/* Mobile Tabs */}
              <div className="lg:hidden mb-6">
                <div className="flex space-x-1 bg-background border border-border rounded-lg p-1">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex-1 flex items-center justify-center px-3 py-2 rounded-md text-sm font-medium transition-micro ${
                        activeTab === tab.id
                          ? 'bg-primary text-primary-foreground shadow-sm'
                          : 'text-text-secondary hover:text-text-primary'
                      }`}
                    >
                      <Icon name={tab.icon} size={16} className="mr-1" />
                      <span className="hidden sm:inline">{tab.label}</span>
                      {tab.badge > 0 && (
                        <span className="ml-1 bg-error text-error-foreground text-xs rounded-full px-1.5 py-0.5 min-w-[1.25rem] h-5 flex items-center justify-center">
                          {tab.badge}
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Content Sections */}
              <div className="space-y-8">
                {/* Task Form - Always visible on desktop, tab-controlled on mobile */}
                <div className={`${activeTab !== 'details' ? 'hidden lg:block' : ''}`}>
                  <div className="bg-surface rounded-lg border border-border p-6 shadow-elevation-1">
                    <TaskForm
                      task={task}
                      onSave={handleSaveTask}
                      onCancel={handleCancel}
                      mode={mode}
                    />
                  </div>
                </div>

                {/* Attachments Section */}
                <div className={`${activeTab !== 'attachments' ? 'hidden lg:block' : ''}`}>
                  <div className="bg-surface rounded-lg border border-border p-6 shadow-elevation-1">
                    <AttachmentSection
                      attachments={attachments}
                      onAddAttachment={handleAddAttachment}
                      onRemoveAttachment={handleRemoveAttachment}
                    />
                  </div>
                </div>

                {/* Comments Section */}
                <div className={`${activeTab !== 'comments' ? 'hidden lg:block' : ''}`}>
                  <div className="bg-surface rounded-lg border border-border p-6 shadow-elevation-1">
                    <CommentsSection
                      comments={comments}
                      onAddComment={handleAddComment}
                      onDeleteComment={handleDeleteComment}
                    />
                  </div>
                </div>

                {/* Activity Section */}
                <div className={`${activeTab !== 'activity' ? 'hidden lg:block' : ''}`}>
                  <div className="bg-surface rounded-lg border border-border p-6 shadow-elevation-1">
                    <ActivityHistory />
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar - Desktop Only */}
            <div className="hidden lg:block lg:col-span-4">
              <div className="sticky top-24 space-y-6">
                {/* Task Metadata */}
                {mode === 'edit' && task && (
                  <div className="bg-surface rounded-lg border border-border p-6 shadow-elevation-1">
                    <TaskMetadata task={task} />
                  </div>
                )}

                {/* Quick Actions */}
                {mode === 'edit' && (
                  <div className="bg-surface rounded-lg border border-border p-6 shadow-elevation-1">
                    <h3 className="text-lg font-medium text-text-primary mb-4">Quick Actions</h3>
                    <div className="space-y-3">
                      <Button
                        variant="outline"
                        iconName="Copy"
                        onClick={handleDuplicateTask}
                        className="w-full justify-start"
                      >
                        Duplicate Task
                      </Button>
                      <Button
                        variant="outline"
                        iconName="Share"
                        onClick={() => console.log('Share task')}
                        className="w-full justify-start"
                      >
                        Share Task
                      </Button>
                      <Button
                        variant="outline"
                        iconName="Download"
                        onClick={() => console.log('Export task')}
                        className="w-full justify-start"
                      >
                        Export Task
                      </Button>
                      <Button
                        variant="danger"
                        iconName="Trash2"
                        onClick={handleDeleteTask}
                        className="w-full justify-start"
                      >
                        Delete Task
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <BottomTabNavigation />
      
      {/* Mobile spacing for bottom navigation */}
      <div className="h-16 lg:hidden" />
    </div>
  );
};

export default TaskDetailEdit;