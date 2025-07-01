import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const NotesChart = () => {
  // Mock data for charts
  const creationData = [
    { name: 'Mon', notes: 2 },
    { name: 'Tue', notes: 5 },
    { name: 'Wed', notes: 3 },
    { name: 'Thu', notes: 8 },
    { name: 'Fri', notes: 6 },
    { name: 'Sat', notes: 4 },
    { name: 'Sun', notes: 1 }
  ];

  const categoryData = [
    { name: 'Work', value: 12, color: '#3B82F6' },
    { name: 'Personal', value: 8, color: '#10B981' },
    { name: 'Ideas', value: 5, color: '#F59E0B' },
    { name: 'Learning', value: 3, color: '#EF4444' }
  ];

  return (
    <div className="bg-surface border border-border rounded-lg p-4 lg:p-6">
      <h3 className="text-lg font-heading font-semibold text-text-primary mb-6">
        Notes Statistics
      </h3>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Creation Frequency Chart */}
        <div>
          <h4 className="text-sm font-medium text-text-secondary mb-4">
            Notes Created This Week
          </h4>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={creationData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis 
                  dataKey="name" 
                  tick={{ fontSize: 12, fill: '#6B7280' }}
                  axisLine={{ stroke: '#E5E7EB' }}
                />
                <YAxis 
                  tick={{ fontSize: 12, fill: '#6B7280' }}
                  axisLine={{ stroke: '#E5E7EB' }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#FFFFFF',
                    border: '1px solid #E5E7EB',
                    borderRadius: '8px',
                    fontSize: '12px'
                  }}
                />
                <Bar dataKey="notes" fill="#3B82F6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Category Distribution Chart */}
        <div>
          <h4 className="text-sm font-medium text-text-secondary mb-4">
            Notes by Category
          </h4>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={80}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {categoryData?.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry?.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#FFFFFF',
                    border: '1px solid #E5E7EB',
                    borderRadius: '8px',
                    fontSize: '12px'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          
          {/* Legend */}
          <div className="grid grid-cols-2 gap-2 mt-4">
            {categoryData?.map((item, index) => (
              <div key={index} className="flex items-center">
                <div
                  className="w-3 h-3 rounded-full mr-2"
                  style={{ backgroundColor: item?.color }}
                ></div>
                <span className="text-xs text-text-secondary">
                  {item?.name} ({item?.value})
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotesChart;