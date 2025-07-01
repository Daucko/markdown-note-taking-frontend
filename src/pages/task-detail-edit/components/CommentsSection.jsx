import React, { useState } from 'react';
import Button from '../../../components/ui/Button';

import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const CommentsSection = ({ comments = [], onAddComment, onDeleteComment }) => {
  const [newComment, setNewComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!newComment.trim()) return;

    setIsSubmitting(true);
    
    try {
      const comment = {
        id: Date.now(),
        text: newComment.trim(),
        author: {
          name: 'John Doe',
          avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
        },
        createdAt: new Date().toISOString(),
        isOwn: true
      };

      await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API call
      onAddComment(comment);
      setNewComment('');
    } catch (error) {
      console.error('Error adding comment:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatTimeAgo = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now - date) / 1000);

    if (diffInSeconds < 60) return 'Just now';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
    if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)}d ago`;
    
    return date.toLocaleDateString();
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium text-text-primary">Comments</h3>
        <span className="text-sm text-text-secondary">
          {comments.length} comment{comments.length !== 1 ? 's' : ''}
        </span>
      </div>

      {/* Add Comment Form */}
      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="flex space-x-3">
          <div className="flex-shrink-0">
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
              <Icon name="User" size={16} color="white" />
            </div>
          </div>
          <div className="flex-1">
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Add a comment..."
              rows={3}
              className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-micro resize-none"
            />
          </div>
        </div>
        
        <div className="flex justify-end">
          <Button
            type="submit"
            variant="primary"
            size="sm"
            loading={isSubmitting}
            disabled={!newComment.trim()}
          >
            Add Comment
          </Button>
        </div>
      </form>

      {/* Comments List */}
      {comments.length > 0 ? (
        <div className="space-y-4">
          {comments.map((comment) => (
            <div key={comment.id} className="flex space-x-3">
              {/* Avatar */}
              <div className="flex-shrink-0">
                <div className="w-8 h-8 rounded-full overflow-hidden bg-border">
                  <Image
                    src={comment.author.avatar}
                    alt={comment.author.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Comment Content */}
              <div className="flex-1 min-w-0">
                <div className="bg-background rounded-lg p-3 border border-border">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-text-primary">
                      {comment.author.name}
                    </span>
                    <div className="flex items-center space-x-2">
                      <span className="text-xs text-text-secondary">
                        {formatTimeAgo(comment.createdAt)}
                      </span>
                      {comment.isOwn && (
                        <Button
                          variant="ghost"
                          size="sm"
                          iconName="Trash2"
                          onClick={() => onDeleteComment(comment.id)}
                          className="p-1 text-text-secondary hover:text-error"
                        />
                      )}
                    </div>
                  </div>
                  <p className="text-sm text-text-primary whitespace-pre-wrap">
                    {comment.text}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8">
          <Icon name="MessageCircle" size={48} className="mx-auto text-text-secondary mb-3" />
          <p className="text-text-secondary">No comments yet</p>
          <p className="text-sm text-text-secondary">Be the first to add a comment</p>
        </div>
      )}
    </div>
  );
};

export default CommentsSection;