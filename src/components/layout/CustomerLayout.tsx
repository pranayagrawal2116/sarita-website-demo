import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Ticket,
  PlusCircle,
  User,
  LogOut,
  ExternalLink,
  ShieldCheck,
  Building2,
  Menu,
  X,
  Headphones
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const CustomerLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { currentCustomer, logoutCustomer } = useApp();
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { name: 'Dashboard', path: '/customer/dashboard', icon: LayoutDashboard },
    { name: 'My Tickets', path: '/customer/tickets', icon: Ticket },
    { name: 'Raise a Ticket', path: '/customer/tickets/new', icon: PlusCircle },
    { name: 'Organization Profile', path: '/customer/profile', icon: User }
  ];

  const handleLogout = () => {
    logoutCustomer();
    navigate('/customer/login');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      {/* Top Session & Identity Bar */}
      <div className="bg-slate-900 text-slate-300 text-xs py-2 px-4 sm:px-8 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-2">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800 text-[11px] font-semibold">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              Authenticated Customer Session
            </span>
            {currentCustomer && (
              <span className="hidden sm:inline text-slate-400 text-[11px]">
                {currentCustomer.organization} ({currentCustomer.accountReference})
              </span>
            )}
          </div>

          <div className="flex items-center gap-4 text-xs ml-auto">
            <Link to="/" className="inline-flex items-center gap-1 text-slate-400 hover:text-white transition-colors">
              <span>Public Website</span>
              <ExternalLink className="w-3 h-3" />
            </Link>
            <span className="text-slate-700">|</span>
            <button
              id="customer-logout-btn"
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 text-rose-400 hover:text-rose-300 transition-colors font-medium"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Log Out</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Customer Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Link to="/customer/dashboard" className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-brand-600 text-white font-bold flex items-center justify-center text-sm shadow-sm">
                  SI
                </div>
                <div>
                  <div className="font-extrabold text-slate-900 text-base leading-none tracking-tight">
                    Sarita<span className="text-brand-600">Infotech</span>
                  </div>
                  <div className="text-[10px] text-slate-400 font-semibold tracking-wider uppercase mt-0.5">
                    Customer Support Portal
                  </div>
                </div>
              </Link>

              <span className="hidden md:inline-block h-6 w-px bg-slate-200" />

              <div className="hidden md:flex items-center gap-2 text-xs text-slate-600 bg-slate-50 border border-slate-200/80 px-2.5 py-1 rounded-lg">
                <Building2 className="w-3.5 h-3.5 text-brand-600" />
                <span className="font-semibold text-slate-800">{currentCustomer?.organization || 'Organization'}</span>
                <span className="text-slate-400">•</span>
                <span className="text-slate-500 font-mono text-[11px]">{currentCustomer?.product}</span>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`inline-flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold transition-colors ${
                      isActive
                        ? 'bg-brand-50 text-brand-700 font-bold border border-brand-200/60'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                    }`}
                  >
                    <Icon className={`w-4 h-4 ${isActive ? 'text-brand-600' : 'text-slate-400'}`} />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
            </nav>

            {/* Mobile Menu Button */}
            <div className="flex md:hidden">
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-lg text-slate-600 hover:bg-slate-100"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-slate-100 bg-white px-4 py-3 space-y-1 shadow-lg">
            <div className="pb-2 border-b border-slate-100 mb-2">
              <div className="text-xs font-bold text-slate-900">{currentCustomer?.name}</div>
              <div className="text-[11px] text-slate-500">{currentCustomer?.organization}</div>
            </div>
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-semibold ${
                    isActive ? 'bg-brand-50 text-brand-700' : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </div>
        )}
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-6 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row justify-between items-center gap-2">
          <span>Sarita Infotech Pvt. Ltd. • Dedicated Enterprise Support Desk</span>
          <span className="font-mono text-[11px] text-slate-400">
            Emergency Hotline: +91 79900 29373 (24/7 Priority Support for Hospitals & Banks)
          </span>
        </div>
      </footer>
    </div>
  );
};
