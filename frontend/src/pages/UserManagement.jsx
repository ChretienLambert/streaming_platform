import { useState } from 'react';
import { Search, Edit2, Trash2, UserCheck, UserX, Crown, Download, Users as UsersIcon } from 'lucide-react';
import Loader from '../components/common/Loader';
import Papa from 'papaparse';

const mockUsers = [
  { id: 1, name: "John Doe", email: "john@example.com", role: "admin", joined: "2025-01-15", status: "active" },
  { id: 2, name: "Sarah Smith", email: "sarah@example.com", role: "user", joined: "2025-03-22", status: "active" },
  { id: 3, name: "Mike Johnson", email: "mike@example.com", role: "premium", joined: "2025-06-10", status: "active" },
  { id: 4, name: "Emma Wilson", email: "emma@example.com", role: "user", joined: "2025-08-05", status: "inactive" },
  { id: 5, name: "Alex Brown", email: "alex@example.com", role: "user", joined: "2025-11-01", status: "active" },
  { id: 6, name: "Lisa Davis", email: "lisa@example.com", role: "premium", joined: "2025-12-01", status: "active" },
  { id: 7, name: "David Lee", email: "david@example.com", role: "admin", joined: "2025-02-10", status: "inactive" },
  { id: 8, name: "Rachel Green", email: "rachel@example.com", role: "premium", joined: "2025-04-18", status: "active" },
];

