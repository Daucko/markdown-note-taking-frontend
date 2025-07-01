import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const TaskTable = ({ 
  tasks, 
  onToggleComplete, 
  onEdit, 
  onDelete, 
  selectedTasks, 
  onSelectTask, 
  isBulkMode,
  onSort,
  currentSort 
}) => {

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'completed':
        return 'text-success bg-green-50';
      case 'overdue':
        return 'text-error bg-red-50';
      case 'pending':
        return 'text-warning bg-yellow-50';
      default:
        return 'text-text-secondary bg-gray-50';
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const isOverdue = (task) => {
    const today = new Date();
    const dueDate = new Date(task.dueDate);
    return dueDate < today && task.status !== 'completed';
  };

  const handleSort = (field) => {
    const direction = currentSort.field === field && currentSort.direction === 'asc' ? 'desc' : 'asc';
    onSort({ field, direction });
  };

  const SortableHeader = ({ field, children }) => (
    <th 
      className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider cursor-pointer hover:bg-border-light transition-micro"
      onClick={() => handleSort(field)}
    >
      <div className="flex items-center space-x-1">
        <span>{children}</span>
        {currentSort.field === field && (
          <Icon 
            name={currentSort.direction === 'asc' ? 'ChevronUp' : 'ChevronDown'} 
            size={14} 
          />
        )}
      </div>
    </th>
  );

  return (
    <div className="bg-surface border border-border rounded-lg overflow-hidden shadow-elevation-1">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-border">
          <thead className="bg-border-light">
            <tr>
              {isBulkMode && (
                <th className="px-6 py-3 w-12">
                  <span className="sr-only">Select</span>
                </th>
              )}
              <th className="px-6 py-3 w-12">
                <span className="sr-only">Status</span>
              </th>
              <SortableHeader field="title">Task</SortableHeader>
              <SortableHeader field="dueDate">Due Date</SortableHeader>
              <SortableHeader field="status">Status</SortableHeader>
              <th className="px-6 py-3 w-24">
                <span className="sr-only">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody className="bg-surface divide-y divide-border">
            {tasks.map((task) => {
              const isSelected = selectedTasks.includes(task.id);
              return (
                <tr 
                  key={task.id} 
                  className={`hover:bg-border-light transition-micro ${
                    isSelected ? 'bg-primary/5 border-primary' : ''
                  }`}
                >
                  {isBulkMode && (
                    <td className="px-6 py-4">
                      <button
                        onClick={() => onSelectTask(task.id)}
                        className="p-1 rounded hover:bg-border-light transition-micro"
                      >
                        <Icon 
                          name={isSelected ? "CheckSquare" : "Square"} 
                          size={18} 
                          className={isSelected ? "text-primary" : "text-text-secondary"}
                        />
                      </button>
                    </td>
                  )}
                  
                  <td className="px-6 py-4">
                    <button
                      onClick={() => onToggleComplete(task.id)}
                      className="p-1 rounded hover:bg-border-light transition-micro"
                    >
                      <Icon 
                        name={task.status === 'completed' ? "CheckCircle2" : "Circle"} 
                        size={18} 
                        className={task.status === 'completed' ? "text-success" : "text-text-secondary"}
                      />
                    </button>
                  </td>

                  <td className="px-6 py-4">
                    <div className="max-w-xs">
                      <div className={`font-medium text-text-primary ${
                        task.status === 'completed' ? 'line-through opacity-60' : ''
                      }`}>
                        {task.title}
                      </div>
                      {task.description && (
                        <div className="text-sm text-text-secondary mt-1 truncate">
                          {task.description}
                        </div>
                      )}
                    </div>
                  </td>

                  <td className="px-6 py-4 text-sm text-text-primary">
                    <div className={isOverdue(task) ? 'text-error font-medium' : ''}>
                      {formatDate(task.dueDate)}
                    </div>
                  </td>

                  <td className="px-6 py-4">
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full capitalize ${
                      getStatusColor(task.status)
                    }`}>
                      {task.status}
                    </span>
                  </td>

                  <td className="px-6 py-4">
                    {!isBulkMode && (
                      <div className="flex items-center space-x-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          iconName="Edit"
                          onClick={() => onEdit(task)}
                          className="p-2 hover:bg-border-light"
                        />
                        <Button
                          variant="ghost"
                          size="sm"
                          iconName="Trash2"
                          onClick={() => onDelete(task.id)}
                          className="p-2 hover:bg-red-50 hover:text-error"
                        />
                      </div>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TaskTable;