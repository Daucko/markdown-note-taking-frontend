import React, { useState, useRef } from 'react';
import Icon from '../../../components/AppIcon';

const PullToRefresh = ({ children, onRefresh, isRefreshing = false }) => {
  const [isPulling, setIsPulling] = useState(false);
  const [pullDistance, setPullDistance] = useState(0);
  const startY = useRef(0);
  const currentY = useRef(0);
  const containerRef = useRef(null);

  const maxPullDistance = 80;
  const triggerDistance = 60;

  const handleTouchStart = (e) => {
    // Only enable pull-to-refresh when at the top of the page
    if (window.scrollY === 0) {
      startY.current = e.touches[0].clientY;
      setIsPulling(true);
    }
  };

  const handleTouchMove = (e) => {
    if (!isPulling || isRefreshing) return;

    currentY.current = e.touches[0].clientY;
    const distance = Math.max(0, currentY.current - startY.current);
    
    if (distance > 0) {
      e.preventDefault();
      setPullDistance(Math.min(distance * 0.5, maxPullDistance));
    }
  };

  const handleTouchEnd = () => {
    if (!isPulling || isRefreshing) return;

    if (pullDistance >= triggerDistance) {
      onRefresh?.();
    }

    setIsPulling(false);
    setPullDistance(0);
  };

  const getRefreshIndicatorStyle = () => {
    const opacity = Math.min(pullDistance / triggerDistance, 1);
    const scale = Math.min(pullDistance / triggerDistance, 1);
    
    return {
      transform: `translateY(${pullDistance}px) scale(${scale})`,
      opacity: opacity
    };
  };

  return (
    <div
      ref={containerRef}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      className="relative"
      style={{
        transform: `translateY(${pullDistance}px)`,
        transition: isPulling ? 'none' : 'transform 0.3s ease-out'
      }}
    >
      {/* Pull to Refresh Indicator */}
      {(isPulling || isRefreshing) && (
        <div 
          className="absolute top-0 left-0 right-0 flex items-center justify-center h-16 -mt-16"
          style={getRefreshIndicatorStyle()}
        >
          <div className="flex flex-col items-center">
            <div className={`${isRefreshing ? 'animate-spin' : ''}`}>
              <Icon 
                name={isRefreshing ? 'Loader2' : 'RefreshCw'} 
                size={24} 
                className="text-primary" 
              />
            </div>
            <span className="text-xs text-text-secondary mt-1">
              {isRefreshing 
                ? 'Refreshing...' 
                : pullDistance >= triggerDistance 
                  ? 'Release to refresh' :'Pull to refresh'
              }
            </span>
          </div>
        </div>
      )}

      {children}
    </div>
  );
};

export default PullToRefresh;