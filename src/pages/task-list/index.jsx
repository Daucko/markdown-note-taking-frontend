import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import ContextualHeader from '../../components/ui/ContextualHeader';
import BottomTabNavigation from '../../components/ui/BottomTabNavigation';
import FloatingActionButton from '../../components/ui/FloatingActionButton';
import TaskCard from './components/TaskCard';
import FilterPanel from './components/FilterPanel';
import SortDropdown from './components/SortDropdown';
import BulkActionBar from './components/BulkActionBar';
import TaskTable from './components/TaskTable';
import SearchBar from './components/SearchBar';
import EmptyState from './components/EmptyState';
import PullToRefresh from './components/PullToRefresh';
import Button from '../../components/ui/Button';


const TaskList = () => {
  const navigate = useNavigate();

  // Mock data
  const mockTasks = [
    {
      id: 1,
      title: "Complete project proposal",
      description: "Finalize the Q4 project proposal with budget estimates and timeline. Include stakeholder feedback and risk assessment.",
      dueDate: "2024-12-25",
      priority: "high",
      status: "pending",
      category: "work",
      createdAt: "2024-12-15T10:00:00Z"
    },
    {
      id: 2,
      title: "Review team performance",
      description: "Conduct quarterly performance reviews for all team members and prepare feedback reports.",
      dueDate: "2024-12-20",
      priority: "medium",
      status: "completed",
      category: "work",
      createdAt: "2024-12-10T14:30:00Z"
    },
    {
      id: 3,
      title: "Buy groceries",
      description: "Weekly grocery shopping - milk, bread, vegetables, fruits, and household essentials.",
      dueDate: "2024-12-18",
      priority: "low",
      status: "overdue",
      category: "personal",
      createdAt: "2024-12-12T09:15:00Z"
    },
    {
      id: 4,
      title: "Schedule dentist appointment",
      description: "Book routine dental checkup and cleaning appointment for next month.",
      dueDate: "2024-12-30",
      priority: "medium",
      status: "pending",
      category: "health",
      createdAt: "2024-12-14T16:45:00Z"
    },
    {
      id: 5,
      title: "Update portfolio website",
      description: "Add recent projects, update skills section, and optimize for mobile responsiveness.",
      dueDate: "2024-12-28",
      priority: "high",
      status: "pending",
      category: "personal",
      createdAt: "2024-12-13T11:20:00Z"
    },
    {
      id: 6,
      title: "Prepare presentation slides",
      description: "Create slides for the upcoming client presentation including market analysis and recommendations.",
      dueDate: "2024-12-22",
      priority: "high",
      status: "pending",
      category: "work",
      createdAt: "2024-12-16T08:30:00Z"
    },
    {
      id: 7,
      title: "Learn React hooks",
      description: "Complete online course on advanced React hooks and practice with sample projects.",
      dueDate: "2024-12-31",
      priority: "medium",
      status: "pending",
      category: "education",
      createdAt: "2024-12-11T13:00:00Z"
    },
    {
      id: 8,
      title: "Plan weekend trip",
      description: "Research destinations, book accommodations, and create itinerary for weekend getaway.",
      dueDate: "2024-12-26",
      priority: "low",
      status: "completed",
      category: "personal",
      createdAt: "2024-12-09T15:45:00Z"
    }
  ];

  // State management
  const [tasks, setTasks] = useState(mockTasks);
  const [filteredTasks, setFilteredTasks] = useState(mockTasks);
  const [searchTerm, setSearchTerm] = useState('');
  const [isFilterPanelOpen, setIsFilterPanelOpen] = useState(false);
  const [isBulkMode, setIsBulkMode] = useState(false);
  const [selectedTasks, setSelectedTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [viewMode, setViewMode] = useState('card'); // 'card' or 'table'

  // Filter and sort state
  const [filters, setFilters] = useState({
    status: 'all',
    priority: 'all',
    category: 'all',
    dateFrom: '',
    dateTo: ''
  });

  const [sortConfig, setSortConfig] = useState({
    field: 'dueDate',
    direction: 'asc'
  });

  // Apply filters and search
  useEffect(() => {
    let filtered = [...tasks];

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(task =>
        task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply status filter
    if (filters.status !== 'all') {
      if (filters.status === 'overdue') {
        filtered = filtered.filter(task => {
          const today = new Date();
          const dueDate = new Date(task.dueDate);
          return dueDate < today && task.status !== 'completed';
        });
      } else {
        filtered = filtered.filter(task => task.status === filters.status);
      }
    }

    // Apply priority filter
    if (filters.priority !== 'all') {
      filtered = filtered.filter(task => task.priority === filters.priority);
    }

    // Apply category filter
    if (filters.category !== 'all') {
      filtered = filtered.filter(task => task.category === filters.category);
    }

    // Apply date range filter
    if (filters.dateFrom) {
      filtered = filtered.filter(task => new Date(task.dueDate) >= new Date(filters.dateFrom));
    }
    if (filters.dateTo) {
      filtered = filtered.filter(task => new Date(task.dueDate) <= new Date(filters.dateTo));
    }

    // Apply sorting
    filtered.sort((a, b) => {
      let aValue = a[sortConfig.field];
      let bValue = b[sortConfig.field];

      if (sortConfig.field === 'dueDate' || sortConfig.field === 'createdAt') {
        aValue = new Date(aValue);
        bValue = new Date(bValue);
      }

      if (sortConfig.field === 'priority') {
        const priorityOrder = { high: 3, medium: 2, low: 1 };
        aValue = priorityOrder[aValue];
        bValue = priorityOrder[bValue];
      }

      if (aValue < bValue) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });

    setFilteredTasks(filtered);
  }, [tasks, searchTerm, filters, sortConfig]);

  // Handlers
  const handleSearch = useCallback((term) => {
    setSearchTerm(term);
  }, []);

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const handleApplyFilters = () => {
    setIsFilterPanelOpen(false);
  };

  const handleResetFilters = () => {
    setFilters({
      status: 'all',
      priority: 'all',
      category: 'all',
      dateFrom: '',
      dateTo: ''
    });
    setSearchTerm('');
  };

  const handleSortChange = (newSort) => {
    setSortConfig(newSort);
  };

  const handleToggleComplete = (taskId) => {
    setTasks(prev => prev.map(task =>
      task.id === taskId
        ? { ...task, status: task.status === 'completed' ? 'pending' : 'completed' }
        : task
    ));
  };

  const handleEditTask = (task) => {
    navigate('/task-detail-edit', { state: { task, mode: 'edit' } });
  };

  const handleDeleteTask = (taskId) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      setTasks(prev => prev.filter(task => task.id !== taskId));
      setSelectedTasks(prev => prev.filter(id => id !== taskId));
    }
  };

  const handleCreateTask = () => {
    navigate('/task-detail-edit', { state: { mode: 'create' } });
  };

  // Bulk operations
  const handleLongPress = (taskId) => {
    setIsBulkMode(true);
    setSelectedTasks([taskId]);
  };

  const handleSelectTask = (taskId) => {
    setSelectedTasks(prev =>
      prev.includes(taskId)
        ? prev.filter(id => id !== taskId)
        : [...prev, taskId]
    );
  };

  const handleSelectAll = () => {
    if (selectedTasks.length === filteredTasks.length) {
      setSelectedTasks([]);
    } else {
      setSelectedTasks(filteredTasks.map(task => task.id));
    }
  };

  const handleBulkMarkComplete = () => {
    setTasks(prev => prev.map(task =>
      selectedTasks.includes(task.id)
        ? { ...task, status: 'completed' }
        : task
    ));
    setSelectedTasks([]);
    setIsBulkMode(false);
  };

  const handleBulkMarkIncomplete = () => {
    setTasks(prev => prev.map(task =>
      selectedTasks.includes(task.id)
        ? { ...task, status: 'pending' }
        : task
    ));
    setSelectedTasks([]);
    setIsBulkMode(false);
  };

  const handleBulkDelete = () => {
    if (window.confirm(`Are you sure you want to delete ${selectedTasks.length} task(s)?`)) {
      setTasks(prev => prev.filter(task => !selectedTasks.includes(task.id)));
      setSelectedTasks([]);
      setIsBulkMode(false);
    }
  };

  const handleCancelBulkMode = () => {
    setIsBulkMode(false);
    setSelectedTasks([]);
  };

  const handleRefresh = async () => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsLoading(false);
  };

  const getEmptyStateType = () => {
    if (tasks.length === 0) return 'no-tasks';
    if (filteredTasks.length === 0) return 'no-results';
    if (filteredTasks.every(task => task.status === 'completed')) return 'all-completed';
    return 'no-tasks';
  };

  return (
    <div className="min-h-screen bg-background">
      <ContextualHeader />
      
      {isBulkMode && (
        <BulkActionBar
          selectedCount={selectedTasks.length}
          totalCount={filteredTasks.length}
          onMarkComplete={handleBulkMarkComplete}
          onMarkIncomplete={handleBulkMarkIncomplete}
          onDelete={handleBulkDelete}
          onCancel={handleCancelBulkMode}
          onSelectAll={handleSelectAll}
        />
      )}

      <div className="flex h-screen pt-16 pb-16 lg:pb-0">
        {/* Desktop Sidebar */}
        <div className="hidden lg:block lg:w-64 bg-surface border-r border-border">
          <div className="p-6">
            <FilterPanel
              isOpen={true}
              onClose={() => {}}
              filters={filters}
              onFilterChange={handleFilterChange}
              onApplyFilters={handleApplyFilters}
              onResetFilters={handleResetFilters}
            />
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col lg:ml-64">
          {/* Toolbar */}
          <div className="bg-surface border-b border-border p-4">
            <div className="flex items-center justify-between space-x-4">
              <div className="flex items-center space-x-4 flex-1">
                <SearchBar onSearch={handleSearch} />
                
                <Button
                  variant="outline"
                  iconName="Filter"
                  onClick={() => setIsFilterPanelOpen(true)}
                  className="lg:hidden"
                >
                  <span className="hidden sm:inline ml-2">Filter</span>
                </Button>
              </div>

              <div className="flex items-center space-x-2">
                <SortDropdown
                  currentSort={sortConfig}
                  onSortChange={handleSortChange}
                />

                {/* View Mode Toggle - Desktop Only */}
                <div className="hidden lg:flex items-center space-x-1 bg-border-light rounded-lg p-1">
                  <Button
                    variant={viewMode === 'card' ? 'primary' : 'ghost'}
                    size="sm"
                    iconName="LayoutGrid"
                    onClick={() => setViewMode('card')}
                    className="p-2"
                  />
                  <Button
                    variant={viewMode === 'table' ? 'primary' : 'ghost'}
                    size="sm"
                    iconName="List"
                    onClick={() => setViewMode('table')}
                    className="p-2"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Task List Content */}
          <div className="flex-1 overflow-hidden">
            <PullToRefresh onRefresh={handleRefresh}>
              <div className="h-full overflow-auto">
                {filteredTasks.length === 0 ? (
                  <EmptyState
                    type={getEmptyStateType()}
                    onCreateTask={handleCreateTask}
                    onClearFilters={handleResetFilters}
                  />
                ) : (
                  <div className="p-4">
                    {/* Mobile Card View */}
                    <div className="lg:hidden space-y-3">
                      {filteredTasks.map((task) => (
                        <div
                          key={task.id}
                          onTouchStart={() => {
                            const timer = setTimeout(() => handleLongPress(task.id), 500);
                            const cleanup = () => clearTimeout(timer);
                            document.addEventListener('touchend', cleanup, { once: true });
                            document.addEventListener('touchmove', cleanup, { once: true });
                          }}
                        >
                          <TaskCard
                            task={task}
                            onToggleComplete={handleToggleComplete}
                            onEdit={handleEditTask}
                            onDelete={handleDeleteTask}
                            isSelected={selectedTasks.includes(task.id)}
                            onSelect={handleSelectTask}
                            isBulkMode={isBulkMode}
                          />
                        </div>
                      ))}
                    </div>

                    {/* Desktop View */}
                    <div className="hidden lg:block">
                      {viewMode === 'table' ? (
                        <TaskTable
                          tasks={filteredTasks}
                          onToggleComplete={handleToggleComplete}
                          onEdit={handleEditTask}
                          onDelete={handleDeleteTask}
                          selectedTasks={selectedTasks}
                          onSelectTask={handleSelectTask}
                          isBulkMode={isBulkMode}
                          onSort={handleSortChange}
                          currentSort={sortConfig}
                        />
                      ) : (
                        <div className="grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-4">
                          {filteredTasks.map((task) => (
                            <TaskCard
                              key={task.id}
                              task={task}
                              onToggleComplete={handleToggleComplete}
                              onEdit={handleEditTask}
                              onDelete={handleDeleteTask}
                              isSelected={selectedTasks.includes(task.id)}
                              onSelect={handleSelectTask}
                              isBulkMode={isBulkMode}
                            />
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </PullToRefresh>
          </div>
        </div>
      </div>

      {/* Mobile Filter Panel */}
      <FilterPanel
        isOpen={isFilterPanelOpen}
        onClose={() => setIsFilterPanelOpen(false)}
        filters={filters}
        onFilterChange={handleFilterChange}
        onApplyFilters={handleApplyFilters}
        onResetFilters={handleResetFilters}
      />

      <FloatingActionButton />
      <BottomTabNavigation />
    </div>
  );
};

export default TaskList;