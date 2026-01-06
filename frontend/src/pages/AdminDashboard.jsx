import {
  Film,
  Music,
  Users,
  DollarSign,
  TrendingUp,
  Activity,
} from 'lucide-react';

import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  const stats = [
    {
      title: 'Total Videos',
      value: '2,855',
      change: '+12.5%',
      icon: Film,
      color: 'from-red-500 to-orange-500',
    },
    {
      title: 'Total Music',
      value: '18,392',
      change: '+8.3%',
      icon: Music,
      color: 'from-purple-500 to-pink-500',
    },
    {
      title: 'Active Users',
      value: '67,421',
      change: '+23.1%',
      icon: Users,
      color: 'from-blue-500 to-cyan-500',
    },
    {
      title: 'Revenue',
      value: '$184,921',
      change: '+31.2%',
      icon: DollarSign,
      color: 'from-green-500 to-emerald-500',
    },
  ];

  const recentActivity = [
    { action: 'New video added', item: 'Dune: Part Three Trailer', time: '2 hours ago' },
    { action: 'User upgraded', item: 'sarah@example.com → Premium', time: '4 hours ago' },
    { action: 'New album uploaded', item: 'Taylor Swift - Evermore (Deluxe)', time: '6 hours ago' },
    { action: 'Content deleted', item: 'Old trailer removed', time: '1 day ago' },
  ];

  return (
    <div className="p-6 lg:p-10">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-4xl font-bold text-white mb-2">Dashboard Overview</h1>
        <p className="text-gray-400">Welcome back! Here's what's happening today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {stats.map((stat) => (
          <div
            key={stat.title}
            className="bg-gray-800/50 backdrop-blur border border-gray-700 rounded-2xl p-6 hover:border-gray-600 transition-all duration-300"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-xl bg-gradient-to-br ${stat.color}`}>
                <stat.icon size={28} className="text-white" />
              </div>
              <span className="text-green-400 text-sm font-medium">{stat.change}</span>
            </div>
            <h3 className="text-3xl font-bold text-white mb-1">{stat.value}</h3>
            <p className="text-gray-400">{stat.title}</p>
          </div>
        ))}
      </div>

      {/* Quick Actions & Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Quick Actions */}
        <div className="lg:col-span-2">
          <h2 className="text-2xl font-bold text-white mb-6">Quick Actions</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <Link
              to="/admin/videos"
              className="bg-gradient-to-br from-red-600 to-orange-600 p-8 rounded-2xl text-center hover:scale-105 transition-transform duration-300"
            >
              <Film size={48} className="mx-auto mb-4 text-white/90" />
              <p className="text-xl font-bold text-white">Manage Videos</p>
            </Link>
            <Link
              to="/admin/music"
              className="bg-gradient-to-br from-purple-600 to-pink-600 p-8 rounded-2xl text-center hover:scale-105 transition-transform duration-300"
            >
              <Music size={48} className="mx-auto mb-4 text-white/90" />
              <p className="text-xl font-bold text-white">Manage Music</p>
            </Link>
          </div>
        </div>

        {/* Recent Activity */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-6">Recent Activity</h2>
          <div className="bg-gray-800/50 backdrop-blur border border-gray-700 rounded-2xl p-6">
            <ul className="space-y-4">
              {recentActivity.map((activity, i) => (
                <li key={i} className="flex items-start gap-4">
                  <Activity size={20} className="text-gray-500 mt-0.5" />
                  <div>
                    <p className="text-white font-medium">{activity.action}</p>
                    <p className="text-sm text-gray-400">{activity.item}</p>
                    <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;