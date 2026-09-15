import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import Layout from './components/Layout';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Register from './pages/Register';
import StudentDashboard from './pages/StudentDashboard';
import StaffDashboard from './pages/StaffDashboard';
import SubmitComplaint from './pages/SubmitComplaint';
import ComplaintDetail from './pages/ComplaintDetail';
import AdminDashboard from './pages/AdminDashboard';
import Analytics from './pages/Analytics';

function ProtectedRoute({ children, roles }) {
  const { user, loading } = useAuth();
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-surface-50">
        <div className="animate-spin rounded-full h-10 w-10 border-2 border-primary-600 border-t-transparent" />
      </div>
    );
  }
  if (!user) return <Navigate to="/login" replace />;
  if (roles && !roles.includes(user.role)) return <Navigate to="/" replace />;
  return children;
}

export default function App() {
  return (
    <Routes>
      {/* Public */}
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Student */}
      <Route path="/dashboard" element={
        <ProtectedRoute roles={['student']}>
          <Layout><StudentDashboard /></Layout>
        </ProtectedRoute>
      } />
      <Route path="/complaint/new" element={
        <ProtectedRoute roles={['student']}>
          <Layout><SubmitComplaint /></Layout>
        </ProtectedRoute>
      } />

      {/* Staff — dedicated dashboard */}
      <Route path="/staff" element={
        <ProtectedRoute roles={['staff']}>
          <Layout><StaffDashboard /></Layout>
        </ProtectedRoute>
      } />

      {/* Shared complaint detail */}
      <Route path="/complaint/:id" element={
        <ProtectedRoute>
          <Layout><ComplaintDetail /></Layout>
        </ProtectedRoute>
      } />

      {/* Admin */}
      <Route path="/admin" element={
        <ProtectedRoute roles={['admin', 'staff']}>
          <Layout><AdminDashboard /></Layout>
        </ProtectedRoute>
      } />
      <Route path="/analytics" element={
        <ProtectedRoute roles={['admin']}>
          <Layout><Analytics /></Layout>
        </ProtectedRoute>
      } />

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
