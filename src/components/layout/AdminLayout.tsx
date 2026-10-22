import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Ticket,
  CalendarCheck,
  Users,
  Handshake,
  BarChart3,
  Settings,
  LogOut,
  ExternalLink,
  ShieldAlert,
  Menu,
  X,
  Search,
  Bell
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const AdminLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { adminUser, logoutAdmin, tickets, demoAppointments, customerAccounts } = useApp();
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const openTicketsCount = tickets.filter((t) => t.status === 'Open' || t.status === 'In Progress').length;
  const pendingDemosCount = demoAppointments.filter((d) => d.status === 'Awaiting Confirmation' || d.status === 'New Request').length;
  const pendingCustomersCount = customerAccounts.filter((c) => c.status === 'Pending Approval').length;

  const navItems = [
    { name: 'Unified Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
    { name: 'Support Tickets', path: '/admin/tickets', icon: Ticket, badge: openTicketsCount > 0 ? openTicketsCount : undefined, badgeColor: 'bg-rose-500' },
    { name: 'Demo Scheduling', path: '/admin/demos', icon: CalendarCheck, badge: pendingDemosCount > 0 ? pendingDemosCount : undefined, badgeColor: 'bg-amber-500' },
    { name: 'Customer Accounts', path: '/admin/customers', icon: Users, badge: pendingCustomersCount > 0 ? pendingCustomersCount : undefined, badgeColor: 'bg-blue-500' },
    { name: 'Partner Channel', path: '/admin/partners', icon: Handshake },
    { name: 'Reports & Analytics', path: '/admin/reports', icon: BarChart3 },
    { name: 'System Settings', path: '/admin/settings', icon: Settings }
  ];

  const handleLogout = () => {
    logoutAdmin();
    navigate('/admin/login');
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col md:flex-row font-sans">
      {/* Sidebar */}
      <aside
        className={`fixed md:sticky top-0 left-0 h-screen w-64 bg-slate-900 text-slate-300 flex flex-col z-40 transition-transform duration-200 border-r border-slate-800 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        {/* Brand Header */}
        <div className="p-5 border-b border-slate-800 flex items-center justify-between">
          <Link to="/admin/dashboard" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-brand-500 text-white font-bold flex items-center justify-center text-sm shadow">
              SI
            </div>
            <div>
              <div className="font-extrabold text-white text-base leading-none">
                Sarita<span className="text-brand-400">Admin</span>
              </div>
              <div className="text-[10px] text-slate-400 font-mono tracking-wider uppercase mt-0.5">
                Central Operations Console
              </div>
            </div>
          </Link>
          <button
            onClick={() => setSidebarOpen(false)}
            className="md:hidden text-slate-400 hover:text-white"
            aria-label="Close sidebar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Admin Profile Box */}
        <div className="px-4 py-3 bg-slate-950/60 border-b border-slate-800/80">
          <div className="text-[10px] uppercase font-bold tracking-wider text-slate-500 mb-0.5">
            Logged In Administrator
          </div>
          <div className="font-semibold text-white text-xs truncate">{adminUser?.name || 'Administrator'}</div>
          <div className="text-[11px] text-brand-400 truncate">{adminUser?.role || 'Super Administrator'}</div>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path || location.pathname.startsWith(`${item.path}/`);
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-medium transition-colors ${
                  isActive
                    ? 'bg-brand-600 text-white font-semibold shadow-sm'
                    : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                  <span>{item.name}</span>
                </div>
                {item.badge !== undefined && (
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold text-white ${item.badgeColor || 'bg-brand-500'}`}>
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Bottom Actions */}
        <div className="p-3 border-t border-slate-800 space-y-1">
          <Link
            to="/"
            className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <ExternalLink className="w-4 h-4" />
            <span>Open Public Website</span>
          </Link>
          <button
            id="admin-logout-btn"
            onClick={handleLogout}
            className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs text-rose-400 hover:text-rose-300 hover:bg-slate-800 transition-colors text-left"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out of Admin Console</span>
          </button>
        </div>
      </aside>

      {/* Main Content View */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Navbar */}
        <header className="bg-white border-b border-slate-200 h-16 flex items-center justify-between px-4 sm:px-8 z-20">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="md:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100"
              aria-label="Open sidebar"
            >
              <Menu className="w-5 h-5" />
            </button>
            <span className="text-xs font-bold text-slate-700 uppercase tracking-wider hidden sm:inline">
              Management Workspace
            </span>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <div className="text-xs font-bold text-slate-900">{adminUser?.name}</div>
              <div className="text-[10px] text-slate-500 font-mono">Surat HQ Central Console</div>
            </div>
            <div className="w-8 h-8 rounded-full bg-brand-600 text-white font-bold text-xs flex items-center justify-center">
              AD
            </div>
          </div>
        </header>

        {/* Prototype Warning Banner */}
        <div className="bg-slate-900 text-slate-300 text-[11px] px-4 py-1.5 border-b border-slate-800 flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Admin Demonstration Session • Isolated local state simulation</span>
          </div>
          <span className="hidden md:inline text-slate-500 font-mono text-[10px]">
            In production: OAuth 2.0 / MFA & server RBAC enforce security
          </span>
        </div>

        {/* Body Content */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-8">
          {children}
        </main>
      </div>
    </div>
  );
};
