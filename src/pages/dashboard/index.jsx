import React from 'react';
import ContextualHeader from '../../components/ui/ContextualHeader';
import BottomTabNavigation from '../../components/ui/BottomTabNavigation';
import MetricsCard from './components/MetricsCard';
import QuickActions from './components/QuickActions';
import RecentActivity from './components/RecentActivity';
import TaskChart from './components/TaskChart';
import UpcomingTasks from './components/UpcomingTasks';

const Dashboard = () => {
  const metricsData = [
    {
      title: 'Total Tasks',
      value: '24',
      icon: 'CheckSquare',
      color: 'primary',
      trend: 'up',
      trendValue: '+12%'
    },
    {
      title: 'Completed Today',
      value: '8',
      icon: 'CheckCircle',
      color: 'success',
      trend: 'up',
      trendValue: '+25%'
    },
    {
      title: 'Overdue',
      value: '3',
      icon: 'AlertCircle',
      color: 'error',
      trend: 'down',
      trendValue: '-2'
    },
    {
      title: 'This Week',
      value: '15',
      icon: 'Calendar',
      color: 'warning',
      trend: 'up',
      trendValue: '+5'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <ContextualHeader />
      
      {/* Main Content */}
      <main className="lg:ml-64 pb-16 lg:pb-0">
        <div className="p-4 lg:p-6">
          {/* Welcome Section */}
          <div className="mb-6">
            <h1 className="text-2xl font-heading font-semibold text-text-primary mb-2">
              Welcome back, John!
            </h1>
            <p className="text-text-secondary">
              Here's what's happening with your tasks today.
            </p>
          </div>

          {/* Desktop Layout */}
          <div className="hidden lg:grid lg:grid-cols-12 lg:gap-6">
            {/* Main Content Area (8 columns) */}
            <div className="lg:col-span-8 space-y-6">
              {/* Metrics Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {metricsData.map((metric, index) => (
                  <MetricsCard
                    key={index}
                    title={metric.title}
                    value={metric.value}
                    icon={metric.icon}
                    color={metric.color}
                    trend={metric.trend}
                    trendValue={metric.trendValue}
                  />
                ))}
              </div>

              {/* Charts Section */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <TaskChart type="pie" />
                <TaskChart type="bar" />
              </div>

              {/* Upcoming Tasks */}
              <UpcomingTasks />
            </div>

            {/* Right Sidebar (4 columns) */}
            <div className="lg:col-span-4 space-y-6">
              <QuickActions />
              <RecentActivity />
            </div>
          </div>

          {/* Mobile Layout */}
          <div className="lg:hidden space-y-6">
            {/* Metrics Cards */}
            <div className="grid grid-cols-2 gap-4">
              {metricsData.map((metric, index) => (
                <MetricsCard
                  key={index}
                  title={metric.title}
                  value={metric.value}
                  icon={metric.icon}
                  color={metric.color}
                  trend={metric.trend}
                  trendValue={metric.trendValue}
                />
              ))}
            </div>

            {/* Quick Actions */}
            <QuickActions />

            {/* Task Chart */}
            <TaskChart type="pie" />

            {/* Upcoming Tasks */}
            <UpcomingTasks />

            {/* Recent Activity */}
            <RecentActivity />
          </div>
        </div>
      </main>

      <BottomTabNavigation />
    </div>
  );
};

export default Dashboard;