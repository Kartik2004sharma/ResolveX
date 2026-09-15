import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Button } from './ui/button';
import NotificationBell from './NotificationBell';
import { Shield, LayoutDashboard, Plus, BarChart3, LogOut, ChevronLeft, ListTodo } from 'lucide-react';

export default function Layout({ children }) {
  const { user, logout } = useAuth();
  const navigate         = useNavigate();
  const location         = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  const handleLogout = () => { logout(); navigate('/'); };

  const studentNav = [
    { to: '/dashboard',     label: 'My Complaints', icon: <LayoutDashboard className="w-4 h-4" /> },
    { to: '/complaint/new', label: 'New Complaint',  icon: <Plus className="w-4 h-4" /> },
  ];
  const staffNav = [
    { to: '/staff', label: 'My Queue', icon: <ListTodo className="w-4 h-4" /> },
  ];
  const adminNav = [
    { to: '/admin',     label: 'All Complaints', icon: <LayoutDashboard className="w-4 h-4" /> },
    { to: '/analytics', label: 'Analytics',       icon: <BarChart3 className="w-4 h-4" /> },
  ];
  const navItems = user?.role === 'student' ? studentNav : user?.role === 'staff' ? staffNav : adminNav;

  const initials  = user?.name?.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase() || '?';
  const roleLabel = { student: 'Student', staff: 'Staff', admin: 'Administrator' }[user?.role] || user?.role;

  return (
    <div className="min-h-screen bg-surface-50 flex">
      {/* Sidebar */}
      <aside className={`${collapsed ? 'w-16' : 'w-56'} bg-surface-900 flex flex-col flex-shrink-0 transition-all duration-200 ease-in-out`}>
        {/* Logo */}
        <div className={`h-14 flex items-center border-b border-surface-800 ${collapsed ? 'justify-center px-3' : 'px-4 gap-2.5'}`}>
          <div className="w-7 h-7 bg-brand-green rounded-lg flex items-center justify-center flex-shrink-0">
            <Shield className="w-3.5 h-3.5 text-brand-dark" />
          </div>
          {!collapsed && <span className="font-display font-bold text-white text-sm tracking-tight">ResolveX</span>}
        </div>

        {/* Nav */}
        <nav className="flex-1 py-3 px-2 space-y-0.5">
          {navItems.map((item) => {
            const active = location.pathname === item.to;
            return (
              <Link
                key={item.to}
                to={item.to}
                title={collapsed ? item.label : undefined}
                className={`flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-sm font-medium transition-colors
                  ${active
                    ? 'bg-brand-green text-brand-dark'
                    : 'text-surface-400 hover:text-white hover:bg-surface-800'}
                  ${collapsed ? 'justify-center' : ''}`}
              >
                {item.icon}
                {!collapsed && item.label}
              </Link>
            );
          })}
        </nav>

        {/* User + collapse */}
        <div className="border-t border-surface-800 p-2 space-y-1">
          {!collapsed && (
            <div className="flex items-center gap-2.5 px-2.5 py-2">
              <div className="w-7 h-7 rounded-full bg-brand-green flex items-center justify-center text-brand-dark text-xs font-bold flex-shrink-0">
                {initials}
              </div>
              <div className="min-w-0">
                <p className="text-xs font-medium text-white truncate">{user?.name}</p>
                <p className="text-2xs text-surface-500">{roleLabel}</p>
              </div>
            </div>
          )}
          <Button
            variant="ghost"
            size="sm"
            title="Logout"
            onClick={handleLogout}
            className={`w-full text-surface-400 hover:text-white hover:bg-surface-800 text-xs ${collapsed ? 'justify-center px-0' : 'justify-start gap-2.5'}`}
          >
            <LogOut className="w-4 h-4" />
            {!collapsed && 'Logout'}
          </Button>
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="w-full flex items-center justify-center py-1.5 rounded-lg text-surface-600 hover:text-surface-400 transition-colors"
          >
            <ChevronLeft className={`w-3.5 h-3.5 transition-transform ${collapsed ? 'rotate-180' : ''}`} />
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Topbar */}
        <header className="h-14 bg-white border-b border-surface-200 flex items-center justify-between px-5 flex-shrink-0 sticky top-0 z-10">
          <div>
            <h1 className="text-sm font-semibold text-surface-900">
              {navItems.find((n) => n.to === location.pathname)?.label || 'ResolveX'}
            </h1>
            <p className="text-2xs text-surface-400">{roleLabel} Portal</p>
          </div>
          <div className="flex items-center gap-2">
            <NotificationBell />
            <div className="w-7 h-7 rounded-full bg-brand-green flex items-center justify-center text-brand-dark text-xs font-bold">
              {initials}
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-auto p-5">{children}</main>
      </div>
    </div>
  );
}
