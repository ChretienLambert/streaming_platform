import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Film,
  Music,
  Users,
  Settings,
  FolderOpen,
  LogOut,
  Menu,
  X,
} from 'lucide-react';

const AdminSidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  const menuItems = [
    { path: '/admin', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/admin/videos', label: 'Manage Content', icon: FolderOpen },
    { path: '/admin/users', label: 'User Management', icon: Users },
    { path: '/admin/settings', label: 'Settings', icon: Settings },
  ];

  const isActive = (path) => {
    if (path === '/admin/videos') {
      return location.pathname.startsWith('/admin/videos') || location.pathname.startsWith('/admin/music');
    }
    return location.pathname === path || location.pathname.startsWith(path);
  };

  return (
    <aside
      className={`fixed inset-y-0 left-0 z-50 bg-gray-950 border-r border-gray-800 transition-all duration-300 flex flex-col ${
        collapsed ? 'w-20' : 'w-64'
      }`}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-gray-800">
        <div className={`flex items-center gap-3 ${collapsed ? 'justify-center' : ''}`}>
          <div className="w-10 h-10 bg-gradient-to-br from-red-600 to-purple-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-xl">S</span>
          </div>
          {!collapsed && <h1 className="text-xl font-bold text-white">StreamHub Admin</h1>}
        </div>

        <button
          onClick={() => setCollapsed(!collapsed)}
          className="text-gray-400 hover:text-white transition lg:hidden"
        >
          {collapsed ? <Menu size={24} /> : <X size={24} />}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);

            return (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200 group ${
                    active
                      ? 'bg-gradient-to-r from-red-600/20 to-purple-600/20 text-white border border-red-600/30'
                      : 'text-gray-400 hover:bg-gray-800/50 hover:text-white'
                  }`}
                >
                  <Icon size={22} className={active ? 'text-red-400' : 'group-hover:text-white'} />
                  <span className={`font-medium ${collapsed ? 'hidden' : 'block'}`}>
                    {item.label}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-gray-800">
        <button className="flex items-center gap-4 w-full px-4 py-3 rounded-xl text-gray-400 hover:bg-gray-800/50 hover:text-red-400 transition-all">
          <LogOut size={22} />
          <span className={`font-medium ${collapsed ? 'hidden' : 'block'}`}>Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default AdminSidebar;