import { Routes, Route } from 'react-router-dom';
import Layout from '../components/common/Layout';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import NotFound from '../pages/NotFound';
import Videos from '../pages/Videos';
import Music from '../pages/Music';
import VideoDetail from '../pages/VideoDetail';
import MusicDetail from '../pages/MusicDetail';
import Search from '../pages/Search';
import Subscription from '../pages/Subscription';
import About from '../pages/About';
import AdminLayout from '../components/admin/AdminLayout';
import AdminDashboard from '../pages/AdminDashboard';
import ManageContent from '../components/admin/ManageContent';
import UserManagement from '../pages/UserManagement';
import ProtectedRoute from '../components/common/ProtectedRoute';

const PublicRoutes = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/videos" element={<Videos />} />
        <Route path="/music" element={<Music />} />
        <Route path="/video/:id" element={<VideoDetail />} />
        <Route path="/music/:id" element={<MusicDetail />} />
        <Route path="/search" element={<Search />} />
        <Route path="/subscription" element={<Subscription />} />
        <Route path="/about" element={<About />} />
        {/* Add more public routes here later */}
      </Route>
      <Route element={<ProtectedRoute />}>
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="videos" element={<ManageContent type="video" />} />
          <Route path="music" element={<ManageContent type="music" />} />
          <Route path="users" element={<UserManagement />} />
        </Route>
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default PublicRoutes;