const UserManagement = () => {
  const [users, setUsers] = useState(mockUsers);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  // Filter users based on tab and search
  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          user.email.toLowerCase().includes(searchTerm.toLowerCase());
    switch (activeTab) {
      case 'active': return matchesSearch && user.status === 'active';
      case 'inactive': return matchesSearch && user.status === 'inactive';
      case 'admins': return matchesSearch && user.role === 'admin';
      case 'premium': return matchesSearch && user.role === 'premium';
      default: return matchesSearch;
    }
  });

  const handleSelect = (id) => {
    setSelectedUsers(prev =>
      prev.includes(id) ? prev.filter(u => u !== id) : [...prev, id]
    );
  };

  const handleBulkDelete = () => {
    if (confirm(`Delete ${selectedUsers.length} users?`)) {
      setLoading(true);
      setTimeout(() => {
        setUsers(users.filter(u => !selectedUsers.includes(u.id)));
        setSelectedUsers([]);
        setLoading(false);
      }, 600);
    }
  };

  const handleBulkRoleChange = (newRole) => {
    setLoading(true);
    setTimeout(() => {
      setUsers(users.map(u => selectedUsers.includes(u.id) ? { ...u, role: newRole } : u));
      setSelectedUsers([]);
      setLoading(false);
    }, 600);
  };

  const exportToCSV = () => {
    const csv = Papa.unparse(filteredUsers);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'users.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getRoleIcon = (role) => {
    switch (role) {
      case 'admin': return <Crown size={18} className="text-yellow-400" />;
      case 'premium': return <UserCheck size={18} className="text-purple-400" />;
      default: return <UserX size={18} className="text-gray-400" />;
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="p-6 lg:p-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
        <div className="flex items-center gap-4">
          <div className="p-3 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500">
            <UsersIcon size={32} className="text-white" />
          </div>
          <div>
            <h1 className="text-4xl font-bold text-white">User Management</h1>
            <p className="text-gray-400">Manage, search, and control user access</p>
          </div>
        </div>

        <div className="flex items-center gap-4 w-full md:w-auto">
          <div className="relative flex-1 md:flex-none">
            <Search size={20} className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-500" />
            <input
              type="text"
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-14 pr-6 py-4 bg-gray-800 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-600/30 transition"
            />
          </div>
          <button
            onClick={exportToCSV}
            className="p-4 bg-gray-700 rounded-xl hover:bg-gray-600 transition"
            title="Export CSV"
          >
            <Download size={24} className="text-gray-300" />
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex overflow-x-auto mb-8 border-b border-gray-700">
        {['all', 'active', 'inactive', 'admins', 'premium'].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-4 font-medium transition whitespace-nowrap ${
              activeTab === tab
                ? 'border-b-2 border-blue-500 text-white'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Bulk Actions */}
      {selectedUsers.length > 0 && (
        <div className="bg-blue-900/30 backdrop-blur rounded-xl p-6 mb-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-blue-300">
            {selectedUsers.length} users selected
          </p>
          <div className="flex gap-4">
            <select
              onChange={(e) => handleBulkRoleChange(e.target.value)}
              className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg"
            >
              <option value="">Change Role</option>
              <option value="user">User</option>
              <option value="premium">Premium</option>
              <option value="admin">Admin</option>
            </select>
            <button
              onClick={handleBulkDelete}
              className="px-6 py-2 bg-red-600 rounded-lg hover:bg-red-700 transition"
            >
              Delete Selected
            </button>
          </div>
        </div>
      )}

      {/* Desktop Table */}
      <div className="hidden md:block bg-gray-800/50 backdrop-blur rounded-2xl overflow-hidden border border-gray-700">
        <table className="w-full">
          <thead className="bg-gray-900/80">
            <tr>
              <th className="text-left p-6 w-12">
                <input
                  type="checkbox"
                  checked={selectedUsers.length === filteredUsers.length}
                  onChange={(e) => setSelectedUsers(e.target.checked ? filteredUsers.map(u => u.id) : [])}
                />
              </th>
              <th className="text-left p-6">User</th>
              <th className="text-left p-6">Joined</th>
              <th className="text-left p-6">Role</th>
              <th className="text-left p-6">Status</th>
              <th className="text-right p-6">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center py-12 text-gray-500">
                  No users found
                </td>
              </tr>
            ) : (
              filteredUsers.map((user) => (
                <tr key={user.id} className="border-t border-gray-700 hover:bg-gray-800/30 transition">
                  <td className="p-6">
                    <input
                      type="checkbox"
                      checked={selectedUsers.includes(user.id)}
                      onChange={() => handleSelect(user.id)}
                    />
                  </td>
                  <td className="p-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-gray-600 to-gray-700 rounded-full flex items-center justify-center text-xl font-bold">
                        {user.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <p className="font-semibold">{user.name}</p>
                        <p className="text-sm text-gray-400">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-6 text-gray-300">{user.joined}</td>
                  <td className="p-6">
                    <div className="flex items-center gap-2">
                      {getRoleIcon(user.role)}
                      <span className="capitalize">{user.role}</span>
                    </div>
                  </td>
                  <td className="p-6">
                    <span className={`px-4 py-2 rounded-full text-sm font-medium border ${
                      user.status === 'active'
                        ? 'bg-green-600/20 text-green-400 border-green-600/50'
                        : 'bg-gray-600/20 text-gray-400 border-gray-600/50'
                    }`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="p-6 text-right flex justify-end gap-4">
                    <button className="p-2 hover:bg-gray-700 rounded-lg transition">
                      <Edit2 size={20} className="text-blue-400" />
                    </button>
                    <button
                      onClick={() => handleDelete(user.id, user.name)}
                      className="p-2 hover:bg-red-900/30 rounded-lg transition"
                    >
                      <Trash2 size={20} className="text-red-400" />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden grid grid-cols-1 gap-6">
        {filteredUsers.length === 0 ? (
          <p className="text-center text-gray-500 py-12">No users found</p>
        ) : (
          filteredUsers.map((user) => (
            <div key={user.id} className="bg-gray-800/50 backdrop-blur rounded-2xl p-6 border border-gray-700">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-gray-600 to-gray-700 rounded-full flex items-center justify-center text-2xl font-bold">
                    {user.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <p className="font-bold text-lg">{user.name}</p>
                    <p className="text-gray-400">{user.email}</p>
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={selectedUsers.includes(user.id)}
                  onChange={() => handleSelect(user.id)}
                />
              </div>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-sm text-gray-500">Joined</p>
                  <p className="font-medium">{user.joined}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Status</p>
                  <span className={`inline-block px-3 py-1 rounded-full text-sm ${
                    user.status === 'active' ? 'bg-green-600/20 text-green-400' : 'bg-gray-600/20 text-gray-400'
                  }`}>
                    {user.status}
                  </span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {getRoleIcon(user.role)}
                  <select
                    value={user.role}
                    onChange={(e) => handleRoleChange(user.id, e.target.value)}
                    className="px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-sm"
                  >
                    <option value="user">User</option>
                    <option value="premium">Premium</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>
                <button
                  onClick={() => handleDelete(user.id, user.name)}
                  className="p-3 bg-gray-700 rounded-lg hover:bg-red-900/30 transition"
                >
                  <Trash2 size={20} className="text-red-400" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default UserManagement;