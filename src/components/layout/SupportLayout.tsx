import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Headphones, PlusCircle, Search, BookOpen, ShieldCheck, LifeBuoy } from 'lucide-react';
import { Header } from './Header';
import { Footer } from './Footer';

interface SupportLayoutProps {
  children: React.ReactNode;
}

export const SupportLayout: React.FC<SupportLayoutProps> = ({ children }) => {
  const location = useLocation();

  const navItems = [
    { label: 'Support Center', path: '/support', icon: <LifeBuoy className="w-4 h-4" /> },
    { label: 'Raise a Ticket', path: '/support/raise-ticket', icon: <PlusCircle className="w-4 h-4" /> },
    { label: 'Track Tickets', path: '/support/track-ticket', icon: <Search className="w-4 h-4" /> },
    { label: 'Knowledge Base', path: '/support/knowledge-base', icon: <BookOpen className="w-4 h-4" /> },
    { label: 'Support Agent Desk', path: '/support/agent-dashboard', icon: <ShieldCheck className="w-4 h-4" /> }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Header />

      {/* Support Subheader Banner */}
      <div className="bg-slate-900 border-b border-slate-800 text-white py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-950/80 text-emerald-400 border border-emerald-800 mb-2">
                <Headphones className="w-3.5 h-3.5" />
                Customer Support & Helpdesk
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
                Sarita Client Support Portal
              </h1>
              <p className="text-sm text-slate-400 mt-1">
                Fast resolution, product documentation, and transparent ticket lifecycle tracking
              </p>
            </div>

            <div className="flex items-center gap-3">
              <Link
                to="/support/raise-ticket"
                className="btn-primary text-xs py-2 px-3.5 bg-emerald-600 hover:bg-emerald-500 shadow-sm"
              >
                <PlusCircle className="w-4 h-4 mr-1.5" />
                Raise New Ticket
              </Link>
            </div>
          </div>

          {/* Sub Navigation Bar */}
          <div className="flex gap-2 overflow-x-auto mt-6 pt-2 border-t border-slate-800/80 text-xs">
            {navItems.map((item) => {
              const active = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-lg font-medium whitespace-nowrap transition-colors ${
                    active
                      ? 'bg-brand-600 text-white'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/80'
                  }`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>

      <Footer />
    </div>
  );
};
