import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  UserPlus,
  Briefcase,
  FileDown,
  UserCheck,
  LogOut,
  ShieldAlert,
  Building,
  KeyRound,
  ExternalLink
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface PartnerLayoutProps {
  children: React.ReactNode;
}

export const PartnerLayout: React.FC<PartnerLayoutProps> = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { partnerAuthenticated, logoutPartner, partnerProfile } = useApp();

  const handleLogout = () => {
    logoutPartner();
    navigate('/partners/login');
  };

  const navLinks = [
    { label: 'Partner Dashboard', path: '/partners/dashboard', icon: <LayoutDashboard className="w-4 h-4" /> },
    { label: 'Registered Leads', path: '/partners/leads', icon: <Users className="w-4 h-4" /> },
    { label: 'Register New Lead', path: '/partners/leads/new', icon: <UserPlus className="w-4 h-4" /> },
    { label: 'Opportunities & Deals', path: '/partners/opportunities', icon: <Briefcase className="w-4 h-4" /> },
    { label: 'Marketing & Sales Assets', path: '/partners/resources', icon: <FileDown className="w-4 h-4" /> },
    { label: 'My Partner Profile', path: '/partners/profile', icon: <UserCheck className="w-4 h-4" /> }
  ];

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans">
      {/* Top Portal Header */}
      <header className="bg-slate-900 border-b border-slate-800 text-white sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link to="/" className="flex items-center gap-2 text-white hover:text-brand-300">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-brand-600 to-accent-500 flex items-center justify-center font-bold text-sm">
                SI
              </div>
              <span className="font-bold text-base tracking-tight hidden sm:inline">
                Sarita Infotech
              </span>
            </Link>
            <span className="text-slate-600">/</span>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-brand-950 text-brand-300 border border-brand-800 flex items-center gap-1.5">
              <KeyRound className="w-3 h-3" />
              B2B Partner Portal
            </span>
          </div>

          <div className="flex items-center gap-4 text-xs">
            <div className="hidden md:flex items-center gap-2">
              <span className="text-slate-400">Authorized Partner:</span>
              <span className="font-semibold text-white">{partnerProfile.companyName}</span>
              <span className="px-2 py-0.5 rounded bg-amber-950 text-amber-300 border border-amber-800 text-[10px] font-medium">
                {partnerProfile.partnerTier}
              </span>
            </div>

            <Link
              to="/"
              className="text-slate-400 hover:text-white inline-flex items-center gap-1 text-xs"
            >
              Public Website <ExternalLink className="w-3 h-3" />
            </Link>

            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Exit Demo</span>
            </button>
          </div>
        </div>
      </header>

      {/* Demonstration Security Bar */}
      <div className="bg-amber-50 border-b border-amber-200 px-4 py-2 text-xs text-amber-900">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-amber-700 flex-shrink-0" />
            <span>
              <strong className="font-semibold">Demonstration Mode:</strong> Session simulated for client review. In production, access is protected by OAuth 2.0 / MFA, server-side tenant isolation, and encrypted cloud storage.
            </span>
          </div>
        </div>
      </div>

      {/* Main Grid: Sidebar + Body */}
      <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 flex-1 flex flex-col md:flex-row gap-6">
        {/* Sidebar Navigation */}
        <aside className="w-full md:w-64 flex-shrink-0">
          <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm sticky top-24 space-y-4">
            {/* Partner Info Summary */}
            <div className="pb-3 border-b border-slate-100">
              <div className="text-xs text-slate-400 uppercase font-semibold tracking-wider">Partner Profile</div>
              <div className="font-bold text-slate-900 text-sm mt-1">{partnerProfile.companyName}</div>
              <div className="text-xs text-slate-600">{partnerProfile.contactPerson}</div>
              <div className="text-[11px] text-brand-700 font-mono mt-0.5">{partnerProfile.partnerId}</div>
            </div>

            {/* Nav list */}
            <nav className="space-y-1 text-xs">
              {navLinks.map((item) => {
                const active = location.pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center gap-2.5 px-3 py-2.5 rounded-lg font-medium transition-all ${
                      active
                        ? 'bg-brand-600 text-white shadow-sm'
                        : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900'
                    }`}
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </nav>

            {/* Help / Manager Desk */}
            <div className="pt-3 border-t border-slate-100 bg-slate-50 p-3 rounded-lg text-xs space-y-1">
              <div className="font-semibold text-slate-800">Assigned Channel Lead</div>
              <div className="text-slate-600 text-[11px]">{partnerProfile.channelManager}</div>
              <div className="text-brand-700 text-[11px] font-mono">{partnerProfile.managerPhone}</div>
            </div>
          </div>
        </aside>

        {/* Dynamic Page Body */}
        <main className="flex-1 min-w-0">
          {children}
        </main>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-4 text-center text-xs text-slate-500">
        Sarita Infotech Pvt. Ltd. • Authorized B2B Channel Partner Portal • Demonstration Sandbox
      </footer>
    </div>
  );
};
