import React, { useState, useRef, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const PullToRefresh = ({ onRefresh, children }) => {
  const [isPulling, setIsPulling] = useState(false);
  const [pullDistance, setPullDistance] = useState(0);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const containerRef = useRef(null);
  const startY = useRef(0);
  const currentY = useRef(0);

  const PULL_THRESHOLD = 80;
  const MAX_PULL_DISTANCE = 120;

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let touchStartY = 0;
    let touchCurrentY = 0;

    const handleTouchStart = (e) => {
      if (container.scrollTop === 0) {
        touchStartY = e.touches[0].clientY;
        startY.current = touchStartY;
        setIsPulling(true);
      }
    };

    const handleTouchMove = (e) => {
      if (!isPulling || container.scrollTop > 0) return;

      touchCurrentY = e.touches[0].clientY;
      currentY.current = touchCurrentY;
      
      const pullDistance = Math.max(0, touchCurrentY - touchStartY);
      const adjustedDistance = Math.min(pullDistance * 0.5, MAX_PULL_DISTANCE);
      
      setPullDistance(adjustedDistance);

      if (adjustedDistance > 0) {
        e.preventDefault();
      }
    };

    const handleTouchEnd = async () => {
      if (!isPulling) return;

      setIsPulling(false);

      if (pullDistance >= PULL_THRESHOLD) {
        setIsRefreshing(true);
        try {
          await onRefresh();
        } catch (error) {
          console.error('Refresh failed:', error);
        } finally {
          setIsRefreshing(false);
        }
      }

      setPullDistance(0);
    };

    container.addEventListener('touchstart', handleTouchStart, { passive: false });
    container.addEventListener('touchmove', handleTouchMove, { passive: false });
    container.addEventListener('touchend', handleTouchEnd);

    return () => {
      container.removeEventListener('touchstart', handleTouchStart);
      container.removeEventListener('touchmove', handleTouchMove);
      container.removeEventListener('touchend', handleTouchEnd);
    };
  }, [isPulling, pullDistance, onRefresh]);

  const getRefreshStatus = () => {
    if (isRefreshing) return 'Refreshing...';
    if (pullDistance >= PULL_THRESHOLD) return 'Release to refresh';
    if (pullDistance > 0) return 'Pull to refresh';
    return '';
  };

  return (
    <div ref={containerRef} className="relative h-full overflow-auto">
      {/* Pull to refresh indicator */}
      {(pullDistance > 0 || isRefreshing) && (
        <div 
          className="absolute top-0 left-0 right-0 flex flex-col items-center justify-center bg-surface border-b border-border z-10 transition-all duration-200"
          style={{ 
            height: `${Math.max(pullDistance, isRefreshing ? 60 : 0)}px`,
            transform: `translateY(${isRefreshing ? 0 : -60 + pullDistance}px)`
          }}
        >
          <div className="flex items-center space-x-2 text-text-secondary">
            <Icon 
              name="RefreshCw" 
              size={20} 
              className={`${isRefreshing ? 'animate-spin' : ''} ${
                pullDistance >= PULL_THRESHOLD ? 'text-primary' : ''
              }`}
            />
            <span className="text-sm font-medium">
              {getRefreshStatus()}
            </span>
          </div>
        </div>
      )}

      {/* Content */}
      <div 
        className="transition-transform duration-200"
        style={{ 
          transform: `translateY(${pullDistance}px)` 
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default PullToRefresh;