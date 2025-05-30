import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, Users, Zap, DollarSign, Activity, Target, ArrowUp, ArrowDown } from 'lucide-react';

const AgenticInsightsDashboard = () => {
  const [timeRange, setTimeRange] = useState('6M');
  
  // Mock data for Agent Adoption Rate (Key Metric 1)
  const adoptionData = [
    { month: 'Jan', activeAgents: 1250, newAgents: 180, churnRate: 3.2 },
    { month: 'Feb', activeAgents: 1420, newAgents: 220, churnRate: 2.8 },
    { month: 'Mar', activeAgents: 1680, newAgents: 290, churnRate: 2.1 },
    { month: 'Apr', activeAgents: 2150, newAgents: 510, churnRate: 1.9 },
    { month: 'May', activeAgents: 2780, newAgents: 680, churnRate: 1.6 },
    { month: 'Jun', activeAgents: 3520, newAgents: 820, churnRate: 1.4 }
  ];

  // Mock data for Revenue per Agent (Key Metric 2)
  const revenueData = [
    { month: 'Jan', avgRevenue: 1200, totalRevenue: 1500000 },
    { month: 'Feb', avgRevenue: 1350, totalRevenue: 1917000 },
    { month: 'Mar', avgRevenue: 1480, totalRevenue: 2486400 },
    { month: 'Apr', avgRevenue: 1620, totalRevenue: 3483000 },
    { month: 'May', avgRevenue: 1750, totalRevenue: 4865000 },
    { month: 'Jun', avgRevenue: 1850, totalRevenue: 6512000 }
  ];

  // Mock data for Task Success Rate (Key Metric 3)
  const performanceData = [
    { month: 'Jan', successRate: 87.2, avgResponseTime: 0.8, tasksCompleted: 125000 },
    { month: 'Feb', successRate: 89.1, avgResponseTime: 0.7, tasksCompleted: 156000 },
    { month: 'Mar', successRate: 91.3, avgResponseTime: 0.6, tasksCompleted: 198000 },
    { month: 'Apr', successRate: 93.7, avgResponseTime: 0.5, tasksCompleted: 267000 },
    { month: 'May', successRate: 95.2, avgResponseTime: 0.4, tasksCompleted: 341000 },
    { month: 'Jun', successRate: 96.8, avgResponseTime: 0.3, tasksCompleted: 428000 }
  ];

  // Task distribution data
  const taskTypeData = [
    { name: 'Data Analysis', value: 35, color: '#8884d8' },
    { name: 'Customer Support', value: 28, color: '#82ca9d' },
    { name: 'Content Generation', value: 22, color: '#ffc658' },
    { name: 'Process Automation', value: 15, color: '#ff7c7c' }
  ];

  const MetricCard = ({ title, value, change, icon: Icon, color, subtitle }) => (
    <div className="bg-white rounded-lg shadow-lg p-6 border-l-4" style={{ borderLeftColor: color }}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-3xl font-bold text-gray-900">{value}</p>
          {subtitle && <p className="text-sm text-gray-500 mt-1">{subtitle}</p>}
        </div>
        <div className="flex flex-col items-end">
          <Icon className="h-8 w-8 mb-2" style={{ color }} />
          <div className={`flex items-center text-sm ${change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            {change >= 0 ? <ArrowUp className="h-4 w-4 mr-1" /> : <ArrowDown className="h-4 w-4 mr-1" />}
            {Math.abs(change)}%
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Agentic Platform</h1>
            <p className="text-lg text-gray-600">Investor Performance Dashboard</p>
          </div>
          <div className="flex items-center space-x-4">
            <select 
              value={timeRange} 
              onChange={(e) => setTimeRange(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="3M">Last 3 Months</option>
              <option value="6M">Last 6 Months</option>
              <option value="1Y">Last Year</option>
            </select>
          </div>
        </div>
      </div>

      {/* Key Metrics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <MetricCard
          title="Active Agents"
          value="3,520"
          change={26.6}
          icon={Users}
          color="#3B82F6"
          subtitle="Current month"
        />
        <MetricCard
          title="Avg Revenue/Agent"
          value="$1,850"
          change={14.2}
          icon={DollarSign}
          color="#10B981"
          subtitle="Monthly average"
        />
        <MetricCard
          title="Task Success Rate"
          value="96.8%"
          change={3.2}
          icon={Target}
          color="#8B5CF6"
          subtitle="June performance"
        />
        <MetricCard
          title="Total Revenue"
          value="$6.51M"
          change={33.8}
          icon={TrendingUp}
          color="#F59E0B"
          subtitle="Monthly recurring"
        />
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Agent Adoption Growth */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Agent Adoption Growth</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={adoptionData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="activeAgents" stroke="#3B82F6" strokeWidth={3} name="Active Agents" />
              <Line type="monotone" dataKey="newAgents" stroke="#10B981" strokeWidth={2} name="New Agents" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Revenue Growth */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Revenue Performance</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip formatter={(value, name) => name === 'totalRevenue' ? [`$${(value/1000000).toFixed(2)}M`, 'Total Revenue'] : [`$${value}`, 'Avg Revenue/Agent']} />
              <Legend />
              <Bar dataKey="totalRevenue" fill="#F59E0B" name="Total Revenue ($)" />
              <Bar dataKey="avgRevenue" fill="#3B82F6" name="Avg Revenue/Agent ($)" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Task Success Rate Trend */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Task Performance Metrics</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={performanceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis domain={[85, 100]} />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="successRate" stroke="#8B5CF6" strokeWidth={3} name="Success Rate (%)" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Task Distribution */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Task Type Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={taskTypeData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {taskTypeData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Performance Summary */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Platform Performance Summary</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <Activity className="h-12 w-12 text-blue-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-blue-900">428K</p>
            <p className="text-sm text-blue-600">Tasks Completed (June)</p>
          </div>
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <Zap className="h-12 w-12 text-green-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-green-900">0.3s</p>
            <p className="text-sm text-green-600">Avg Response Time</p>
          </div>
          <div className="text-center p-4 bg-purple-50 rounded-lg">
            <Target className="h-12 w-12 text-purple-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-purple-900">1.4%</p>
            <p className="text-sm text-purple-600">Monthly Churn Rate</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgenticInsightsDashboard;