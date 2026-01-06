import { Outlet } from 'react-router-dom';
import AdminSidebar from '../../components/admin/AdminSidebar';

const AdminLayout = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white flex">
      <AdminSidebar />
      <main className="flex-1 ml-0 md:ml-64 p-8 overflow-x-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;