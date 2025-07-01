import React from 'react';
import Icon from '../../../components/AppIcon';

const MetricsCard = ({ title, value, icon, color, trend, trendValue }) => {
  const getColorClasses = (color) => {
    switch (color) {
      case 'primary':
        return 'bg-blue-50 text-blue-600 border-blue-200';
      case 'success':
        return 'bg-green-50 text-green-600 border-green-200';
      case 'warning':
        return 'bg-amber-50 text-amber-600 border-amber-200';
      case 'error':
        return 'bg-red-50 text-red-600 border-red-200';
      default:
        return 'bg-gray-50 text-gray-600 border-gray-200';
    }
  };

  const getTrendColor = (trend) => {
    return trend === 'up' ? 'text-green-600' : trend === 'down' ? 'text-red-600' : 'text-gray-500';
  };

  return (
    <div className="bg-surface border border-border rounded-lg p-4 lg:p-6 hover-lift transition-smooth">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-text-secondary mb-1">{title}</p>
          <p className="text-xl lg:text-2xl font-heading font-semibold text-text-primary">{value}</p>
          {trend && trendValue && (
            <div className="flex items-center mt-2">
              <Icon 
                name={trend === 'up' ? 'TrendingUp' : trend === 'down' ? 'TrendingDown' : 'Minus'} 
                size={14} 
                className={getTrendColor(trend)}
              />
              <span className={`text-xs lg:text-sm font-medium ml-1 ${getTrendColor(trend)}`}>
                {trendValue}
              </span>
            </div>
          )}
        </div>
        <div className={`w-10 h-10 lg:w-12 lg:h-12 rounded-lg flex items-center justify-center ${getColorClasses(color)}`}>
          <Icon name={icon} size={20} strokeWidth={2} />
        </div>
      </div>
    </div>
  );
};

export default MetricsCard;