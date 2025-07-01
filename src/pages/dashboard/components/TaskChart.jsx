import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

const TaskChart = ({ type = 'pie' }) => {
  const pieData = [
    { name: 'Completed', value: 45, color: '#059669' },
    { name: 'In Progress', value: 30, color: '#2563EB' },
    { name: 'Pending', value: 20, color: '#F59E0B' },
    { name: 'Overdue', value: 5, color: '#DC2626' }
  ];

  const barData = [
    { name: 'Mon', completed: 8, pending: 3 },
    { name: 'Tue', completed: 12, pending: 5 },
    { name: 'Wed', completed: 6, pending: 8 },
    { name: 'Thu', completed: 15, pending: 2 },
    { name: 'Fri', completed: 10, pending: 6 },
    { name: 'Sat', completed: 4, pending: 1 },
    { name: 'Sun', completed: 2, pending: 0 }
  ];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-surface border border-border rounded-lg p-3 shadow-elevation-2">
          <p className="text-sm font-medium text-text-primary">{label}</p>
          {payload.map((entry, index) => (
            <p key={index} className="text-sm text-text-secondary">
              <span style={{ color: entry.color }}>{entry.dataKey}: </span>
              {entry.value}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  if (type === 'pie') {
    return (
      <div className="bg-surface border border-border rounded-lg p-6">
        <h3 className="text-lg font-heading font-semibold text-text-primary mb-4">
          Task Distribution
        </h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                innerRadius={40}
                outerRadius={80}
                paddingAngle={2}
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                content={<CustomTooltip />}
                formatter={(value, name) => [value, name]}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="grid grid-cols-2 gap-2 mt-4">
          {pieData.map((item, index) => (
            <div key={index} className="flex items-center space-x-2">
              <div 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: item.color }}
              ></div>
              <span className="text-sm text-text-secondary">{item.name}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-surface border border-border rounded-lg p-6">
      <h3 className="text-lg font-heading font-semibold text-text-primary mb-4">
        Weekly Progress
      </h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={barData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
            <XAxis 
              dataKey="name" 
              tick={{ fontSize: 12, fill: '#64748B' }}
              axisLine={{ stroke: '#E2E8F0' }}
            />
            <YAxis 
              tick={{ fontSize: 12, fill: '#64748B' }}
              axisLine={{ stroke: '#E2E8F0' }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="completed" fill="#059669" radius={[2, 2, 0, 0]} />
            <Bar dataKey="pending" fill="#F59E0B" radius={[2, 2, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="flex items-center justify-center space-x-6 mt-4">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 rounded-full bg-green-600"></div>
          <span className="text-sm text-text-secondary">Completed</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 rounded-full bg-amber-500"></div>
          <span className="text-sm text-text-secondary">Pending</span>
        </div>
      </div>
    </div>
  );
};

export default TaskChart;