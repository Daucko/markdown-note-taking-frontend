import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import ContextualHeader from '../../components/ui/ContextualHeader';
import BottomTabNavigation from '../../components/ui/BottomTabNavigation';
import MetricsCard from './components/MetricsCard';
import QuickActions from './components/QuickActions';
import RecentActivity from './components/RecentActivity';
import NotesChart from './components/NotesChart';

const NotesDashboard = () => {
  const [metrics, setMetrics] = useState({
    totalNotes: 0,
    notesToday: 0,
    recentlyModified: 0,
    favoriteNotes: 0
  });

  const [recentActivities, setRecentActivities] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Mock data for now - replace with actual API calls
    const fetchDashboardData = async () => {
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        setMetrics({
          totalNotes: 24,
          notesToday: 3,
          recentlyModified: 8,
          favoriteNotes: 12
        });

        setRecentActivities([
          {
            id: 1,
            type: 'created',
            title: 'Meeting Notes - Q4 Planning',
            timestamp: '2 hours ago',
            content: 'Created new meeting notes for quarterly planning session...'
          },
          {
            id: 2,
            type: 'modified',
            title: 'Project Documentation',
            timestamp: '4 hours ago',
            content: 'Updated project requirements and technical specifications...'
          },
          {
            id: 3,
            type: 'created',
            title: 'Daily Journal Entry',
            timestamp: '1 day ago',
            content: 'Today was productive. Completed the markdown parser implementation...'
          }
        ]);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Notes Dashboard - Note Taking App</title>
        <meta name="description" content="Overview of your note-taking activities and quick access to notes management." />
      </Helmet>

      <div className="min-h-screen bg-background">
        <ContextualHeader />

        {/* Main Content */}
        <main className="lg:ml-64 pb-16 lg:pb-6">
          <div className="p-4 lg:p-6">
            {/* Welcome Section */}
            <div className="mb-6">
              <h1 className="text-2xl lg:text-3xl font-heading font-bold text-text-primary mb-2">
                Welcome back!
              </h1>
              <p className="text-text-secondary">
                Here's an overview of your note-taking activities
              </p>
            </div>

            {/* Mobile Layout */}
            <div className="lg:hidden space-y-6">
              {/* Metrics Cards */}
              <div className="grid grid-cols-2 gap-4">
                <MetricsCard
                  title="Total Notes"
                  value={metrics?.totalNotes}
                  icon="FileText"
                  color="primary"
                />
                <MetricsCard
                  title="Notes Today"
                  value={metrics?.notesToday}
                  icon="PlusCircle"
                  color="success"
                  trend="up"
                  trendValue="+2"
                />
                <MetricsCard
                  title="Recently Modified"
                  value={metrics?.recentlyModified}
                  icon="Edit"
                  color="warning"
                />
                <MetricsCard
                  title="Favorite Notes"
                  value={metrics?.favoriteNotes}
                  icon="Heart"
                  color="error"
                />
              </div>

              {/* Quick Actions */}
              <QuickActions />

              {/* Recent Activity */}
              <RecentActivity activities={recentActivities} />

              {/* Notes Chart */}
              <NotesChart />
            </div>

            {/* Desktop Layout */}
            <div className="hidden lg:grid lg:grid-cols-12 lg:gap-6">
              {/* Main Content Area (8 columns) */}
              <div className="lg:col-span-8 space-y-6">
                {/* Metrics Cards */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
                  <MetricsCard
                    title="Total Notes"
                    value={metrics?.totalNotes}
                    icon="FileText"
                    color="primary"
                  />
                  <MetricsCard
                    title="Notes Today"
                    value={metrics?.notesToday}
                    icon="PlusCircle"
                    color="success"
                    trend="up"
                    trendValue="+2"
                  />
                  <MetricsCard
                    title="Recently Modified"
                    value={metrics?.recentlyModified}
                    icon="Edit"
                    color="warning"
                  />
                  <MetricsCard
                    title="Favorite Notes"
                    value={metrics?.favoriteNotes}
                    icon="Heart"
                    color="error"
                  />
                </div>

                {/* Notes Chart */}
                <NotesChart />
              </div>

              {/* Right Panel (4 columns) */}
              <div className="lg:col-span-4 space-y-6">
                {/* Quick Actions */}
                <QuickActions />

                {/* Recent Activity */}
                <RecentActivity activities={recentActivities} />
              </div>
            </div>
          </div>
        </main>

        <BottomTabNavigation />
      </div>
    </>
  );
};

export default NotesDashboard;